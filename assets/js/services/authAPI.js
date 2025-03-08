import axios from "axios";
import { jwtDecode } from 'jwt-decode';


function logout(){
        window.localStorage.removeItem("authToken");
        delete axios.defaults.headers["Authorization"];
}


function setup(){
        const token = window.localStorage.getItem("authToken");
        if (token) {
                const { exp: expiration } = jwtDecode(token);
                if(expiration * 1000 > new Date().getTime()){
                        axios.defaults.headers["Authorization"] = "Bearer " + token;
                        console.log("Connexion établie avec axios");
                } else{
                        logout();
                }
                         
        }else {
                logout();
        }
}

export default {
        setup
}