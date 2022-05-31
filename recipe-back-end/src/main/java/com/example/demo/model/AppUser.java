package com.example.demo.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique=true)
    private String username;

    private String password;
    private Instant created;

    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;

//    @ManyToMany
//    @JoinTable(
//            name = "user_created_recipes",
//            joinColumns = @JoinColumn(name = "appuser_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id")
//    )
//    private List<Recipe> recipes;

    @ManyToMany(mappedBy = "appUsersFavorite")
    private List<Recipe> favoriteRecipes;

    public boolean equals(AppUser user) {
        return this.id == user.getId() || this.username == user.getUsername();
    }

}
