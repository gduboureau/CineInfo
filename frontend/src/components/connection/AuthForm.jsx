import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowPassword from "../../pages/connection/assets/show.png";
import HidePassword from "../../pages/connection/assets/hide.png";

import '../../pages/connection/assets/login.css';
import '../../pages/connection/assets/signup.css';
import '../../pages/connection/assets/resetPassword.css';

const AuthForm = ({ type, onSubmit }) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [eyeIcon, setEyeIcon] = useState(HidePassword);

    const togglePassword = () => {
        setShowPassword(!showPassword);
        setEyeIcon(showPassword ? HidePassword : ShowPassword);
    };

    const handleSubmit = async () => {
        try {
            let defaultImage = '';
            if (firstname !== '' && lastname !== '') {
                const canvas = document.createElement('canvas');
                canvas.width = 1000;
                canvas.height = 1000;
                const context = canvas.getContext('2d');
                context.imageSmoothingQuality = 'high';

                context.beginPath();
                context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
                context.fillStyle = '#F5F5DC';
                context.fill();
                context.closePath();

                context.font = 'bold 430px "Poppins", sans-serif';
                context.fillStyle = '#000';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(`${username[0].toUpperCase()}${lastname[0].toUpperCase()}`, canvas.width / 2, canvas.height / 2);
                defaultImage = canvas.toDataURL('image/png');
            }

            if (type === 'login' || type === 'signup') {
                await onSubmit({ mail, password, username, firstname, lastname, defaultImage });
            } else if (type === 'reset-password') {
                await onSubmit({ mail });
            }
        } catch (error) {
            console.error('Authentication Error:', error.message);
        }
    };

    return (
        <div className={`${type}-container`}>
            <p>{type === 'login' ? 'Connectez-vous à votre compte' : type === 'signup' ? "Créer votre compte" : "Rénitialiser votre mot de passe"}</p>
            <form className={`${type}-form`}>
                {type === 'signup' && (
                    <>
                        <div className='name'>
                            <div className="fieldset">
                                <label>Prénom</label>
                                <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div className='fieldset'>
                                <label>Nom</label>
                                <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            </div>
                        </div>
                        <div className='fieldset'>
                            <label>Nom d'utilisateur</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </>
                )}

                <div className='fieldset'>
                    {type === 'login' ? <label>Adresse mail ou nom d'utilisateur</label> : <label>Adresse mail</label>}
                    <input type="text" className="input-mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                </div>

                {type !== 'reset-password' && (
                    <div className='fieldset'>
                        <label>Mot de passe</label>
                        <span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <img src={eyeIcon} alt="eye-icon" onClick={togglePassword} />
                        </span>
                    </div>
                )}

                <button type="button" onClick={handleSubmit}>
                    {type === 'login' ? 'Se connecter' : (type === 'signup' ? 'S\'inscrire' : 'Nouveau mot de passe')}
                </button>

                {type === 'login' && (
                    <div className='link'>
                        <p>Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous </Link></p>
                        <p>Mot de passe oublié ? <Link to="/reset-password">Cliquer ici </Link></p>
                    </div>
                )}

                {type === 'signup' && (
                    <div className='link'>
                        <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous </Link></p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AuthForm;
