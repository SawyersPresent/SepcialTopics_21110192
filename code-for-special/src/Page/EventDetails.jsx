import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const VT_API_KEY = '71bcc79b2116544095460baafc059c8ee71cc572f707a684120592b9049d7292';

function MovieDetails() {
  const { id } = useParams();
  const [analysisDetails, setAnalysisDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalysisDetails();
  }, [id]);

  const fetchAnalysisDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Make actual VirusTotal API call
      const response = await axios.get(`https://www.virustotal.com/api/v3/files/${id}`, {
        headers: {
          'x-apikey': VT_API_KEY
        }
      });

      setAnalysisDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analysis details:', error);
      setError(error.response?.data?.error?.message || 'Failed to fetch analysis details');
      setLoading(false);
    }
  };

  const getStatusColor = (category) => {
    switch (category) {
      case 'harmless':
      case 'undetected': return '#28a745';
      case 'suspicious': return '#ffc107';
      case 'malicious': return '#dc3545';
      case 'timeout':
      case 'failure': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        <Link to="/movies" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Scans
        </Link>
      </div>
    );
  }

  if (!analysisDetails) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Analysis not found</h2>
        <Link to="/movies" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Scans
        </Link>
      </div>
    );
  }

  // Use real VirusTotal API response structure
  const stats = analysisDetails.attributes.last_analysis_stats;
  const fileInfo = {
    name: analysisDetails.attributes.meaningful_name || analysisDetails.attributes.names?.[0] || 'Unknown file',
    size: analysisDetails.attributes.size,
    md5: analysisDetails.attributes.md5,
    sha1: analysisDetails.attributes.sha1,
    sha256: analysisDetails.attributes.sha256,
    type_description: analysisDetails.attributes.type_description
  };
  const results = analysisDetails.attributes.last_analysis_results;
  const totalEngines = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const maliciousCount = stats.malicious + stats.suspicious;

  return (
    <div>
      <Link to="/movies" style={{ 
        color: '#007bff', 
        textDecoration: 'none', 
        marginBottom: '1rem', 
        display: 'inline-block' 
      }}>
        ← Back to Scans
      </Link>

      <div style={{ 
        background: maliciousCount > 0 ? 'linear-gradient(135deg, #dc3545, #c82333)' : 'linear-gradient(135deg, #28a745, #20c997)',
        color: 'white', 
        padding: '2rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 1rem 0', wordBreak: 'break-word' }}>
          📄 {fileInfo.name}
        </h1>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {maliciousCount}/{totalEngines} engines detected threats
        </div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.5rem' }}>
          {fileInfo.type_description}
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ marginTop: 0, color: '#495057', marginBottom: '1rem' }}>📁 File Information</h3>
          <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p><strong>Type:</strong> {fileInfo.type_description}</p>
            <p><strong>Size:</strong> {formatFileSize(fileInfo.size)}</p>
            <p><strong>Last Analysis:</strong> {new Date(analysisDetails.attributes.last_analysis_date * 1000).toLocaleString()}</p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '1.5rem', 
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ marginTop: 0, color: '#495057', marginBottom: '1rem' }}>🔐 Hash Values</h3>
          <div style={{ fontSize: '0.8rem', lineHeight: '1.6', wordBreak: 'break-all' }}>
            <p><strong>MD5:</strong><br/><code>{fileInfo.md5}</code></p>
            <p><strong>SHA1:</strong><br/><code>{fileInfo.sha1}</code></p>
            <p><strong>SHA256:</strong><br/><code>{fileInfo.sha256}</code></p>
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '1.5rem', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{ marginTop: 0, color: '#495057', marginBottom: '1rem' }}>🛡️ Detection Summary</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {Object.entries(stats).map(([category, count]) => (
            <div key={category} style={{
              padding: '0.5rem',
              backgroundColor: getStatusColor(category),
              color: 'white',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: 'bold' }}>{count}</div>
              <div style={{ textTransform: 'capitalize' }}>{category.replace('_', ' ')}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ color: '#495057', marginBottom: '1rem' }}>🔍 Antivirus Engine Results</h3>
        <div style={{ 
          display: 'grid', 
          gap: '0.5rem'
        }}>
          {Object.entries(results).map(([engine, result]) => (
            <div key={engine} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 1rem',
              backgroundColor: result.category === 'undetected' || result.category === 'harmless' ? '#d4edda' : 
                             result.category === 'suspicious' ? '#fff3cd' : '#f8d7da',
              borderRadius: '5px',
              border: `1px solid ${result.category === 'undetected' || result.category === 'harmless' ? '#c3e6cb' : 
                                   result.category === 'suspicious' ? '#ffeaa7' : '#f5c6cb'}`
            }}>
              <span style={{ fontWeight: 'bold' }}>{engine}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  color: result.category === 'undetected' || result.category === 'harmless' ? '#155724' : 
                         result.category === 'suspicious' ? '#856404' : '#721c24',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem'
                }}>
                  {result.result || 'Clean'}
                </div>
                <div style={{ 
                  fontSize: '0.7rem', 
                  color: '#666',
                  textTransform: 'capitalize'
                }}>
                  {result.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
