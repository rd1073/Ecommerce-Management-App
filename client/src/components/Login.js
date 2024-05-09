// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

import bg from'../assets/bg.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios.post('http://localhost:3001/login', { email, password })
            .then(response => {
                console.log(response); 
                console.log("login done");
                if (response.data && response.data.token) {
                  // Store the JWT token in session storage
                  localStorage.setItem("userInfo", JSON.stringify(response));
}
                navigate('/dashboard')// Handle successful login
            })
            .catch(error => {
                console.error(error.response.data); // Handle login error
            });
    };
    const handleCreate = () => {
       

              navigate('/signup')// Handle successful login
    
  };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Image on the left */}
        <div
          style={{
            width: '50rem', // Adjust width as needed
            height: '100%',
            display: 'flex',
          
          }}
        >
          <img
            src={bg}
            alt="Image"
            style={{
              height: '100%',
              maxWidth: '100%', // Ensure the image does not exceed the container's width
              objectFit: 'cover' // Cover the entire container while maintaining aspect ratio
            }}
          />
        </div>
      </div>
      <div
        style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          flexDirection: 'column'
        }}
      >
        {/* Login form on the right */}
        <h2 style={{ marginBottom: '20px' }}>Login</h2>
                  <div style={{ marginBottom: '10px' }}>
            
            <input
              type="text"
              value={email}
              placeholder="Email ID"
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px', marginRight: '10px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', marginRight: '10px' }}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
             
          </div>
          <div style={{ marginBottom: '20px' }}>
  <div style={{ marginBottom: '10px' }}>
    <button
      type="submit"
      onClick={handleLogin}
      style={{
        padding: '10px 40px', // Increased width
        backgroundColor: 'blue', // Blue background color
        color: 'white', // White text color
        border: 'none', // Remove border
        borderRadius: '5px', // Add border radius for a rounded look
        cursor: 'pointer',
        width: '12rem' // Add pointer cursor on hover
      }}
    >
      Login
    </button>
  </div>
  <div>
    <button
      type="submit"
      onClick={handleCreate}
      style={{
        padding: '10px 40px', // Increased width
        backgroundColor: 'blue', // Blue background color
        color: 'white', // White text color
        border: 'none', // Remove border
        borderRadius: '5px', // Add border radius for a rounded look
        cursor: 'pointer',
        width: '12rem' // Add pointer cursor on hover
      }}
    >
      Create Account
    </button>
  </div>
</div>


        
      </div>
    </div>
        
    );
};

export default Login;
