package com.example.demo.model;

import com.example.demo.model.key.RecipeIngredientId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class RecipeIngredient {

    @EmbeddedId
    RecipeIngredientId id = new RecipeIngredientId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("ingredientId")
    @JoinColumn(name = "ingredient_id")
    Ingredient ingredient;


    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id")
    Recipe recipe;

    private String ingredientPreparationDesc;

    private String quantityInfo;

    public RecipeIngredient(Ingredient ing, Recipe rc, String prepDesc, String qu) {
        this.ingredient = ing;
        this.recipe = rc;
        this.ingredientPreparationDesc = prepDesc;
        this.quantityInfo = qu;
    }
}