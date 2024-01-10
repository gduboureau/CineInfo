import React from 'react';
import AuthForm from '../../components/connection/AuthForm';
import { useNavigate } from 'react-router';
import { accountService } from '../../utils/AccountService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

      if (!response.ok && response.status !== 400) {
        throw new Error('Erreur de connexion');
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

      if (timeRemaining < 5 * 60 * 1000) {
        clearInterval(extendTokenInterval);

        confirmAlert({
          title: 'Session expirante',
          message: 'Votre session expire dans 20 secondes. Souhaitez-vous rester connecté ?',
          buttons: [
            {
              label: 'Oui',
              onClick: () => extendToken(token)
            },
            {
              label: 'Non',
              onClick: () => {
                accountService.logout();
                navigate('/');
              },
            },
          ],
        });
      }
    }, 60 * 1000);
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
