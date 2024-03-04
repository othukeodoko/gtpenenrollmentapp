using gtpenenrollmentapp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace gtpenenrollmentapp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        //// GET: api/<EnrollmentController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<EnrollmentController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<EnrollmentController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<EnrollmentController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<EnrollmentController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}


        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;
        //private readonly IEmailSender? _emailSender;
        public EnrollmentController(AppDbContext context, IWebHostEnvironment hostingEnvironment)//, IEmailSender emailSender
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment ?? throw new ArgumentNullException(nameof(hostingEnvironment));
            //_emailSender = emailSender;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EnrollmentForm>>> GetForms()
        {
            return await _context.EnrollmentForms.ToListAsync();
        }

        [HttpGet("downloads/{fileName}")]
        public IActionResult DownloadFile(string fileName)
        {
            var filePath = Path.Combine("uploads", fileName);

            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);

                // Set appropriate headers for file download
                Response.Headers.Add("Content-Disposition", $"attachment; filename={fileName}");
                Response.Headers.Add("Content-Type", "application/octet-stream");

                return File(fileBytes, "application/octet-stream", fileName);
            }
            else
            {
                return NotFound(); // Return a 404 if the file is not found
            }
        }


        [HttpPost]
        public async Task<ActionResult<EnrollmentForm>> PostForm([FromForm] EnrollmentForm formData)
        {
            var subject = "Registration Successful";
            var message = "Thank you for Registering with us";

            // Specify the local folder path where you want to store the files
            var localFolderPath = Path.Combine(Environment.CurrentDirectory, "uploads");

            // Ensure the folder exists, create it if necessary
            if (!Directory.Exists(localFolderPath))
            {
                Directory.CreateDirectory(localFolderPath);
            }

            // Handle NationalIdCard
            if (formData.NationalIdCard != null)
            {
                var uniqueFileName = formData.FormRefno + "_NationalIdCard_" + Path.GetFileName(formData.NationalIdCard.FileName);
                var filePath = Path.Combine(localFolderPath, uniqueFileName);
                formData.NationalIdCardPath = filePath;

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await formData.NationalIdCard.CopyToAsync(stream);
                }
            }

            // Handle EmploymentLetter
            if (formData.EmploymentLetter != null)
            {
                var uniqueFileName = formData.FormRefno + "_EmploymentLetter_" + Path.GetFileName(formData.EmploymentLetter.FileName);
                var filePath = Path.Combine(localFolderPath, uniqueFileName);
                formData.EmploymentLetterPath = filePath;

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await formData.EmploymentLetter.CopyToAsync(stream);
                }
            }

            // Handle MeansOfId
            if (formData.MeansOfId != null)
            {
                var uniqueFileName = formData.FormRefno + "_MeansOfId_" + Path.GetFileName(formData.MeansOfId.FileName);
                var filePath = Path.Combine(localFolderPath, uniqueFileName);
                formData.MeansOfIdPath = filePath;

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await formData.MeansOfId.CopyToAsync(stream);
                }
            }

            // Handle FirstAppointmentLetter
            if (formData.FirstAppointmentLetter != null)
            {
                var uniqueFileName = formData.FormRefno + "_FirstAppointmentLetter_" + Path.GetFileName(formData.FirstAppointmentLetter.FileName);
                var filePath = Path.Combine(localFolderPath, uniqueFileName);
                formData.FirstAppointmentLetterPath = filePath;

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await formData.FirstAppointmentLetter.CopyToAsync(stream);
                }
            }
            //// Handle PictureImage
            //if (formData.PictureImage != null)
            //{
            //    using (var memoryStream = new MemoryStream())
            //    {
            //        await formData.PictureImage.CopyToAsync(memoryStream);
            //        formData.PictureImage = memoryStream.ToArray();
            //    }
            //}

            //// Handle FormImage
            //if (formData.FormImage != null)
            //{
            //    using (var memoryStream = new MemoryStream())
            //    {
            //        await formData.FormImage.CopyToAsync(memoryStream);
            //        formData.FormImage = memoryStream.ToArray();
            //    }
            //}

            //// Handle SignatureImage
            //if (formData.SignatureImage != null)
            //{
            //    using (var memoryStream = new MemoryStream())
            //    {
            //        await formData.SignatureImage.CopyToAsync(memoryStream);
            //        formData.SignatureImage = memoryStream.ToArray();
            //    }
            //}

            //// Map to the EnrollmentForm model
            //var enrollmentForm = new EnrollmentForm
            //{
            //    FormRefno = formData.FormRefno,
            //    SchemeId = formData.SchemeId,
            //    // Map other properties

            //    PictureImage = formData.PictureImage,
            //    FormImage = formData.FormImage,
            //    SignatureImage = formData.SignatureImage,

            //    // Map other properties
            //};

            //_context.EnrollmentForms.Add(enrollmentForm);
            //await _context.SaveChangesAsync();

            _context.EnrollmentForms.Add(formData);
            await _context.SaveChangesAsync();
            // await _emailSender.SendEmailAsync(formData.Email, subject, message);

            return CreatedAtAction(nameof(GetForms), new { id = formData.FormRefno }, formData);
        }

        [HttpGet("generateFormRefNo")]
        public ActionResult<string> GenerateFormRefNo()
        {
            try
            {
                string year = DateTime.Now.Year.ToString("D2");
                string month = DateTime.Now.Month.ToString("D2");
                string day = DateTime.Now.Day.ToString("D2");
                string seconds = DateTime.Now.Second.ToString("D2");
                string milliseconds = DateTime.Now.Millisecond.ToString("D3");

                string formRefNo = $"40CR{year}{month}{day}{seconds}{milliseconds}";

                return Ok(new { formRefNo });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
