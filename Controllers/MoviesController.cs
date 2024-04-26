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
    public class MoviesController : ControllerBase
    {
        private readonly MovieContext _context;

        public MoviesController(MovieContext context)
        {
            _context = context;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movies>>> GetMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movies>> GetMovies(long id)
        {
            var movies = await _context.Movies.FindAsync(id);

            if (movies == null)
            {
                return NotFound();
            }

            return movies;
        }
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Movies>>> GetMoviesByTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return BadRequest("Title parameter is required.");
            }

            var movies = await _context.Movies
                .Where(m => m.Title != null && m.Title.Contains(title))
                .ToListAsync();

            if (movies == null || movies.Count == 0)
            {
                return NotFound("No movies found with the specified title.");
            }

            return Ok(movies);
        }

        [HttpGet("{id}/suggestions")]
        public async Task<IActionResult> GetMovieSuggestions(int id)
        {
            var director = await _context.Director
                .Include(d => d.Movies)
                .FirstOrDefaultAsync(d => d.Id == id);
            
            if (director == null)
                return NotFound();

            var suggestedMovies = director.Movies; 

            return Ok(suggestedMovies);
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovies(long id, Movies movies)
        {
            if (id != movies.Id)
            {
                return BadRequest();
            }

            _context.Entry(movies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MoviesExists(id))
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

        // POST: api/Movies
        [HttpPost]
        public async Task<ActionResult<Movies>> PostMovie(Movies movie)
        {
            if (movie == null)
            {
                return BadRequest("Movie data is required");
            }

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetMovie", new { id = movie.Id }, movie);
        }


        // DELETE: api/Movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovies(long id)
        {
            var movies = await _context.Movies.FindAsync(id);
            if (movies == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movies);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MoviesExists(long id)
        {
            return _context.Movies.Any(e => e.Id == id);
        }
    }
}
