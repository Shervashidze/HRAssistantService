using WorkersInfoConsolidation.Models;
using WorkersInfoConsolidation.Models.ViewModels;
using AutoMapper;

namespace WorkersInfoConsolidation.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateWorkerView, Worker>();
            CreateMap<EditWorkerView, Worker>();
        }
    }
}
