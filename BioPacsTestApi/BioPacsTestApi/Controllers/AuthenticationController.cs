using BioPacsTestApi.Models.Database;
using BioPacsTestApi.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BioPacsTestApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        public AuthenticationController(DatabaseContext databaseContext, IConfiguration configuration)
        {
            this._databaseContext = databaseContext;
            this._configuration = configuration;
        }

        private readonly DatabaseContext _databaseContext;
        private readonly IConfiguration _configuration;

        [HttpPost(Name = "Login")]
        public async Task<ResponseBase<LoginResult>> Post([Required] string login, [Required] string password)
        {
            using var hash = SHA256.Create();
            var byteArray = hash.ComputeHash(Encoding.UTF8.GetBytes(password));
            var passwordHash = Convert.ToHexString(byteArray);

            var authenticated = await this._databaseContext.Users.AnyAsync(x => x.Name == login && x.PasswordHash == passwordHash);

            if(authenticated)
            {
                var token = this.GenerateToken(login);
                return new ResponseBase<LoginResult>
                {
                    Ok = true,
                    Result = new LoginResult
                    {
                        AccessToken = new JwtSecurityTokenHandler().WriteToken(token)
                    }
                };
            }

            return new ResponseBase<LoginResult>();
        }

        [Authorize]
        [HttpGet(Name = "Get")]
        public async Task<bool> Get()
        {
            return true;
        }

        private JwtSecurityToken GenerateToken(string userName)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userName)
            };

            var issuer = this._configuration["JwtSettings:Issuer"];
            var audience = this._configuration["JwtSettings:Audience"];
            var secretKey = this._configuration["JwtSettings:SecretKey"];

            if (string.IsNullOrEmpty(secretKey))
                throw new Exception("Authorization failure");

            // Create a JWT
            var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1), // Refresh Token is not implemented!
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                SecurityAlgorithms.HmacSha256)
            );

            return token;
        }
    }
}
