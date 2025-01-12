import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = ({loggedIn, setLogin}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
    // Clear token from localStorage
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
    <div className='nav'>
        <h1>RecipeRover</h1>
        <div className="navButtons">
          {loggedIn ?<>
            <Link to="/home"><button>Home</button></Link>
            <Link to="/about"><button>About</button></Link>
            <Link to="/profile"><button>Profile</button></Link>
            <button onClick={handleLogout}>Logout</button>
          </>:
            <>
              <Link to="/"><button>Home</button></Link>
              <Link to="/about"><button>About</button></Link>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/signup"><button>SignUp</button></Link>
            </>
          }
        </div>
    </div>
  )
}

export default Navbar
