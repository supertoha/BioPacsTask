using BioPacsTestApi.Models.Database;
using BioPacsTestApi.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BioPacsTestApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : ControllerBase
    {
        public ProjectsController(DatabaseContext databaseContext)
        {
            this._databaseContext = databaseContext;
        }

        private readonly DatabaseContext _databaseContext;

        [HttpGet(Name = "GetAll")]
        [Authorize]
        public async Task<ResponseBase<IEnumerable<Project>>> GetAll()
        {
            //TODO: there is should be validation

            var projects = await this._databaseContext.Projects.ToArrayAsync();

            return new ResponseBase<IEnumerable<Project>>
            {
                Ok = true,
                Result = projects
            };
        }
    }
}
