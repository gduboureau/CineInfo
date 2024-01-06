import React, { useState, useEffect } from "react";
import AccountHeader from "../../components/account/AccountHeader";
import './assets/settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const [userInfos, setUserInfos] = useState([]);
    const [editableFields, setEditableFields] = useState({
        firstname: "",
        lastname: "",
        username: "",
        mail: "",
        password: "",
        image: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        firstname: "",
        lastname: "",
        username: "",
        mail: "",
        password: "",
        image: ""
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token === null) return;
        fetch('http://localhost:8080/user/infos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserInfos(data);
                setEditableFields({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    mail: data.mail,
                    password: "",
                    image: data.image
                });
            })
            .catch(error => console.error('Erreur de requête :', error));
    }, [token]);

    const handleInputChange = (field, value) => {
        setEditableFields(prevState => ({
            ...prevState,
            [field]: value
        }));
        setErrorMessages(prevState => ({
            ...prevState,
            [field]: ""
        }));
    };

    const handleImageClick = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditableFields(prevState => ({
                    ...prevState,
                    image: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateFields = () => {
        let isValid = true;
        const newErrorMessages = {};

        Object.keys(editableFields).forEach(field => {
            if (editableFields[field].trim() === "" && field !== "image" && field !== "password") {
                isValid = false;
                newErrorMessages[field] = "Ce champ est obligatoire";
            }
        });

        setErrorMessages(newErrorMessages);
        return isValid;
    };

    const handleSaveChanges = () => {
        if (validateFields()) {
            fetch('http://localhost:8080/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(editableFields),
            })
                .then(response => response.json())
                .then(data => {
                    setUserInfos(data);

                    setEditableFields({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        username: data.username,
                        mail: data.mail,
                        password: data.password,
                        image: data.image
                    });

                    window.location.reload();
                })
                .catch(error => console.error('Erreur de requête :', error));
        }
    };

    return (
        <div className="settings">
            <AccountHeader />
            <div className="settings-content">
                <div className="title-group">
                    <h2>Paramètres</h2>
                </div>
                {userInfos && (
                    <div className="settings-infos">
                        <div className="left-setting">
                            <div className="settings-image" onClick={handleImageClick}>
                                <img src={editableFields.image} alt="pp default" className="center-left" />
                                <div className="overlay">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    id="imageInput"
                                />
                            </div>
                            <div className="firstname-lastname">
                                {userInfos.firstname} {userInfos.lastname}
                            </div>
                            <div className="mail">{userInfos.mail}</div>
                        </div>
                        <div className="right-setting">
                            Détails personnels
                            <div className="first-part-input">
                                <div className="settings-name">
                                    <div>
                                        Prénom
                                    </div>
                                    <input
                                        type="text"
                                        value={editableFields.firstname}
                                        onChange={(e) => handleInputChange("firstname", e.target.value)}
                                        placeholder="Prénom"
                                    />
                                    <span className="error-message">{errorMessages.firstname}</span>
                                </div>
                                <div className="settings-lastname">
                                    <div>
                                        Nom
                                    </div>
                                    <input
                                        type="text"
                                        value={editableFields.lastname}
                                        onChange={(e) => handleInputChange("lastname", e.target.value)}
                                        placeholder="Nom"
                                    />
                                    <span className="error-message">{errorMessages.lastname}</span>
                                </div>
                                <div className="settings-username">
                                    <div>
                                        Nom d'utilisateur
                                    </div>
                                    <input
                                        type="text"
                                        value={editableFields.username}
                                        onChange={(e) => handleInputChange("username", e.target.value)}
                                        placeholder="Nom d'utilisateur"
                                    />
                                    <span className="error-message">{errorMessages.username}</span>
                                </div>
                            </div>
                            <div className="second-part-input">
                                <div className="settings-mail">
                                    <div>
                                        Adresse mail
                                    </div>
                                    <input
                                        type="email"
                                        value={editableFields.mail}
                                        onChange={(e) => handleInputChange("mail", e.target.value)}
                                        placeholder="Adresse mail"
                                    />
                                    <span className="error-message">{errorMessages.mail}</span>
                                </div>
                                <div className="settings-password">
                                    <div>
                                        Mot de passe
                                    </div>
                                    <input
                                        type="password"
                                        value={editableFields.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
                                        placeholder="Mot de passe"
                                    />
                                </div>
                                <div className="submit-button-change">
                                    <button onClick={handleSaveChanges}>Mettre à jour</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settings;
