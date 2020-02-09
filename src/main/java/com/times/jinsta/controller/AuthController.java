package com.times.jinsta.controller;

import com.times.jinsta.exception.AppException;
import com.times.jinsta.model.Role;
import com.times.jinsta.model.RoleName;
import com.times.jinsta.model.User;
import com.times.jinsta.payload.response.ApiResponse;
import com.times.jinsta.payload.response.JwtAuthenticationResponse;
import com.times.jinsta.payload.request.LoginRequest;
import com.times.jinsta.payload.request.SignUpRequest;
import com.times.jinsta.repository.RoleRepository;
import com.times.jinsta.repository.UserRepository;
import com.times.jinsta.security.JwtAuthenticationEntryPoint;
import com.times.jinsta.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){
        if (userRepository.existsByUsername(signUpRequest.getUsername())){
            return new ResponseEntity<>(new ApiResponse(false, "Username is already taken"), HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())){
            return new ResponseEntity<>(new ApiResponse(false, "Email address already is use"), HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                        .orElseThrow(() -> new AppException("User Role not set"));
        user.setRoles(Collections.singleton(userRole));
        User result = userRepository.save(user);
        // localhost:8000/api/user/{username}
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/users/{username}")
                        .buildAndExpand(result.getUsername()).toUri();
        // created에 넣어주면 header에 Location=uri 정보가 들어간다
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
}
