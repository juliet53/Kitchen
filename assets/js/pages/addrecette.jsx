import React, { useState } from 'react';
import axios from 'axios';

const AjouterRecetteForm = () => {
  const [nom, setNom] = useState('');
  const [aliments, setAliments] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // Ajout de l'image

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
        },
      });
      console.log('Recette ajoutée', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom</label>
        <input type="text" value={nom} onChange={handleNomChange} required />
      </div>
      <div>
        <label>Aliments</label>
        <textarea value={aliments} onChange={handleAlimentsChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={handleDescriptionChange} required />
      </div>
      <div>
        <label>Image</label>
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </div>
      <button type="submit">Ajouter la recette</button>
    </form>
  );
};

export default AjouterRecetteForm;
