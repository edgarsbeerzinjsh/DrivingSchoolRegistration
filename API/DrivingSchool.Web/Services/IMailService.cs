using DrivingSchool.Core.Models;

namespace DrivingSchool.Web.Services
{
    public interface IMailService
    {
        bool SendEmail(Student student);
    }
}
