package com.times.jinsta.payload.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserProfile {

    private Long id;
    private String username;
    private String introduce;
    private String profileImage;

    @Builder
    public UserProfile(Long id, String username, String profileImage, String introduce) {
        this.id = id;
        this.username = username;
        this.profileImage = profileImage;
        this.introduce = introduce;
    }
}
