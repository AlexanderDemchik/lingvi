package com.lingvi.lingviserver.security.services;

import com.lingvi.lingviserver.account.entities.primary.Account;
import com.lingvi.lingviserver.account.repositories.primary.AccountRepository;
import com.lingvi.lingviserver.security.config.SecurityProperties;
import com.lingvi.lingviserver.commons.exceptions.*;
import com.lingvi.lingviserver.security.config.Constants;
import com.lingvi.lingviserver.security.entities.*;
import com.lingvi.lingviserver.security.entities.inmemory.InMemoryBlackListToken;
import com.lingvi.lingviserver.security.entities.primary.*;
import com.lingvi.lingviserver.security.repositories.inmemory.InMemoryBlackListRepository;
import com.lingvi.lingviserver.security.repositories.primary.BlackListTokenRepository;
import com.lingvi.lingviserver.security.repositories.primary.RefreshTokenRepository;
import com.lingvi.lingviserver.security.repositories.primary.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Contains methods to handle module business logic
 */
@Service
public class SecurityService {

    private Logger logger = LoggerFactory.getLogger(SecurityService.class);

    private SecurityProperties securityProperties;
    private UserRepository userRepository;
    private RefreshTokenRepository refreshTokenRepository;
    private PasswordEncoder passwordEncoder;
    private GoogleService googleService;
    private InMemoryBlackListRepository inMemoryBlackListRepository;
    private BlackListTokenRepository blackListTokenRepository;
    private AccountRepository accountRepository;

    @Autowired
    public SecurityService(SecurityProperties securityProperties, UserRepository userRepository, RefreshTokenRepository refreshTokenRepository, PasswordEncoder passwordEncoder, GoogleService googleService, InMemoryBlackListRepository inMemoryBlackListRepository, BlackListTokenRepository blackListTokenRepository, AccountRepository accountRepository) {
        this.securityProperties = securityProperties;
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.googleService = googleService;
        this.inMemoryBlackListRepository = inMemoryBlackListRepository;
        this.blackListTokenRepository = blackListTokenRepository;
        this.accountRepository = accountRepository;
    }

    /**
     * Generate jwt token
     *
     * @param id user id
     * @param expDate expiration date of token
     * @param roles user roles
     * @return jwt token string
     */
    private String generateToken(Object id, Long expDate, List<String> roles) {
        return Jwts.builder()
                .setSubject(String.valueOf(id))
                .claim(securityProperties.getClaimsRoleField(), roles)
                .setExpiration(new Date(expDate))
                .signWith(SignatureAlgorithm.HS512, securityProperties.getTokenSecret())
                .compact();
    }

    /**
     * Check user credentials, and if they are valid, return {@link AuthResponse} object with token and refresh token.
     *
     * @param loginRequest http request representation
     * @return {@link AuthResponse}
     * @throws ApiError if credentials is not valid
     */
    public AuthResponse login(AuthRequest loginRequest) {
        User user;
        if((user = userRepository.findByEmail(loginRequest.getEmail())) != null) {
            if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                if(user.isLocked()) throw new ApiError("User is locked", HttpStatus.BAD_REQUEST);
                return createAuthResponse(user);
            }
        }
        throw new ApiError("Login error", ErrorCodes.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    /**
     * Validate register data, and if it is valid, save new user to database and return {@link AuthResponse} object with token and refresh token.
     *
     * @param registerRequest http request representation
     * @return {@link AuthResponse}
     */
    @SuppressWarnings("ArraysAsListWithZeroOrOneArgument")
    @Transactional
    public AuthResponse register(AuthRequest registerRequest) {
        String email = registerRequest.getEmail();
        String password = registerRequest.getPassword();

        if(email == null) throw new ApiError("Email can not be null", HttpStatus.BAD_REQUEST);
        if(password == null) throw new ApiError("Password can not be null", HttpStatus.BAD_REQUEST);

        email = email.trim().toLowerCase();
        password = password.trim();

        validateRegisterData(email, password);

        User user = new User(email, passwordEncoder.encode(password), new ArrayList<>(Arrays.asList(Role.USER)));
        userRepository.save(user);
        accountRepository.save(new Account(user, email));

        return createAuthResponse(user);
    }

    /**
     * Validate user email and password before registration
     *
     * @param email user email
     * @param password user password
     * @throws ApiError if data is not valid
     * @see ValidationError
     */
    private void validateRegisterData(String email, String password) {

        List<ApiSubError> errors = new LinkedList<>();

        if(!email.equals("")) {
            if(userRepository.findByEmail(email) != null) {
                errors.add(new ValidationError("email", "User with this email already exist"));
            }

            String emailRegex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])";
            if (!email.matches(emailRegex)) {
                errors.add(new ValidationError("email", "Incorrect email format"));
            }
        } else {
            errors.add(new ValidationError("email", "Email can no be empty"));
        }

