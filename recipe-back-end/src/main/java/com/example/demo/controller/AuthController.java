package com.example.demo.controller;


import com.example.demo.dto.*;
import com.example.demo.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping("api/recipe/auth")
public class AuthController
{

    @GetMapping("isuserconnected")
    public CustomMessage isUserConnected(){

        return new CustomMessage("The user is connected");
    }

}
