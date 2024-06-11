import React, { useState ,useContext, useEffect} from 'react';
import axios from 'axios';
import './Login.css'; // Importer le fichier CSS
import logo1 from '../../assets/Tunisair_Express_logo.png'; // Importez votre premier logo
import logo2 from '../../assets/TES1.png'; // Importez votre deuxième logo
import viewIcon from '../../assets/view.png';
import hideIcon from "../../assets/hide.png";
import { notification } from 'antd';
import { Context } from '../../context';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [isViewed, setIseViewed] = useState(false);
    const [hidepassword, setHidePassword] = useState("password");
    const [icon, setIcon] = useState(viewIcon);
    const {state,dispatch} =useContext(Context)
    const { user } = state
    console.log("STATE", state)
    const handleLogin = async () => {
        try {
            const { data: { csrfToken } } = await axios.get("http://localhost:8000/api/csrf-token");

            // Set CSRF token as a cookie named _csrf
            document.cookie = `_csrf=${csrfToken}; path=/`;

            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            console.log('LOGIN RESPONSE', response);
            dispatch({
                type:"LOGIN",
                payload:response.data.user
            })
            //save in local storage
            window.localStorage.setItem("user",JSON.stringify(response.data.user))
            document.cookie = `token=${response.data.token}; path=/;`;
            setSuccessMessage('Authentication successful');
           
            notification.success({
                message: 'Congrats !! you are now successfully logged in ',
                //description: error.response.data,
                placement: 'topRight',
                duration: 5,
            });
             navigate("/accueil", {replace: true});
        } catch (error) {
            //setError('Invalid username or password');
            notification.error({
                message: 'Invalid email or password',
                //description: error.response.data,
                placement: 'topRight',
                duration: 5,
            });
        }
    };

    function hidePassword() {
        if (!isViewed) {
            setHidePassword("password");
        }
    }

    function showPassword() {
        if (isViewed) {
            setHidePassword("text");
        }
    }

    function handleIcon() {
        if (isViewed) {
            setIcon(hideIcon);
        } else {
            setIcon(viewIcon);
        }
    }

    const handleViewIcon = () => {
        setIseViewed(!isViewed);
        handleIcon();
        hidePassword();
        showPassword();
    };
    useEffect(()=>{
        if (user != null ){
            navigate("/accueil")
        }
    }
    ,[user])
    return (
        <div className='body-login'>
            <h1 className="mobile-title">Bienvenue Dans TES</h1>
            <div className="login-container">
                <div className="logos-container">
                    <img src={logo1} alt="Logo 1" className="login-logo" />
                    <img src={logo2} alt="Logo 2" className="login-logo" />
                </div>
                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input-password"
                    type={hidepassword}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="view-class" onClick={handleViewIcon}>
                    <img src={icon} alt="Toggle View Icon" />
                </div>
                <button className="login-button" onClick={handleLogin}>Sign in</button>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
}

export default Login;
