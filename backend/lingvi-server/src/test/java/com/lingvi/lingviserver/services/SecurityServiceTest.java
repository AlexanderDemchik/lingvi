package com.lingvi.lingviserver.services;

import com.lingvi.lingviserver.account.entities.primary.Account;
import com.lingvi.lingviserver.account.repositories.primary.AccountRepository;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.commons.exceptions.ErrorCodes;
import com.lingvi.lingviserver.security.config.SecurityProperties;
import com.lingvi.lingviserver.security.entities.*;
import com.lingvi.lingviserver.security.entities.primary.User;
import com.lingvi.lingviserver.security.repositories.inmemory.InMemoryBlackListRepository;
import com.lingvi.lingviserver.security.repositories.primary.BlackListTokenRepository;
import com.lingvi.lingviserver.security.repositories.primary.RefreshTokenRepository;
import com.lingvi.lingviserver.security.repositories.primary.UserRepository;
import com.lingvi.lingviserver.security.services.GoogleService;
import com.lingvi.lingviserver.security.services.SecurityService;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.Silent.class)
@SpringBootTest
public class SecurityServiceTest {

    private SecurityService securityService;

    @Mock
    UserRepository userRepositoryMock;

    @Mock
    AccountRepository accountRepositoryMock;

    @Mock
    SecurityProperties securityPropertiesMock;

    @Mock
    RefreshTokenRepository refreshTokenRepositoryMock;

    @Mock
    GoogleService googleServiceMock;

    @Mock
    InMemoryBlackListRepository inMemoryBlackListRepositoryMock;

    @Mock
    BlackListTokenRepository blackListTokenRepositoryMock;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(8);

    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Before
    public void before() {
        securityService = new SecurityService(securityPropertiesMock, userRepositoryMock, refreshTokenRepositoryMock, passwordEncoder, googleServiceMock, inMemoryBlackListRepositoryMock, blackListTokenRepositoryMock, accountRepositoryMock);
        when(userRepositoryMock.save(isA(User.class))).thenReturn(null);
        when(accountRepositoryMock.save(isA(Account.class))).thenReturn(null);
        when(securityPropertiesMock.getClaimsRoleField()).thenReturn("roles");
        when(securityPropertiesMock.getTokenLifeTime()).thenReturn(121222L);
        when(securityPropertiesMock.getRefreshTokenLifeTime()).thenReturn(121222L);
        when(securityPropertiesMock.getTokenSecret()).thenReturn("secret");
    }

    @Test
    public void shouldSuccessfullyRegister() {
        String email = "alexander@gmail.com";
        String password = "asdasdasd";
        when(userRepositoryMock.findByEmail(email)).thenReturn(null);
        AuthResponse authResponse = securityService.register(new AuthRequest(email, password));
        assertThat(authResponse, is(notNullValue()));
    }

    @Test
    public void shouldThrowErrorOnRegisterDataValidation() {

        boolean thrown = false;
        String email = "alex";
        String password = "asd";
        when(userRepositoryMock.findByEmail(email)).thenReturn(null);

        try {
            securityService.register(new AuthRequest(email, password));
        } catch (ApiError error) {
            if(error.getCode().equals(ErrorCodes.VALIDATION_EXCEPTION)) thrown = true;
        }

        assertTrue(thrown);
    }

    @Test
    public void shouldThrowErrorOnRegisterWhenUserIsExist() {
        boolean thrown = false;
        String email = "alexander@gmail.com";
        String password = "asdssss";
        when(userRepositoryMock.findByEmail(email)).thenReturn(new User());

        try {
            securityService.register(new AuthRequest(email, password));
        } catch (ApiError error) {
            if(error.getCode().equals(ErrorCodes.VALIDATION_EXCEPTION)) thrown = true;
        }

        assertTrue(thrown);
    }

    @Test
    public void shouldSuccessfullyLogin() {
        String email = "alexander@gmail.com";
        String password = "password";
        when(userRepositoryMock.findByEmail(email)).thenReturn(new User(email, passwordEncoder.encode(password), null));
        AuthResponse authResponse = securityService.login(new AuthRequest(email, password));
        assertThat(authResponse, is(notNullValue()));
    }

    @Test
    public void shouldThrowErrorOnLoginWhenIncorrectPassword() {
        boolean thrown = false;
        String email = "alexander@gmail.com";
        String password = "password";
        when(userRepositoryMock.findByEmail(email)).thenReturn(new User(email, passwordEncoder.encode("dd"), null));
        try {
            securityService.login(new AuthRequest(email, password));
        } catch (ApiError error) {
            thrown = true;
        }
        assertTrue(thrown);
    }

    @Test
    public void shouldSuccessfullyLoginWithProvider() {
        String code = "epomtbperionbe";
        String redirectUri = "ssss";
        String provider = Providers.GOOGLE;
        String accessToken = "token";
        String providerId = "id";

        when(googleServiceMock.getAccessToken(code, redirectUri)).thenReturn(new GoogleAccessTokenResponse(accessToken, "323"));
        when(googleServiceMock.loadUser(accessToken)).thenReturn(new ProviderUser(providerId, "ds"));
        when(userRepositoryMock.findByProviderAndUserProviderId(provider, providerId)).thenReturn(new User());

        AuthResponse authResponse = securityService.providerLogin(code, redirectUri, provider);
        assertThat(authResponse, is(notNullValue()));
    }

    @Test
    public void shouldSuccessfullyRegisterWithProvider() {
        String code = "epomtbperionbe";
        String redirectUri = "ssss";
        String provider = Providers.GOOGLE;
        String accessToken = "token";
        String providerId = "id";

        when(googleServiceMock.getAccessToken(code, redirectUri)).thenReturn(new GoogleAccessTokenResponse(accessToken, "323"));
        when(googleServiceMock.loadUser(accessToken)).thenReturn(new ProviderUser(providerId, "ds"));
        when(userRepositoryMock.findByProviderAndUserProviderId(provider, providerId)).thenReturn(null);

        AuthResponse authResponse = securityService.providerRegister(code, redirectUri, provider);
        assertThat(authResponse, is(notNullValue()));
    }

    @Test
    public void shouldSuccessfullyRegisterWithProviderToken() {
        String provider = Providers.GOOGLE;
        String accessToken = "token";
        String providerId = "id";

        when(googleServiceMock.loadUser(accessToken)).thenReturn(new ProviderUser(providerId, "ds"));
        when(userRepositoryMock.findByProviderAndUserProviderId(provider, providerId)).thenReturn(null);

        AuthResponse authResponse = securityService.providerRegisterWithToken(accessToken, provider);
        assertThat(authResponse, is(notNullValue()));
    }
}
