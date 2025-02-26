import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('https://127.0.0.1:8000/api/login_check', { email, password });
            const userData = response.data;

            // Vérification du rôle
            if (!userData.roles || !userData.roles.includes("ROLE_USER")) {
                setError("Accès refusé : vous devez avoir le rôle USER.");
                return;
            }

            setUser(userData); // Met à jour l'état de l'utilisateur
            localStorage.setItem('user', JSON.stringify(userData)); // Sauvegarde dans localStorage
            navigate('/'); // Redirige vers la page d'accueil
        } catch (error) {
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Connexion</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Se connecter</button>
        </form>
    );
};

export default LoginForm;
