package com.example.demo.service;

import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.exception.AppException;
import com.example.demo.model.AppUser;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@AllArgsConstructor
@Service
public class AuthService
{

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Transactional /* BECAUSE WE INTERACTING WITH RELATIONAL DB */
    public AppUser signup(RegisterRequest registerRequest)
    {
        /* CREATE THE USER FOR THE SIGNUP PROCEDURE*/
        AppUser user = new AppUser();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); /* ENCRYPT THE PASSWORD  */
        user.setCreated(Instant.now()); /* DATE OF CREATION OF THE ACCOUNT OF THE USER */
        user.setRole(roleRepository.findByRole("ROLE_USER"));
        System.out.println("the user is: " + user.getUsername());
        userRepository.save(user);

        return user;
    }

    public AuthenticationResponse login(LoginRequest loginRequest)
    {
        /* THIS LINE GONNA CALL THE UserDetailsImpl -> loadUserByUsername */
        Authentication authenticatedUser = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authenticatedUser); /* WE ADD THE AUTHENTICATED USER TO THE CONTEXT, TO FIND IT LATER */
        String authenticatedToken = jwtProvider.generateToken(authenticatedUser); /* WE GENERATE THE TOKEN FOR THE AUTHENTICATED USER*/
        //
        //System.out.println("User : " + loginRequest.getUsername());
        AppUser connectedUser = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(() -> new AppException("User not found with name : "));
        //
        //System.out.println("User2 : " + connectedUser.getUsername());
        return new AuthenticationResponse(authenticatedToken, loginRequest.getUsername(),
                            new String[]{connectedUser.getRole().getRole()});

    }

    /* getCurrentUser : return the authenticated model.User */
    @Transactional(readOnly = true)
    public AppUser getCurrentUser(){
        org.springframework.security.core.userdetails.User  currentUserDetails = (org.springframework.security.core.userdetails.User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(currentUserDetails.getUsername()).orElseThrow(()-> new AppException("User with the username : "+ currentUserDetails.getUsername() + " not found"));
    }

}
