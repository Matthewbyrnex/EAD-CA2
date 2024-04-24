using Microsoft.EntityFrameworkCore;
using System.Configuration;
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

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movies>(entity =>
            {
                entity.HasKey(e => e.Id); // Primary key
                entity.Property(e => e.Title).IsRequired(false); // Optional Title
                entity.Property(e => e.DirectorId); // Foreign Key

                // Establishing the relationship to Director
                entity.HasOne<Director>() // Movies has one Director
                    .WithMany(d => d.Movies) // Director has many Movies
                    .HasForeignKey(m => m.DirectorId) // Foreign key on Movies
                    .OnDelete(DeleteBehavior.Cascade); // Configure the delete behavior
            });

            // Configuring the Director entity
            modelBuilder.Entity<Director>(entity =>
            {
                entity.HasKey(e => e.Id); // Primary key
                entity.Property(e => e.Name).IsRequired(false); // Optional Name

                // Navigation property is configured via the Movies entity
            });



            // Add this if you haven't already to explicitly set the table names (optional)
            modelBuilder.Entity<Movies>().ToTable("Movies");
            modelBuilder.Entity<Director>().ToTable("Directors");
        }




    }
}
