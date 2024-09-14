using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BioPacsTestApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : ControllerBase
    {        
        [HttpPost(Name = "Create")]
        [Authorize]
        public async Task Post()
        {

        }
    }
}
