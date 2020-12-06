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
        }
    }
}
