import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EventDetails() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Extract the numeric ID from 'ev-1' format
      const eventId = id.startsWith('ev-') ? id.replace('ev-', '') : id;
      
      const response = await fetch(`http://localhost:3001/api/events/${eventId}`);
      
      if (!response.ok) {
        throw new Error('Event not found');
      }
      
      const eventData = await response.json();
      
      // Transform backend data to frontend format
      setEventDetails({
        id: `ev-${eventData.id}`,
        title: eventData.name,
        date: eventData.event_date,
        time: eventData.event_time,
        location: "Manila Convention Center",
        address: "Manila Convention Center, Philippines",
        category: "Cybersecurity",
        price: parseFloat(eventData.price),
        capacity: 100,
        registered: Math.floor(Math.random() * 90) + 10, // Random registration count
        description: `Cybersecurity event: ${eventData.name}. Join us for an intensive learning experience in cybersecurity.`,
        organizer: "CyberSec Philippines",
        contact: "info@cybersecph.com",
        phone: "+63 2 123 4567"
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setError('Failed to load event details');
      setLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "TBD";
    const [hours, minutes] = timeString.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (error || !eventDetails) {
    return (
      <div>
        <h2>Event not found</h2>
        <p>{error}</p>
        <Link to="/events">← Back to Events</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/events">← Back to Events</Link>
      
      <h1>{eventDetails.title}</h1>
      <p><strong>Date:</strong> {new Date(eventDetails.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {formatTime(eventDetails.time)}</p>
      <p><strong>Location:</strong> {eventDetails.location}</p>
      <p><strong>Address:</strong> {eventDetails.address}</p>
      <p><strong>Category:</strong> {eventDetails.category}</p>
      <p><strong>Price:</strong> {eventDetails.price === 0 ? 'Free' : `₱${eventDetails.price.toLocaleString()}`}</p>
      <p><strong>Capacity:</strong> {eventDetails.capacity} people</p>
      <p><strong>Registered:</strong> {eventDetails.registered} / {eventDetails.capacity}</p>

      <h3>About This Event</h3>
      <p>{eventDetails.description}</p>

      <h3>Contact Information</h3>
      <p><strong>Organizer:</strong> {eventDetails.organizer}</p>
      <p><strong>Email:</strong> {eventDetails.contact}</p>
      <p><strong>Phone:</strong> {eventDetails.phone}</p>

      <button 
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Register for Event
      </button>
    </div>
  );
}

export default EventDetails;
