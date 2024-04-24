using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EAD2.Models;

namespace EAD2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MovieContext _context;

        public UsersController(MovieContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserWithMovies(long userId)
        {
            var user = await _context.Users
                .Include(u => u.LikedMovies)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        [HttpGet("{userId}/likedmovies")]
        public async Task<ActionResult<List<Movies>>> GetLikedMovies(long userId)
        {
            var user = await _context.Users
                .Include(u => u.LikedMovies)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound("User not found.");

            return Ok(user.LikedMovies);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User userDto)
        {
            var user = new User
            {
                Username = userDto.Username,
                Password = userDto.Password

            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User userDto)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Username == userDto.Username);

            if (user == null)
                return Unauthorized("User not found");

            // Optionally, return some user details (excluding sensitive data)
            return Ok(new { user.Id, user.Username });
        }

        [HttpPost("{userId}/like/{movieId}")]
        public async Task<IActionResult> LikeMovie(long userId, long movieId)
        {
            var user = await _context.Users
                .Include(u => u.LikedMovies)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return NotFound("User not found.");
            var movie = await _context.Movies.FindAsync(movieId);
            if (movie == null) return NotFound("Movie not found.");

            user.LikedMovies.Add(movie);
            await _context.SaveChangesAsync();
            return NoContent();
        }



        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
