import React, { useState } from 'react';
import AuthForm from '../../components/connection/AuthForm';
import { accountService } from '../../utils/AccountService';

const Login = () => {
  const [error, setError] = useState('');

  const handleLogin = async ({ mail, password }) => {
    if (!mail || !password) return setError('Veuillez remplir tous les champs');
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        accountService.saveToken(data.token);
      }
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
    }
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>

  );
};

export default Login;
