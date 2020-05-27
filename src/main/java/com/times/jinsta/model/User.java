package com.times.jinsta.model;

import com.times.jinsta.model.audit.DateAudit;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"}), @UniqueConstraint(columnNames = {"email"})})
public class User extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name; // 실명

    @NotBlank
    @Size(max = 15)
    private String username; // 닉네임

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    private String intro; // 자기소개
    private String profileImage; //프로필 이미지 경로

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @Builder
    public User(String name, String username, String email, String password, String intro, String profileImage, Set<Role> roles){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.intro = intro;
        this.profileImage = profileImage;
        this.roles = roles;
    }
}
