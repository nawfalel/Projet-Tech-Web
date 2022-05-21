package com.example.demo.security;

import com.example.demo.exception.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/* this class if for jwt validation of token */
@Component /* annotation : the class it considered as spring bean,, it will be executed when the application starts  */
public class JwtAuthenticationFilter extends OncePerRequestFilter
{

    private Set<String> skipUrls = new HashSet<>(Arrays.asList(
            "/api/recipe/public/**"
    ));

    @Autowired
    private JwtProvider jwtProvider;

    @Qualifier("userDetailsServiceImpl")
    @Autowired
    private UserDetailsService userDetailsService;

    /* this method gonna get the token form the http request send by the user
    * and verify if this token is valid or not
    * and do a filter over the request and the response
    * */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException
    {
        //response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        String jwt = getJwtFromRequest(request);
        if(StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt))
        {
            String username = jwtProvider.getUsernameFromJwt(jwt);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            /*UsernamePasswordAuthenticationToken : this class is only for a simple presentation of the username and password
            * the constructor have (Object principal, Object credentials, Collection authorities)*/
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            /* WebAuthenticationDetailsSource :  builds the details object from an HttpServletRequest object, creating a WebAuthenticationDetails. */
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            /* we put the authenticated user in the security context*/
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);
        }
        else {
            HttpServletRequest req = ( HttpServletRequest ) request;
            response.sendError(404, "The token provided is not valid");
        }
        /* it gonna run a set of filter there order defined by spring
        * before the request reach the API */
    }

    /* getJwtFromRequest : get the token form the request */
    private String getJwtFromRequest(HttpServletRequest request)
    {
        /* get the authorization header, it starts with bearer followed by the JWT */
        String bearerToken = request.getHeader("Authorization"); /* the header contains the credentials to authenticate the user in the server*/
        System.out.println("header : " + bearerToken);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer "))
        {
            return bearerToken.substring(7);
        }
        else
            return bearerToken;
    }

    //Method to exclude filters that we don't want to apply
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        AntPathMatcher pathMatcher = new AntPathMatcher();
        return skipUrls.stream().anyMatch(p -> pathMatcher.match(p, request.getServletPath()));
    }
}
