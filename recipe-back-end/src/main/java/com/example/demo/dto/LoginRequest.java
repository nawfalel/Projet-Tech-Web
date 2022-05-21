package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/* LoginRequest : CLASS THAT GONNA STORE INFORMATION FOR THE LOGIN PART */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest
{
    private String username;
    private String password;
}