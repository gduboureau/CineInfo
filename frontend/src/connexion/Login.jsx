import React, { useState } from 'react';

const Login = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP! Statut : ${response.status}`);
      }

      const data = await response.json();
      sessionStorage.setItem('token', data.token);


    } catch (error) {
      console.error('Erreur de connexion :', error.message);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form>
        <label>Adresse mail</label>
        <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
