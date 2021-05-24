using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LearningEvents.Views;
using LearningEvents.Models;

namespace LearningEvents
{
    public class AplProfile : Profile
    {
        public AplProfile()
        {
            CreateMap<LearningEvent, LearningEventView>();
            CreateMap<LearningEvent, LearningEventView>().ReverseMap()
                .ForMember("Workers", cm => cm.MapFrom(g => g.Workers.Select(c => new Worker { WorkerId=c.Id, InitialScore=c.InitialScore, AfterwardsScore=c.AfterwardsScore, LearningEventId = c.LearningEventId })));
            CreateMap<LearningEvent, EventRow>();
            CreateMap<LearningEvent, EventRow>().ReverseMap();
        }
    }
}
