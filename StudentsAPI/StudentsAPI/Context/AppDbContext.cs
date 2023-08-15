using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentsAPI.Models;

namespace StudentsAPI.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
        {
        }

        public DbSet<Student> Students { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Student>().HasData(
        //        new Student
        //        {
        //            Id = 1,
        //            Name = "Eduardo Carvalho",
        //            Email = "eduardo@email.com",
        //            Age = 23,
        //        },
        //        new Student
        //        {
        //            Id = 2,
        //            Name = "Carlos Cardoso",
        //            Email = "carlos@email.com",
        //            Age = 22,
        //        }
        //    );
        //}
    }
}
