package com.example.demo.config;


import com.example.demo.security.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean(BeanIds.AUTHENTICATION_MANAGER) /* TO SPECIFY WITCH CLASS THE INTERFACE AuthenticationManager SHOULD IMPLEMENT IN THE UserDetailsServiceImpl CLASS   */
    @Override
    public AuthenticationManager authenticationManager() throws Exception{
        return super.authenticationManager();
    }

    /* configureGlobal : METHOD TO ENABLE FEATURES FOR THE AUTHENTICATION */
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception
    {
        authenticationManagerBuilder.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.
                        addMapping("/**")
                        .allowedMethods("*");
            }
        };
    }



    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception
    {

        httpSecurity
                .csrf()
                .disable()/* DISABLE THE CSFR BECAUSE WE DON'T USE COOKIES OR SESSION TO AUTHENTICATE    */
                .cors()
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/api/recipe/admin/ingredient/getAllIngredients").hasAnyRole("ADMIN", "USER")
                .antMatchers("/api/recipe/admin/**").hasRole("ADMIN")
                .antMatchers("/api/recipe/auth/**")
                .authenticated();

    }

    @Bean /* TO ENABLE THE ENCRYPTED METHOD FOT THE PASSWORD  */
    PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

}
