import React, { useState } from 'react';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://f1-server-1.onrender.com/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, answer, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.message || 'An error occurred');
        setMessage('');
      }
    } catch (err) {
      setError('An error occurred');
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', width: '100%', maxWidth: '480px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="answer" style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
              Security Answer:
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="newPassword" style={{ display: 'block', fontWeight: 'medium', marginBottom: '8px' }}>
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
              required
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: '#4c51bf', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', fontWeight: 'medium', width: '100%', cursor: 'pointer' }}
          >
            Reset Password
          </button>
        </form>
        {message && (
          <div style={{ marginTop: '16px', color: '#2f855a', fontWeight: 'medium' }}>{message}</div>
        )}
        {error && (
          <div style={{ marginTop: '16px', color: '#c53030', fontWeight: 'medium' }}>{error}</div>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;