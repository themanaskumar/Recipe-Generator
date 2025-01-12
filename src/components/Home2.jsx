import React, { useState } from 'react';
import Card from './Card';
import './Home2.css';
import { Link } from 'react-router-dom';

const Home2 = () => {
  const name = localStorage.getItem('userName');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Function to fetch recipe details
  const handleViewRecipe = async (recipeName) => {
    const API_KEY = "4cffb5ccab644710b2215a28e74fbd1b";
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&number=1&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.results.length > 0) {
        const recipeId = data.results[0].id;

        // Fetch full recipe details
        const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        if (detailsResponse.ok) {
          setSelectedRecipe(detailsData);
        } else {
          alert('Failed to fetch recipe details.');
        }
      } else {
        alert('Recipe not found.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching recipe details.');
    }
  };

  // Function to close the recipe details
  const closeRecipe = () => setSelectedRecipe(null);

  return (
    <div className="homepage">
      <main>
        <div className="welcomeHome">
          <h1>Welcome back {name}! Let's find some delicious recipes.</h1>
        </div>
        <div className="container">
          <div className="interContain">
            <h2>Generate Recipe</h2>
            <p>What do you have in your fridge? Generate recipes based on your ingredients.</p>
            <button><Link to="/generate">Generate</Link></button>
          </div>
          <div className="interContain">
            <h2>Search Recipe</h2>
            <p>Have something in mind? Search for an awesome recipe and start cooking.</p>
            <button><Link to="/searchRecipe">Search</Link></button>
          </div>
          <div className="interContain">
            <h2>View Saved Recipes</h2>
            <p>Saved a recipe for later? View them all here.</p>
            <button><Link to="/viewSaved">View</Link></button>
          </div>
        </div>
        <div className="suggestions">
          <h1>Popular Recommendations</h1>
          <div className="popular">
            <Card title="Chicken Tikka" imgPath="/chickenTikka.png" onViewClick={() => handleViewRecipe('Chicken Tikka')} />
            <Card title="Madras Curry" imgPath="/madrasCurry.png" onViewClick={() => handleViewRecipe('Madras Curry')} />
            <Card title="Palak Paneer" imgPath="/palakPaneer.png" onViewClick={() => handleViewRecipe('Palak Paneer')} />
            <Card title="Rogan Josh" imgPath="/roganJosh.png" onViewClick={() => handleViewRecipe('Rogan Josh')} />
            <Card title="Tandoori Chicken" imgPath="/tandooriChicken.png" onViewClick={() => handleViewRecipe('Tandoori Chicken')} />
          </div>
        </div>

        {/* Full Recipe Section */}
        {selectedRecipe && (
          <div className="full-recipe">
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} className="full-recipe-image" />
            <div className="final-recipe">
            <p><strong>Ready In:</strong> {selectedRecipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
              {selectedRecipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <p><strong>Instructions:</strong></p>
            <div dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} />
            </div>
            <button onClick={closeRecipe} className="close-recipe-button">Close</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home2;
