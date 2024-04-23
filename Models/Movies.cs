using System.ComponentModel.DataAnnotations;

namespace EAD2.Models
{
    public class Movies
    {
        public long Id { get; set; }
        
        [Required]
        public Director Director { get; set; }
        [Required]
        [StringLength(255)]
        public string Title { get; set; }
        [Range(0, 10)]
        public float Rating { get; set; }
        [DataType(DataType.Date)]
        public string Date { get; set; }

        public long DirectorId { get; set; }

        [StringLength(1000)]
        public string? Summary { get; set; }
    }

    public class Director
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<Movies> Movies { get; set; }
        public string? Bio { get; set; }
    }
}


