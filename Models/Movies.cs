using EAD2.Models;
using System.ComponentModel.DataAnnotations;

namespace EAD2.Models
{
    public class Movies
    {
        public long Id { get; set; }

        public string? Title { get; set; }

        public long DirectorId { get; set; }

        public List<User> Users { get; set; } = new List<User>();
    }

    public class Director
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public List<Movies>? Movies { get; set; }  // Navigation property
    }



    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }  // Stored as a hash for security
        public List<Movies> LikedMovies { get; set; } = new List<Movies>();  // Navigation property for liked movies
    }
}