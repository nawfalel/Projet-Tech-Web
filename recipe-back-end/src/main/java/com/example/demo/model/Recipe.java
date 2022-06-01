package com.example.demo.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String label;

    private String description;

    private String imageUrl;

    private Instant created;


    @ManyToOne(fetch = FetchType.EAGER)
    private AppUser appUser;

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, mappedBy = "recipe")
    private List<RecipeIngredient> recipeIngredients;

    @ManyToMany
    @JoinTable(
            name = "favorite_recipe",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "app_user_id")
    )
    List<AppUser> appUsersFavorite;

    public boolean equals(Recipe recipe) {
        return this.id == recipe.getId() || this.label == recipe.getLabel();
    }

    public String toString() {
        return "Recipe name: " + this.getLabel();
    }
}
