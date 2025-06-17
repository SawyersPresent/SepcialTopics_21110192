import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VT_API_KEY = '71bcc79b2116544095460baafc059c8ee71cc572f707a684120592b9049d7292';

function HashSearch() {
  const [hashInput, setHashInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateHash = (hash) => {
    const md5Regex = /^[a-fA-F0-9]{32}$/;
    const sha1Regex = /^[a-fA-F0-9]{40}$/;
    const sha256Regex = /^[a-fA-F0-9]{64}$/;
    
    return md5Regex.test(hash) || sha1Regex.test(hash) || sha256Regex.test(hash);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!hashInput.trim()) {
      setError('Please enter a hash value');
      return;
    }

    if (!validateHash(hashInput.trim())) {
      setError('Please enter a valid MD5, SHA1, or SHA256 hash');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://www.virustotal.com/api/v3/files/${hashInput.trim()}`, {
        headers: {
          'x-apikey': VT_API_KEY
        }
      });

      navigate(`/events/${hashInput.trim()}`);
    } catch (error) {
      setError(error.response?.data?.error?.message || 'Hash not found in VirusTotal database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <h1>Hash Lookup</h1>
        <p>Search VirusTotal database by file hash</p>
      </div>

      <form onSubmit={handleSearch}>
        <div>
          <label>File Hash (MD5, SHA1, or SHA256):</label>
          <input
            type="text"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            placeholder="Enter hash value..."
            disabled={loading}
          />
        </div>

        {error && (
          <div style={{ color: 'red' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Hash'}
        </button>
      </form>

      <div>
        <h3>Example hashes to try:</h3>
        <ul>
          <li><code>44d88612fea8a8f36de82e1278abb02f</code> (EICAR test file)</li>
          <li><code>d41d8cd98f00b204e9800998ecf8427e</code> (Empty file)</li>
          <li><code>275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f</code> (EICAR SHA256)</li>
        </ul>
      </div>
    </div>
  );
}

export default HashSearch;