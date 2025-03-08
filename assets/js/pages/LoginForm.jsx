import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const LoginForm = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Créer une instance du hook navigate

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await Axios.post("https://127.0.0.1:8000/api/login_check", credentials)
        .then((response) => response.data.token);

      setError("");
      window.localStorage.setItem("authToken", token);
      Axios.defaults.headers["Authorization"] = "Bearer " + token;

      // Rediriger vers la page des recettes après la connexion réussie
      navigate("/recettes");

    } catch (error) {
      setError("Les informations ne correspondent pas");
    }

    console.log(credentials);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Connexion</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Adresse email
                  </label>
                  <input
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    type="email"
                    id="email"
                    className={`form-control ${error && "is-invalid"}`}
                    placeholder="Entrez votre email"
                    required
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password" className="form-label">
                    Mot de passe
                  </label>
                  <input
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <a href="/forgot-password" className="text-muted small">
                      Mot de passe oublié ?
                    </a>
                  </div>
                </div>
                <div className="form-group mt-4">
                  <button type="submit" className="btn btn-primary w-100">
                    Se connecter
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center mt-3">
            <p>
              Vous n'avez pas de compte ?{" "}
              <a href="/inscription" className="text-primary">
                Inscrivez-vous
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
