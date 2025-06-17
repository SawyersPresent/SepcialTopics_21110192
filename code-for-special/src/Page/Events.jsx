import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Movies.module.css';

// Note: In production, API keys should be in environment variables or backend
const VT_API_KEY = '71bcc79b2116544095460baafc059c8ee71cc572f707a684120592b9049d7292';

function Movies() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentScans();
  }, []);

  const fetchRecentScans = async () => {
    try {
      setLoading(true);
      
      // Mock data simulating VirusTotal API responses
      // In real implementation, you'd call: virustotal.getAnalyses() or similar
      const mockVirusTotalResponses = [
        {
          type: "analysis",
          id: "f-f4c5c8e9b8f7d6e5c4b3a2918f7e6d5c4b3a2918f7e6d5c4b3a291-1671234567",
          attributes: {
            date: 1671234567,
            status: "completed",
            stats: {
              harmless: 65,
              type_unsupported: 3,
              suspicious: 2,
              confirmed_timeout: 0,
              timeout: 0,
              failure: 0,
              malicious: 5,
              undetected: 25
            }
          },
          meta: {
            file_info: {
              name: "suspicious_document.pdf",
              size: 2457856,
              md5: "5d41402abc4b2a76b9719d911017c592",
              sha1: "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
              sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
            }
          }
        },
        {
          type: "analysis",
          id: "f-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855-1671230000",
          attributes: {
            date: 1671230000,
            status: "completed",
            stats: {
              harmless: 70,
              type_unsupported: 2,
              suspicious: 0,
              confirmed_timeout: 0,
              timeout: 0,
              failure: 0,
              malicious: 0,
              undetected: 28
            }
          },
          meta: {
            file_info: {
              name: "clean_image.jpg",
              size: 1024576,
              md5: "098f6bcd4621d373cade4e832627b4f6",
              sha1: "356a192b7913b04c54574d18c28d46e6395428ab",
              sha256: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"
            }
          }
        },
        {
          type: "analysis",
          id: "f-d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35-1671225555",
          attributes: {
            date: 1671225555,
            status: "completed",
            stats: {
              harmless: 58,
              type_unsupported: 5,
              suspicious: 3,
              confirmed_timeout: 0,
              timeout: 2,
              failure: 1,
              malicious: 12,
              undetected: 19
            }
          },
          meta: {
            file_info: {
              name: "malware_sample.exe",
              size: 5242880,
              md5: "202cb962ac59075b964b07152d234b70",
              sha1: "da4b9237bacccdf19c0760cab7aec4a8359010b0",
              sha256: "d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35"
            }
          }
        }
      ];

      // Transform mock data to our format
      const transformedData = mockVirusTotalResponses.map(analysis => {
        const stats = analysis.attributes.stats;
        const totalEngines = Object.values(stats).reduce((sum, count) => sum + count, 0);
        const maliciousCount = stats.malicious + stats.suspicious;
        
        let status;
        if (maliciousCount === 0) status = 'clean';
        else if (maliciousCount <= 3) status = 'suspicious';
        else status = 'malicious';

        return {
          id: analysis.id,
          filename: analysis.meta.file_info.name,
          scan_date: new Date(analysis.attributes.date * 1000).toISOString().split('T')[0],
          positives: maliciousCount,
          total: totalEngines,
          status: status,
          size: analysis.meta.file_info.size,
          md5: analysis.meta.file_info.md5,
          sha256: analysis.meta.file_info.sha256
        };
      });

      setFiles(transformedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching VirusTotal scans:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'clean': return '#28a745';
      case 'suspicious': return '#ffc107';
      case 'malicious': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'clean': return '✅';
      case 'suspicious': return '⚠️';
      case 'malicious': return '🚨';
      default: return '❓';
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
        Loading VirusTotal scans...
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '10px',
        margin: '0 1rem 2rem 1rem'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0' }}>🛡️ VirusTotal Scanner</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Recent file analysis results</p>
      </div>

      <div className={styles.grid}>
        {files.map(file => (
          <Link to={`/movies/${file.id}`} key={file.id} className={styles.card}>
            <div style={{ 
              backgroundColor: getStatusColor(file.status), 
              color: 'white', 
              padding: '1rem',
              borderRadius: '10px 10px 0 0',
              textAlign: 'center',
              fontSize: '2rem'
            }}>
              {getStatusIcon(file.status)}
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'white' }}>
              <h3 style={{ 
                fontSize: '0.9rem', 
                marginBottom: '0.5rem',
                color: '#333',
                wordBreak: 'break-word'
              }}>
                {file.filename}
              </h3>
              <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}>
                <strong>Size:</strong> {formatFileSize(file.size)}
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}>
                <strong>Scan Date:</strong> {file.scan_date}
              </p>
              <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}>
                <strong>Detection:</strong> {file.positives}/{file.total} engines
              </p>
              <div style={{ 
                margin: '0.5rem 0 0 0', 
                padding: '0.4rem 0.8rem', 
                backgroundColor: getStatusColor(file.status),
                color: 'white',
                borderRadius: '15px',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                {file.status}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Movies;
