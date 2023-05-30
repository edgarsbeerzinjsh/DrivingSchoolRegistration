using DrivingSchool.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchool.Data
{
    public interface IDrivingSchoolDbContext
    {
        DbSet<Student> Students { get; set; }
        int SaveChanges();
    }
}