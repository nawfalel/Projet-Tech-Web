package com.example.demo.service;

import com.example.demo.exception.AppException;
import com.example.demo.model.AppUser;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Optional;

import static java.util.Collections.singletonList;

@AllArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    /* loadUserByUsername : takes username and return the user details*/
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        System.out.println("***** LoadUserByUsername *****");
        Optional<AppUser> userOptional = userRepository.findByUsername(username);
        AppUser user = userOptional.orElseThrow(() -> new AppException("No user found with the Username : "+ username));
        return new org.springframework.security.core.userdetails
                .User(  user.getUsername(),
                        user.getPassword(),
                        true, /* Indicates whether the user is enabled or disabled. A disabled user cannot be authenticated. */
                        true, /* Indicates whether the user's account has expired. An expired account cannot be authenticated.*/
                        true, /* Indicates whether the user's credentials (password) has expired. Expired credentials prevent authentication.*/
                        true, getAuthorities(user.getRole().getRole())); /* Returns the authorities granted to the user. Cannot return null. */
    }

    /* getAuthorities :  return the authority granted to the user  */
    private Collection<? extends GrantedAuthority> getAuthorities(String role)
    {
        return singletonList(new SimpleGrantedAuthority(role));
    }
}
