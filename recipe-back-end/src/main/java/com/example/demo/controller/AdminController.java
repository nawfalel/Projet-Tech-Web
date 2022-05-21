package com.example.demo.controller;

import com.example.demo.dto.CustomMessage;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("api/recipe/admin")
public class AdminController {

    @GetMapping("isUserAdmin")
    public CustomMessage isUserAdmin(){
        return new CustomMessage("The user is admin");
    }
}
