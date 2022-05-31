package com.example.demo.controller;

import com.example.demo.dto.CustomMessage;
import com.example.demo.dto.IngredientDto;
import com.example.demo.model.Ingredient;
import com.example.demo.service.IngredientService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/recipe/admin/ingredient")
public class IngredientController {

    private final IngredientService ingredientService;


    @PostMapping("addingredient")
    public ResponseEntity<String> addIngredient(@RequestBody IngredientDto ingredientDto) {

        IngredientDto ingredientDtoResponse = ingredientService.addIngredient(ingredientDto);

        return new ResponseEntity(ingredientDtoResponse, HttpStatus.OK);
    }

    @DeleteMapping("deleteingredient/{labelId}")
    public ResponseEntity<String> deleteIngredient(@PathVariable Long labelId) {


        CustomMessage customMessage = ingredientService.deleteIngredient(labelId);

        if(customMessage == null)
            return new ResponseEntity(new CustomMessage("There were an error while deleting"), HttpStatus.CONFLICT);
        else
            return new ResponseEntity(new CustomMessage("Deletion succeeded"), HttpStatus.OK);
    }

    @GetMapping("getallingredients")
    public ResponseEntity<List<IngredientDto>> getAllIngredients() {

        List<IngredientDto> ingredientsDto = ingredientService.getAllIngredients();

        if(ingredientsDto != null)
            return new ResponseEntity(ingredientsDto, HttpStatus.OK);
        else
            return new ResponseEntity(new CustomMessage("There were an error"), HttpStatus.CONFLICT);
    }

    @PutMapping("updateingredient")
    public ResponseEntity<List<IngredientDto>> updateIngredient(@RequestBody IngredientDto ingredientDto) {
        System.out.println("name: " + ingredientDto.getLabel());
        IngredientDto ingredientDtoResponse = ingredientService.updateIngredient(ingredientDto);

        if(ingredientDtoResponse != null)
            return new ResponseEntity(ingredientDtoResponse, HttpStatus.OK);
        else
            return new ResponseEntity(new CustomMessage("There were an error"), HttpStatus.CONFLICT);
    }


}
