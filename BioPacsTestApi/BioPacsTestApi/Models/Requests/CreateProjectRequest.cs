using BioPacsTestApi.Models.Database;

namespace BioPacsTestApi.Models.Requests
{
    public class CreateProjectRequest
    {
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        public bool AcceptNewVisits { get; set; }
        public ImageType ImageType { get; set; }
    }
}
