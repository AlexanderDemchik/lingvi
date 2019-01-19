package com.lingvi.lingviserver.security.services;

import com.lingvi.lingviserver.commons.config.SecurityProperties;
import com.lingvi.lingviserver.security.config.Constants;
import com.lingvi.lingviserver.security.entities.primary.BlackListToken;
import com.lingvi.lingviserver.security.entities.primary.RefreshToken;
import com.lingvi.lingviserver.security.repositories.primary.AccessTokenRepository;
import com.lingvi.lingviserver.security.repositories.primary.BlackListTokenRepository;
import com.lingvi.lingviserver.security.repositories.primary.RefreshTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CleanerService {

    private Logger logger = LoggerFactory.getLogger(CleanerService.class);
    private AccessTokenRepository accessTokenRepository;
    private RefreshTokenRepository refreshTokenRepository;
    private BlackListTokenRepository blackListTokenRepository;
    private SecurityProperties securityProperties;

    @Autowired
    public CleanerService(AccessTokenRepository accessTokenRepository, RefreshTokenRepository refreshTokenRepository, BlackListTokenRepository blackListTokenRepository, SecurityProperties securityProperties) {
        this.accessTokenRepository = accessTokenRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.blackListTokenRepository = blackListTokenRepository;
        this.securityProperties = securityProperties;
    }

    @Scheduled(initialDelay = 1000, fixedDelayString = "#{${security.token-lifetime} * 3}")
    public void cleanAccessTokens() {
        logger.info("Clean access tokens");
        accessTokenRepository.removeAllByCreationDateBefore(new Date(System.currentTimeMillis() - securityProperties.getTokenLifeTime()));
    }

    @Scheduled(initialDelay = 5000, fixedDelayString = "#{${security.refresh-token-lifetime} / 2}")
    public void cleanRefreshTokens() {
        logger.info("Clean refresh tokens");
        refreshTokenRepository.removeAllByCreationDateBefore(new Date(System.currentTimeMillis() - securityProperties.getRefreshTokenLifeTime()));
        refreshTokenRepository.removeAllByStatusAndCreationDateBefore(RefreshToken.Status.DISABLED, new Date(System.currentTimeMillis() - Constants.ALLOWED_REFRESH_TOKEN_REJECTION_TIME));
    }

    @Scheduled(initialDelay = 10000, fixedDelayString = "#{${security.refresh-token-lifetime} / 2}")
    public void cleanBlackList() {
        logger.info("Clean blacklist");
        blackListTokenRepository.removeAllByTypeAndAddingDateBefore(BlackListToken.Type.ACCESS, new Date(System.currentTimeMillis() - securityProperties.getTokenLifeTime()));
        blackListTokenRepository.removeAllByTypeAndAddingDateBefore(BlackListToken.Type.REFRESH, new Date(System.currentTimeMillis() - Constants.ALLOWED_REFRESH_TOKEN_REJECTION_TIME));
    }

}
