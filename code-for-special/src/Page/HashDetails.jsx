import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HashDetails() {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      
      // Mock event data
      const mockEvents = {
        "ev-001": {
          id: "ev-001",
          title: "React Conference 2024",
          date: "2024-07-15",
          time: "09:00 AM - 06:00 PM",
          location: "Convention Center, Manila",
          address: "123 Convention Avenue, Pasay City, Metro Manila",
          category: "Technology",
          price: 2500,
          capacity: 500,
          registered: 347,
          description: "Join us for the most anticipated React conference of the year! Learn from industry experts, network with fellow developers, and discover the latest trends in React development.",
          organizer: "Tech Events PH",
          contact: "info@techeventsph.com",
          phone: "+63 2 123 4567"
        },
        "ev-002": {
          id: "ev-002",
          title: "Food Festival 2024",
          date: "2024-07-20",
          time: "10:00 AM - 08:00 PM",
          location: "Rizal Park, Manila",
          address: "Rizal Park, Ermita, Manila",
          category: "Food & Drink",
          price: 0,
          capacity: 1000,
          registered: 756,
          description: "Experience the best Filipino cuisine and international dishes in this amazing food festival.",
          organizer: "Manila Food Society",
          contact: "info@manilafood.com",
          phone: "+63 2 987 6543"
        },
        "ev-003": {
          id: "ev-003",
          title: "Music Festival",
          date: "2024-07-25",
          time: "06:00 PM - 12:00 AM",
          location: "MOA Arena, Pasay",
          address: "Mall of Asia Complex, Pasay City",
          category: "Music",
          price: 1800,
          capacity: 15000,
          registered: 12450,
          description: "Live performances from top local and international artists in this spectacular music festival.",
          organizer: "Live Nation Philippines",
          contact: "info@livenation.ph",
          phone: "+63 2 555 0123"
        }
      };

      setEventDetails(mockEvents[id]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (!eventDetails) {
    return (
      <div>
        <h2>Event not found</h2>
        <Link to="/events">← Back to Events</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/events">← Back to Events</Link>
      
      <h1>{eventDetails.title}</h1>
      <p>Date: {new Date(eventDetails.date).toLocaleDateString()}</p>
      <p>Time: {eventDetails.time}</p>
      <p>Location: {eventDetails.location}</p>
      <p>Address: {eventDetails.address}</p>
      <p>Category: {eventDetails.category}</p>
      <p>Price: {eventDetails.price === 0 ? 'Free' : `₱${eventDetails.price.toLocaleString()}`}</p>
      <p>Capacity: {eventDetails.capacity} people</p>
      <p>Registered: {eventDetails.registered} / {eventDetails.capacity}</p>

      <h3>About This Event</h3>
      <p>{eventDetails.description}</p>

      <h3>Contact Information</h3>
      <p>Organizer: {eventDetails.organizer}</p>
      <p>Email: {eventDetails.contact}</p>
      <p>Phone: {eventDetails.phone}</p>

      <button>Register for Event</button>
    </div>
  );
}

export default HashDetails;