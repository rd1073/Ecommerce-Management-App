import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';


import Button from 'react-bootstrap/Button';
import MainMenu from './MainMenu';
import Navbar from './Navbar';
 
const Admins = () => {
    const [admins, setAdmins] = useState([]);

   const [searchTerm, setSearchTerm] = useState('');
  // Default to show 10 entries
   


    useEffect(() => {
        // Fetch admins from the server
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:3001/admins'); // Replace with your server URL
                setAdmins(response.data);
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        };

        fetchAdmins();
    }, []);

 
const handleSearchTermChange = (e) => {
  setSearchTerm(e.target.value); // Update search term state
};

const handleSearch = () => {
  // Fetch admin list with current search term
 };

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
      // Trigger search when Enter key is pressed
      handleSearch();
  }
};

 
  return (
    <div className="container">
        <Navbar />
     <MainMenu />
    
                
     


            <div className="d-flex justify-content-end">
                            <div className="d-flex">
                                <Form.Control
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchTermChange}
                                    className="me-2"
                                    
                                />
                             </div>
                        </div>
                     
                     
            
   
        
  
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Table striped style={{ maxWidth: '100%', width: '80%', marginLeft: 'auto', marginRight: 'auto', marginLeft: '7rem', marginTop: '2rem' }}>
        
      <thead>
        <tr>
          <th>#</th>
          <th>Id</th>
          <th>Username</th>
          <th>Email ID</th>
          <th>Admin </th>
 
        </tr>
      </thead>
      <tbody>
      {admins.map((admin, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{admin.id}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{admin.role}</td>
 

                            {/* Add more table cells as needed */}
                        </tr>
                    ))}
        
         
        
      </tbody>
    </Table>

     
      
    </div>

      
</div>

    
  )
}

export default Admins
