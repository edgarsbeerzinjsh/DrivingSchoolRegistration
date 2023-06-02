using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
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

            var mailResult = _mailService.SendEmail(student);
            student.EmailSent = mailResult.IsMailSent;

            _dbService.Update(student);

            if (student.EmailSent)
            {
                return Created("", student);
            }

            return Problem(detail: mailResult.ErroMessage);
        }

        [HttpGet]
        [Route("{uniqueCode}")]
        public IActionResult InfoStudent(string uniqueCode)
        {
            var student = _dbService.GetByUniqueId(uniqueCode);
            if (student == null)
            {
                return NotFound(); 
            }

            return Ok(student);
        }

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _dbService.DeleteAll();

            return Ok("Database deleted");
        }
    }
}
