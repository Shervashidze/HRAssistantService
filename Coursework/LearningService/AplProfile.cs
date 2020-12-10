using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LearningService.Views;
using LearningService.Models;

namespace LearningService
{
    public class AplProfile : Profile
    {
        public AplProfile()
        {
            CreateMap<LearningEvent, LearningEventView>();
            CreateMap<LearningEvent, LearningEventView>().ReverseMap();
            CreateMap<LearningEvent, EventRow>().ForMember("PlannedDate", cm => cm.MapFrom(c => c.PlannedDate.Day.ToString() + ":" + c.PlannedDate.Month.ToString() + ":" + c.PlannedDate.Year.ToString()));
            CreateMap<LearningEvent, EventRow>().ReverseMap();
        }
    }
}
