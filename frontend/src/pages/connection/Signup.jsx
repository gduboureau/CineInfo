import React, { useState } from 'react';
import AuthForm from '../../components/connection/AuthForm';
import { accountService } from '../../utils/AccountService';

const Signup = () => {
    const [error, setError] = useState('');

    const handleRegister = async ({ mail, password, username, firstname, lastname }) => {
        if (!mail || !password || !username || !firstname || !lastname) return setError('Veuillez remplir tous les champs');
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail, password, username, firstname, lastname }),
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
            console.error('Erreur d\'inscription :', error.message);
        }
    };

    return (
        <div>
            <AuthForm type="signup" onSubmit={handleRegister} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default Signup;
