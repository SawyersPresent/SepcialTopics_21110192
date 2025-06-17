import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      
      // Cyber security themed events data
      const mockEvents = [
        {
          id: "ev-001",
          title: "Cybersecurity Conference 2024",
          date: "2024-07-15",
          time: "09:00 AM",
          location: "Tech Center, Manila",
          category: "Cybersecurity",
          price: 3500,
          capacity: 300,
          description: "Annual cybersecurity conference featuring the latest in threat detection and prevention",
          organizer: "CyberSec Philippines"
        },
        {
          id: "ev-002", 
          title: "Ethical Hacking Workshop",
          date: "2024-07-20",
          time: "10:00 AM",
          location: "Security Lab, Makati",
          category: "Penetration Testing",
          price: 2800,
          capacity: 50,
          description: "Hands-on workshop on ethical hacking techniques and penetration testing methods",
          organizer: "WhiteHat Academy"
        },
        {
          id: "ev-003",
          title: "Digital Forensics Seminar",
          date: "2024-07-25",
          time: "02:00 PM",
          location: "Law Enforcement Academy, Quezon City",
          category: "Digital Forensics",
          price: 4200,
          capacity: 100,
          description: "Advanced digital forensics techniques for investigating cyber crimes",
          organizer: "Forensics Institute"
        },
        {
          id: "ev-004",
          title: "Network Security Summit",
          date: "2024-08-01",
          time: "08:00 AM",
          location: "IT Park, Cebu",
          category: "Network Security",
          price: 0,
          capacity: 200,
          description: "Free summit on network security best practices and emerging threats",
          organizer: "SecureNet PH"
        }
      ];

      setEvents(mockEvents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `₱${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div>
        Loading events...
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
              <p>Time: {event.time}</p>
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
