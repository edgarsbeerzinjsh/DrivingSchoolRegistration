using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using DrivingSchool.Data;

namespace DrivingSchool.Services
{
    public class DbService : IDbService
    {
        protected readonly IDrivingSchoolDbContext _context;
        public DbService(IDrivingSchoolDbContext context)
        {
            _context = context;
        }

        public Student Create(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();

            return student;
        }

        public void Update(Student student)
        {
            _context.Students.Update(student);
            _context.SaveChanges();
        }

        public void Delete(Student student)
        {
            _context.Students.Remove(student);
            _context.SaveChanges();
        }

        public void DeleteAll()
        {
            _context.Students.RemoveRange(_context.Students);
            _context.SaveChanges();
        }

        public Student GetByUniqueId(string uniqueId)
        {
            return _context.Students.SingleOrDefault(s => s.UniqueId == uniqueId);
        }
    }
}