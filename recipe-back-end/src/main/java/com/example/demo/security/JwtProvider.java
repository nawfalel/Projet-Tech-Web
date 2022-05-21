package com.example.demo.security;


import com.example.demo.exception.AppException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.*;
import java.security.cert.CertificateException;

import static io.jsonwebtoken.Jwts.parser;

@Service
public class JwtProvider
{
    /* This class represents a storage facility for cryptographic keys and certificates. */
    private KeyStore keyStore;

    /* The PostConstruct annotation is used on a method that needs to be executed
    after dependency injection is done to perform any initialization
    here to initialize the keyStore*/
    @PostConstruct
    public void init()
    {
        System.out.println("Init of JWTProvider");
        try{
            keyStore = KeyStore.getInstance("JKS"); /* WE USE THE JKS TYPE OF KEY STORE */
            InputStream resourceAsStream = getClass().getResourceAsStream("/springblog.jks"); /* loading the file that gonna store our secrete key */
            /* WE CREATE A KEY STORE FROM resourceAsStream*/
            /* WE SECURE OUR KAY BY A PASSWORD  "secret".toCharArray()*/
            /* we put the private key into the key store to retrieve it later into generatePrivateKey*/
            keyStore.load(resourceAsStream, "secret".toCharArray());
        }
        catch (KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e){
            throw new AppException("Exception occurred while loading keystore");
        }
    }

    /* generateToken : this method generate a token for the authenticated user with JWT */
    public String generateToken(Authentication authentication)
    {
        /* THE USER IS FROM USERETAILS PACKAGE */
        User authenticatedUser  = (User) authentication.getPrincipal(); /* THIS METHOD ALLOW US TO RETRIEVE THE CURRENT AUTHENTICATED USER */
        PrivateKey privateKey = getPrivateKey();
        System.out.println("###### : Private Key : " + privateKey);
        return Jwts.builder()
                .setSubject(authenticatedUser.getUsername())
                .signWith(privateKey)
                .compact();
    }

    private PrivateKey getPrivateKey()
    {
        try
        {
            /* we get the privatekey from the keyStore giving the password setting we later and an alias for the key */
            PrivateKey privateKey = (PrivateKey) keyStore.getKey("springblog", "secret".toCharArray());
            return privateKey;
        }
        catch(KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e)
        {
            throw new AppException("Exception occurred while retrieving public key from keystore");
        }
    }

    /* this function validate the token we get form the http request
     * it will get the public key from the keystore and check if this public key is
     * associated with the private key we gives to the user when he authenticated
     * if this method is executed without any error : that's mean the jwt is validate
     * */
    public boolean validateToken(String jwt)
    {
        /* the parser convert a string to a jwt */
        /* we test the signature of the token
         * if it's incorrect the parseClaimsJws will throw an exception
         * setSigningKey : is the key we u ????
         * */

        parser().setSigningKey(getPublicKey()).parseClaimsJws(jwt);
        return true;
    }


    /* getPublicKey : retrieve the public key form the keystore */
    private PublicKey getPublicKey()
    {
        try{
            return keyStore.getCertificate("springblog").getPublicKey();
        }catch (KeyStoreException e){
            throw new AppException("Exception occurred while retrieving private key from keystore");

        }
    }


    public String getUsernameFromJwt(String token)
    {
        Claims claims = parser().setSigningKey(getPublicKey())
                .parseClaimsJws(token)
                .getBody();
        /* Returns the JWT sub (subject) : (this field contains the username) value or null if not present. */
        return claims.getSubject();
    }


}