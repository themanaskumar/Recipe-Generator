import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import SavedRecipe from "./models/SavedRecipe.js"; // Import the SavedRecipe model
import Review from "./models/Review.js"; // Import the Review model

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
const JWT_SECRET = `process.env.REACT_APP_JWT_SECRET_KEY`;

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/recipeRoverDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware for checking JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    req.user = user;
    next();
  });
};

// Routes for user signup and login
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "2h" });
    res.status(201).json({
      message: "User created successfully",
      token,
      userName: newUser.name,
      userEmail: newUser.email,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({ message: "Login successful", userName: user.name, userEmail: user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for saving a recipe
app.post("/saveRecipe", authenticateJWT, async (req, res) => {
  const { recipeId, title, image } = req.body;

  if (!recipeId || !title) {
    return res.status(400).json({ message: "Recipe ID and title are required" });
  }

  try {
    const savedRecipe = new SavedRecipe({
      userId: req.user.userId,
      recipeId,
      title,
      image,
    });

    await savedRecipe.save();
    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "Error saving recipe" });
  }
});

// Route for fetching saved recipes
app.get("/savedRecipes", authenticateJWT, async (req, res) => {
  try {
    const savedRecipes = await SavedRecipe.find({ userId: req.user.userId });
    res.status(200).json(savedRecipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ message: "Error fetching saved recipes" });
  }
});

// Route for deleting a saved recipe
app.delete("/deleteRecipe/:recipeId", authenticateJWT, async (req, res) => {
  const { recipeId } = req.params;

  try {
    const deletedRecipe = await SavedRecipe.findOneAndDelete({
      userId: req.user.userId,
      recipeId,
    });

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Error deleting recipe" });
  }
});

// Route for counting saved recipes
app.get("/savedRecipes/count", authenticateJWT, async (req, res) => {
  try {
    const count = await SavedRecipe.countDocuments({ userId: req.user.userId });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching saved recipe count:", error);
    res.status(500).json({ message: "Error fetching saved recipe count" });
  }
});

// Route for fetching reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// Route for posting a review
app.post("/reviews", async (req, res) => {
  const { name, review } = req.body;

  if (!name || !review) {
    return res.status(400).json({ message: "Name and review are required" });
  }

  try {
    const newReview = new Review({ name, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ message: "Error posting review" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
