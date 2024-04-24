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
            modelBuilder.Entity<Movies>()
            .HasOne(m => m.Director)
            .WithMany(d => d.Movies)
            .HasForeignKey(m => m.DirectorId)
            .IsRequired(false);


            // Add this if you haven't already to explicitly set the table names (optional)
            modelBuilder.Entity<Movies>().ToTable("Movies");
            modelBuilder.Entity<Director>().ToTable("Directors");
        }




    }
}
