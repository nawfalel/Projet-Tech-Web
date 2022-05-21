package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecipeIngredientDto {

    Long ingredientId;

    private String ingredientPreparationDesc;

    private String quantityInfo;

    private String ingredientImageUrl;

}
