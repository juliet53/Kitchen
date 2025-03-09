import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecettePage = () => {
    const [recettes, setRecettes] = useState([]);
    const [users, setUsers] = useState({}); // Stocke les utilisateurs

    useEffect(() => {
        axios.get("https://127.0.0.1:8000/api/recettes")
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
            })
            .catch(error => console.error("Erreur lors de la récupération des recettes:", error));
    }, []);

    const truncateText = (text, limit = 10) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
    };
    const handleDelete = (id) => {
        
        const originalRecettes = [...recettes];
        setRecettes(recettes.filter(recette => recette.id !== id));

        axios.delete("https://127.0.0.1:8000/api/recettes/"+id)
        .then(response => console.log("OK"))
        .catch(error => {
            setRecettes(originalRecettes);
            console.log(error.response);
        });
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Liste des Recettes</h1>
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
                                            <Link to={`/recette/${recette.id}`} className="btn btn-outline-primary btn-sm"> Voir Détails</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Chargement</p>
                )}
            </div>
        </div>
    );
};

export default RecettePage;
