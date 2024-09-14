namespace BioPacsTestApi.Models.Database
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string PasswordHash { get; set; }
    }
}
