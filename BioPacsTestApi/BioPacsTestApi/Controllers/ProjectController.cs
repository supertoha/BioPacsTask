using BioPacsTestApi.Models.Database;
using BioPacsTestApi.Models.Requests;
using BioPacsTestApi.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BioPacsTestApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {        
        public ProjectController(DatabaseContext databaseContext)
        {
            this._databaseContext = databaseContext;
        }

        private readonly DatabaseContext _databaseContext;

        [HttpPost(Name = "Create")]
        [Authorize]
        public async Task<ResponseBase<CreateProjectResponse>> Post(CreateProjectRequest createProject)
        {
            //TODO: there is should be validation
            //TODO: there is should be try/catch

            var projectId = Guid.NewGuid();
            await this._databaseContext.Projects.AddAsync(new Project
            {
                Name = createProject.Name,
                Id = projectId
            });
            await this._databaseContext.SaveChangesAsync();

            return new ResponseBase<CreateProjectResponse> 
            {
                Ok = true,
                Result = new CreateProjectResponse 
                {
                    ProjectId = projectId 
                }
            };
        }

        [HttpGet(Name = "Get")]
        [Authorize]
        public async Task<ResponseBase<Project>> Get(Guid id)
        {
            //TODO: there is should be validation

            var project = await this._databaseContext.Projects.FirstOrDefaultAsync(x => x.Id == id);

            if (project == null)
                return new ResponseBase<Project>();

            return new ResponseBase<Project> 
            {
                Ok = true,
                Result = project 
            };
        }
    }
}
