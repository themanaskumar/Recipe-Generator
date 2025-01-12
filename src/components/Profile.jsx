import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = ({ loggedIn, setLogin }) => {
  const [savedRecipeCount, setSavedRecipeCount] = useState(0);
  const navigate = useNavigate();

  // Fetch the number of saved recipes
  useEffect(() => {
    const fetchSavedRecipeCount = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:3000/savedRecipes/count', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSavedRecipeCount(data.count || 0);
        } else {
          console.error('Failed to fetch saved recipes count');
        }
      } catch (error) {
        console.error('Error fetching saved recipes count:', error);
      }
    };

    fetchSavedRecipeCount();
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      // Clear token and user details from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');

      // Update logged-in state
      setLogin(false);

      // Redirect to login page
      navigate('/login');
    }
  };

  return (
    <div className="profilepage">
      <main>
        <div className="profileDetails">
          <div className="profileImage">
            <img src="/profileImage.png" alt="Profile" />
          </div>
          <h2>{localStorage.getItem('userName')}</h2>
          <div className="email">{localStorage.getItem('userEmail')}</div>
          <div className="savedRecipenum">{savedRecipeCount} Recipes Saved</div>
        </div>
        <div className="menu">
          <Link to="/viewSaved">
            <button className="option">View Saved Recipes</button>
          </Link>
          <button className="option">Edit Profile</button>
          <button className="option">Change Password</button>
          <button className="option" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
