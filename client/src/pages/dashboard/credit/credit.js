import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar.js';
import Dashboard from './Dashboard.js'; // Assurez-vous de pointer vers le bon chemin pour le fichier Dashboard.js
import "./credit.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { getExchangeRates } from '../../../service/ExchangesRates.js';
import { Bar, Line ,options} from 'react-chartjs-2';
import LineChart from '../../../components/LineChart.js';

const Credit = () => {
  const [creditData, setCreditData] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [tableauVide, setTableauVide] = useState(null);
  const [totalMontant, setTotalMontant] = useState(0);
  const [montantArray, setMontantArray] = useState(null);
  const [pourcentageSemestre,setPourcentageSemestre]=useState(0)
  const [pourcentageTrimestre,setPourcentageTrimestre]=useState(0)
  const [pourcentageAnnuelle,setPourcentageAnnuelle]=useState(0)
  const [chartData, setChartData] = useState(null);

  const organizeDataByYear = (data) => {
    const organizedData = {};

    data.forEach((item) => {
      const year = new Date(item.ECH_DATEDEBLOG).getFullYear();

      if (!organizedData[year]) {
        organizedData[year] = [];
      }

      organizedData[year].push(item);
    });

    return organizedData;
  };

function trouverAnneeCommencementPlusAncienCredit(echeances) {
  let plusAncienneAnnee = Infinity;

  echeances.forEach(echeance => {
      const anneeCommencement = new Date(echeance.ECH_DatePrem).getFullYear();
      if (anneeCommencement < plusAncienneAnnee) {
          plusAncienneAnnee = anneeCommencement;
      }
  });

  return plusAncienneAnnee;
}

function trouverAnneeFinPlusRecentCredit(echeances) {
  let plusRecenteAnnee = -Infinity;

  echeances.forEach(echeance => {
      const anneeCommencement = new Date(echeance.ECH_DatePrem).getFullYear();
      const anneeFin = anneeCommencement + echeance.ECH_DUREE_FINANC;
      if (anneeFin > plusRecenteAnnee) {
          plusRecenteAnnee = anneeFin;
      }
  });

  return plusRecenteAnnee;
}
const creeTableauVide = (anncomm, annfin) => {
  const tableau = {};
  for (let i = anncomm; i <= annfin; i++) {
    tableau[i] = [{}];
  }
  return tableau;
};

useEffect(()=>{
  if (tableauVide !== null){
    const organizeDataForChart = () => {
      //const exchangeRates = getExchangeRates();
      const labels = Object.entries(tableauVide);
      //console.log("Labels",labels)
      const transformedData = labels.reduce((acc, [year, objects]) => {
        // Remove the first empty object from the objects array
        const filteredObjects = objects.slice(1);
        // Assign the filtered array to the year key
        acc[year] = filteredObjects;
        return acc;
    }, {});
    //console.log(transformedData[2003].reduce((total, item) => total + item.ECH_Montant, 0))
    const exchangeRates = {
      data: {
          rates: {
              EUR: 3.2, // Example rate
              USD: 2.8  // Example rate
          }
      }
  };
    //console.log(transformedData[2008])
    const calculateAdjustedSum = (data) => {
      return data.reduce((total, item) => {
          let montant = parseFloat(item.ECH_Montant);
  
          if (item.ECH_TYPE === "SEMESTRE") {
              montant *= 2;
          } else if (item.ECH_TYPE === "TRIMESTRE") {
              montant *= 4;
          }
  
          if (item.ECH_MONAIS_REMB?.trim() === "Euro") {
              montant /= exchangeRates.data?.rates.EUR;
          } else if (item.ECH_MONAIS_REMB?.trim() === "USD") {
              montant /= exchangeRates.data?.rates.USD;
          }
  
          return total + montant;
      }, 0);
  };
  
  const adjustedSums = Object.keys(transformedData).map(year => ({
      year,
      sum: calculateAdjustedSum(transformedData[year])
  }));  
  console.log(adjustedSums);
  setMontantArray(adjustedSums)
   // const data = labels.map(year => {
      //   return tableauVide[year].reduce((sum, item) => {
      //     let montant = parseFloat(item.ECH_Montant || 0);
      //     if (item.ECH_TYPE === "SEMESTRE") {
      //       montant *= 2;
      //     } else if (item.ECH_TYPE === "TRIMESTRE") {
      //       montant *= 4;
      //     }
      //     // if (item.ECH_MONAIS_REMB?.trim() === "Euro") {
      //     //   montant /= exchangeRates.data?.rates.EUR;
      //     // } else if (item.ECH_MONAIS_REMB?.trim() === "USD") {
      //     //   montant /= exchangeRates.data?.rates.USD;
      //     // }
      //     // Ajouter le montant au tableau
      //     return [...sum, montant];
      //   }, []);
      // },0);
    
      // return { labels, data };
    };
    organizeDataForChart()
  }
  
},[tableauVide])
useEffect(()=>{
  if (montantArray !== null ){
    console.log("montant array",montantArray)
  }
},[montantArray])
  const getCreditData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/get-data/credit-ent", { withCredentials: true });
      //console.log(data)
      const dataOrganized = organizeDataByYear(data);
      const anncomm= trouverAnneeCommencementPlusAncienCredit(data)
      const annfin = trouverAnneeFinPlusRecentCredit(data)
      //const nouvelobjet = decrementerDureeFinanciere(data)
      const tableauVide = creeTableauVide(anncomm, annfin);
      Object.entries(tableauVide).forEach(([cle, tableau]) => {
        data.forEach((item) => {
          const annee = parseInt(new Date(item.ECH_DatePrem).getFullYear());
          //console.log(annee)
          if (annee <= cle && (annee+item.ECH_DUREE_FINANC > cle)) {
            tableau.push(item);
          }
        });
      });
      //console.log("TABLEAU ",tableauVide)
      setTableauVide(tableauVide);

      if (dataOrganized && Object.keys(dataOrganized).length > 0) {
        setActiveAccordion(Object.keys(dataOrganized)[0]);
        //console.log(Object.keys(dataOrganized)[0])
      }
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(()=>{
  //   console.log(creditData)
  // },[creditData])
  const handleAccordionClick = async (year) => {
    setActiveAccordion(year);
    const exchangeRates = await getExchangeRates();
    if (!exchangeRates) return;
    //console.log(exchangeRates.data.rates)
    //console.log(exchangeRates.EUR)
    //console.log(exchangeRates.USD)
    if (tableauVide && tableauVide[year]) {
      const totalItems = tableauVide[year].length;
      let countSemestre = 0;
      let countTrimestre = 0;
      let countAnnuelle = 0;
      const total = tableauVide[year].reduce((sum, item) => {
 
        let montant = parseFloat(item.ECH_Montant || 0);
        
        // Multiplication selon ECH_TYPE
        if (item.ECH_TYPE === "SEMESTRE") {
          montant *= 2;
        } else if (item.ECH_TYPE === "TRIMESTRE") {
          montant *= 4;
        }
        console.log(item.ECH_MONAIS_REMB)
        // Multiplication selon ECH_MONAIS_REMB avec les taux de conversion par rapport au TND
        if (item.ECH_MONAIS_REMB?.trim() === "Euro") {
          console.log(item.ECH_MONAIS_REMB);
          montant /= exchangeRates.data.rates.EUR;
          console.log(exchangeRates.data.rates.EUR);
        } else if (item.ECH_MONAIS_REMB?.trim() === "USD") {
          montant /= exchangeRates.data.rates.USD;
          console.log(exchangeRates.data.rates.USD);
        }
        tableauVide[year].forEach((item) => {
          if (item.ECH_TYPE === "SEMESTRE") {
            countSemestre++;
          } else if (item.ECH_TYPE === "TRIMESTRE") {
            countTrimestre++;
          } else if (item.ECH_TYPE === "ANNUELLE") {
            countAnnuelle++;
          }
        });
            // Calculer les pourcentages
        const pourcentageSemestre = countSemestre / totalItems;
        const pourcentageTrimestre = countTrimestre / totalItems;
        const pourcentageAnnuelle = countAnnuelle / totalItems;

        // Utilisez les pourcentages comme vous le souhaitez, par exemple les stocker dans un état
        setPourcentageSemestre(pourcentageSemestre);
        setPourcentageTrimestre(pourcentageTrimestre);
        setPourcentageAnnuelle(pourcentageAnnuelle);
  
        return sum + montant;
      }, 0);
      setTotalMontant(total);
    }
  };
  
  useEffect(() => {
    getCreditData();
  }, []);
  useEffect(() => {
    // Préparer les données pour le graphique
    const data = {
      labels: ['Semestre', 'Trimestre', 'Annuelle'],
      datasets: [
        {
          label: 'Nombre des échéances',
          data: [pourcentageSemestre, pourcentageTrimestre, pourcentageAnnuelle],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)', // Couleur pourcentageSemestre
            'rgba(54, 162, 235, 0.6)', // Couleur pourcentageTrimestre
            'rgba(255, 206, 86, 0.6)', // Couleur pourcentageAnnuelle
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)', // Couleur pourcentageSemestre
            'rgba(54, 162, 235, 1)', // Couleur pourcentageTrimestre
            'rgba(255, 206, 86, 1)', // Couleur pourcentageAnnuelle
          ],
          borderWidth: 2,
        },
      ],
    };
    setChartData(data);
  }, [pourcentageSemestre, pourcentageTrimestre, pourcentageAnnuelle]);
  

  return (
    <div>
      <SideBar />
      <div className="credit-content">
        <div className="accordion accordion-flush" id="accordionFlushExample" style={{ height: '60vh' ,overflowY:"scroll",width:"100%"}}>
          {tableauVide && Object.keys(tableauVide).map((year, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`flush-heading${year}`} >
                <button className="accordion-button collapsed" type="button" style={ activeAccordion == year ? {backgroundColor:"red"}: {backgroundColor:""}} data-bs-toggle="collapse" data-bs-target={`#flush-collapse${year}`} aria-expanded="false" aria-controls={`flush-collapse${year}`} onClick={()=>(handleAccordionClick(year))}>
                  {year}
                </button>
              </h2>
              <div id={`flush-collapse${year}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${year}`} data-bs-parent="#accordionFlushExample">
              <div className="accordion-body" style={{width:"100%",overflowX:"scroll"}}>
  <table className="table">
    <thead>
      <tr>
        <th>ECH_CLE</th>
        <th>ECH_NUM</th>
        <th>ECH_SOC</th>
        <th>ECH_TITRE</th>
        <th>ECH_Montant</th>
        <th>ECH_PrincArr</th>
        <th>ECH_Devise</th>
        <th>ECH_Banque</th>
        <th>ECH_TYPE</th>
        <th>ECH_DATEDEBLOG</th>
        <th>ECH_DatePrem</th>
        <th>ECH_intretTrim</th>
        <th>ECH_MARGEBANC_VARI</th>
        <th>ECH_TAUX_INTERET</th>
        <th>ECH_MARGE_BANC</th>
        <th>ECH_DUREE_FINANC</th>
        <th>ECH_BASE_CALCUL</th>
        <th>ECH_MONAIS_FIN</th>
        <th>ECH_MONAIS_REMB</th>
        <th>ECH_DureeUnite</th>
        <th>ECH_TYP_CLE</th>
      </tr>
    </thead>
    <tbody>
      {tableauVide[year].map((item, idx) => (
        <tr key={idx}>
          <td>{item.ECH_CLE}</td>
          <td>{item.ECH_NUM}</td>
          <td>{item.ECH_SOC}</td>
          <td>{item.ECH_TITRE}</td>
          <td>{item.ECH_Montant}</td>
          <td>{item.ECH_PrincArr}</td>
          <td>{item.ECH_Devise}</td>
          <td>{item.ECH_Banque}</td>
          <td>{item.ECH_TYPE}</td>
          <td>{item.ECH_DATEDEBLOG}</td>
          <td>{item.ECH_DatePrem}</td>
          <td>{item.ECH_intretTrim}</td>
          <td>{item.ECH_MARGEBANC_VARI}</td>
          <td>{item.ECH_TAUX_INTERET}</td>
          <td>{item.ECH_MARGE_BANC}</td>
          <td>{item.ECH_DUREE_FINANC}</td>
          <td>{item.ECH_BASE_CALCUL}</td>
          <td>{item.ECH_MONAIS_FIN}</td>
          <td>{item.ECH_MONAIS_REMB}</td>
          <td>{item.ECH_DureeUnite}</td>
          <td>{item.ECH_TYP_CLE}</td>
        </tr>
      ))}
    </tbody>
    <p style={{fontWeight:'bold'}}>Total: {totalMontant} TND</p>
  </table>
</div>

              </div>
            </div>
          ))}
        </div>

        {montantArray && (
          <div style={{ marginTop: "15vh", display:"flex"}}>
            {/* Render the LineChart component passing montantArray as props */}
            <div style={{width:"40%"}}><LineChart data={montantArray} /></div>
            {chartData && (
        <div style={{ width: '50%', margin: 'auto' }}>
          <Bar
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      )}

          </div>
        )}
        

      </div>
    </div>
  );
}

export default Credit;
