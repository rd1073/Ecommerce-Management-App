// Signup.js

import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        axios.post('http://localhost:3001/signup', { username, email, password })
            .then(response => {
                console.log(response.data); // Handle successful signup
            })
            .catch(error => {
                console.error(error.response.data); // Handle signup error
            });
    };

    return (
        <div>
            <h2>Signup</h2>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;
