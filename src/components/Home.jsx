import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // State to manage reviews
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [userName, setUserName] = useState("");

  // Fetch existing reviews from the server
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3000/reviews");
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (newReview && userName) {
      const review = {
        name: userName,
        review: newReview,
      };

      try {
        const response = await fetch("http://localhost:3000/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        });

        if (response.ok) {
          const savedReview = await response.json();
          setReviews([...reviews, savedReview]); // Add new review to the list
          setNewReview(""); // Reset review input field
          setUserName(""); // Reset username input field
        } else {
          alert("Failed to submit review. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Error submitting review. Please try again.");
      }
    } else {
      alert("Please fill in both username and review!");
    }
  };

  return (
    <div className="homePage">
      <main>
        <div className="welcome">
          <div className="heading">
            <h1>Welcome to RecipeRover</h1>
          </div>
          <p>
            Feeling hungry but don't know what to make? You are at the right spot.
          </p>
          <p>
            Here at RecipeRover you can get your favourite recipes in the click of a button or you can also generate recipes based on the availability of ingredients with you. Enjoy your meal with us.
          </p>
        </div>

        {/* Existing content */}
        <div className="homeContainer">
          <div className="internalContainer">
            <div>
              <h2>Search for a recipe</h2>
              <p>
                Search for the recipe of the dish you want to eat and get it in the click of a button.
              </p>
            </div>
            <div>
              <button onClick={() => navigate("/login")}>Search</button>
            </div>
          </div>
          <div className="internalContainer">
            <div>
              <button onClick={() => navigate("/login")}>Generate</button>
            </div>
            <div>
              <h2>Generate a recipe</h2>
              <p>
                Just enter the ingredients available with you and get an awesome recipe based on the given ingredients.
              </p>
            </div>
          </div>
          <div className="internalContainer">
            <div>
              <h2>Login to continue</h2>
              <p>
                Just log in or create a new account to continue your journey with us.
              </p>
            </div>
            <div>
              <button onClick={() => navigate("/login")}>Login</button>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="reviewSection">
          <h2>User Reviews</h2>
          <div className="reviewsList">
            {reviews.length === 0 ? (
              <p>No reviews yet. Be the first to leave a review!</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="reviewItem">
                  <strong>{review.name}: </strong>
                  <p>{review.review}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="reviewSection">
          <h2>Leave a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Review"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
              rows="8"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;