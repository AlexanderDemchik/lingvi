package com.lingvi.lingviserver.security.config;

import com.lingvi.lingviserver.security.filters.AuthorizationFilter;
import com.lingvi.lingviserver.security.repositories.inmemory.InMemoryBlackListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Spring Security configuration
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
    @Autowired
    private SecurityProperties securityProperties;

    @SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
    @Autowired
    private InMemoryBlackListRepository blackListRepository;

    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin().disable()
                .httpBasic().disable();
        http.authorizeRequests().antMatchers(ControllerPaths.LOGIN,
                ControllerPaths.REGISTER, ControllerPaths.SOCIAL_LOGIN,
                ControllerPaths.SOCIAL_REGISTER, ControllerPaths.REFRESH_TOKEN,
                Constants.H2_DB_PATH, ControllerPaths.SOCIAL_REGISTER_WITH_ACCESS_TOKEN).permitAll();
        http.authorizeRequests().anyRequest().permitAll();
        http.addFilterAfter(new AuthorizationFilter(blackListRepository, securityProperties), BasicAuthenticationFilter.class);
        http.csrf().disable();
        http.cors();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers(Constants.SWAGGER_PATHS).antMatchers(Constants.H2_DB_PATH);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(4);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedHeaders("*").allowedMethods("*")
                        .exposedHeaders("Authorization");
            }
        };
    }
}