import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        Prenom: "",
        Nom: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            // 1️⃣ Inscription de l'utilisateur
            await axios.post("https://127.0.0.1:8000/api/users", credentials);

            // 2️⃣ Connexion automatique après inscription
            const loginResponse = await axios.post("https://127.0.0.1:8000/api/login_check", {
                email: credentials.email,
                password: credentials.password,
            });

            const token = loginResponse.data.token;
            
            // 3️⃣ Stocker le token et configurer Axios
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["Authorization"] = "Bearer " + token;

            // 4️⃣ Redirection vers la page des recettes
            navigate("/Recettes");

        } catch (err) {
                 console.error("Erreur lors de l'inscription :", err.response);    
            setError(err.response?.data?.message || "Erreur lors de l'inscription");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center">Inscription</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Prénom</label>
                                    <input
                                        type="text"
                                        name="Prenom"
                                        className="form-control"
                                        value={credentials.Prenom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        name="Nom"
                                        className="form-control"
                                        value={credentials.Nom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    S'inscrire et se connecter
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <p>Déjà un compte ? <a href="/login" className="text-primary">Connectez-vous</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
