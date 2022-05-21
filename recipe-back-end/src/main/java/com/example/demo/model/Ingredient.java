package com.example.demo.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  id;

    @Column(unique=true)
    private String label;

    private String imageUrl;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ingredient")
    List<RecipeIngredient> recipeIngredients = new ArrayList<RecipeIngredient>();


}
