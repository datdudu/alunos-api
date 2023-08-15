using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsAPI.Models;
using StudentsAPI.Services;

namespace StudentsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StudentsController : ControllerBase
    {
        private IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudents() 
        {
            try
            {
                var students = await _studentService.GetStudents();
                return Ok(students);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error when trying to get students");
            }
        }

        [HttpGet("StudentsByName")]
        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudentsByName([FromQuery] string name)
        {
            try
            {
                var students = await _studentService.GetStudentsByName(name);

                if(students == null)
                {
                    return NotFound($"Students with name = {name} doesn't exist");
                }
                return Ok(students);
            }
            catch (Exception)
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpGet("{id:int}", Name = "GetStudent")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            try
            {
                var student = await _studentService.GetStudent(id);

                if (student == null)
                {
                    return NotFound($"Students with id = {id} doesn't exist");
                }
                return Ok(student);
            }
            catch (Exception)
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateStudent(Student student)
        {
            try
            {
                await _studentService.CreateStudent(student);
                return CreatedAtRoute(nameof(GetStudent), new {id = student.Id }, student);
            }
            catch (Exception)
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditStudent(int id, [FromBody] Student student)
        {
            try
            {
                if(student.Id == id)
                {
                    await _studentService.UpdateStudent(student);
                    return Ok($"Student with id = {id} was succesfully updated");
                }
                else
                {
                    return BadRequest("Inconsistent Data");
                }
            }
            catch (Exception)
            {
                return BadRequest("Invalid Request");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteStudent(int id)
        {
            try
            {
                var student = await _studentService.GetStudent(id);
                if(student != null)
                {
                    await _studentService.DeleteStudent(student);
                    return Ok($"Student with id = {id} was deleted!");
                }
                else
                {
                    return NotFound($"Student with id = {id} was not found");
                }
            }
            catch (Exception)
            {
                return BadRequest("Invalid Request");
            }
        }
    }
}
