using EAD2.Models;
using System.ComponentModel.DataAnnotations;

namespace EAD2.Models
{
    public class Movies
    {
        public long Id { get; set; }

        public string? Title { get; set; }

        public long DirectorId { get; set; }

        public string? Description { get; set; }

    }

    public class Director
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public List<Movies>? Movies { get; set; }  // Navigation property
    }


}