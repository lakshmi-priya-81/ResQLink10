import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Chatbot() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse('❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setResponse('');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.chatbox}>
        <h3 style={styles.heading}>💬 Ask Our AI Assistant</h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your question..."
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </form>

        {loading && <div style={styles.typing}>🤖 Typing...</div>}

        {response && (
          <div style={styles.response}>
            <strong>AI:</strong> {response}
          </div>
        )}

        <div style={styles.buttonGroup}>
          <button onClick={handleClear} style={{ ...styles.button, backgroundColor: '#d32f2f' }}>
            Clear Chat
          </button>
          <button onClick={handleBackToHome} style={{ ...styles.button, backgroundColor: '#455a64' }}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  chatbox: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    maxWidth: '600px',
    width: '100%',
    fontFamily: 'Poppins, sans-serif',
  },
  heading: {
    fontSize: '22px',
    marginBottom: '20px',
    color: '#2e7d32',
  },
  form: {
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '12px',
    backgroundColor: '#1976d2',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  response: {
    marginTop: '20px',
    fontSize: '15px',
    color: '#333',
    lineHeight: '1.5',
    backgroundColor: '#f1f8e9',
    padding: '15px',
    borderRadius: '8px',
  },
  typing: {
    marginTop: '15px',
    fontStyle: 'italic',
    color: '#888',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '10px',
  },
};