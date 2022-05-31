package com.example.demo.controller;

import com.example.demo.dto.CustomMessage;
import com.example.demo.dto.IngredientDto;
import com.example.demo.dto.RecipeDto;
import com.example.demo.dto.RecipeFavoriteDto;
import com.example.demo.service.RecipeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/recipe/user/favorite")
public class FavoriteRecipeController {

    private final RecipeService recipeService;

    @PostMapping("addfavorite")
    public ResponseEntity<String> addIngredient(@RequestBody RecipeFavoriteDto recipeFavoriteDto) {

        CustomMessage customMessage = recipeService.addARecipeAsFavorite(recipeFavoriteDto);

        if(customMessage != null)
            return new ResponseEntity(customMessage, HttpStatus.OK);
        else
            return new ResponseEntity(new CustomMessage("There were an error while adding the favorite recipe"), HttpStatus.CONFLICT);

    }

    @GetMapping("getallfavorite")
    public ResponseEntity<List<IngredientDto>> getAllFavoriteRecipes() {

        List<RecipeDto> recipesDtos = recipeService.getAllFavoriteRecipes();

        if(recipesDtos != null)
            return new ResponseEntity(recipesDtos, HttpStatus.OK);
        else
            return new ResponseEntity(new CustomMessage("There were an error"), HttpStatus.CONFLICT);
    }

    @DeleteMapping("deletefavorite/{username}/{recipeId}")
    public ResponseEntity<List<IngredientDto>> deleteFavoriteRecipe(@PathVariable String username, @PathVariable Long recipeId) {

        CustomMessage customMessage = recipeService.deleteFavoriteRecipe(username, recipeId);

        if(customMessage != null)
            return new ResponseEntity(customMessage, HttpStatus.OK);
        else
            return new ResponseEntity(new CustomMessage("There were an error"), HttpStatus.CONFLICT);
    }
}
