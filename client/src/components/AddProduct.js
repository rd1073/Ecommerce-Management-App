import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import MainMenu from './MainMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            // Check if the token exists in sessionStorage
            
                // Include the JWT token in the request headers
                const response = await axios.post(
                    'http://localhost:3001/add-product', 
                    { productName, price, description }
                );
    
                // Reset form after successful submission
                setDescription('');
                setPrice('');
                setProductName('');
                console.log('Seller added successfully!');
                navigate('/products');
            
        } catch (error) {
            console.error('Error adding seller:', error);
        }
    };
    

    return (
        <div className="container">
            <Navbar />
            <MainMenu />
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1>Add Product</h1>
                <Form>
                    <Form.Group controlId="formBasicProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
                    </Form.Group>

                    <Button variant="primary" onClick={addProduct}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddProduct;
