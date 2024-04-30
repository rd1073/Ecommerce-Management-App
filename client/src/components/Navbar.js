import React from 'react';

const Navbar = ({ onLogout }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
            <div>
                <h1>My E-commerce Site</h1>
            </div>
            <div>
                <button style={{ padding: '8px 16px' }} onClick={onLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
