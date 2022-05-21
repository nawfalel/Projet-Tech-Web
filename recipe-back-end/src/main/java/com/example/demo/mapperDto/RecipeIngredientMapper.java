package com.example.demo.mapperDto;

import com.example.demo.dto.IngredientDto;
import com.example.demo.dto.RecipeIngredientDto;
import com.example.demo.model.Ingredient;
import com.example.demo.model.RecipeIngredient;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RecipeIngredientMapper {

    RecipeIngredientMapper INSTANCE = Mappers.getMapper( RecipeIngredientMapper.class );

    @Mapping(target="ingredientId", expression = "java(recipeIngredient.getId().getIngredientId())")
    @Mapping(target="ingredientPreparationDesc", expression = "java(recipeIngredient.getIngredientPreparationDesc())")
    @Mapping(target="quantityInfo", expression = "java(recipeIngredient.getQuantityInfo())")
    @Mapping(target="ingredientImageUrl", expression = "java(recipeIngredient.getIngredient().getImageUrl())")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    RecipeIngredientDto mapToRecipeIngredientDto(RecipeIngredient recipeIngredient);
}
