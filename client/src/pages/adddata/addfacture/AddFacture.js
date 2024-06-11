import React, { useState } from 'react';
import axios from 'axios';
import '../addfacture/AddFacture.css'; // Import du fichier CSS
import SideBar from '../../../components/SideBar.js'; // Import du composant SideBar
import logo from '../../../assets/TES1.png'; // Importez votre logo
import { notification } from 'antd';


function AddFacture() {
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
            await axios.post('http://localhost:8000/api/post-data/facture-client', formData,{withCredentials: true});
            //setSuccessMessage('Données ajoutées avec succès');
            notification.success({
                message:"Data Added Successffully !!",
                placement:'topRight',
                duration:5,
            })
            setFormData({});
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Erreur lors de l\'ajout des données');
            setSuccessMessage('');
        }
    };


    return (
        <div>
             <img src={logo} alt="Logo" className="logo" /> {/* Logo au-dessus du formulaire */}
        <div className="container">
            <SideBar/>
            <h2 className="title">Ajouter des données à la table FACTURE_CLIENT</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="EC_CODE" placeholder="EC_CODE" value={formData.EC_CODE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="MO_CODE" placeholder="MO_CODE" value={formData.MO_CODE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="FF_CODE" placeholder="FF_CODE" value={formData.FF_CODE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="FC_CODE" placeholder="FC_CODE" value={formData.FC_CODE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="JR_CODE" placeholder="JR_CODE" value={formData.JR_CODE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_LIGNE" placeholder="EC_LIGNE" value={formData.EC_LIGNE || ''} onChange={handleInputChange} className="input" />
                <select
                    name="EC_TYPE"
                    value={formData.EC_TYPE || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">EC_TYPE</option>
                    <option value="N">C</option>
                </select> 
                <input type="text" name="EC_IMPGEN" placeholder="EC_IMPGEN" value={formData.EC_IMPGEN || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_IMPTIERS" placeholder="EC_IMPTIERS" value={formData.EC_IMPTIERS || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_MONIMPDEB" placeholder="EC_MONIMPDEB" value={formData.EC_MONIMPDEB || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_MONIMPCRED" placeholder="EC_MONIMPCRED" value={formData.EC_MONIMPCRED || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="NAT_CODE" placeholder="NAT_CODE" value={formData.NAT_CODE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_POSITION" placeholder="EC_POSITION" value={formData.EC_POSITION || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_TYPEDEB" placeholder="EC_TYPEDEB" value={formData.EC_TYPEDEB || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_BASECALC_DEB" placeholder="EC_BASECALC_DEB" value={formData.EC_BASECALC_DEB || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_BASECALC_CRE" placeholder="EC_BASECALC_CRE" value={formData.EC_BASECALC_CRE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="EC_LIB_SCHEMA" placeholder="EC_LIB_SCHEMA" value={formData.EC_LIB_SCHEMA || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="N_DE_FACTURE" placeholder="N_DE_FACTURE" value={formData.N_DE_FACTURE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="ANNEE_LIBELLE" placeholder="ANNEE_LIBELLE" value={formData.ANNEE_LIBELLE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="CLIENT" placeholder="CLIENT" value={formData.CLIENT || ''} onChange={handleInputChange} className="input" />
                <button type="submit" className="button">Ajouter</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        </div>
    );
}

export default AddFacture;
