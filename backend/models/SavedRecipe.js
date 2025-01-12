import mongoose from "mongoose";

const savedRecipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ensures every saved recipe is tied to a user
  },
  recipeId: {
    type: String,
    required: true, // The ID of the recipe from the external API
  },
  title: {
    type: String,
    required: true, // Name of the recipe
  },
  image: {
    type: String, // URL for the recipe image
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically adds a timestamp when the recipe is saved
  },
});

const SavedRecipe = mongoose.model("SavedRecipe", savedRecipeSchema);
export default SavedRecipe;
