package com.example.demo.mapperDto;

import com.example.demo.dto.IngredientDto;
import com.example.demo.dto.RecipeDto;
import com.example.demo.model.AppUser;
import com.example.demo.model.Ingredient;
import com.example.demo.model.Recipe;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        imports  = { RecipeIngredientMapper.class, Collectors.class, IngredientDto.class, ArrayList.class})
public interface RecipeMapper {

    RecipeMapper INSTANCE = Mappers.getMapper( RecipeMapper.class );

    @Mapping(target = "id", ignore = true)
    @Mapping(target="label", expression = "java(recipeDto.getLabel())")
    @Mapping(target="description", expression = "java(recipeDto.getDescription())")
    @Mapping(target="imageUrl", expression = "java(recipeDto.getImageUrl())")
    @Mapping(target = "recipeIngredients", ignore = true)
    @Mapping(target="appUser", expression = "java(appUser)")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Recipe mapToRecipe(RecipeDto recipeDto, AppUser appUser);

    @Mapping(target = "recipeIngredientsDto", expression = "java(recipe.getRecipeIngredients().stream().map(rI -> RecipeIngredientMapper.INSTANCE.mapToRecipeIngredientDto(rI)).collect(Collectors.toList()))")
    @Mapping(target="username", expression= "java(recipe.getAppUser().getUsername())")
    @Mapping(target="ingredientsDto", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    RecipeDto mapToRecipeDto(Recipe recipe);


}
