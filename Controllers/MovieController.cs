using EAD2.Models;
using Microsoft.AspNetCore.Mvc;

namespace EAD2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<MovieController> _logger;

        public MovieController(ILogger<MovieController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetMovies")]
        public IEnumerable<Movies> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Movies
            {
             
            })
            .ToArray();
        }
    }
}
