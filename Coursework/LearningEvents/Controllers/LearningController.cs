using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LearningEvents.Views;
using LearningEvents.Services;
using LearningEvents.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;
using GemBox.Document;

namespace LearningEvents.Controllers
{
    public class LearningController : Controller
    {
        private readonly ILearningEventsService _learningService;
        private readonly IMapper _mapper;

        public LearningController(ILearningEventsService learningService)
        {
            _learningService = learningService;

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AplProfile>();
            });
            _mapper = config.CreateMapper();
        }

        [HttpGet]
        public async Task<IActionResult> GetLearningEvent(int id)
        {
            var eve = await _learningService.GetEvent(id);

            return eve == null
                ? NotFound()
                : Ok(eve) as IActionResult;
        }


        [HttpGet]
        public async Task<EventRow[]> GetAll()
        {
            var events = await _learningService.GetAllEvents();
            var rows = _mapper.Map<EventRow[]>(events);
            for (int i = 0; i < events.Length; i++)
            {
                int completed = 0;
                foreach (var worker in events[i].Workers)
                {
                    if (worker.AfterwardsScore != null)
                    {
                        completed++;
                    }
                }

                if (events[i].Workers.Count == 0)
                {
                    rows[i].Capacity = "0 %";
                }
                else
                {
                    rows[i].Capacity = ((Double)completed / events[i].Workers.Count * 100).ToString("0.00") + " %";
                }
            }

            return rows;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllById(int id)
        {
            var events = await _learningService.GetAllEventsById(id);
            WorkerEventsView[] ans = new WorkerEventsView[events.Length];
            for (int i = 0; i < events.Length; i++)
            {
                ans[i] = new WorkerEventsView
                {
                    Id = events[i].Id,
                    Name = events[i].Name,
                    Description = events[i].Description,
                    InitialScore = events[i].Workers[0].InitialScore,
                    AfterwardsScore = events[i].Workers[0].AfterwardsScore,
                    Feedback = events[i].Workers[0].Feedback
                };
            }

            return events == null
                ? NotFound()
                : Ok(ans) as IActionResult;
        }

        [HttpPost]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] LearningEvent learningEvent)
        {
            await _learningService.Update(id, learningEvent);
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            await _learningService.DeleteEvent(id);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateLearningEvent([FromBody] LearningEventView learningEventView)
        {
            var lEvent = _mapper.Map<LearningEvent>(learningEventView);
            var id = await _learningService.AddLearningEventAsync(lEvent).ConfigureAwait(false);
            await GetLearningEvent((int)id);
            return Ok(id);
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(int id, List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    Directory.CreateDirectory("events/" + id + "/");
                    var filePath = Path.GetFullPath("events/" + id + "/" + formFile.FileName);

                    using (var stream = System.IO.File.Create(filePath))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }

            return Ok(new { count = files.Count, size });
        }

        [HttpGet]
        public async Task<IActionResult> GetListOfTasks(int id)
        {
            Directory.CreateDirectory("events/" + id + "/");
            var files = Directory.GetFileSystemEntries("events/" + id + "/");
            for (int i = 0; i < files.Length; i++)
            {
                files[i] = Path.GetFileName(files[i]);
            }
            var materials = new Materials
            {
                PathsToD = new List<string>(files)
            };

            return materials.PathsToD.Count == 0
                ? NotFound()
                : Ok(materials);
        }

        [HttpGet]
        public async Task<IActionResult> GetFile(int id, string material)
        {
            new FileExtensionContentTypeProvider().TryGetContentType("events/" + id + "/" + material, out string contentType);
            var bytes = System.IO.File.ReadAllBytes("events/" + id + "/" + material);
            return new FileContentResult(bytes, contentType)
            {
                FileDownloadName = material
            };
        }

        [HttpGet]
        public async Task<IActionResult> GetFeedback(int id, int material)
        {
            var ans = await _learningService.GetFeedbackAsync(id, material);
            return ans == null
                ? NotFound()
                : Ok(ans);
        }

        [HttpGet]
        public async Task<IActionResult> getFileFeedback(int id, int material)
        {
            var ans = await _learningService.GetFeedbackAsync(id, material);
            try
            {
                System.IO.File.Delete("Feedback.docx");
            } catch (Exception e)
            {

            }

            ComponentInfo.SetLicense("FREE-LIMITED-KEY");

            DocumentModel document = new DocumentModel();

            Section section = new Section(document);
            document.Sections.Add(section);

            Paragraph paragraph = new Paragraph(document);
            section.Blocks.Add(paragraph);

            Run run = new Run(document, "Ф.И: сидоров");
            paragraph.Inlines.Add(run);

            paragraph = new Paragraph(document);
            section.Blocks.Add(paragraph);
            paragraph.Inlines.Add(new Run(document, "Должность: "));

            paragraph = new Paragraph(document);
            section.Blocks.Add(paragraph);
            paragraph.Inlines.Add(new Run(document, "Подразделение: Нефтяной район №2 "));

            var numberList = new ListStyle(ListTemplateType.NumberWithDot);

            var blocks = section.Blocks;
            // Create number list items.
            blocks.Add(new Paragraph(document, "На Ваш взгляд являлась ли программа актуальной для Вас с учётом имеющегося опыта работы?")
            { 
                ListFormat = { Style = numberList }
            });
            blocks.Add(new Paragraph(document, "Очень актуально, важно идти с опережением вперёд")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "Актуально")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "Не могу сказать")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "Есть более актуальные темы для обучения (напишите какие именно)")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "Комментарий: " + ans.ActuallityComment)
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });



            blocks.Add(new Paragraph(document, "Отметьте, пожалуйста, как Вы оцениваете содержание учебных курсов")
            {
                ListFormat = { Style = numberList }
            });
            blocks.Add(new Paragraph(document, "отлично")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "очень хорошо")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "хорошо")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "удовлетворительно")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "слабо")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "Комментарий: " + ans.ActuallityComment)
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });



            blocks.Add(new Paragraph(document, "Считаете ли Вы, что полученные знания и новые навыки сможете применить в своей повседневной работе?")
            {
                ListFormat = { Style = numberList }
            });
            blocks.Add(new Paragraph(document, "смогу использовать в высокой степени")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });
            blocks.Add(new Paragraph(document, "смогу использовать в некоторой степени ")
            {
                ListFormat = { Style = numberList, ListLevelNumber = 1 }
            });

            document.Save("Feedback.docx");

            new FileExtensionContentTypeProvider().TryGetContentType("Feedback.docx", out string contentType);
            var bytes = System.IO.File.ReadAllBytes("Feedback.docx");
            return new FileContentResult(bytes, contentType)
            {
                FileDownloadName = "Feedback.docx"
            };

            document.Save("Feedback.docx");
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> SetFeedback(int id, int material, [FromBody] Feedback feedback)
        {
            await _learningService.SetFeedback(id, material, feedback);
            return Ok();
        }
    }
}
