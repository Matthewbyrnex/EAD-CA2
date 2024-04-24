using System.ComponentModel.DataAnnotations;

namespace EAD2.Models {
    public class Movies
    {
        public long Id { get; set; }

        public string? Title { get; set; }

        public long DirectorId { get; set; }

        public float Rating { get; set; }

        public DateTime Date { get; set; }
        
        public string? Summary { get; set; }

        public virtual Director Director { get; set; }  
    }

    public class Director
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public List<Movies>? Movies { get; set; }  // Navigation property
    public string? Bio { get; set; }
}
    }