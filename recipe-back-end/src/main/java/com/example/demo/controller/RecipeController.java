package com.example.demo.controller;

import com.example.demo.dto.CustomMessage;
import com.example.demo.dto.IngredientDto;
import com.example.demo.dto.RecipeDto;
import com.example.demo.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/recipe/user/recipe")
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping("addRecipe")
    public ResponseEntity<String> addRecipe(@RequestBody RecipeDto recipeDto) {

        RecipeDto recipeDtoResponse = recipeService.addRecipe(recipeDto);

        if(recipeDtoResponse == null)
            return new ResponseEntity(new CustomMessage("There were an error while inserting recipe"), HttpStatus.CONFLICT);
        else
            return new ResponseEntity(new CustomMessage("Inserting succeeded"), HttpStatus.OK);
    }


    @DeleteMapping("deleterecipe/{id}")
    public ResponseEntity<String> deleteIngredient(@PathVariable Long id) {


        CustomMessage customMessage = recipeService.deleteRecipe(id);

        if(customMessage == null)
            return new ResponseEntity(new CustomMessage("There were an error while deleting the recipe"), HttpStatus.CONFLICT);
        else
            return new ResponseEntity(new CustomMessage("Deletion succeeded of recipe"), HttpStatus.OK);
    }

    @GetMapping("getAllRecipes")
    public ResponseEntity<List<IngredientDto>> getAllRecipes() {

        List<RecipeDto> recipesDtos = recipeService.getAllRecipes();

        if(recipesDtos != null)
            return new ResponseEntity(recipesDtos, HttpStatus.OK);
        else
            return new ResponseEntity(new CustomMessage("There were an error"), HttpStatus.CONFLICT);
    }

    @GetMapping("getrecipes/{username}")
    public ResponseEntity<List<IngredientDto>> getRecipByUsername(@PathVariable String username) {

        List<RecipeDto> recipesDtos = recipeService.getRecipeByUsername(username);

        if(recipesDtos != null)
            return new ResponseEntity(recipesDtos, HttpStatus.OK);
        else
            return new ResponseEntity(new CustomMessage("There were an error"), HttpStatus.CONFLICT);
    }
}
