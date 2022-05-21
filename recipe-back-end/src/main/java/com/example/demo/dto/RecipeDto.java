package com.example.demo.dto;

import com.example.demo.model.Ingredient;
import com.example.demo.model.RecipeIngredient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDto {

    @Nullable
    private Long id;

    private String label;

    private String description;

    private String imageUrl;

    private String username;

    @Nullable
    private List<IngredientDto> ingredientsDto = new ArrayList<IngredientDto>();

    @Nullable
    private List<RecipeIngredientDto> recipeIngredientsDto = new ArrayList<RecipeIngredientDto>();

}
