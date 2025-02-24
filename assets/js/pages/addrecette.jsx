import React, { useState } from 'react';
import axios from 'axios';

const AjouterRecetteForm = () => {
  const [nom, setNom] = useState('');
  const [aliments, setAliments] = useState('');
  const [description, setDescription] = useState('');

  const handleNomChange = (e) => setNom(e.target.value);
  const handleAlimentsChange = (e) => setAliments(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crée un objet avec les données de la recette
    const recetteData = {
      Nom: nom,
      Aliments: aliments,
      Description: description,
    };

    try {
      // Envoyer les données de la recette au backend sous forme de JSON
      const response = await axios.post('/api/recettes', recetteData, {
        headers: {
          'Content-Type': 'application/ld+json'
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
      <button type="submit">Ajouter la recette</button>
    </form>
  );
};

export default AjouterRecetteForm;
