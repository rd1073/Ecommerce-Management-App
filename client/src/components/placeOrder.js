import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

import Navbar from './Navbar';
import MainMenu from './MainMenu';

const PlaceOrder = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/get-all-products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductSelect = (productId, price) => {
        const updatedSelectedProducts = [...selectedProducts, productId];
        setSelectedProducts(updatedSelectedProducts);
        setQuantities({ ...quantities, [productId]: 1 });
        setTotalAmount(totalAmount + price);
    };

    const handleQuantityChange = (productId, quantity) => {
        const updatedQuantities = { ...quantities, [productId]: quantity };
        setQuantities(updatedQuantities);

        // Update total amount based on quantities
        let newTotalAmount = 0;
        for (const [productId, quantity] of Object.entries(updatedQuantities)) {
            const product = products.find(p => p.id === parseInt(productId));
            newTotalAmount += product.price * quantity;
        }
        setTotalAmount(newTotalAmount);
    };

    const handlePlaceOrder = async () => {
        try {
            // Prepare order data
            const orderDetails = selectedProducts.map(productId => {
                return {
                    productId,
                    quantity: quantities[productId]
                };
            });

            // Send order details to backend to update the database
            await axios.post('http://localhost:3001/place-order', { orderDetails, totalAmount });
            // Optionally, redirect to a confirmation page or show a success message
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="container">
            <Navbar />
            <MainMenu />

            <div className="row">
                <div className="col-md-8">
                    <h2>Available Products</h2>
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleProductSelect(product.id, product.price)}
                                />
                                {product.product_name} - ${product.price}
                                <input
                                    type="number"
                                    value={quantities[product.id] || ''}
                                    onChange={e => handleQuantityChange(product.id, parseInt(e.target.value))}
                                    disabled={!selectedProducts.includes(product.id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h2>Order Summary</h2>
                    <p>Total Amount: ${totalAmount}</p>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
