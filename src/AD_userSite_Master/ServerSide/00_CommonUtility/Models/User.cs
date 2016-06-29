using System.ComponentModel.DataAnnotations;
using AD_userSite_Master.ServerSide._00_CommonUtility.CustomValidationAttribute;

namespace AD_userSite_Master.ServerSide._00_CommonUtility.Models
{
    public class User
    {
        //[Key]
        //[RequiredIf("DoubleUserIsOk", false)]
        //public string AccountName { get; set; }
        [Key]
        public string AccountName { get; set; }
        [Required]
        public string FirstName { get; set; }
        //public string LastNamePrefix { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }

        //[System.ComponentModel.DefaultValue(false)] C#5
        public bool DoubleUserIsOk { get; set; } = false;//C#6
        public bool ExternalUser { get; set; } = false;
    }
}
