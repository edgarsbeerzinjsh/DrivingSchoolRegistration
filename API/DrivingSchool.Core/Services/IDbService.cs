using DrivingSchool.Core.Models;

namespace DrivingSchool.Core.Services
{
    public interface IDbService
    {
        Student Create(Student student);
        Student GetByUniqueId(string uniqueId);
        void Update (Student student);
        void Delete(Student student);
        void DeleteAll();
    }
}
