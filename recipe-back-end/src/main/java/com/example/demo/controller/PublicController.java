package com.example.demo.controller;

import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.dto.CustomMessage;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("api/recipe/public")
public class PublicController {

    final AuthService authService;

    @GetMapping("echo")
    public CustomMessage echoTest(){

        return new CustomMessage("The api is working");
    }

    @PostMapping("signup")
    public ResponseEntity<CustomMessage> signup(@RequestBody RegisterRequest registerRequest)
    {
        authService.signup(registerRequest);
        return new ResponseEntity<CustomMessage>(new CustomMessage("Registration succeeded"),
                HttpStatus.OK);
    }


    @PostMapping("login")
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest)
    {
        return authService.login(loginRequest);
    }

}
