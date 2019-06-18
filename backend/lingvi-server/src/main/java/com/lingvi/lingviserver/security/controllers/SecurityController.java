package com.lingvi.lingviserver.security.controllers;

import com.lingvi.lingviserver.account.repositories.primary.UserRepository;
import com.lingvi.lingviserver.security.config.ControllerPaths;
import com.lingvi.lingviserver.security.entities.*;
import com.lingvi.lingviserver.account.entities.primary.User;
import com.lingvi.lingviserver.security.services.SecurityService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class SecurityController {

    private SecurityService securityService;
    private UserRepository userRepository;

    public SecurityController(SecurityService securityService, UserRepository userRepository) {
        this.securityService = securityService;
        this.userRepository = userRepository;
    }

    @PostMapping(ControllerPaths.LOGIN)
    public AuthResponse login(@RequestBody AuthRequest request) {
        return securityService.login(request);
    }

    @PostMapping(ControllerPaths.REGISTER)
    public AuthResponse register(@RequestBody AuthRequest request) {
        return securityService.register(request);
    }

    @PostMapping(ControllerPaths.SOCIAL_LOGIN)
    public AuthResponse socialLogin(@PathVariable String provider, @RequestBody OAuthRequest request) {
        return securityService.providerLogin(request.getCode(), request.getRedirectUri(), provider);
    }

    @PostMapping(ControllerPaths.SOCIAL_REGISTER)
    public AuthResponse socialRegister(@PathVariable String provider, @RequestBody OAuthRequest request) {
        return securityService.providerRegister(request.getCode(), request.getRedirectUri(), provider);
    }

    @PostMapping(ControllerPaths.SOCIAL_REGISTER_WITH_ACCESS_TOKEN)
    public AuthResponse socialRegisterWithAccessToken(@PathVariable String provider, @RequestBody OAuthRequestWithToken request) {
        return securityService.providerRegisterWithToken(request.getAccessToken(), provider);
    }

    @PostMapping(ControllerPaths.REFRESH_TOKEN)
    public AuthResponse refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return securityService.refreshToken(refreshTokenRequest.getRefreshToken());
    }

    @GetMapping(ControllerPaths.ME)
    public Object me() {
        return userRepository.findById(Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName()));
    }

}
