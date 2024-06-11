import React, { useState } from 'react';
import axios from 'axios';
import "../aadcreditdet/AddCreditDet.css"
import SideBar from '../../../components/SideBar.js'; // Import du composant SideBar
import logo from '../../../assets/TES1.png'; // Importez votre logo
import { notification } from 'antd';

function AddCreditType() {
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/post-data/credit-type', formData, { withCredentials: true });
            //setSuccessMessage('Données ajoutées avec succès');
            notification.success({
                message:"Data succesffully Added !!",
                placement:"topRight",
                duration:5,
            })
            setFormData({});
        } catch (error) {
            notification.error({
                message:error,
                placement: 'topRight',
                duration: 5,
            })
            //setErrorMessage('Erreur lors de l\'ajout des données');
        }
    };

    return (
        <div>
            <img src={logo} alt="Logo" className="logo" /> {/* Logo au-dessus du formulaire */}
            <div className="container">
                <SideBar/>
                <h2 className="title">Ajouter des données à la table CREDIT_TYP</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="ECH_TYP_CLE" placeholder="ECH_TYP_CLE" value={formData.ECH_TYP_CLE || ''} onChange={handleInputChange} className="input" />
                    <input type="text" name="ECH_SOC" placeholder="ECH_SOC" value={formData.ECH_SOC || ''} onChange={handleInputChange} className="input" />
                    <input type="text" name="ECH_COD" placeholder="ECH_COD" value={formData.ECH_COD || ''} onChange={handleInputChange} className="input" />
                    <input type="text" name="ECH_LIB" placeholder="ECH_LIB" value={formData.ECH_LIB || ''} onChange={handleInputChange} className="input" />
                    <button type="submit" className="button">Ajouter</button>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default AddCreditType;
