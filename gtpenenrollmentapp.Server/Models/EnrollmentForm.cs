using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace gtpenenrollmentapp.Server.Models
{

    public class EnrollmentForm
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        // Personal Information
        [MaxLength(50)]
        public string FormRefno { get; set; }
        public int? SchemeId { get; set; }

        [MaxLength(20)]
        public string? Ssn { get; set; }

        [MaxLength(10)]
        public string? Title { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string Surname { get; set; }

        [MaxLength(1)]
        public string Gender { get; set; }

        [MaxLength(2)]
        public string MaritalStatusCode { get; set; }

        [MaxLength(50)]
        public string? PlaceOfBirth { get; set; }

        [MaxLength(15)]
        public string? MobilePhone { get; set; }

        [MaxLength(1)]
        public string? PermanentAddressLocation { get; set; }

        [MaxLength(5)]
        public string NationalityCode { get; set; }

        [MaxLength(5)]
        public string StateOfOrigin { get; set; }

        [MaxLength(3)]
        public string LgaCode { get; set; }

        [MaxLength(2)]
        public string PermCountry { get; set; }

        [MaxLength(2)]
        public string PermState { get; set; }

        [MaxLength(3)]
        public string PermLga { get; set; }

        [MaxLength(50)]
        public string PermCity { get; set; }

        [MaxLength(50)]
        public string? BankName { get; set; }

        [MaxLength(15)]
        public string? AccountNumber { get; set; }

        [MaxLength(50)]
        public string? AccountName { get; set; }

        [MaxLength(15)]
        public string? Bvn { get; set; }

        [MaxLength(50)]
        public string? Othernames { get; set; }

        [MaxLength(50)]
        public string? MaidenName { get; set; }

        [MaxLength(50)]
        public string? Email { get; set; }

        [MaxLength(40)]
        public string? PermanentAddress { get; set; }

        [MaxLength(20)]
        public string? PermBox { get; set; }

        [MaxLength(40)]
        public string? PermanentAddress1 { get; set; }

        [MaxLength(10)]
        public string? PermZip { get; set; }

        // Employment Details
        [MaxLength(2)]
        public string EmployerType { get; set; }

        [MaxLength(20)]
        public string EmployerRcno { get; set; }

        [MaxLength(1)]
        public string EmployerLocation { get; set; }

        [MaxLength(2)]
        public string EmployerCountry { get; set; }

        [MaxLength(2)]
        public string EmployerStateCode { get; set; }

        [MaxLength(3)]
        public string EmployerLga { get; set; }

        [MaxLength(50)]
        public string EmployerCity { get; set; }

        [MaxLength(50)]
        public string? EmployerBusiness { get; set; }

        [MaxLength(200)]
        public string? EmployerAddress1 { get; set; }

        [MaxLength(200)]
        public string? EmployerAddress { get; set; }

        [MaxLength(10)]
        public string? EmployerZip { get; set; }

        [MaxLength(20)]
        public string? EmployerBox { get; set; }

        [MaxLength(15)]
        public string? EmployerPhone { get; set; }

        // Next of Kin Information
        [MaxLength(10)]
        public string? NokTitle { get; set; }

        [MaxLength(50)]
        public string NokName { get; set; }

        [MaxLength(50)]
        public string NokSurname { get; set; }

        [MaxLength(1)]
        public string NokGender { get; set; }

        [MaxLength(10)]
        public string NokRelationship { get; set; }

        [MaxLength(1)]
        public string NokLocation { get; set; }

        [MaxLength(2)]
        public string NokCountry { get; set; }

        [MaxLength(2)]
        public string NokStatecode { get; set; }

        [MaxLength(3)]
        public string NokLga { get; set; }

        [MaxLength(40)]
        public string NokCity { get; set; }

        [MaxLength(50)]
        public string? NokOthername { get; set; }

        [MaxLength(200)]
        public string? NokAddress1 { get; set; }

        [MaxLength(200)]
        public string? NokAddress { get; set; }

        [MaxLength(10)]
        public string? NokZip { get; set; }

        [MaxLength(40)]
        public string? NokEmailaddress { get; set; }

        [MaxLength(20)]
        public string? NokBox { get; set; }

        [MaxLength(15)]
        public string? NokMobilePhone { get; set; }

        // Images
        public byte[]? PictureImage { get; set; }
        public byte[]? FormImage { get; set; }
        public byte[]? SignatureImage { get; set; }

        // Miscellaneous
        [MaxLength(10)]
        public string? StateOfPosting { get; set; }

        [MaxLength(15)]
        public string? AgentCode { get; set; }
        [NotMapped]
        public IFormFile? NationalIdCard { get; set; }
        public string? NationalIdCardPath { get; set; } // Added to store file path
        [NotMapped]
        public IFormFile? EmploymentLetter { get; set; }
        public string? EmploymentLetterPath { get; set; } // Added to store file path
        [NotMapped]
        public IFormFile? MeansOfId { get; set; }
        public string? MeansOfIdPath { get; set; } // Added to store file path

        //public string nationalIdImg { get; set; }
        [NotMapped]
        public IFormFile? FirstAppointmentLetter{ get; set; }
        public string? FirstAppointmentLetterPath { get; set; } // Added to store file path

        public string? Password { get; set; }
    }


}
