// LoginPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';

const LoginPage = ({handleLogin}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch('http://localhost:3000/login', {
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
          handleLogin();
          localStorage.setItem("userName", data.userName);
          localStorage.setItem("userEmail", data.userEmail);
          navigate('/home');
        } else {
          setErrorMessage("Invalid credentials");
        }
      })
      .catch(error => {
        console.error("Error during login:", error);
        setErrorMessage("Server error");
      });
  };

  return (
    <div className='loginpage'>
      <main>
        <div className="loginContainer">
          <div className="heading">
            <h1>Login</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='inputContainer'>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id='email'
                name='email'
                placeholder='Enter email'
                {...register("email", { required: "Email is required" })}
              />
            </div>
            <div className='inputContainer'>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id='password'
                name='password'
                placeholder='Enter password'
                {...register("password", { required: "Password is required" })}
              />
            </div>
            <div className="errorContainer">
              {errorMessage && <p>{errorMessage}</p>}
            </div>
            <div className='inputContainer submitButton'>
              <input type="submit" value="Login" disabled={isSubmitting} />
            </div>
          </form>
          <div style={{ fontSize: "13px" }}>
            New user? <a href='/signup'>Sign up</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
