
import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.js';

/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';
import Navbar from './js/components/Navbar.jsx';
import HomePage from './js/pages/HomePage.jsx';
import { HashRouter,Routes,Route } from 'react-router-dom';
import RecettePage from './js/pages/RecettesPage.jsx';

console.log('Bonjour Monsieur Dahha 🎉');
const App = () => {
        return(
        <HashRouter>
        <Navbar/>

        <main className='container  pt-5'>
                <Routes>
                        <Route path="/Recettes" element={<RecettePage/>} />        
                        <Route path="/" element={<HomePage/>} />
                </Routes>
                
        </main>
        </HashRouter>
        ) ;
};
const rootElement = document.getElementById('app');
const root = ReactDOM.createRoot(rootElement);  

root.render(<App />);
