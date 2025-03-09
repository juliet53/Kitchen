import React from "react";


const HomePage = (props) => {
  return (
    <div className="container py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5">
        {/* Colonne image */}
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="assets/Images/Kitchen.jpg"
            className="d-block mx-lg-auto img-fluid"
            alt="Kitchen Accueil"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>

        {/* Colonne texte */}
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Kitchen
          </h1>
          <p className="lead">
            Un lieu où la passion de la cuisine rencontre la créativité. Découvrez,
            partagez et créez des recettes savoureuses pour tous les goûts. Que vous
            soyez un chef en herbe ou un expert en cuisine, trouvez des inspirations
            et partagez vos créations avec notre communauté. Bon appétit !
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
