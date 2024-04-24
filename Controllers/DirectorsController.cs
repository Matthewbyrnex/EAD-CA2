﻿using System;
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
    public class DirectorsController : ControllerBase
    {
        private readonly MovieContext _context;

        public DirectorsController(MovieContext context)
        {
            _context = context;
        }

        // GET: api/Directors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Director>>> GetDirector()
        {
            return await _context.Director.ToListAsync();
        }

        // GET: api/Directors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Director>> GetDirector(long id)
        {
            var director = await _context.Director.FindAsync(id);

            if (director == null)
            {
                return NotFound();
            }

            return director;
        }

        // PUT: api/Directors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDirector(long id, Director director)
        {
            if (id != director.Id)
            {
                return BadRequest();
            }

            _context.Entry(director).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DirectorExists(id))
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

        // POST: api/Directors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Director>> PostDirector(Director director)
        {
            _context.Director.Add(director);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // Handle exceptions
                return StatusCode(500, ex.Message);
            }
            return CreatedAtAction("GetDirector", new { id = director.Id }, director);
        }



        // DELETE: api/Directors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDirector(long id)
        {
            var director = await _context.Director.FindAsync(id);
            if (director == null)
            {
                return NotFound();
            }

            _context.Director.Remove(director);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DirectorExists(long id)
        {
            return _context.Director.Any(e => e.Id == id);
        }
    }
}
