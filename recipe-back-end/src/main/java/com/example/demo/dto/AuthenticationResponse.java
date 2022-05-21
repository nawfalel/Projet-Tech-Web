package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/* this class store token and username for the authenticated user */
/* it's a response for a login request */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse
{
    private String authenticationToken;
    private String username;
    private String [] roles;

}