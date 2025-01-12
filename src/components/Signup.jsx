// Signup.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';

const Signup = ({handleLogin}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", data.userName);
          localStorage.setItem("userEmail", data.userEmail);
          handleLogin();
          navigate('/home');
        } else {
          setErrorMessage("Error during signup");
        }
      })
      .catch(error => {
        console.error("Error during signup:", error);
        setErrorMessage("Server error");
      });
  };

  return (
    <div className='loginpage'>
      <main>
        <div className="loginContainer">
          <div className="heading"><h1>Sign Up</h1></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='inputContainer'>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id='name'
                name='name'
                placeholder='Enter name'
                {...register("name", { required: "Name is required" })}
              />
            </div>
            <div className='inputContainer'>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id='email'
                name='email'
                placeholder='Enter email'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            <div className='inputContainer'>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id='password'
                name='password'
                placeholder='Choose a password'
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must be at least 8 characters, include a letter, a number, and a special character",
                  },
                })}
              />
            </div>
            <div className="errorContainer">
              {errors.email && <p>{errors.email.message}</p>}
              {errors.password && <p>{errors.password.message}</p>}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
            <div className='inputContainer submitButton'>
              <input type="submit" value="Sign Up" disabled={isSubmitting} />
            </div>
          </form>
          <div style={{ fontSize: "13px" }}>Already a user? <a href='/login'>Login</a></div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
