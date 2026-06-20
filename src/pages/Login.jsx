import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Գրանցումը հաջողվեց։');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Մուտքը հաջողվեց։');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isRegister ? 'Գրանցում' : 'Մուտք'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Էլ. հասցե" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Գաղտնաբառ" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#ff7e42', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isRegister ? 'Գրանցվել' : 'Մուտք Գործել'}
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center', cursor: 'pointer', color: '#ff7e42' }} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Արդեն ունե՞ք հաշիվ։ Մուտք գործեք' : 'Չունե՞ք հաշիվ։ Գրանցվեք'}
      </p>
    </div>
  );
}