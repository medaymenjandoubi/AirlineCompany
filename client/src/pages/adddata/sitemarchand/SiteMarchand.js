import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import '../sitemarchand/SiteMarchand.css'; // Import du fichier CSS
import SideBar from '../../../components/SideBar.js'; // Import du composant SideBar
import logo from '../../../assets/TES1.png'; // Importez votre logo
import { notification } from 'antd';

function AddSiteMarchand() {
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
            await axios.post('http://localhost:8000/api/post-data/site-marchand', formData,{withCredentials:true});
            //setSuccessMessage('Données ajoutées avec succès');
            notification.success({
                message:'Data Added Successfully !!',
                placement:'topRight',
                duration:5,
            })
            setFormData({});
        } catch (error) {
            notification.error({
                message:error,
                placement:'topRight',
                duration:5,
            })
            setErrorMessage('Erreur lors de l\'ajout des données');
        }
    };

    return (
        <div>
        <img src={logo} alt="Logo" className="logo" /> {/* Logo au-dessus du formulaire */}

        <div className="container">
             <SideBar />
            <h2 className="title">Ajouter des données à la table SITE_MARCHAND</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="SITE_AFFILIATION" placeholder="SITE_AFFILIATION" value={formData.SITE_AFFILIATION || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_TYPE" placeholder="SITE_TYPE" value={formData.SITE_TYPE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_AUTOR" placeholder="SITE_AUTOR" value={formData.SITE_AUTOR || ''} onChange={handleInputChange} className="input" />
                <DatePicker
                    selected={formData.SITE_DATE ? new Date(formData.SITE_DATE) : null}
                    onChange={(date) => handleDateChange(date, "SITE_DATE")}
                    className="input"
                    placeholderText="SITE_DATE"
                />
                <select
                    name="SITE_TYPECARD"
                    value={formData.SITE_TYPECARD || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">SITE_TYPECARD</option>
                    <option value="VISA">VISA</option>
                    <option value="MCAD">MCAD</option>
                </select> 
                <input type="text" name="SITE_NUMLIGNE" placeholder="SITE_NUMLIGNE" value={formData.SITE_NUMLIGNE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_NCARTP" placeholder="SITE_NCARTP" value={formData.SITE_NCARTP || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_MONTANT" placeholder="SITE_MONTANT" value={formData.SITE_MONTANT || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_MTDEVISE" placeholder="SITE_MTDEVISE" value={formData.SITE_MTDEVISE || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_COMM" placeholder="SITE_COMM" value={formData.SITE_COMM || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_TVA" placeholder="SITE_TVA" value={formData.SITE_TVA || ''} onChange={handleInputChange} className="input" />
                <select
                    name="SITE_ETAT"
                    value={formData.SITE_ETAT || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">SITE_ETAT</option>
                    <option value="N">N</option>
                    <option value="O">O</option>
                </select> 
                <select
                    name="SITE_DEV"
                    value={formData.SITE_DEV || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">SITE_DEV</option>
                    <option value="TND">TND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">Euro</option>
                </select> 
                <input type="text" name="SITE_NUMDOC" placeholder="SITE_NUMDOC" value={formData.SITE_NUMDOC || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_IDENT" placeholder="SITE_IDENT" value={formData.SITE_IDENT || ''} onChange={handleInputChange} className="input" />
                <input type="text" name="SITE_NUMDOCCOM" placeholder="SITE_NUMDOCCOM" value={formData.SITE_NUMDOCCOM || ''} onChange={handleInputChange} className="input" />
                <select
                    name="SITE_SIGNE"
                    value={formData.SITE_SIGNE || ''}
                    onChange={handleInputChange}
                    className="input"
                >
                    <option value="">SITE_SIGNE</option>
                    <option value="P">P</option>
                    <option value="N">N</option>
                </select> 
                <div>                
                    <DatePicker
                    selected={formData.SITE_DMAJ ? new Date(formData.SITE_DMAJ) : null}
                    onChange={(date) => handleDateChange(date, "SITE_DMAJ")}
                    className="input"
                    placeholderText="SITE_DMAJ"
                /></div>


                <button type="submit" className="button">Ajouter</button>
            </form>
            
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        </div>

    );
}

export default AddSiteMarchand;
