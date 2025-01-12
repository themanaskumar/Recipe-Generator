import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="aboutpage">
      <main>
        <section className="about-intro">
          <h1>About RecipeRover</h1>
          <p>
            RecipeRover is your ultimate companion for creating delicious meals
            with the ingredients you already have. Our mission is to make
            cooking easy, enjoyable, and accessible for everyone.
          </p>
        </section>
        <section className="features">
          <h2>What We Offer</h2>
          <ul>
            <li>Generate recipes based on ingredients you have.</li>
            <li>Save and manage your favorite recipes.</li>
            <li>Explore trending and seasonal recipes.</li>
          </ul>
        </section>
        <section class="how-it-works">
          <h2>How It Works</h2>
          <ol>
            <li>Enter the ingredients you have.</li>
            <li>Browse through the generated recipes.</li>
            <li>Save or share your favorite ones.</li>
          </ol>
        </section>
        <section className="creator-intro">
            <h2>Meet the Creator</h2>
            <p>RecipeRover was created by Manas Kumar, a passionate Computer Science and Engineering student at Cochin University of Science and Technology. Combining a love for technology and a curiosity for culinary exploration, Manas developed RecipeRover to make meal preparation simpler, more enjoyable, and accessible for everyone.</p>
            <div className="creators">
                <div className="creator">
                    <img src="/profile-pic-with-bg.jpg" alt="" />
                    <h2>Manas Kumar</h2>
                </div>
            </div>
        </section>
        <section class="call-to-action">
      <h3>Thankyou for visiting ReipeRover. Start cooking today!</h3>
    </section>
      </main>
    </div>
  );
};

export default About;
