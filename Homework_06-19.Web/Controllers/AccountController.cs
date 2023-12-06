using Homework_06_19.Data;
using Homework_06_19.Web.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Homework_06_19.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _connectionString;

        public AccountController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getcurrentuser")]
        public User GetCurrent()
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.GetUserByEmail(User.Identity.Name);
            if (user == null)
            {
                return null;
            }

            return user;
        }

        [HttpGet]
        [Route("getuser")]
        public User GetUserById(int id)
        {
            var repo = new UserRepository(_connectionString);
            return repo.GetById(id);
        }

        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel login)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.Login(login.Email, login.Password);

            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim("user", login.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            return user;
        }

        [HttpPost]
        [Route("signup")]
        public void Signup(SignupViewModel user)
        {
            var repo = new UserRepository(_connectionString);
            repo.NewUser(user, user.password);
        }

        [Route("logout")]
        [HttpPost]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }
    }
}
