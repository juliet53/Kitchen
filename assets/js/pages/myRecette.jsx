import React, { useState, useEffect } from "react";
import axios from "axios";

const RecettePage = () => {
    const [recettes, setRecettes] = useState([]);
    const [users, setUsers] = useState({}); // Stocke les utilisateurs
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null); // Utilisateur connecté
    const [loading, setLoading] = useState(true); // État pour indiquer le chargement

    useEffect(() => {
        // Vérifier si un token est présent
        const token = localStorage.getItem("authToken");

        if (token) {
            setIsAuthenticated(true);
            // Décoder le token JWT pour obtenir l'ID de l'utilisateur
            const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Décoder le token pour obtenir les données
            setCurrentUserId(decodedToken.userId); // Stocke l'ID de l'utilisateur
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && currentUserId) {
            // Si l'utilisateur est authentifié, on récupère ses recettes depuis l'API
            axios.get(`https://127.0.0.1:8000/api/recettes?user=${currentUserId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            })
            .then(response => {
                const recettesData = response.data.member || [];
                setRecettes(recettesData);

                // Récupérer les utilisateurs uniques liés aux recettes
                const userUrls = [...new Set(recettesData.map(recette => recette.user))];

                userUrls.forEach(url => {
                    if (url && !users[url]) { // Vérifie si on n'a pas déjà récupéré cet utilisateur
                        axios.get(`https://127.0.0.1:8000${url}`)
                            .then(userResponse => {
                                setUsers(prevUsers => ({
                                    ...prevUsers,
                                    [url]: `${userResponse.data.prenom} ${userResponse.data.nom}` // Stocke le nom complet
                                }));
                            })
                            .catch(error => console.error("Erreur utilisateur :", error));
                    }
                });
                setLoading(false); // Fin du chargement
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des recettes:", error);
                setLoading(false); // Fin du chargement en cas d'erreur
            });
        } else {
            setLoading(false); // Fin du chargement même si l'utilisateur n'est pas authentifié
        }
    }, [isAuthenticated, currentUserId]);

    const truncateText = (text, limit = 10) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
    };

    const handleDelete = (id) => {
        const originalRecettes = [...recettes];
        setRecettes(recettes.filter(recette => recette.id !== id));

        axios.delete(`https://127.0.0.1:8000/api/recettes/${id}`)
            .then(response => console.log("Recette supprimée"))
            .catch(error => {
                setRecettes(originalRecettes); // Restaure les recettes si la suppression échoue
                console.log("Erreur lors de la suppression de la recette:", error.response);
            });
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Mes Recettes</h1>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <div className="row">
                    {recettes.length > 0 ? (
                        recettes.map((recette) => (
                            <div key={recette.id} className="col-md-6 mb-3">
                                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={recette.imageUrl ? `https://127.0.0.1:8000${recette.imageUrl}` : "https://via.placeholder.com/150"}
                                                className="img-fluid rounded-start"
                                                alt={recette.nom}
                                                style={{ objectFit: "cover", height: "100%" }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{recette.nom}</h5>
                                                <p className="text-muted">
                                                    Ajoutée par : <strong>{users[recette.user] || "Utilisateur inconnu"}</strong>
                                                </p>
                                                <p className="card-text"><strong>Ingrédients :</strong> {truncateText(recette.aliments)}</p>
                                                <p className="card-text">{truncateText(recette.description)}</p>
                                                <p className="card-text">
                                                    <small className="text-muted">Dernière mise à jour il y a 3 min</small>
                                                </p>
                                                <button 
                                                    onClick={() => handleDelete(recette.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucune recette trouvée.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecettePage;
