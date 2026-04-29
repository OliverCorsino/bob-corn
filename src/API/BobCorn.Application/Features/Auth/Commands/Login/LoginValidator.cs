using FluentValidation;

namespace BobCorn.Application.Features.Auth.Commands.Login
{
    public sealed class LoginValidator : AbstractValidator<LoginCommand>
    {
        public LoginValidator()
        {
            RuleFor(user => user.Email)
                .NotEmpty()
                .EmailAddress()
                .WithMessage("A valid email must be provided.");

            RuleFor(user => user.Password)
                .NotEmpty()
                .MinimumLength(8)
                .WithMessage("Password must be at least 8 characters long.");
        }
    }
}
