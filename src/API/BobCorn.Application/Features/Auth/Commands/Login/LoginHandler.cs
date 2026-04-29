using BobCorn.Domain.Interfaces;
using MediatR;

namespace BobCorn.Application.Features.Auth.Commands.Login
{
    public sealed class LoginHandler : IRequestHandler<LoginCommand, AuthResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;

        public LoginHandler(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<AuthResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email, cancellationToken)
                ?? throw new UnauthorizedAccessException("Invalid credentials.");

            if (!user.IsActive)
            {
                throw new UnauthorizedAccessException("Inactive account.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                throw new UnauthorizedAccessException("Invalid credentials.");
            }

            var accessToken = _tokenService.GenerateAccessToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            await _tokenService.SaveRefreshTokenAsync(user.Id, refreshToken, cancellationToken);

            return new AuthResponse(accessToken, refreshToken, user.FullName, user.Role);
        }
    }
}
