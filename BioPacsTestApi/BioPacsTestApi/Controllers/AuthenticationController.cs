using BioPacsTestApi.Models;
using BioPacsTestApi.Models.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BioPacsTestApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        public AuthenticationController(DatabaseContext databaseContext)
        {
            this._databaseContext = databaseContext;
        }

        private readonly DatabaseContext _databaseContext;

        [HttpPost(Name = "Login")]
        public async Task<LoginResult> Post([Required] string login, [Required] string passwors)
        {            
            //TODO: SHA256
            var authenticated = await this._databaseContext.Users.AnyAsync(x=>x.Name==login && x.PasswordHash == passwors);
            if(authenticated)
        }
    }
}
