package com.lingvi.lingviserver.security.controllers;

import com.lingvi.lingviserver.security.config.ControllerPaths;
import com.lingvi.lingviserver.security.entities.AuthRequest;
import com.lingvi.lingviserver.security.entities.AuthResponse;
import com.lingvi.lingviserver.security.entities.OAuthRequest;
import com.lingvi.lingviserver.security.entities.RefreshTokenRequest;
import com.lingvi.lingviserver.security.services.SecurityService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {

    private SecurityService securityService;

    public SecurityController(SecurityService securityService) {
        this.securityService = securityService;
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

    @PostMapping(ControllerPaths.REFRESH_TOKEN)
    public AuthResponse refresh(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return securityService.refreshToken(refreshTokenRequest.getRefreshToken());
    }

}
