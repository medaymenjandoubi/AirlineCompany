import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Dashboard = () => {
    const [creditDetData, setCreditDetData] = useState(null);
    const [creditEntData, setCreditEntData] = useState(null);

    useEffect(() => {
        const fetchCreditDetData = async () => {
            try {
                const response = await axios.get('http://localhost:3005/get-data/credit-det');
                console.log('CREDIT_DET data:', response.data);
                setCreditDetData(response.data);
            } catch (error) {
                console.error('Error fetching CREDIT_DET data:', error);
            }
        };

        const fetchCreditEntData = async () => {
            try {
                const response = await axios.get('http://localhost:3005/get-data/credit-ent');
                console.log('CREDIT_ENT data:', response.data);
                setCreditEntData(response.data);
            } catch (error) {
                console.error('Error fetching CREDIT_ENT data:', error);
            }
        };

        fetchCreditDetData();
        fetchCreditEntData();
    }, []);

    useEffect(() => {
        if (creditDetData && creditEntData) {
            const prepareCreditChartData = () => {
                const labels = ['Entreprise A', 'Entreprise B', 'Entreprise C'];
                const usedCredits = [5000, 6000, 4000];
                const availableCredits = [3000, 2000, 5000];

                return {
                    labels: labels,
                    datasets: [{
                        label: 'Crédits Utilisés',
                        data: usedCredits,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Crédits Disponibles',
                        data: availableCredits,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                };
            };

            const chartData = prepareCreditChartData();
            console.log('Chart data:', chartData);

            const ctx = document.getElementById('creditChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }, [creditDetData, creditEntData]);

    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Dashboard Crédit</h2>
            <div className="chart-container">
                <canvas id="creditChart"></canvas>
            </div>
        </div>
    );
};

export default Dashboard;
