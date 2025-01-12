import React, { useState } from "react";
import "./Generate.css"; // Import the CSS file
import Card from "./Card";

const GeneratePage = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // To store the full recipe details
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false); // Check if user is logged in

  const API_KEY = "4cffb5ccab644710b2215a28e74fbd1b";

  // Handler to generate recipes
  const handleGenerateRecipe = async () => {
    if (!ingredients.trim()) {
      alert("Please enter some ingredients!");
      return;
    }

    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setRecipes(data);
        setShowRecipes(true);
      } else {
        alert("Failed to fetch recipes. Please try again later.");
        console.error(data.message);
      }
    } catch (error) {
      alert("An error occurred while fetching recipes.");
      console.error(error);
    }
  };

  // Handler to fetch full recipe details
  const handleViewRecipe = async (recipeId) => {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setSelectedRecipe(data); // Store the full recipe details
      } else {
        alert("Failed to fetch the recipe details.");
        console.error(data.message);
      }
    } catch (error) {
      alert("An error occurred while fetching the recipe details.");
      console.error(error);
    }
  };

  // Handler to save a recipe
  const handleSaveRecipe = async () => {
    if (!selectedRecipe) {
      alert("No recipe selected!");
      return;
    }

    if (!isLoggedIn) {
      alert("You must be logged in to save a recipe.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/saveRecipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipeId: selectedRecipe.id,
          title: selectedRecipe.title,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Recipe saved successfully!");
      } else {
        alert(data.message || "Failed to save recipe.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the recipe.");
    }
  };

  return (
    <main className="recipe-page">
      <div className="generate-container">
        <h1 className="header">Generate a Recipe</h1>
        <div className="form">
          <div>
            <label htmlFor="ingredients" className="label">
              Enter Ingredients:
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., eggs, flour, milk"
              className="input"
            />
          </div>
          <button onClick={handleGenerateRecipe} className="button">
            Generate
          </button>
        </div>

        {showRecipes && recipes.length > 0 && (
          <div className="recipe-section">
            <h2 className="recipe-header">Generated Options</h2>
            <div className="recipe-cards">
              {recipes.map((recipe) => (
                <div className="recipe-card">
                  <Card
                    key={recipe.id}
                    altText={recipe.title}
                    imgPath={recipe.image}
                    title={recipe.title}
                    onViewClick={() => handleViewRecipe(recipe.id)}
                  />
                  </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Recipe Section */}
        {selectedRecipe && (
          <div className="full-recipe">
            <h2>{selectedRecipe.title}</h2>
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="full-recipe-image"
            />
            <div className="final-recipe">
              <p>
                <strong>Ready In:</strong> {selectedRecipe.readyInMinutes}{" "}
                minutes
              </p>
              <p>
                <strong>Servings:</strong> {selectedRecipe.servings}
              </p>
              <p><strong>Ingredients:</strong></p>
              <ul>
                {selectedRecipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
              <p><strong>Instructions:</strong></p>
              {/* Use dangerouslySetInnerHTML to render the HTML content for instructions */}
              <div
                className="instructions"
                dangerouslySetInnerHTML={{
                  __html: selectedRecipe.instructions,
                }}
              />
            </div>
            <button
              onClick={() => setSelectedRecipe(null)}
              className="close-button"
            >
              Close
            </button>
            <button
              onClick={handleSaveRecipe}
              className="save-button"
            >
              Save Recipe
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default GeneratePage;
