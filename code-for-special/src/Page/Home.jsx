import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <h1>🛡️ VirusTotal Security Scanner</h1>
      <p style={{ 
        fontSize: '1.1rem', 
        color: '#666', 
        marginBottom: '2rem',
        maxWidth: '600px',
        margin: '1rem auto 2rem auto',
        lineHeight: '1.6'
      }}>
        Analyze file security threats using VirusTotal's comprehensive antivirus database.
        Search by hash or browse recent scans to view detailed threat analysis.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        maxWidth: '900px',
        margin: '2rem auto'
      }}>
        <div style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(40, 167, 69, 0.2)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Clean Files</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
            Files with no malicious detections from antivirus engines
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#ffc107',
          color: '#212529',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(255, 193, 7, 0.2)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Suspicious</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Files flagged by few engines requiring further analysis
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#dc3545',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(220, 53, 69, 0.2)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚨</div>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Malicious</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
            Confirmed threats detected by multiple antivirus engines
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;