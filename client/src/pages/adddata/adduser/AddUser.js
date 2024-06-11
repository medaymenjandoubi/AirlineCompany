import React, { useState } from 'react';
import axios from 'axios';
import '../adduser/AddUser.css'; // Import du fichier CSS
import SideBar from '../../../components/SideBar.js'; // Import du composant SideBar
import logo from '../../../assets/TES1.png'; // Importez votre logo
import { notification } from 'antd';
// import 'antd/dist/antd.css'; // Make sure to import the styles for antd

function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', { name, email, password, role });
            console.log("Register response", response);

            notification.success({
                message: 'Success!',
                description: 'Registration successful!',
                placement: 'topRight',
                duration: 5,
            });
        } catch (error) {
            console.log("this is the error", error);

            if (error.response && error.response.status === 400) {
                notification.error({
                    message: 'Error',
                    description: error.response.data,
                    placement: 'topRight',
                    duration: 5,
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'An unexpected error occurred. Please try again.',
                    placement: 'topRight',
                    duration: 5,
                });
            }
        }
    };

    return (
        <div>
            <img src={logo} alt="Logo" className="logo" /> {/* Logo au-dessus du formulaire */}
            <div className="container"> {/* Container pour le formulaire */}
                <SideBar />
                <h2 className="title">Ajouter des données à la table log</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="input"
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter name"
                        required
                    />
                    <input 
                        type="email" 
                        className="input"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                    />
                    <input 
                        type="password" 
                        className="input"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                    <select 
                        className="input"
                        value={role} 
                        onChange={e => setRole(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        {/* Add more roles as needed */}
                    </select>

                    <br />
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <button type="submit" className="button" style={{width:"100%"}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
