import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RecetteDetailPage = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();
  const [recette, setRecette] = useState(null);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecette = async () => {
      try {
        const response = await axios.get(`https://127.0.0.1:8000/api/recettes/${id}`);
        setRecette(response.data);

        // Récupérer l'utilisateur
        if (response.data.user) {
          const userResponse = await axios.get(`https://127.0.0.1:8000${response.data.user}`);
          setUser(`${userResponse.data.prenom} ${userResponse.data.nom}`);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de la recette :", error);
        setLoading(false);
      }
    };

    fetchRecette();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5"><h2>Chargement...</h2></div>;
  }

  if (!recette) {
    return <div className="text-center mt-5"><h2>Recette introuvable</h2></div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        {recette.imageUrl && (
          <img 
            src={`https://127.0.0.1:8000${recette.imageUrl}`} 
            className="card-img-top" 
            alt={recette.nom} 
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h2 className="card-title text-center">{recette.nom}</h2>
          <p className="text-muted text-center">Ajoutée par : <strong>{user || "Utilisateur inconnu"}</strong></p>

          <h4 className="mt-4">Ingrédients :</h4>
          <ul className="list-group">
            {recette.aliments.split(",").map((aliment, index) => (
              <li key={index} className="list-group-item">
                {aliment}
              </li>
            ))}
          </ul>

          <h4 className="mt-4">Description :</h4>
          <p className="card-text">{recette.description}</p>

          <div className="text-center mt-4">
            <button onClick={() => navigate("/recettes")} className="btn btn-primary">
              Retour aux recettes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecetteDetailPage;
