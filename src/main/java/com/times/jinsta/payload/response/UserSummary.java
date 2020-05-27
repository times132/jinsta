package com.times.jinsta.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSummary {

    private Long id;
    private String username;
    private String name;

    @Builder
    public UserSummary(Long id, String username, String name){
        this.id = id;
        this.username = username;
        this.name = name;
    }
}
