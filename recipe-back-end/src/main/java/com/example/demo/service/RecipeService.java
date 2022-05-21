package com.example.demo.service;

import com.example.demo.dto.CustomMessage;
import com.example.demo.dto.IngredientDto;
import com.example.demo.dto.RecipeDto;
import com.example.demo.exception.AppException;
import com.example.demo.mapperDto.IngredientMapper;
import com.example.demo.mapperDto.RecipeMapper;
import com.example.demo.model.AppUser;
import com.example.demo.model.Ingredient;
import com.example.demo.model.Recipe;
import com.example.demo.model.RecipeIngredient;
import com.example.demo.repository.IngredientRepository;
import com.example.demo.repository.RecipeIngredientRepository;
import com.example.demo.repository.RecipeRepository;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final UserRepository userRepository;

    private final IngredientRepository ingredientRepository;

    private final RecipeIngredientRepository recipeIngredientRepository;

    public RecipeDto addRecipe(RecipeDto recipeDto) {
        try {
            System.out.println("recipeDto: " + recipeDto);
            AppUser appUser = userRepository.findByUsername(recipeDto.getUsername()).orElseThrow(() -> new AppException("User not found"));
            List<Long> ingredientsToAdd = recipeDto
                                                                    .getIngredientsDto()
                                                                    .stream()
                                                                    .map(ing ->  ing.getId())
                                                                    .collect(Collectors.toList());

            List<Ingredient> ingredientsToInsert = ingredientRepository.findAllById(ingredientsToAdd);

            if(ingredientsToInsert.size() == 0)
                throw new AppException("You should include ingredients with your recipe");

            Recipe recipe = RecipeMapper.INSTANCE.mapToRecipe(recipeDto, appUser);

            List<RecipeIngredient> recipeIngredients = recipeDto.getIngredientsDto().stream()
                    .map(ing -> {
                        Ingredient ingredient = ingredientsToInsert.stream()
                                                                    .filter(ing1 -> ing1.getId() == ing.getId())
                                                                    .findAny()
                                                                    .orElseThrow(() -> new AppException("Can't get ingredient"));
                        return new RecipeIngredient(ingredient, recipe, ing.getIngredientPreparationDesc(), ing.getQuantityInfo());
                    })
                    .collect(Collectors.toList());

            recipe.setRecipeIngredients(recipeIngredients);

            recipeRepository.save(recipe);

            recipeIngredients.stream().forEach(r_i -> recipeIngredientRepository.save(r_i));

            return recipeDto;
        }
        catch(Exception e) {
            System.out.println("exception: " + e.getMessage());
            return null;
        }
    }

    @Transactional
    public CustomMessage deleteRecipe(Long recipeId) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            System.out.println("beefore username : ");
            System.out.println("username : " + username);
            recipeRepository.deleteByIdAndAppUser_Username(recipeId, username);
            return new CustomMessage("The item has been deleted");
        }
        catch (Exception exc) {
            return null;
        }
    }

    public List<RecipeDto> getAllRecipes() {
        try {
            List<Recipe> recipes = recipeRepository.findAll();
            List<RecipeDto> recipeDtos = recipes.stream()
                    .map(recipe -> RecipeMapper.INSTANCE.mapToRecipeDto(recipe))
                    .collect(Collectors.toList());

            return recipeDtos;
        }
        catch(Exception exc) {
            return null;
        }
    }

    public List<RecipeDto> getRecipeByUsername(String username) {
        try {
            List<Recipe> recipes = recipeRepository.findAllByAppUser_Username(username);
            List<RecipeDto> recipeDtos = recipes.stream()
                    .map(recipe -> RecipeMapper.INSTANCE.mapToRecipeDto(recipe))
                    .collect(Collectors.toList());

            return recipeDtos;
        }
        catch(Exception exc) {
            return null;
        }
    }
}
