using System.ComponentModel.DataAnnotations;

namespace StudentsAPI.Models
{
    public class Student
    {
        public int Id { get; set; }
        [Required]
        [StringLength(80)]
        public string  Name { get; set; }
        [Required]
        [EmailAddress]
        [StringLength(80)]
        public string  Email { get; set; }
        [Required]
        public int Age { get; set; }
    }
}
