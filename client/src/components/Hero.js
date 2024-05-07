import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Hero.css'; // Import CSS for styling

const HeroPage = () => {
    return (
        <div className="hero-container">
            <h1 className="hero-heading">Welcome to Your Ecommerce Store</h1>
            <p className="hero-description">Discover the best deals on a wide range of products!</p>
            <Link to="/shop" className="btn btn-primary hero-btn">Shop Now</Link>
        </div>
    );
};

export default HeroPage;
