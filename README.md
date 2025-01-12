# RecipeRover

RecipeRover is a web application that helps users explore recipes, generate personalized recipes based on available ingredients, and manage their favorite recipes. Users can also leave and view reviews about the platform.

## Features

1. **Search for Recipes:** Users can search for recipes by name and get detailed instructions and ingredients.
2. **Generate Recipes:** Users can input available ingredients and generate personalized recipes.
3. **Save Recipes:** Users can save their favorite recipes and view or manage them later.
4. **Recipe Count:** Users can view the total number of recipes saved in their profile.
5. **User Reviews:** Users can leave reviews about their experience and read reviews from others.
6. **Secure Authentication:** User authentication with JSON Web Tokens (JWT) for secure access.

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **React Router**: For navigation between pages.

### Backend

- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store user data, recipes, and reviews.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT (jsonwebtoken)**: For secure user authentication.

## Installation

### Prerequisites

- Node.js installed on your system.
- MongoDB installed and running locally.

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd RecipeRover
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the MongoDB server:

   ```bash
   mongod
   ```

4. Set up environment variables in a `.env` file:

   ```env
   REACT_APP_JWT_SECRET_KEY=your_jwt_secret
   REACT_APP_API_KEY=your_spoonacular_api_key
   ```

5. Run the server:

   ```bash
   npm start
   ```

6. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication

- `POST /signup`: Create a new user account.
- `POST /login`: Log in and retrieve a JWT token.

### Recipe Management

- `POST /saveRecipe`: Save a recipe to the user’s profile.
- `GET /savedRecipes`: Fetch all saved recipes for the logged-in user.
- `GET /savedRecipes/count`: Fetch the total number of recipes saved by the user.
- `DELETE /deleteRecipe/:recipeId`: Delete a specific recipe from the user’s saved list.

### Reviews

- `GET /reviews`: Fetch all user reviews.
- `POST /reviews`: Post a new review.

## Project Structure

```
RecipeRover/
|--backend/
   |-- models/
   |   |-- User.js            # Mongoose model for users
   |   |-- SavedRecipe.js     # Mongoose model for saved recipes
   |   |-- Review.js          # Mongoose model for user reviews
   |--server.js
|--public                  # Contains all the images
|--src/
|  |-- components/
   |   |-- Home.jsx       # Main landing page
   |   |-- Profile.jsx    # User profile page
   |   |--  # All other components
   |-- App.jsx             # Main React app file
   |-- index.css          
   |-- App.css
   |-- Main.jsx
|-- .env
|-- .gitignore
|-- eslint.config.js
|-- inddex.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- vite.config.js
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added a new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data.
- The open-source community for libraries and tools.

## Contact

For any queries, feel free to contact:

- **Email:** [[themanaskumar1@gmail.com](mailto\:themanaskumar1@gmail.com)]
- **GitHub:** [[themanaskumar](https://github.com/themanaskumar)]

