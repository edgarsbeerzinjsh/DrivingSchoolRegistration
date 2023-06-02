namespace DrivingSchool.Core.Exceptions
{
    public class NoStudentWithThisUniqueCodeException : Exception
    {
        public NoStudentWithThisUniqueCodeException() : base("Provided unique code does not match any student.")
        {
        }
    }
}
