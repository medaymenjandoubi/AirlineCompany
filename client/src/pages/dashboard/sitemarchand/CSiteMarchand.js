import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar.js';
import "./CSiteMarchand.css";
import axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';
 import { Doughnut,Bar } from 'react-chartjs-2';
const SiteMarchand = () => {
    const [siteMarchandData, setSiteMarchandData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Nombre de lignes par page
    const [filters, setFilters] = useState({ year: '', client: '' });
    const [totalCount,setTotalCount]=useState(0)
    const [visaCount,setVisaCount]=useState(0)
    const [mcadCount,setMcadCount]=useState(0)
    const [otherCount,setOtherCount]=useState(0)
    const [chartData, setChartData] = useState(null);
    const [yearsCount,setYearsCount] = useState(null)
    const [yearsCountValues,setYearsCountValues] = useState(null)
    const [yearsCountKeys,setYearsCountKeys] = useState(null)
    const [databar,setDataBar]=useState(null)
    const [options,setOptions]=useState(null)
    const countYears = (data) => {
        const years = data
        .map(item => item.SITE_DATE.substring(0, 4))
        .filter(year => parseInt(year) >= 2010 && parseInt(year) <= 2020);
        const yearCounts = {};
        years.forEach(year => {
            if (yearCounts[year]) {
                yearCounts[year]++;
            } else {
                yearCounts[year] = 1;
            }
        });
        return yearCounts;
    }
    const getSiteMarchandData = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/get-data/site-marchand", { withCredentials: true });
            setSiteMarchandData(data);
            console.log(data)
            const visaCount = data.filter(item => item.SITE_TYPECARD === "VISA").length;
            const mcadCount = data.filter(item => item.SITE_TYPECARD === "MCAD").length;
            const totalCount = data.filter(item => item.SITE_TYPECARD === "MCAD" || item.SITE_TYPECARD === "VISA").length;
            setTotalCount(totalCount)
            const otherCount = data.filter(item => item.SITE_TYPECARD !== "VISA" && item.SITE_TYPECARD !== "MCAD").length;
            // Calculate the percentage of items with SITE_TYPECARD equal to "VISA"
            const visaPercentage = (visaCount / totalCount) * 100;
            setVisaCount(visaPercentage)
            // Calculate the percentage of items with SITE_TYPECARD equal to "MCAD"
            const mcadPercentage = (mcadCount / totalCount) * 100;
            setMcadCount(mcadPercentage)
            // Calculate the percentage of items with SITE_TYPECARD different from "VISA" and "MCAD"
            const otherPercentage = (otherCount / totalCount) * 100;
            setOtherCount(otherPercentage)
            const yearCounts = countYears(data)
            setYearsCount(yearCounts)
            setYearsCountValues(Object.values(yearCounts))
            console.log(Object.values(yearCounts))
            console.log(Object.keys(yearCounts))
            setYearsCountKeys(Object.keys(yearCounts))

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // Create chart data object
        const data = {
            labels: ['VISA', 'MCAD'],
            datasets: [
                {
                    label: 'Payment Methods',
                    data: [visaCount, mcadCount],
                    backgroundColor: [
                        'red', // Red for VISA
                        'rgba(54, 162, 235, 0.6)', // Blue for MCAD
                        'rgba(255, 206, 86, 0.6)' // Yellow for Other
                    ],
                    borderWidth: 1,
                },
            ],
        };
        // Set chart data state
        setChartData(data);
    }, [visaCount, mcadCount, otherCount]);
    useEffect(()=>{

        const databar = {
            labels: yearsCountKeys,
            datasets: [
                {
                    label: 'Number of Items',
                    data: yearsCountValues,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color for bars
                    borderColor: 'rgba(54, 162, 235, 1)', // Border color
                    borderWidth: 1,
                },
            ],
        };
        setDataBar(databar)
        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Items',
                    },
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Year',
                    },
                }],
            },
        };
        setOptions(options)
    },[yearsCount])
    useEffect(() => {
        getSiteMarchandData();
    }, []);

    // Filter siteMarchandData by year and client
    const filteredData = siteMarchandData.filter(item => {
        const itemYear = new Date(item.SITE_DMAJ).getFullYear().toString();
        const itemClient = item.SITE_AUTOR;

        if (!filters.year && !filters.client) return true;
        if (filters.year && filters.client) {
            return itemYear === filters.year && itemClient === filters.client;
        } else if (filters.year) {
            return itemYear === filters.year;
        } else if (filters.client) {
            return itemClient === filters.client;
        }
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Nombre total de pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Nombre de pages à afficher entre les flèches
    const maxPagesBetweenArrows = 27;

    // Afficher les 27 pages précédentes
    const showPreviousPages = () => {
        const firstPageInRange = Math.max(1, currentPage - maxPagesBetweenArrows);
        setCurrentPage(firstPageInRange);
    };

    // Afficher les 27 pages suivantes
    const showNextPages = () => {
        const lastPageInRange = Math.min(totalPages, currentPage + maxPagesBetweenArrows);
        setCurrentPage(lastPageInRange);
    };

    // Unique years for filter options
    const uniqueYears = [...new Set(siteMarchandData.map(item => new Date(item.SITE_DMAJ).getFullYear().toString()))];

    // Unique clients for filter options
    const uniqueClients = [...new Set(siteMarchandData.map(item => item.SITE_AUTOR))];

    return (
        <div>
            <SideBar />
            <div className="SiteMarchand-content">
                <h1>Site Marchand Dashboard</h1>
                <div className="filter-section" style={{ display: "flex" }}>
                    
                        <DropdownButton id="yearFilter" title={`Filter by Year: ${filters.year || "All"}`} variant="secondary" style={{ marginRight: "20px" }}>
                        <div style={{maxHeight:"200px",overflowY:"scroll"}}>
                            <Dropdown.Item onClick={() => setFilters({ ...filters, year: '' })} >All</Dropdown.Item>
                            {uniqueYears.map(year => (
                                <Dropdown.Item key={year} onClick={() => setFilters({ ...filters, year })} >{year}</Dropdown.Item>
                            ))}
                        </div>
                        </DropdownButton>
                   

                    <DropdownButton id="clientFilter" title={`Filter by Client: ${filters.client || "All"}`} variant="danger">
                        <div style={{maxHeight:"200px",overflowY:"scroll"}}>
                            <Dropdown.Item onClick={() => setFilters({ ...filters, client: '' })}>All</Dropdown.Item>
                            {uniqueClients.map(client => (
                                <Dropdown.Item key={client} onClick={() => setFilters({ ...filters, client })}>{client}</Dropdown.Item>
                            ))}
                        </div>
                    </DropdownButton>
                </div>
                <div className="table-container">
                    <table className="site-marchand-table">
                        <thead>
                            <tr>
                                <th>SITE_AFFILIATION</th>
                                <th>SITE_TYPE</th>
                                <th>SITE_AUTOR</th>
                                <th>SITE_DATE</th>
                                <th>SITE_TYPECARD</th>
                                <th>SITE_NUMLIGNE</th>
                                <th>SITE_NCARTP</th>
                                <th>SITE_MONTANT</th>
                                <th>SITE_MTDEVISE</th>
                                <th>SITE_COMM</th>
                                <th>SITE_TVA</th>
                                <th>SITE_ETAT</th>
                                <th>SITE_DEV</th>
                                <th>SITE_NUMDOC</th>
                                <th>SITE_IDENT</th>
                                <th>SITE_NUMDOCCOM</th>
                                <th>SITE_SIGNE</th>
                                <th>SITE_DMAJ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                                    <td>{item.SITE_AFFILIATION}</td>
                                    <td>{item.SITE_TYPE}</td>
                                    <td>{item.SITE_AUTOR}</td>
                                    <td>{item.SITE_DATE}</td>
                                    <td>{item.SITE_TYPECARD}</td>
                                    <td>{item.SITE_NUMLIGNE}</td>
                                    <td>{item.SITE_NCARTP}</td>
                                    <td>{item.SITE_MONTANT}</td>
                                    <td>{item.SITE_MTDEVISE}</td>
                                    <td>{item.SITE_COMM}</td>
                                    <td>{item.SITE_TVA}</td>
                                    <td>{item.SITE_ETAT}</td>
                                    <td>{item.SITE_DEV}</td>
                                    <td>{item.SITE_NUMDOC}</td>
                                    <td>{item.SITE_IDENT}</td>
                                    <td>{item.SITE_NUMDOCCOM}</td>
                                    <td>{item.SITE_SIGNE}</td>
                                    <td>{item.SITE_DMAJ}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="pagination">
                    <button onClick={showPreviousPages} disabled={currentPage <= 1} className="arrow">&#8249;</button>
                    {Array.from({ length: totalPages }).slice(currentPage - 1, currentPage + maxPagesBetweenArrows - 1).map((_, index) => (
                        (currentPage + index <= totalPages) ?
                            <button key={index + currentPage} onClick={() => paginate(currentPage + index)}>{currentPage + index}</button>
                            : null
                    ))}
                    <button onClick={showNextPages} disabled={currentPage >= totalPages} className="arrow">&#8250;</button>
                </div>
            <div style={{width:"100%",display:"flex",marginTop:"50px"}}>    
                <div className="doughnut-chart-container" style={{height:"400px",width:"50%"}}>
                    <h2>Payment Methods Distribution</h2>
                    {chartData && <Doughnut data={chartData} />}
                </div>
                <div style={{width:"50%"}}>
                    <h2>Number of Transactions per year</h2>
                    {yearsCount && <Bar data={databar}  style={{height:"400px"}}/>}</div></div>
            </div>
        </div>
    );
}

export default SiteMarchand;


