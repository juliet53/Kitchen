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
                               
                                <td>
                                    <button className="btn btn-sm btn-danger">Supprimer</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Aucune recette trouvée.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default RecettePage;
