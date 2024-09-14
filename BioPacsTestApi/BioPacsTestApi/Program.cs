using BioPacsTestApi.Models.Database;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<DatabaseContext>(options => options.UseNpgsql("Host=localhost;Database=BioPacsProjects;Username=postgres;Password=admin;"/*builder.Configuration.GetConnectionString("DatabaseContext")*/));

        var app = builder.Build();

        //app.Services.GetService<DatabaseContext>().Database.EnsureCreated();

        using (var scope = app.Services.CreateScope())
        {
            var scopedService = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
            scopedService.Database.EnsureDeleted();
            scopedService.Database.EnsureCreated();
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}