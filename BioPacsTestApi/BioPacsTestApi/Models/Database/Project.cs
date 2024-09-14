using System;

namespace BioPacsTestApi.Models.Database
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        public bool AcceptNewVisits { get; set; }
        public ImageType ImageType { get; set; }
    }
}
