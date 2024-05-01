import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import axios from 'axios';
import MainMenu from './MainMenu';
import Navbar from './Navbar';

const AddSeller = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    

    const addSeller = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('userInfo');
            console.log('Token from sessionStorage:', token);
    
            // Check if token exists before parsing
            if (token) {
                //const tokenInfo = JSON.parse(token);
                //const tokenn = tokenInfo.token;
                //console.log('Parsed token:', tokenn);
    
                // Include the JWT token in the request headers
                const response = await axios.post('http://localhost:3001/add-seller', {
                    username,
                    email,
                    password
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                // Reset form after successful submission
                setUsername('');
                setEmail('');
                setPassword('');
                console.log('Seller added successfully!');
                navigate('/seller');
            } else {
                console.error('Token not found in sessionStorage');
            }
        } catch (error) {
            console.error('Error adding seller:', error);
        }
    };
    
    

    return (
        <div className="container">
            <Navbar />
            <MainMenu />
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1>Add Seller</h1>
                <Form >
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" onClick={addSeller}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddSeller;
