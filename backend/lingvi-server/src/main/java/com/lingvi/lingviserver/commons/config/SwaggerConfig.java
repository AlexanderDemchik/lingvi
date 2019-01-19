package com.lingvi.lingviserver.commons.config;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

/**
 * Swagger configuration.
 * Generates documentation for rest api.
 */
@SuppressWarnings("SpringFacetCodeInspection")
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private SecurityProperties securityProperties;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    public SwaggerConfig(SecurityProperties securityProperties) {
        this.securityProperties = securityProperties;
    }

    @Bean
    public Docket api() {

//        ParameterBuilder paramBuilder = new ParameterBuilder();
//        List<Parameter> params = new ArrayList<>();

//        paramBuilder.name(securityProperties.getTokenHeaderString()).defaultValue(createJwtToken(1, new Date(System.currentTimeMillis() * 2))).modelRef(new ModelRef("string"))
//                .parameterType("header")
//                .required(false).build();
//        params.add(paramBuilder.build());

        return new Docket(DocumentationType.SWAGGER_2)
//                .globalOperationParameters(params)
                .securityContexts(Lists.newArrayList(securityContext()))
                .securitySchemes(Lists.newArrayList(apiKey()))
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

    private ApiKey apiKey() {
        return new ApiKey("JWT", securityProperties.getTokenHeaderString(), "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .forPaths(PathSelectors.regex("/*"))
                .build();
    }

    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope
                = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Lists.newArrayList(
                new SecurityReference("JWT", authorizationScopes));
    }
//    private String createJwtToken(long id, Date expDate) {
//        return Jwts.builder()
//                .setSubject(String.valueOf(id))
//                .setExpiration(expDate)
//                .signWith(SignatureAlgorithm.HS512, securityProperties.getTokenSecret())
//                .compact();
//    }
}