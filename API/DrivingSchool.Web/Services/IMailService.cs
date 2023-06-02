using DrivingSchool.Core.Models;
using DrivingSchool.Web.Model;

namespace DrivingSchool.Web.Services
{
    public interface IMailService
    {
        MailResult SendEmail(Student student);
    }
}
