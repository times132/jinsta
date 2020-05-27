package com.times.jinsta.controller;

import com.times.jinsta.model.User;
import com.times.jinsta.payload.response.ApiResponse;
import com.times.jinsta.payload.response.JwtAuthenticationResponse;
import com.times.jinsta.payload.request.LoginRequest;
import com.times.jinsta.payload.request.SignUpRequest;
import com.times.jinsta.security.JwtTokenProvider;
import com.times.jinsta.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private AuthenticationManager authenticationManager;
    private UserService userService;
    private JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
        if (userService.checkUsername(signUpRequest.getUsername())){
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken"), HttpStatus.BAD_REQUEST);
        }

        if (userService.checkEmail(signUpRequest.getEmail())){
            return new ResponseEntity<>(new ApiResponse(false, "Email address already is use"), HttpStatus.BAD_REQUEST);
        }

        User user = userService.register(signUpRequest);
        // localhost:8000/api/user/{username}
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}")
                        .buildAndExpand(user.getUsername()).toUri();
        // created에 넣어주면 header에 Location=uri 정보가 들어간다
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
