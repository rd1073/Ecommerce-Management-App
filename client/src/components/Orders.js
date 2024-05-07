import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table';

import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';


import Button from 'react-bootstrap/Button';
import MainMenu from './MainMenu';
import Navbar from './Navbar';
import { MdDeleteForever } from "react-icons/md";




const Order = () => {
    const [sellers, setSellers] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [newSeller, setNewSeller] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const token = sessionStorage.getItem('userInfo');


    useEffect(() => {
        getAllSellers();
    }, []);

    const getAllSellers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/get-all-orders');
            setSellers(response.data);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };

    const searchSellers = async () => {
        try {
            const response = await axios.post('http://localhost:3001/sellers/search', { keyword });
            setSellers(response.data);
        } catch (error) {
            console.error('Error searching sellers:', error);
        }
    };

    const addSeller = async () => {
        try {
            await axios.post('http://localhost:3001/add-sellers', newSeller);
            setNewSeller({
                username: '',
                email: '',
                password: ''
            });
            getAllSellers();
        } catch (error) {
            console.error('Error adding seller:', error);
        }
    };

    const deleteSeller = async (sellerId) => {
        try {
            //console.log(sellerId)
            // Send a DELETE request to the backend to delete the seller
            const response = await axios.delete('http://localhost:3001/sellers/delete', {
                data: { sellerId }, // Pass sellerId in the request body
                headers: {
                    'Authorization': `Bearer ${token}` // Include authorization token if needed
                }
            });
    
            // Handle response if necessary
            console.log(response.data);
            window.location.reload()
        } catch (error) {
            console.error('Error deleting seller:', error);
        }
    };
    
    // Call the deleteSeller function with the sellerId when a delete button is clicked
    

    const handleSearchTermChange = (e) => {
        setKeyword(e.target.value); // Update search term state
        searchSellers();
    };
    
      const handleAddSellerClick = () => {
        navigate('/add-seller');
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
                                    value={keyword}
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
          <th>Cutomer ID</th>
          <th>Order Date</th>
          <th>Total Amount</th>
       
 
        </tr>
      </thead>
      <tbody>
      {sellers.map((seller, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{seller.customer_id}</td>
                            <td>{seller.order_date}</td>
                            <td>{seller.total_amount}</td>
                             <td><button onClick={() => deleteSeller(seller.id)}> <MdDeleteForever /></button>
 </td>

 

                            {/* Add more table cells as needed */}
                        </tr>
                    ))}
        
         
        
      </tbody>
    </Table>

     
      
    </div>
     

      
</div>
  )
}

export default Order
