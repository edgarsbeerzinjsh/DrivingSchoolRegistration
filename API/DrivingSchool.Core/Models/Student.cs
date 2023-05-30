namespace DrivingSchool.Core.Models
{
    public class Student
    {
        public string UniqueId { get; } = Guid.NewGuid().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly YearOfBirth { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public DateOnly RegistrationDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string TrainingCategory { get; set; }
        public bool IsTheory { get; set; } = false;
        public bool IsPractical { get; set; } = false;
        public DateTime? ExamTime { get; set; }
    }
}