import React from 'react';
import './accueil.css'; // Import du fichier CSS
import SideBar from '../../components/SideBar.js';
import backgroundImage from '../../assets/banner.png';
import { NavLink } from 'react-router-dom';
import TES1 from "../../assets/TES LOGO.png";
import axios from 'axios';
import { useEffect,useState,useContext } from 'react';
import { Context } from '../../context/index.js';
export default function Accueil() {
  const [hidden,setHidden]=useState(true)
  const {
    state: {user}
  }= useContext(Context)
  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        //axios.defaults.withCredentials = true;
        const { data } = await axios.get("http://localhost:8000/api/current-user",{
          withCredentials:true
        });
        console.log(data)
        setHidden(false)
      } catch (error) {
        console.log(error)
        setHidden(true)
      }
    }
    fetchUser()
  },[])
  return (
    <>
      <SideBar />
      <div className="content">      
        <div className="add-table">
          <img src={backgroundImage} alt="background" className="background-image" />
          <h2 className="welcome-title">Bienvenue dans TES</h2>
          <p className="p">Des chiffres claires pour des décisions éclairées</p>
          <img src={TES1} alt="TES" className="TES" />
        </div>
        <div className='apropos'>
          <h1>A propos de TES</h1>
          <p>TES dédiée à Tunisair offre une capacité décisionnelle inégalée<br /> basée sur des données financières précises. 
            Grâce à une analyse approfondie de vos statistiques de comptabilité et de solvabilité en temps réel</p>
        </div>
        <div className="add-table">
          <h3>Ajouter des données pour la table spécifiée</h3>
          <div className="table-buttons">
            <button type="button" className="button-62">
              <NavLink to="/AddCreditDet" className="table-button">CREDIT_DET</NavLink>
            </button>
            <button type="button" className="button-62">
              <NavLink to="/AddCreditEnt" className="table-button">CREDIT_ENT</NavLink>
            </button>
            <button type="button" className="button-62">
              <NavLink to="/AddFacture" className="table-button">FACTURE_CLIENT</NavLink>
            </button>
            <button type="button" className="button-62">
              <NavLink to="/AddSiteMarchand" className="table-button">SITE_MARCHAND</NavLink>
            </button>
            <button type="button" className="button-62">
              <NavLink to="/addcredittype" className="table-button">CREDIT_TYP</NavLink>
            </button>
          </div>
        </div>
        {/* Nouveau div avec un titre et un bouton */}
        <div className="add-user">
          <h3>Ajouter un utilisateur</h3>
          {/* <p>{JSON.stringify(user)}</p> */}
          <button type="button" className="button-62">
            <NavLink to="/AddUser" className="table-button">AJOUTER</NavLink>
          </button>
        </div>
      </div>
    </>
  );
}
