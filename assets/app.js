import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './js/components/Navbar.jsx';
import HomePage from './js/pages/HomePage.jsx';
import RecettePage from './js/pages/RecettesPage.jsx';
import AjouterRecetteForm from './js/pages/addrecette.jsx';
import LoginForm from './js/pages/LoginForm.jsx';

console.log('Bonjour Monsieur Dahha 🎉');

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <HashRouter>
            <Navbar user={user} setUser={setUser} />
            <main className='container pt-5'>
                <Routes>
                    <Route path="/Recettes" element={<RecettePage />} />
                    <Route path="/Add" element={ <AjouterRecetteForm /> } />
                    <Route path="/login" element={<LoginForm setUser={setUser} />} /> 
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>
        </HashRouter>
    );
};

const rootElement = document.getElementById('app');
ReactDOM.createRoot(rootElement).render(<App />);
