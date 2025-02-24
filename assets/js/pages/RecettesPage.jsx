import React, { useState, useEffect } from "react";
import axios from "axios";

const RecettePage = () => {
    const [recettes, setRecettes] = useState([]);

    useEffect(() => {
        axios
            .get("https://127.0.0.1:8000/api/recettes")
            .then(response => {
                // On récupère correctement les recettes avec la clé 'member'
                setRecettes(response.data.member || []);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des recettes:", error);
            });
    }, []);

    return (
        <>
            <h1>Listes de vos Recettes</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Aliments</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {recettes.length > 0 ? (
                        recettes.map((recette) => (
                            <tr key={recette.id}>
                                <td>{recette.id}</td>
                                <td><a href="#">{recette.nom}</a></td>
                                <td>{recette.aliments}</td>
                                <td>{recette.description}</td>
                                
                                {/* Ajouter l'image */}
                                <td>
                                    {/* Vérifie si une image existe et s'affiche correctement */}
                                    {recette.imageUrl && (
                                        <img
                                            src={`https://127.0.0.1:8000${recette.imageUrl}`}  // Construire l'URL complète
                                            alt={recette.nom}
                                            width="100"
                                            height="100"
                                            style={{ objectFit: "cover" }}  // Assure que l'image s'adapte bien
                                        />
                                    )}
                                </td>

                                <td>
                                    <button className="btn btn-sm btn-danger">Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Aucune recette trouvée.</td> {/* Changer colSpan pour inclure la colonne Image */}
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default RecettePage;
