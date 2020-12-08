using WorkersInfoConsolidation.Models;
using WorkersInfoConsolidation.Models.ViewModels;
using AutoMapper;

namespace WorkersInfoConsolidation.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<CreateWorkerView, Worker>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Department, opt => opt.MapFrom(src => src.Department))
                .ForMember(dest => dest.Post, opt => opt.MapFrom(src => src.Post));
            CreateMap<EditWorkerView, Worker>();
        }
    }
}
