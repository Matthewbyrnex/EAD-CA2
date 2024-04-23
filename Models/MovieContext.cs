using Microsoft.EntityFrameworkCore;
using System.IO;


namespace EAD2.Models
{
    public class MovieContext : DbContext
    {

        public MovieContext(DbContextOptions<MovieContext> options) : base(options) 
        {

        }

        public DbSet<Movies> Movies { get; set; } = null!;
        public DbSet<Director> Director { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Director>()
                .HasMany(d => d.Movies)
                .WithOne(m => m.Director)
                .HasForeignKey(m => m.DirectorId);

            // Add this if you haven't already to explicitly set the table names (optional)
            modelBuilder.Entity<Movies>().ToTable("Movies");
            modelBuilder.Entity<Director>().ToTable("Directors");
        }




    }
}
