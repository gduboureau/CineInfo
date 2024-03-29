import React from 'react';
import { useNavigate } from 'react-router';
import AuthForm from '../../components/connection/AuthForm';
import { accountService } from '../../utils/AccountService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();

    const handleRegister = async ({ mail, password, username, firstname, lastname, defaultImage }) => {
        if (!mail || !password || !username || !firstname || !lastname) return toast.error('Veuillez remplir tous les champs');
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mail, password, username, firstname, lastname, defaultImage }),
            });

            if (!response.ok && response.status !== 400) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                toast.error(data.error);
            } else {
                accountService.saveToken(data.token);
                navigate(`/account/${username}`);
            }
        } catch (error) {
            console.error('Erreur d\'inscription :', error.message);
        }
    };

    return (
        <div>
            <AuthForm type="signup" onSubmit={handleRegister} />
            <ToastContainer />
        </div>
    );
};

export default Signup;
