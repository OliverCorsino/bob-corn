using MediatR;

namespace BobCorn.Application.Features.Auth.Commands.Login
{
    public record LoginCommand(string Email, string Password) : IRequest<AuthResponse>;

    public record AuthResponse(string AccessToken, string RefreskToken, string FullName, string Role);
}
