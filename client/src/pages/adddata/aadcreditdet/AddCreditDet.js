import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../aadcreditdet/AddCreditDet.css"
import SideBar from '../../../components/SideBar.js'; // Import du composant SideBar
import logo from '../../../assets/TES1.png'; // Importez votre logo
import { notification } from 'antd';

function AddCreditDet() {
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
            await axios.post('http://localhost:8000/api/post-data/credit-det', formData, {
                withCredentials: true
            });
            notification.success({
                message: 'Data Successfully Added !!',
                //description: error.response.data,
                placement: 'topRight',
                duration: 5,
            });
            //setSuccessMessage('Données ajoutées avec succès');
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
    useEffect(()=>{
        console.log(formData)
    },[formData])
    return (
        <div>
            <img src={logo} alt="Logo" className="logo" /> {/* Logo au-dessus du formulaire */}
            <div className="container">
                <SideBar/>
                <h2 className="title">Ajouter des données à la table CREDIT_DET</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="ECH_DET_CLE" placeholder="ECH_DET_CLE" value={formData.ECH_DET_CLE || ''} onChange={handleInputChange} className="input" />
                    <input type="text" name="ECH_ENT_CLE" placeholder="ECH_ENT_CLE" value={formData.ECH_ENT_CLE || ''} onChange={handleInputChange} className="input" />
                    <DatePicker
                        selected={formData.ECH_DET_DATE_DU ? new Date(formData.ECH_DET_DATE_DU) : null}
                        onChange={(date) => handleDateChange(date, "ECH_DET_DATE_DU")}
                        className="input"
                        placeholderText="ECH_DET_DATE_DU"
                        required
                    />

                    <DatePicker
                        selected={formData.ECH_DET_DATE_AU ? new Date(formData.ECH_DET_DATE_AU) : null}
                        onChange={(date) => handleDateChange(date, "ECH_DET_DATE_AU")}
                        className="input"
                        placeholderText="ECH_DET_DATE_AU"
                        required
                    />
                    <input type="text" name="ECH_DET_MT_Credit" placeholder="ECH_DET_MT_Credit" value={formData.ECH_DET_MT_Credit || ''} onChange={handleInputChange} className="input" required/>
                    <input type="text" name="ECH_DET_MT_AMORTI" placeholder="ECH_DET_MT_AMORTI" value={formData.ECH_DET_MT_AMORTI || ''} onChange={handleInputChange} className="input" required/>
                    <input type="text" name="ECH_DET_TAUX_INTR" placeholder="ECH_DET_TAUX_INTR" value={formData.ECH_DET_TAUX_INTR || ''} onChange={handleInputChange} className="input" required/>
                    <input type="text" name="ECH_DET_MARGE" placeholder="ECH_DET_MARGE" value={formData.ECH_DET_MARGE || ''} onChange={handleInputChange} className="input" required/>
                    <input type="text" name="ECH_DET_TOTAL_INTR" placeholder="ECH_DET_TOTAL_INTR" value={formData.ECH_DET_TOTAL_INTR || ''} onChange={handleInputChange} className="input" required/>
                    <input type="text" name="ECH_DET_TOTAL_REMB" placeholder="ECH_DET_TOTAL_REMB" value={formData.ECH_DET_TOTAL_REMB || ''} onChange={handleInputChange} className="input" required/>        
                    <button type="submit" className="button">Ajouter</button>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
        );
    }

export default AddCreditDet;
