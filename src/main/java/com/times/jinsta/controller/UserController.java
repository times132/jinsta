package com.times.jinsta.controller;

import com.times.jinsta.model.User;
import com.times.jinsta.payload.response.UserIdentityAvailability;
import com.times.jinsta.payload.response.UserProfile;
import com.times.jinsta.payload.response.UserSummary;
import com.times.jinsta.security.CurrentUser;
import com.times.jinsta.security.UserPrincipal;
import com.times.jinsta.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser){ // @AuthenticationPrincipal을 커스텀 어노테이션으로 만든것
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUsername(), currentUser.getName());

        return userSummary;
    }

    @GetMapping("/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userService.checkUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userService.checkEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username){
        logger.info("#########USER PROFILE######### : " + username);
        User user = userService.read(username);
        UserProfile profile = UserProfile.builder()
                .profileImage(user.getProfileImage())
                .id(user.getId())
                .username(user.getUsername())
                .introduce(user.getIntro())
                .build();
        return profile;
    }
}