        if(!password.equals("")) {
            if (password.length() < 4) errors.add(new ValidationError("password", "Password length must be more than 3"));
            if (password.length() >= 100) errors.add(new ValidationError("password", "Passwords length must be less than 100"));
            if (!password.matches("^[a-zA-Z0-9_-]*"))
                errors.add(new ValidationError("password", "Incorrect password format"));
        } else {
            errors.add(new ValidationError("password", "Password can not be empty"));
        }

        if(errors.size() != 0) throw new ApiError("Validation exception", ErrorCodes.VALIDATION_EXCEPTION, HttpStatus.BAD_REQUEST, errors);
    }

    /**
     * @param code authorization code flow
     * @param redirectUri redirect uri which user use to get code
     * @param provider provider name, {@link Providers}
     * @return {@link AuthResponse}
     * @throws ApiError if user with this provider not exist
     * @see ProviderLoginError
     */
    public AuthResponse providerLogin(String code, String redirectUri, String provider) {

        BaseProviderService providerService = selectProviderService(provider);

        BaseAccessTokenResponse tokenResponse = providerService.getAccessToken(code, redirectUri);
        ProviderUser providerUser = providerService.loadUser(tokenResponse.getAccessToken());

        User user = userRepository.findByProviderAndUserProviderId(provider, providerUser.getId());
        if(user == null) {
            throw new ApiError("Login exception", ErrorCodes.PROVIDER_LOGIN_EXCEPTION, HttpStatus.BAD_REQUEST,
                    Collections.singletonList(new ProviderLoginError(ErrorCodes.USER_NOT_FOUND, tokenResponse.getAccessToken(), tokenResponse.getExpireIn(), provider)));
        }

        if(user.isLocked()) {
            throw new ApiError("Account is locked", HttpStatus.BAD_REQUEST);
        }

        return createAuthResponse(user);
    }

    /**
     * @param code authorization flow code
     * @param redirectUri redirect uri which user use to get code
     * @param provider provider name
     * @return {@link AuthResponse}
     */
    @SuppressWarnings("ArraysAsListWithZeroOrOneArgument")
    @Transactional
    public AuthResponse providerRegister(String code, String redirectUri, String provider) {

        BaseProviderService providerService = selectProviderService(provider);

        String token = providerService.getAccessToken(code, redirectUri).getAccessToken();
        ProviderUser providerUser = providerService.loadUser(token);

        User user;
        if((user = userRepository.findByProviderAndUserProviderId(provider, providerUser.getId())) == null) {
            user = new User();
            user.setRoles(new ArrayList<>(Arrays.asList(Role.USER)));
            List<UserProvider> providerList = new ArrayList<>();
            providerList.add(new UserProvider(new UserProviderPK(Providers.GOOGLE, providerUser.getId()), user));
            user.setUserProviders(providerList);

            if(providerUser.getEmail() != null && userRepository.findByEmail(providerUser.getEmail()) == null) {
                user.setEmail(providerUser.getEmail());
            }

            userRepository.save(user);
            accountRepository.save(new Account(user, providerUser.getGivenName(), providerUser.getFamilyName(), user.getEmail(), providerUser.getProfilePhoto(), providerUser.getGender()));
        }

        return createAuthResponse(user);

    }

    /**
     * Method to refresh users token
     *
     * @param token user refresh token
     * @return {@link AuthResponse}
     */
    public AuthResponse refreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token);
        if(refreshToken != null) {

            if(refreshToken.getUser() != null && refreshToken.getUser().isLocked()) throw new ApiError("User is locked", HttpStatus.BAD_REQUEST);

            if((System.currentTimeMillis() - refreshToken.getCreationDate().getTime()) > securityProperties.getRefreshTokenLifeTime()) {
                throw new ApiError("Refresh token is expired", HttpStatus.BAD_REQUEST);
            }

            if(refreshToken.getStatus().equals(RefreshToken.Status.ACTIVE)) {
                AuthResponse authResponse = createAuthResponse(refreshToken.getUser());
                refreshToken.setExchangeDate(new Date());
                refreshToken.setExchangedToToken(authResponse.getRefreshToken());
                refreshToken.setStatus(RefreshToken.Status.DISABLED);
                refreshTokenRepository.save(refreshToken);
                return authResponse;
            } else if((new Date().getTime() - refreshToken.getExchangeDate().getTime()) < Constants.ALLOWED_REFRESH_TOKEN_REJECTION_TIME) {
                return createAuthResponseWithRefreshToken(refreshToken.getUser(), refreshToken.getExchangedToToken());
            } else {
                refreshToken.getUser().getRefreshTokens().clear();
            }
        }

        throw new ApiError("Incorrect refresh token", HttpStatus.BAD_REQUEST);
    }

    /**
     * Helper method to construct {@link AuthResponse} object
     *
     * @param user user
     * @return {@link AuthResponse}
     */
    private AuthResponse createAuthResponse(User user) {
        Long expireIn = new Date().getTime() + securityProperties.getTokenLifeTime();
        System.out.println(user.getId() + " " +user.getRoles());
        String token = generateToken(user.getId(), expireIn, user.getRoles() != null ? user.getRoles().stream().map(Role::toString).collect(Collectors.toList()) : null);
        String refreshToken = UUID.randomUUID().toString();

        user.getAccessTokens().add(new AccessToken(token, new Date(), user));
        user.getRefreshTokens().add(new RefreshToken(refreshToken, new Date(), user));
        userRepository.save(user);

        return new AuthResponse(expireIn, token, refreshToken);
    }

    /**
     * Helper method to construct {@link AuthResponse} object, when we have refresh token
     *
     * @param user user
     * @param refreshToken refresh token
     * @return {@link AuthResponse}
     */
    private AuthResponse createAuthResponseWithRefreshToken(User user, String refreshToken) {
        Long expireIn = new Date().getTime() + securityProperties.getTokenLifeTime();
        String token = generateToken(user.getId(), expireIn, user.getRoles() != null ? user.getRoles().stream().map(Role::toString).collect(Collectors.toList()) : null);

        user.getAccessTokens().add(new AccessToken(token, new Date(), user));
        userRepository.save(user);

        return new AuthResponse(expireIn, token, refreshToken);
    }

    /**
     * Helper method to select necessary provider service
     *
     * @param provider provider name
     * @return implementation of {@link BaseProviderService}
     * @throws ApiError if provider not found
     */
    private BaseProviderService selectProviderService(String provider) {
        switch (provider) {
            case Providers.GOOGLE: return googleService;
            default: throw new ApiError("Unsupported provider " + provider, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Used to populate in memory blacklist with data from disk database after application start
     */
    @EventListener(ApplicationReadyEvent.class)
    public void initInMemoryBlackList() {
        logger.info("Init in-memory blacklist");
        blackListTokenRepository.findAllByType(BlackListToken.Type.ACCESS).forEach(
                (t) -> inMemoryBlackListRepository.save(new InMemoryBlackListToken(t.getToken(), t.getAddingDate()))
        );
    }
}
