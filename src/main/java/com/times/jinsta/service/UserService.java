package com.times.jinsta.service;

import com.times.jinsta.exception.AppException;
import com.times.jinsta.exception.ResourceNotFoundException;
import com.times.jinsta.model.Role;
import com.times.jinsta.model.RoleName;
import com.times.jinsta.model.User;
import com.times.jinsta.payload.request.SignUpRequest;
import com.times.jinsta.repository.RoleRepository;
import com.times.jinsta.repository.UserRepository;
import com.times.jinsta.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class UserService {

    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider tokenProvider;

    public User register(SignUpRequest request){
        String encodePwd = passwordEncoder.encode(request.getPassword());
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set"));

        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .username(request.getUsername())
                .password(encodePwd)
                .roles(Collections.singleton(userRole))
                .build();

        User result = userRepository.save(user);

        return result;
    }

    public User read(String username){
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return user;
    }

    public boolean checkEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public boolean checkUsername(String username){
        return userRepository.existsByUsername(username);
    }
}
