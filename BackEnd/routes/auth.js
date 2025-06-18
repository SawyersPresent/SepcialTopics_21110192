import express from 'express';
import pgclient from '../db.js';

const router = express.Router();

// POST signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role = 'user' } = req.body;
        
        // Validate role
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Must be admin or user' });
        }
        
        // Check if user already exists
        const existingUser = await pgclient.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }
        
        // Insert new user
        const result = await pgclient.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, password, role]
        );
        
        const user = result.rows[0];
        
        res.status(201).json({
            message: 'User created successfully',
            user: user
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const result = await pgclient.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const user = result.rows[0];
        
        // Check password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Return user data (excluding password)
        const { password: _, ...userWithoutPassword } = user;
        
        res.json({
            message: 'Login successful',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;