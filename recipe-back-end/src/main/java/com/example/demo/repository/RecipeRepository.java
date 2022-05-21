package com.example.demo.repository;

import com.example.demo.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Optional<Recipe> findByLabel(String label);

    List<Recipe> findAllByAppUser_Username(String username);

    Long deleteByLabel(String label);

    Long deleteByIdAndAppUser_Username(Long id, String username);
}
