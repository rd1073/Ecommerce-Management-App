import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

import bg from'../assets/bg.jpg';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        axios.post('http://localhost:3001/signup', { username, email, password })
            .then(response => {
                console.log(response.data); 
                console.log("signup done");
                // Handle successful signup
                navigate('/login');
            })
            .catch(error => {
                console.error(error.response.data); // Handle signup error
            });
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
                {/* Signup form on the right */}
                <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: '10px', marginRight: '10px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
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
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ padding: '10px', marginRight: '10px' }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <button
                        type="submit"
                        onClick={handleSignup}
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
                        Sign Up
                    </button>
                </div>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;
