import express from 'express';
import pgclient from '../db.js';

const router = express.Router();

// GET all events
router.get('/events', async (req, res) => {
    try {
        const result = await pgclient.query('SELECT * FROM events ORDER BY event_date');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET event by ID
router.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pgclient.query('SELECT * FROM events WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST create new event
router.post('/events', async (req, res) => {
    try {
        const { name, event_date, event_time, price } = req.body;
        
        const result = await pgclient.query(
            'INSERT INTO events (name, event_date, event_time, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, event_date, event_time, price]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update event
router.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, event_date, event_time, price } = req.body;
        
        const result = await pgclient.query(
            'UPDATE events SET name = $1, event_date = $2, event_time = $3, price = $4 WHERE id = $5 RETURNING *',
            [name, event_date, event_time, price, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE event
router.delete('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await pgclient.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;