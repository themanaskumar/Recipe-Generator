import React, { useState, useEffect } from "react";
import "./ViewSaved.css";

const ViewSaved = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = "4cffb5ccab644710b2215a28e74fbd1b"; // Add your API key

  // Fetch saved recipes from backend
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/savedRecipes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved recipes.");
        }

        const data = await response.json();
        setSavedRecipes(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  // Fetch full recipe details
  const fetchFullRecipe = async (recipeId) => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
      const data = await response.json();

      if (response.ok) {
        setSelectedRecipe(data);
      } else {
        alert("Failed to fetch full recipe details.");
      }
    } catch (error) {
      console.error("Error fetching full recipe:", error);
      alert("An error occurred while fetching the recipe details.");
    }
  };

  // Delete a recipe
  const deleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteRecipe/${recipeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the recipe.");
      }

      // Update UI after successful deletion
      setSavedRecipes(savedRecipes.filter((recipe) => recipe.recipeId !== recipeId));
    } catch (err) {
      console.error(err.message);
      alert("Error deleting recipe.");
    }
  };

  // Render saved recipes or selected recipe details
  return (
    <main className="viewSavedPage">
      <h1 className="header">Your Saved Recipes</h1>
      <div className="savedRecipesSection">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="errorMessage">{error}</p>
        ) : selectedRecipe ? (
          <div className="detailedRecipe">
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            <div className="fullRecipe">
            <p>
              <strong>Ready In:</strong> {selectedRecipe.readyInMinutes} minutes
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
            <div
              className="instructions"
              dangerouslySetInnerHTML={{__html: selectedRecipe.instructions,}}
            />
            </div>
            <div className="buttons">
              <button onClick={() => setSelectedRecipe(null)} className="backButton">
                Go Back
              </button>
              <button
                onClick={() => deleteRecipe(selectedRecipe.recipeId)}
                className="deleteButton"
              >
                Delete Recipe
              </button>
            </div>
          </div>
        ) : (
          <ul className="recipeList">
            {savedRecipes.length > 0 ? (
              savedRecipes.map((recipe) => (
                <li key={recipe.recipeId} className="recipeItem">
                  <h3>{recipe.title}</h3>
                  <div className="buttons">
                    <button
                      onClick={() => fetchFullRecipe(recipe.recipeId)}
                      className="viewButton"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteRecipe(recipe.recipeId)}
                      className="deleteButton"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No saved recipes found.</p>
            )}
          </ul>
        )}
      </div>
    </main>
  );
};

export default ViewSaved;
