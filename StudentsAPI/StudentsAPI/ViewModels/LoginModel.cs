using System.ComponentModel.DataAnnotations;

namespace StudentsAPI.ViewModels
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Esse email é obrigatório")]
        [EmailAddress(ErrorMessage = "Formato do email é inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória")]
        [StringLength(20, ErrorMessage = "A {0} deve ter no mínimo {1} caracteres.", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string Password { get; set; }    
    }
}
