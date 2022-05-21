package com.example.demo.repository;

import com.example.demo.model.Ingredient;
import com.example.demo.model.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long>  {
}
