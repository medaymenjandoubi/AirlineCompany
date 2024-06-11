import './App.css';
import AppRoutes from "./routes/route";
import { Provider } from './context/index.js';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/login/Login";
import Accueil from "./pages/acceuil/accueil.js";
import AddCreditDet from "./pages/adddata/aadcreditdet/AddCreditDet.js";
import AddCreditEnt from "./pages/adddata/addcreditent/AddCreditEnt.js";
import AddFacture from "./pages/adddata/addfacture/AddFacture.js";
import SiteMarchand from "./pages/adddata/sitemarchand/SiteMarchand.js";
import Credit from "./pages/dashboard/credit/credit.js"; // Correction de la casse du nom de fichier
import Facture from "./pages/dashboard/facture/Facture.js";
import CSiteMarchand from "./pages/dashboard/sitemarchand/CSiteMarchand.js"; // Correction de la casse du nom de fichier
import AddUser from "./pages/adddata/adduser/AddUser.js";
import AddCreditType from './pages/adddata/addcredittype/AddCreditType.js';
function App() {
  return (
    
    
    <Router>
      <Provider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/addcreditdet" element={<AddCreditDet />} />
          <Route path="/addcreditent" element={<AddCreditEnt />} />
          <Route path="/addcredittype" element={<AddCreditType />} />
          <Route path="/addfacture" element={<AddFacture />} />
          <Route path="/addsitemarchand" element={<SiteMarchand />} /> {/* Correction du chemin */}
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/facture" element={<Facture />} />
          <Route path="/site-marchand" element={<CSiteMarchand />} /> {/* Correction du chemin */}
        </Routes>
      </Provider>
    </Router>
    
  );
}

export default App;
