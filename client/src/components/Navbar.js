import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


    

const Navbar = ({ }) => {
    
        const navigate = useNavigate();
    
        const handleLogout = () => {
            // Remove the user information from session storage
            sessionStorage.removeItem('userInfo');
            // Redirect to the login page
            navigate('/login');};
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
            <div>
                <h1>My E-commerce Site</h1>
            </div>
            <div>
                <button style={{ padding: '8px 16px' }} onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
