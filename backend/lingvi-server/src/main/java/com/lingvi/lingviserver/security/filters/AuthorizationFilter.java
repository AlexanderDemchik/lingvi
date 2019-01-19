package com.lingvi.lingviserver.security.filters;

import com.lingvi.lingviserver.commons.config.SecurityProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class AuthorizationFilter extends OncePerRequestFilter {

    private Logger logger = LoggerFactory.getLogger(AuthorizationFilter.class);
    private SecurityProperties securityProperties;

    public AuthorizationFilter(SecurityProperties securityProperties) {
        this.securityProperties = securityProperties;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = getAuthFromRequest(request);
        if(authentication != null) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            SecurityContextHolder.getContext().setAuthentication(null);
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Extract Authorization header token, if it is valid, extract user roles from jwt claims and return {@link UsernamePasswordAuthenticationToken} object.
     *
     * @param request http request representation to extract authorization header token
     * @return Spring {@link Authentication} object if token is valid, otherwise <code>null</code>.
     */
    @SuppressWarnings("unchecked")
    private Authentication getAuthFromRequest(HttpServletRequest request) {
        String token = request.getHeader(securityProperties.getTokenHeaderString());
        if (token != null) {
            // parse the token.
            Long id;
            List<GrantedAuthority> roles = null;

            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(securityProperties.getTokenSecret())
                        .parseClaimsJws(token.replace(securityProperties.getTokenPrefix(), ""))
                        .getBody();

                id = Long.valueOf(claims.getSubject());

                if(claims.get(securityProperties.getClaimsRoleField()) != null) {
                    roles = ((List<String>)claims.get(securityProperties.getClaimsRoleField())).stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
                }
            } catch (Exception e) {
                return  null;
            }

            logger.trace("Authenticate user with id: " + id);
            return new UsernamePasswordAuthenticationToken(id, null, roles);
        }
        return null;
    }
}
