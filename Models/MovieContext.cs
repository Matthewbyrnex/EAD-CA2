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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movies>(entity =>
            {
                entity.HasKey(e => e.Id); 
                entity.Property(e => e.Title).IsRequired(false); 
                entity.Property(e => e.DirectorId); 

                entity.HasOne<Director>() 
                    .WithMany(d => d.Movies) 
                    .HasForeignKey(m => m.DirectorId) 
                    .OnDelete(DeleteBehavior.Cascade); 
            });

            modelBuilder.Entity<Director>(entity =>
            {
                entity.HasKey(e => e.Id); 
                entity.Property(e => e.Name).IsRequired(false); 

            });

            

            modelBuilder.Entity<Movies>().ToTable("Movies");
            modelBuilder.Entity<Director>().ToTable("Directors");
        }




    }
}
