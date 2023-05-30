using DrivingSchool.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchool.Data
{
    public class DrivingSchoolDbContext : DbContext, IDrivingSchoolDbContext
    {
        public DrivingSchoolDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Student> Students { get; set; }
    }
}
