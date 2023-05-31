using DrivingSchool.Web.Model;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MimeKit;
using DrivingSchool.Web.Configuration;
using DrivingSchool.Core.Models;

namespace DrivingSchool.Web.Services
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public bool SendEmail(Student student)
        {
            var mailData = StudentMailCreator(student);

            try
            {
                var email = new MimeMessage();
                {
                    email.From.Add(new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail));
                    email.To.Add(new MailboxAddress(mailData.EmailToName, mailData.EmailToId));
                    email.Subject = mailData.EmailSubject;

                    var emailBodyBuilder = new BodyBuilder();
                    emailBodyBuilder.TextBody = mailData.EmailBody;
                    email.Body = emailBodyBuilder.ToMessageBody();

                    using SmtpClient mailClient = new();
                    mailClient.ServerCertificateValidationCallback = (s, c, h, e) => true;
                    mailClient.Connect(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.SslOnConnect);
                    mailClient.Authenticate(_mailSettings.SenderEmail, _mailSettings.Password);
                    mailClient.Send(email);
                    mailClient.Disconnect(true);
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private static MailData StudentMailCreator(Student student)
        {
            return new MailData()
            {
                EmailToId = student.Email,
                EmailToName = $"{student.FirstName} {student.LastName}",
                EmailSubject = "Application in Driving School",
                EmailBody = $"Your unique code: {student.UniqueId}"
            };
        }
    }
}
