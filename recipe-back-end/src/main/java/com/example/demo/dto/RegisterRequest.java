package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/* THIS CLASS CONTAINS THE MINIMUM OF INFORMATIONS FOR THE USER WHO WANTS TO SIGNUP */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest
{
    private String username;
    private String password;
}