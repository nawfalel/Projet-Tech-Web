package com.example.demo.mapperDto;

import com.example.demo.dto.IngredientDto;
import com.example.demo.model.Ingredient;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    IngredientMapper INSTANCE = Mappers.getMapper( IngredientMapper.class );


    @Mapping(target="label", expression = "java(ingredientDto.getLabel())")
    @Mapping(target="imageUrl", expression = "java(ingredientDto.getImageUrl())")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Ingredient mapToIngredient(IngredientDto ingredientDto);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    IngredientDto mapToIngredientDto(Ingredient ingredient);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateIngredientFromDto(IngredientDto ingredientDto, @MappingTarget Ingredient ingredient);
}
