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

                const token = jwt.sign({ userId: row.id, email: row.email, role: row.role }, 'your_secret_key', { expiresIn: '1h' });
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

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
