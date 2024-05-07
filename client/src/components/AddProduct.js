import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import MainMenu from './MainMenu';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const addProduct = () => {
        // Add logic to handle adding product
        console.log('Adding product...');
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
