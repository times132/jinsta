package com.times.jinsta.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {

    private Boolean success;
    private String message;

    @Builder
    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
