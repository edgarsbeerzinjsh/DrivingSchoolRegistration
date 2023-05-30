using DrivingSchool.Core.Models;
using DrivingSchool.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace DrivingSchool.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IDbService _dbService;
        public StudentController(IDbService dbService)
        {
            _dbService = dbService;
        }

        [HttpPut]
        public IActionResult AddStudent(Student student)
        {
            _dbService.Create(student);

            return Created("", student);
        }
    }
}
