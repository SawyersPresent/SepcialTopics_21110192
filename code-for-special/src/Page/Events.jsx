import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventsFromBackend();
  }, []);

  const fetchEventsFromBackend = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Updated API endpoint - removed /users from the path
      const response = await fetch('http://localhost:3001/api/events');
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const eventsData = await response.json();
      
      // Transform backend data to match your frontend format
      const transformedEvents = eventsData.map(event => ({
        id: `ev-${event.id}`,
        title: event.name,
        date: event.event_date,
        time: event.event_time,
        price: parseFloat(event.price),
        // Add default values for fields not in your DB
        location: "Manila Convention Center",
        category: "Cybersecurity",
        capacity: 100,
        description: `Cybersecurity event: ${event.name}`,
        organizer: "CyberSec Philippines"
      }));
      
      setEvents(transformedEvents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events from backend:', error);
      setError('Failed to load events from database');
      setLoading(false);
      
      // Fallback to empty array if backend fails
      setEvents([]);
    }
  };

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `₱${price.toLocaleString()}`;
  };

  const formatTime = (timeString) => {
    // Convert 24-hour time to 12-hour format
    const [hours, minutes] = timeString.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div>
        Loading events from database...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <p>Please check if your backend server is running on localhost:3001</p>
        <button onClick={fetchEventsFromBackend}>Retry</button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div>
        <h2>No events found</h2>
        <p>No events are currently stored in the database.</p>
        <p>Add some events to your PostgreSQL database to see them here.</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.grid}>
        {events.map(event => (
          <Link to={`/events/${event.id}`} key={event.id} className={styles.card}>
            <div style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              padding: '1rem',
              textAlign: 'center'
            }}>
              Security Event
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'white' }}>
              <h3>{event.title}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Time: {formatTime(event.time)}</p>
              <p>Location: {event.location}</p>
              <p>Category: {event.category}</p>
              <p>Price: {formatPrice(event.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Events;
