import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AjouterRecetteForm = () => {
  const [nom, setNom] = useState('');
  const [aliments, setAliments] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // Ajout de l'image
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté en cherchant un token dans le localStorage
  const isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    // Si l'utilisateur n'est pas connecté, redirige-le vers la page de connexion
    navigate("/login");
    return null; // Le formulaire ne sera pas affiché
  }

  const handleNomChange = (e) => setNom(e.target.value);
  const handleAlimentsChange = (e) => setAliments(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImageFile(e.target.files[0]); // Récupérer le fichier

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Nom', nom);
    formData.append('Aliments', aliments);
    formData.append('Description', description);
    if (imageFile) {
      formData.append('imageFile', imageFile); // Ajout du fichier image
    }

    try {
      const response = await axios.post('/api/recettes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important pour l'envoi de fichiers
          'Authorization': `Bearer ${localStorage.getItem("authToken")}` // Ajoute le token dans les headers
        },
      });
      console.log('Recette ajoutée', response.data);
      // Rediriger après succès
      navigate("/recettes");
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Ajouter une Recette</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="nom" className="form-label">Nom de la recette</label>
                  <input 
                    type="text" 
                    id="nom" 
                    value={nom} 
                    onChange={handleNomChange} 
                    className="form-control" 
                    required 
                    placeholder="Entrez le nom de la recette"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="aliments" className="form-label">Ingrédients</label>
                  <textarea
                    id="aliments"
                    value={aliments}
                    onChange={handleAlimentsChange}
                    className="form-control"
                    required
                    rows="4"
                    placeholder="Entrez les ingrédients"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="form-control"
                    required
                    rows="4"
                    placeholder="Décrivez la recette"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="imageFile" className="form-label">Image de la recette</label>
                  <input 
                    type="file" 
                    id="imageFile" 
                    onChange={handleImageChange} 
                    className="form-control" 
                    accept="image/*"
                  />
                </div>

                <div className="form-group mt-4">
                  <button type="submit" className="btn btn-primary w-100">Ajouter la recette</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjouterRecetteForm;
