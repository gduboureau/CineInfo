import React, { useState } from 'react';

const Register = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail, password, username, firstname, lastname }),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut : ${response.status}`);
            }

            const data = await response.json();
            sessionStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Erreur d\'inscription :', error.message);
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form>
                <label>Adresse mail</label>
                <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />

                <label>Mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label>Nom d'utilisateur</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Prénom</label>
                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />

                <label>Nom</label>
                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />

                <button type="button" onClick={handleRegister}>
                    S'inscrire
                </button>
            </form>
        </div>
    );
};

export default Register;
