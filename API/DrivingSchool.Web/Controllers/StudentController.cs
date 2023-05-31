using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using DrivingSchool.Web.Model;
using DrivingSchool.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace DrivingSchool.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IDbService _dbService;
        private readonly IMailService _mailService;

        public StudentController(IDbService dbService, IMailService mailService)
        {
            _dbService = dbService;
            _mailService = mailService;
        }

        [HttpPut]
        public IActionResult AddStudent(Student student)
        {
            _dbService.Create(student);

            return Created("", student);
        }

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _dbService.DeleteAll();

            return Ok("Database deleted");
        }

        [HttpPost]
        [Route("SendMail")]
        public bool SendMail(MailData mailData)
        {
            return _mailService.SendEmail(mailData);
        }
        /*
        [HttpPost]
        public async Task<IActionResult> Send([FromForm] MailData request)
        {
            try
            {
                await _mailService.SendEmailAsync(request);
                return Ok("Mail sent");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        */
    }
}
