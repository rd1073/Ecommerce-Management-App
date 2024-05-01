// server.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./database.db');

 

 // User login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        db.serialize(() => {
            db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (!row) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                const passwordMatch = await bcrypt.compare(password, row.password);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                const token = jwt.sign({ userId: row.id, email: row.email, role: row.role }, 'abcd', { expiresIn: '1h' });
                res.json({ user: row, token });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User signup
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        db.serialize(() => {
            db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
                if (err) {
                    if (err.errno === 19) {
                        res.status(400).json({ error: 'Email already exists' });
                    } else {
                        console.log(err);
                        res.status(500).json({ error: 'Internal server error' });
                    }
                } else {
                    res.json({ message: 'User registered successfully' });
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get admins
app.get('/admins', (req, res) => {
    db.all('SELECT * FROM users WHERE role = ?', ['admin'], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(rows);
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});


//hashing test api
 
// Assuming you already have the db instance initialized

// Function to hash the password using bcrypt
const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

// Insert user with hashed password into the database
app.post('/hash-password', async (req, res) => {
    try {
        const {  password } = req.body;

        // Hash the password
        const hashedPassword = await hashPassword(password);

        res.json({ hashedPassword });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const isAdmin = (req, res, next) => {
    // Extract token from request headers
    const token = req.headers.authorization;

    // Check if token is present
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    try {
        // Verify token and decode payload
        const decoded = jwt.verify(token, 'abcd');
        
        // Check if user is admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        // Set user data in request object
        req.user = decoded;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Handle invalid or expired token
        console.error(error);
        return res.status(401).json({ error: 'Unauthorized access' });
    }
};

const protect = async (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.headers.authorization;
    //console.log(req.headers)
  
    if (!token) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
  
    try {
      // Split the authorization header to get the token
      const tokenParts = token.split(" ");
      //console.log(tokenParts)
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        throw new Error("Invalid authorization header format");
      }
      const jwtToken = tokenParts[1];
      //console.log(jwtToken)
  
      // Verify the JWT token
      const decoded = jwt.verify(jwtToken, 'abcd');
      //console.log(decoded) // Use your actual secret key
  
      // Fetch user data from the SQL database based on the decoded token
     const user = await getUserByIdFromDatabase(decoded.id);
  
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
  
      // Set the user object in the request
      req.user = user;
  
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Token is not valid" });
    }
  };
  
  // Function to fetch user data from the SQL database
  const getUserByIdFromDatabase = async (userId) => {
    return new Promise((resolve, reject) => {
        db.run('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

  

 


// Add a Seller
app.post('/add-seller', async (req, res) => {
    try {
        

        const { username, email, password } = req.body;

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Insert seller with hashed password into the database
        db.run('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, 'seller'], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json({ message: 'Seller added successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Get All Sellers
app.get('/get-all-sellers',  (req, res) => {
    db.all('SELECT * FROM users WHERE role = ?', ['seller'], (err, sellers) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(sellers);
        }
    });
});


// Search Sellers by Keyword
app.post('/sellers/search', (req, res) => {
    const { keyword } = req.body;
    db.all('SELECT * FROM users WHERE role = ? AND (username LIKE ? OR email LIKE ?)', ['seller', `%${keyword}%`, `%${keyword}%`], (err, sellers) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(sellers);
        }
    });
});

// Delete a Seller
app.delete('/sellers/delete', isAdmin, (req, res) => {
    const {sellerId} = req.body;
    db.run('DELETE FROM users WHERE id = ? AND role = ?', [sellerId, 'seller'], function(err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (this.changes === 0) {
                res.status(404).json({ error: 'Seller not found' });
            } else {
                res.json({ message: 'Seller deleted successfully' });
            }
        }
    });
});

 













app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
