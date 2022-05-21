package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDto {

    @Nullable
    private Long id;

    private String label;

    private String imageUrl;

    @Nullable
    private String ingredientPreparationDesc;

    @Nullable
    private String quantityInfo;

}
