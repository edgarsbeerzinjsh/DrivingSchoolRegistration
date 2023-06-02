using DrivingSchool.Core.Exceptions;
using DrivingSchool.Core.Models;
using DrivingSchool.Data;
using DrivingSchool.Services;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchool.Tests
{
    public class DbServiceTests
    {
        private DrivingSchoolDbContext _context;
        private DbService _service;

        [SetUp]
        public void Setup()
        {
            TestDbSetup();
            _service = new DbService(_context);
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
        }

        [Test]
        public void CreateStudent_ValidInfo_StudentsInDatabaseOneMore()
        {
            var alreadyStudents = _context.Students.Count();

            _service.Create(defaultStudent);

            _context.Students.Count().Equals(alreadyStudents + 1);
        }

        [Test]
        public void CreateStudent_ValidInfo_SameStudentReturned()
        {
            var newStudent = _service.Create(defaultStudent);

            newStudent.Should().Be(defaultStudent);
        }

        [Test]
        public void GetByUniqueIdStudent_FindStudent_CorrectStudentReturned()
        {
            var newStudent = _service.Create(defaultStudent);

            var updatedStudent = _service.GetByUniqueId(newStudent.UniqueId);

            updatedStudent.Should().Be(newStudent);
        }

        [Test]
        public void GetByUniqueIdStudent_IncorrectIdProvided_ThrowsNoStudentWithThisCodeException()
        {
            var newStudent = _service.Create(defaultStudent);
            var codeInDb = newStudent.UniqueId;

            _service.GetByUniqueId(codeInDb).Should().Be(newStudent);

            Action act = () => _service.GetByUniqueId("randomCode");
            act.Should().Throw<NoStudentWithThisUniqueCodeException>();
        }

        [Test]
        public void UpdateStudent_ChangeFirstName_NewFirstNameReturned()
        {
            var newStudent = _service.Create(defaultStudent);

            newStudent.FirstName = "Kaspars";
            _service.Update(newStudent);
            var updatedStudent = _service.GetByUniqueId(newStudent.UniqueId);

            updatedStudent.FirstName.Should().Be("Kaspars");
        }

        [Test]
        public void DeleteStudent_RemoveStudent_OneLessStudentInDb()
        {
            var alreadyStudents = _context.Students.Count();
            var newStudent = _service.Create(defaultStudent);

            _service.Delete(newStudent);

            _context.Students.Count().Equals(alreadyStudents);
        }

        [Test]
        public void DeleteAllStudents_DeleteStudents_NoStudentsInDb()
        {
            var alreadyStudents = _context.Students.Count();

            _service.DeleteAll();

            alreadyStudents.Should().BeGreaterThan(0);
            _context.Students.Count().Equals(0);
        }

        private void TestDbSetup()
        {
            var options = new DbContextOptionsBuilder<DrivingSchoolDbContext>()
                .UseInMemoryDatabase("TestDb")
                .Options;

            _context = new DrivingSchoolDbContext(options);

            SeedDatabase();
        }

        private void SeedDatabase()
        {
            _context.Database.EnsureCreated();

            _context.Students.Add(new Student
            {
                Id = 1,
                FirstName = "Janis",
                LastName = "Kalnins",
                YearOfBirth = new DateTime(1990),
                Email = "JKaln@gma.com",
                MobilePhone = "111111",
                Address = "Rigas iela 6",
                City = "Jelgava",
                TrainingCategory = "A",
                IsTheory = true,
                IsPractical = false
            });

            _context.Students.Add(new Student
            {
                Id = 2,
                FirstName = "Andris",
                LastName = "Berzins",
                YearOfBirth = new DateTime(1970),
                Email = "Andris@gma.com",
                MobilePhone = "222222",
                Address = "Liela iela 2",
                City = "Riga",
                TrainingCategory = "B",
                IsTheory = true,
                IsPractical = false
            });

            _context.Students.Add(new Student
            {
                Id = 3,
                FirstName = "Liga",
                LastName = "Sommera",
                YearOfBirth = new DateTime(1980),
                Email = "Liga@gma.com",
                MobilePhone = "333333",
                Address = "Zemenu iela 4",
                City = "Riga",
                TrainingCategory = "B",
                IsTheory = false,
                IsPractical = true
            });

            _context.SaveChanges();
        }

        private Student defaultStudent = new Student
            {
                Id = 4,
                FirstName = "Juris",
                LastName = "Ozols",
                YearOfBirth = new DateTime(1999),
                Email = "Jurka@gma.com",
                MobilePhone = "44444",
                Address = "Rigas iela 4",
                City = "Talsi",
                TrainingCategory = "A",
                IsTheory = true,
                IsPractical = false
            };
    }
}