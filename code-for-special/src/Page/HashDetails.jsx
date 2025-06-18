import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VT_API_KEY = '71bcc79b2116544095460baafc059c8ee71cc572f707a684120592b9049d7292';

function HashDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const isHash = (str) => {
    return /^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/.test(str);
  };

  const isFromScanRoute = () => {
    return location.pathname.startsWith('/scan/');
  };

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (isFromScanRoute() || isHash(id)) {
        // For hash IDs, we can use the VirusTotal API to fetch real data
        const response = await axios.get(`https://www.virustotal.com/api/v3/files/${id}`, {
          headers: {
            'x-apikey': VT_API_KEY
          }
        });

        const analysisDetails = response.data.data;
        const stats = analysisDetails.attributes.last_analysis_stats;
        const totalEngines = Object.values(stats).reduce((sum, count) => sum + count, 0);
        const maliciousCount = stats.malicious + stats.suspicious;

        setEventDetails({
          id: id,
          title: "File Hash Analysis",
          date: new Date(analysisDetails.attributes.last_analysis_date * 1000).toISOString().split('T')[0],
          time: "Analysis Complete",
          location: "VirusTotal Database",
          address: "Online Security Analysis",
          category: "Security Analysis",
          price: 0,
          capacity: "Unlimited",
          registered: "N/A",
          description: `Security analysis for file hash: ${id}. This hash has been analyzed using VirusTotal's comprehensive antivirus database. ${maliciousCount}/${totalEngines} engines detected threats.`,
          organizer: "VirusTotal",
          contact: "virustotal@google.com",
          phone: "N/A"
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching hash details:', error);
      setError('Failed to fetch analysis details');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🔍</div>
        Loading analysis details...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Error loading analysis</h2>
        <p style={{ color: '#dc3545' }}>{error}</p>
        <Link to="/events" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Scans
        </Link>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Analysis not found</h2>
        <Link to="/events" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Scans
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/search">Back to Hash Search</Link>
      
      <h1>{eventDetails.title}</h1>
      <p>Analysis Date: {new Date(eventDetails.date).toLocaleDateString()}</p>
      <p>Status: {eventDetails.time}</p>
      <p>Database: {eventDetails.location}</p>
      <p>Source: {eventDetails.address}</p>
      <p>Analysis Type: {eventDetails.category}</p>

      <h3>Analysis Results</h3>
      <p>{eventDetails.description}</p>
      <p>Hash: {id}</p>

      <h3>Scan Information</h3>
      <p>Service: {eventDetails.organizer}</p>
      <p>Contact: {eventDetails.contact}</p>
    </div>
  );
}

export default HashDetails;