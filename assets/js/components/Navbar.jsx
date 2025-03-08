import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");  // Supprime le token
        delete axios.defaults.headers["Authorization"];  // Supprime le header
        navigate("/login");  // Redirige vers la page de connexion
    };

    // Vérifier si l'utilisateur est authentifié (si le token existe dans localStorage)
    const isAuthenticated = localStorage.getItem("authToken");

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <NavLink className="navbar-brand" to="/">The Kitchen</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor04">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/recettes">Vos Recettes</NavLink>
                        </li>
                        {/* Ajouter un lien vers la page Add si l'utilisateur est connecté */}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/Add">Ajouter une Recette</NavLink>
                            </li>
                        )}
                        {/* Si l'utilisateur est authentifié, afficher la route pour "Mes Recettes" */}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/myRecette">Mes Recettes</NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {/* Si l'utilisateur est authentifié, on affiche le bouton de déconnexion */}
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/inscription">Inscription</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-success" to="/login">Connexion</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
