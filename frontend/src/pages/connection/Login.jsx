import React from 'react';
import AuthForm from '../../components/connection/AuthForm';
import { useNavigate } from 'react-router';
import { accountService } from '../../utils/AccountService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ mail, password }) => {
    if (!mail || !password) return toast.error('Veuillez remplir tous les champs');
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
        toast.error(data.error);
      } else {
        handleToken(data.token);
        navigate(`/account/${data.username}`);
      }
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
    }
  };

  const handleToken = (token) => {
    accountService.saveToken(token);
    localStorage.setItem('tokenExpiration', new Date(Date.now() + 60 * 60 * 1000).toISOString());

    const extendTokenInterval = setInterval(() => {
      const tokenExpiration = new Date(localStorage.getItem('tokenExpiration'));
      const timeRemaining = tokenExpiration - Date.now();

      if (timeRemaining < 55 * 60 * 1000) {
        clearInterval(extendTokenInterval);

        const shouldStayLoggedIn = window.confirm("Votre session expire dans 5 minutes. Souhaitez-vous rester connecté ?");
        if (shouldStayLoggedIn) {
          extendToken(token);
        } else {
          accountService.logout();
          navigate('/');
        }
      }
    }, 55 * 60 * 1000);
  };

  const extendToken = (token) => {
    fetch('http://localhost:8080/auth/extend-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    }).then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          accountService.logout();
          accountService.saveToken(data.token);

          handleToken(data.token);
        }
      })
      .catch((error) => console.error('Erreur de requête :', error));
  };

  return (
    <div>
      <AuthForm type="login" onSubmit={handleLogin} />
      <ToastContainer />
    </div>

  );
};

export default Login;
