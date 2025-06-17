import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HashDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const isHash = (str) => {
    // Check if it's a hash (32, 40, or 64 hex characters)
    return /^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/.test(str);
  };

  const isFromScanRoute = () => {
    return location.pathname.startsWith('/scan/');
  };

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      
      // If it's from scan route or it's a hash, show hash analysis
      if (isFromScanRoute() || isHash(id)) {
        setEventDetails({
          id: id,
          title: "File Hash Analysis",
          date: new Date().toISOString().split('T')[0],
          time: "Analysis Complete",
          location: "VirusTotal Database",
          address: "Online Security Analysis",
          category: "Security Analysis",
          price: 0,
          capacity: "Unlimited",
          registered: "N/A",
          description: `Security analysis for file hash: ${id}. This hash has been analyzed using VirusTotal's comprehensive antivirus database.`,
          organizer: "VirusTotal",
          contact: "virustotal@google.com",
          phone: "N/A"
        });
        setLoading(false);
        return;
      }

      // Mock event data for regular events
      const mockEvents = {
        "ev-001": {
          id: "ev-001",
          title: "Cybersecurity Conference 2024",
          date: "2024-07-15",
          time: "09:00 AM - 06:00 PM",
          location: "Tech Center, Manila",
          address: "123 Tech Avenue, Manila",
          category: "Cybersecurity",
          price: 3500,
          capacity: 300,
          registered: 247,
          description: "Annual cybersecurity conference featuring the latest in threat detection and prevention",
          organizer: "CyberSec Philippines",
          contact: "info@cybersecph.com",
          phone: "+63 2 123 4567"
        },
        "ev-002": {
          id: "ev-002",
          title: "Ethical Hacking Workshop",
          date: "2024-07-20",
          time: "10:00 AM - 05:00 PM",
          location: "Security Lab, Makati",
          address: "Security Lab Building, Makati",
          category: "Penetration Testing",
          price: 2800,
          capacity: 50,
          registered: 45,
          description: "Hands-on workshop on ethical hacking techniques and penetration testing methods",
          organizer: "WhiteHat Academy",
          contact: "info@whitehata.com",
          phone: "+63 2 987 6543"
        },
        "ev-003": {
          id: "ev-003",
          title: "Digital Forensics Seminar",
          date: "2024-07-25",
          time: "02:00 PM - 06:00 PM",
          location: "Law Enforcement Academy, Quezon City",
          address: "Academy Grounds, Quezon City",
          category: "Digital Forensics",
          price: 4200,
          capacity: 100,
          registered: 78,
          description: "Advanced digital forensics techniques for investigating cyber crimes",
          organizer: "Forensics Institute",
          contact: "info@forensics.ph",
          phone: "+63 2 456 7890"
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
    return <div>Loading details...</div>;
  }

  if (!eventDetails) {
    return (
      <div>
        <h2>Not found</h2>
        <Link to={isFromScanRoute() ? "/search" : "/events"}>
          ← Back to {isFromScanRoute() ? "Hash Search" : "Events"}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to={isFromScanRoute() ? "/search" : "/events"}>
        ← Back to {isFromScanRoute() ? "Hash Search" : "Events"}
      </Link>
      
      <h1>{eventDetails.title}</h1>
      <p>Date: {new Date(eventDetails.date).toLocaleDateString()}</p>
      <p>Time: {eventDetails.time}</p>
      <p>Location: {eventDetails.location}</p>
      <p>Address: {eventDetails.address}</p>
      <p>Category: {eventDetails.category}</p>
      <p>Price: {eventDetails.price === 0 ? 'Free' : `₱${eventDetails.price.toLocaleString()}`}</p>
      
      {!isFromScanRoute() && !isHash(id) && (
        <>
          <p>Capacity: {eventDetails.capacity} people</p>
          <p>Registered: {eventDetails.registered} / {eventDetails.capacity}</p>
        </>
      )}

      <h3>About This {isFromScanRoute() || isHash(id) ? 'Analysis' : 'Event'}</h3>
      <p>{eventDetails.description}</p>

      <h3>Contact Information</h3>
      <p>Organizer: {eventDetails.organizer}</p>
      <p>Email: {eventDetails.contact}</p>
      <p>Phone: {eventDetails.phone}</p>

      {!isFromScanRoute() && !isHash(id) && <button>Register for Event</button>}
      {(isFromScanRoute() || isHash(id)) && <p><strong>Hash:</strong> <code>{id}</code></p>}
    </div>
  );
}

export default HashDetails;