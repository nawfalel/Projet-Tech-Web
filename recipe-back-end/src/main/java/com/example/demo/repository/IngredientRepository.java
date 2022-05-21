package com.example.demo.repository;

import com.example.demo.model.AppUser;
import com.example.demo.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    Optional<Ingredient> findByLabel(String label);

    Long deleteByLabel(String label);

}
