import React, { useState } from "react";
import Card from "../components/Card"; // Import the Card component
import "./Search-Recipe.css";

const API_KEY = "process.env.REACT_APP_API_KEY";

const Search_Recipe = () => {
  const [dishName, setDishName] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState(""); // For saving status message

  const isLoggedIn = localStorage.getItem("token") ? true : false; // Check if the user is logged in

  const handleSearch = async () => {
    if (!dishName.trim()) {
      alert("Please enter a dish name!");
      return;
    }

    setIsLoading(true);
    setError("");
    setSelectedRecipe(null);

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&number=5&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok && data.results && data.results.length > 0) {
        setRecipes(data.results);
      } else {
        throw new Error("No recipes found for the entered dish name.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewRecipe = async (id) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setSelectedRecipe(data);
      } else {
        throw new Error("Failed to fetch detailed recipe information.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Save recipe function
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
          image: selectedRecipe.image,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSaveMessage("Recipe saved successfully!");
      } else {
        setSaveMessage(data.message || "Failed to save recipe.");
      }
    } catch (err) {
      console.error(err);
      setSaveMessage("An error occurred while saving the recipe.");
    }
  };

  return (
    <main className="search-page">
      <div className="searchContainer">
        <h1 className="header">Search Recipes</h1>

        {/* Input Field */}
        <div className="searchBox">
          <input
            type="text"
            placeholder="Enter dish name"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="searchInput"
          />

          {/* Search Button */}
          <button onClick={handleSearch} className="searchButton">
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="errorMessage">{error}</p>}

        {/* Recipes Display */}
        {!selectedRecipe && recipes.length > 0 && (
          <div className="recipesGrid">
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                imgPath={recipe.image}
                title={recipe.title}
                onViewClick={() => handleViewRecipe(recipe.id)} // Pass the function for "View" button
              />
            ))}
          </div>
        )}

        {/* Detailed Recipe Display */}
        {selectedRecipe && (
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
              <p>
                <strong>Ingredients:</strong>
              </p>
              <ul>
                {selectedRecipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
              <p>
                <strong>Instructions:</strong>
              </p>
              <div
                className="instructions"
                dangerouslySetInnerHTML={{
                  __html: selectedRecipe.instructions,
                }}
              />
            </div>
            <div className="buttons">
            <button onClick={() => setSelectedRecipe(null)} className="backButton">
              Back to Results
            </button>

            {/* Save Recipe Button */}
            <button onClick={handleSaveRecipe} className="saveButton">
              Save Recipe
            </button>
            </div>
            {/* Save message */}
            {saveMessage && <p className="saveMessage">{saveMessage}</p>}
          </div>
        )}
      </div>
    </main>
  );
};

export default Search_Recipe;
