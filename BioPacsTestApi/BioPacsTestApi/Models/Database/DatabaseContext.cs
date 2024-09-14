using Microsoft.EntityFrameworkCore;

namespace BioPacsTestApi.Models.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() { }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //    => optionsBuilder.UseNpgsql("Host=localhost;Database=BioPacsProjects;Username=admin;Password=admin;");

        public DbSet<User> Users { get; set; }

        public DbSet<Project> Projects { get; set; }
    }
}
