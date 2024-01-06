import React from 'react';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import AuthForm from '../../components/connection/AuthForm';

const ResetPassword = () => {

    const navigate = useNavigate();

    const handlePassword = async ({mail}) => {
        if (!mail) return toast.error('Veuillez remplir tous les champs');
        try {
            const response = await fetch('http://localhost:8080/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({mail}),
            });

            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                navigate('/login');
            }
        } catch (error) {
            console.error('Erreur de connexion :', error.message);
        }
    }


    return (
        <div>
            <AuthForm type="reset-password" onSubmit={handlePassword} />
            <ToastContainer />
        </div>
    );
};

export default ResetPassword;
