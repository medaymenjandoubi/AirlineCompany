import React, { useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import "./SideBar.css";
import logo from "../assets/Tunisair_Express_logo.png";
import factureicon from "../assets/Facture.png";
import home from "../assets/home.png";
import crediticon from "../assets/Credit.png";
import marchandicon from "../assets/Marchand.png";
import { Context } from "../context";
import axios from "axios";
import { notification } from "antd";

const SideBar = () => {
  const [redirect, setRedirect] = useState(false);
  const {state,dispatch}=useContext(Context)
  
  const handleLogout = async () => {
    dispatch({type:"LOGOUT"});
    //console.log("Déconnexion effectuée");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_csrf=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const {data} = await axios.get("http://localhost:8000/api/logout")
    notification.success({
      message: 'Log out successfull !!',
      //description: error.response.data,
      placement: 'topRight',
      duration: 5,
  });
    // Ajoutez ici la logique de déconnexion réelle, par exemple, effacer les tokens, etc.
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <aside id="sidebar-multi-level-sidebar" aria-label="Sidebar">
      <div>
        <img src={logo} alt="Tunisair Express Logo" className="sidebar-logo" />
      </div>
      <div className="sidebar-container">
        <ul className="sidebar-ul">
          <li className="sidebar-li">
            <NavLink to="/Accueil" className="sidebar-button" activeClassName="active">
              <img src={home} alt="Accueil" className="sidebar-img" />
              <span>Accueil</span>
            </NavLink>
          </li>
          <li className="sidebar-li">
            <NavLink to="/credit" className="sidebar-button" activeClassName="active">
              <img src={crediticon} alt="Crédit" className="sidebar-img" />
              <span>Crédit</span>
            </NavLink>
          </li>
          <li className="sidebar-li">
            <NavLink to="/facture" className="sidebar-button" activeClassName="active">
              <img src={factureicon} alt="Facture" className="sidebar-img" />
              <span>Facture</span>
            </NavLink>
          </li>
          <li className="sidebar-li">
            <NavLink to="/site-marchand" className="sidebar-button" activeClassName="active">
              <img src={marchandicon} alt="Site Marchand" className="sidebar-img" />
              <span>Site Marchand</span>
            </NavLink>
          </li>
          <li className="sidebar-li">
            <button className="sidebar-logout" onClick={handleLogout}>
              <span>Déconnexion</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
