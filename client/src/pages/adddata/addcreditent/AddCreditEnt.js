import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../addcreditent/AddCreditEnt.css'; // Assurez-vous d'importer le fichier CSS
import SideBar from '../../../components/SideBar.js'; // Import du composant SideBar
import logo from '../../../assets/TES1.png'; // Importez votre logo
import { notification } from 'antd';

function AddCreditEnt() {
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date, name) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/post-data/credit-ent', formData,{
                withCredentials:true
              }); // Correction de l'endpoint
            //setSuccessMessage('Données ajoutées avec succès');
            notification.success({
                message: 'Data Successfully Added !!',
                //description: error.response.data,
                placement: 'topRight',
                duration: 5,
            });
            setFormData({});
        } catch (error) {
            //setErrorMessage('Erreur lors de l\'ajout des données');
            notification.error({
                message:error,
                placement: 'topRight',
                duration: 5,
            })
        }
    };
    
    return (
        <div>
        <img src={logo} alt="Logo" className="logo" /> {/* Logo au-dessus du formulaire */}

        <div className="container">
            <SideBar/>
            <h2 className="title">Ajouter des données à la table CREDIT_ENT</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="ECH_CLE" placeholder="ECH_CLE" value={formData.ECH_CLE || ''} onChange={handleInputChange} className="input" />    
                <input type="text" name="ECH_NUM" placeholder="ECH_NUM" value={formData.ECH_NUM || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="ECH_SOC" placeholder="ECH_SOC" value={formData.ECH_SOC || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="ECH_TITRE" placeholder="ECH_TITRE" value={formData.ECH_TITRE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="ECH_Montant" placeholder="ECH_Montant" value={formData.ECH_Montant || ''} onChange={handleInputChange} className="input" />
                <select
                    name="ECH_PrincArr"
                    value={formData.ECH_PrincArr || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">ECH_PrincArr</option>
                    <option value="N">N</option>
                    <option value="O">O</option>
                </select>               
                <select
                    name="ECH_Devise"
                    value={formData.ECH_Devise || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">ECH_Devise</option>
                    <option value="0101TND">0101TND</option>
                    <option value="0101USD">0101USD</option>
                    <option value="0101EUR">0101EUR</option>
                </select>                
                <input type="text" name="ECH_Banque" placeholder="ECH_Banque" value={formData.ECH_Banque || ''} onChange={handleInputChange} className="input" />
                <select
                    name="ECH_TYPE"
                    value={formData.ECH_TYPE || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">ECH_TYPE</option>
                    <option value="SEMESTRE">SEMESTRE</option>
                    <option value="TRIMESTRE">TRIMESTRE</option>
                </select>
                <DatePicker
                    selected={formData.ECH_DATEDEBLOG ? new Date(formData.ECH_DATEDEBLOG) : null}
                    onChange={(date) => handleDateChange(date, "ECH_DATEDEBLOG")}
                    className="input"
                    placeholderText="ECH_DATEDEBLOG"
                />
                <DatePicker
                    selected={formData.ECH_DatePrem ? new Date(formData.ECH_DatePrem) : null}
                    onChange={(date) => handleDateChange(date, "ECH_DatePrem")}
                    className="input"
                    placeholderText="ECH_DatePrem"
                />
                <select
                    name="ECH_intretTrim"
                    value={formData.ECH_intretTrim || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">Choisissez une option</option>
                    <option value="N">N</option>
                    <option value="O">O</option>
                </select>

                <input type="text" name="ECH_MARGEBANC_VARI" placeholder="ECH_MARGEBANC_VARI" value={formData.ECH_MARGEBANC_VARI || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="ECH_TAUX_INTERET" placeholder="ECH_TAUX_INTERET" value={formData.ECH_TAUX_INTERET || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="ECH_MARGE_BANC" placeholder="ECH_MARGE_BANC" value={formData.ECH_MARGE_BANC || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="ECH_DUREE_FINANC" placeholder="ECH_DUREE_FINANC" value={formData.ECH_DUREE_FINANC || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="ECH_BASE_CALCUL" placeholder="ECH_BASE_CALCUL" value={formData.ECH_BASE_CALCUL || ''} onChange={handleInputChange} className="input" />
                <select
                    name="ECH_MONAIS_FIN"
                    value={formData.ECH_MONAIS_FIN || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">ECH_MONAIS_FIN</option>
                    <option value="TND">TND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">Euro</option>
                </select>   
                <select
                    name="ECH_MONAIS_REMB"
                    value={formData.ECH_MONAIS_REMB || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">ECH_MONAIS_REMB</option>
                    <option value="TND">TND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">Euro</option>
                </select>
                <select
                    name="ECH_DureeUnite"
                    value={formData.ECH_DureeUnite || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">ECH_DureeUnite</option>
                    <option value="ANS">ANS</option>
                    <option value="SEMESTRE">SEMESTRE</option>
                    <option value="TRIMESTRE">TRIMESTRE</option>
                </select>   
                <input type="text" name="ECH_TYP_CLE" placeholder="ECH_TYP_CLE" value={formData.ECH_TYP_CLE || ''} onChange={handleInputChange} className="input" />
                <button type="submit" className="button">Ajouter</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        </div>

    );
}

export default AddCreditEnt;
