package com.times.jinsta.payload.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequest {

    @NotBlank
    private String usernameOrEmail;

    @NotBlank
    private String password;

    @Builder
    public LoginRequest(@NotBlank String usernameOrEmail, @NotBlank String password) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }
}
