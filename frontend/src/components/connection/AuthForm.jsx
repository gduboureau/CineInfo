import React, { useState } from 'react';
import ShowPassword from "../../pages/connection/assets/show.png";
import HidePassword from "../../pages/connection/assets/hide.png"
import { Link } from 'react-router-dom';

import '../../pages/connection/assets/login.css';
import '../../pages/connection/assets/signup.css';

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
            await onSubmit({ mail, password, username, firstname, lastname });
        } catch (error) {
            console.error('Authentication Error:', error.message);
        }
    };

    return (
        <div className={`${type}-container`}>
            <p>{type === 'login' ? 'Connectez-vous à votre compte' : 'Créez votre compte'}</p>
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
                    <label>Adresse mail</label>
                    <input type="text" className="input-mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                </div>

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

                <button type="button" onClick={handleSubmit}>
                    {type === 'login' ? 'Se connecter' : 'S\'inscrire'}
                </button>
                {type === 'login' && (
                    <div className='link'>
                        <p>Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous </Link></p>
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
