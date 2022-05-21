package com.example.demo.service;

import com.example.demo.dto.CustomMessage;
import com.example.demo.dto.IngredientDto;
import com.example.demo.exception.AppException;
import com.example.demo.mapperDto.IngredientMapper;
import com.example.demo.model.Ingredient;
import com.example.demo.repository.IngredientRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public IngredientDto addIngredient(IngredientDto ingredientDto) {
        Ingredient ingredient = IngredientMapper.INSTANCE.mapToIngredient(ingredientDto);
        ingredientRepository.save(ingredient);
        ingredientDto.setId(ingredient.getId());
        return ingredientDto;
    }

    @Transactional
    public CustomMessage deleteIngredient(Long labelId) {
        try {
            ingredientRepository.deleteById(labelId);
            return new CustomMessage("The item has been deleted");
        }
        catch (Exception exc) {
            return null;
        }

    }

    public List<IngredientDto> getAllIngredients() {
        try {
            List<Ingredient> ingredients = ingredientRepository.findAll();
            List<IngredientDto> ingredientDtos = ingredients.stream()
                    .map(ingredient -> IngredientMapper.INSTANCE.mapToIngredientDto(ingredient))
                    .collect(Collectors.toList());

            return ingredientDtos;
        }
        catch(Exception exc) {
            return null;
        }
    }

    public IngredientDto updateIngredient(IngredientDto ingredientDto) {
        try{

            Ingredient ingredient = ingredientRepository.findById(ingredientDto.getId())
                    .orElseThrow(() -> new AppException("Ingredient not found"));
            System.out.println("here after");
            IngredientMapper.INSTANCE.updateIngredientFromDto(ingredientDto, ingredient);
            ingredientRepository.save(ingredient);
            System.out.println("here in try");
            return ingredientDto;
        }
        catch(Exception e) {
            System.out.println("execption: " + e.getMessage());
            return null;
        }

    }
}
