using DrivingSchool.Web.Model;

namespace DrivingSchool.Web.Services
{
    public interface IMailService
    {
        bool SendEmail(MailData mailData);
    }
}
