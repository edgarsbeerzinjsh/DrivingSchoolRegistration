﻿namespace DrivingSchool.Core.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime YearOfBirth { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string TrainingCategory { get; set; }
        public bool IsTheory { get; set; }
        public bool IsPractical { get; set; }
        public DateTime? ExamTime { get; set; }
        public DateTime RegistrationDate { get; set; } = DateTime.Today;
        public string UniqueId { get; set; } = Guid.NewGuid().ToString();
        public bool EmailSent { get; set; } = false;
    }
}