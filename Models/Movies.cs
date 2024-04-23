namespace EAD2.Models
{
    public class Movies
    {
        public long Id { get; set; }
        public Director Director { get; set; }
        public string Title { get; set; }
        public float Rating { get; set; }
        public string Date { get; set; }
        public int DirectorId { get; set; }
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


