import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar.js';
import "./Facture.css";
import axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const Facture = () => {
    const [factureData, setFactureData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(100);
    const [filters, setFilters] = useState({ year: '', client: '' });

    const getFactureData = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/get-data/facture-client", { withCredentials: true });
            setFactureData(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFactureData();
    }, []);

    // Filter factureData by year and client
    const filteredData = factureData.filter(item => {
        if (!filters.year && !filters.client) return true;
        if (filters.year && filters.client) {
            return item.ANNEE_LIBELLE === filters.year && item.CLIENT === filters.client;
        } else if (filters.year) {
            return item.ANNEE_LIBELLE === filters.year;
        } else if (filters.client) {
            return item.CLIENT === filters.client;
        }
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Unique years for filter options
    const uniqueYears = [...new Set(factureData.map(item => item.ANNEE_LIBELLE))];

    // Unique clients for filter options
    const uniqueClients = [...new Set(factureData.map(item => item.CLIENT))];

    return (
        <div>
            <SideBar />
            <div className="Facture-content">
                <h1>Facture Dashboard</h1>
                <div className="filter-section" style={{display:"flex"}}>
                    <DropdownButton id="yearFilter" title={`Filter by Year: ${filters.year || "All"}`} variant="secondary" style={{marginRight:"20px"}}>
                        <div style={{maxHeight:"200px", overflowY:"scroll"}}>
                        <Dropdown.Item onClick={() => setFilters({ ...filters, year: '' })}>All</Dropdown.Item>
                        {uniqueYears.map(year => (
                            <Dropdown.Item key={year} onClick={() => setFilters({ ...filters, year })}>{year}</Dropdown.Item>
                        ))}
                        </div>
                    </DropdownButton>
                    <DropdownButton id="clientFilter" title={`Filter by Client: ${filters.client || "All"}`} variant="danger">
                        <Dropdown.Item onClick={() => setFilters({ ...filters, client: '' })}>All</Dropdown.Item>
                        {uniqueClients.map(client => (
                            <Dropdown.Item key={client} onClick={() => setFilters({ ...filters, client })}>{client}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="table-container">
                    <table className="facture-table">
                        <thead>
                            <tr>
                                <th>EC_CODE</th>
                                <th>MO_CODE</th>
                                <th>FF_CODE</th>
                                <th>FC_CODE</th>
                                <th>JR_CODE</th>
                                <th>EC_LIGNE</th>
                                <th>EC_TYPE</th>
                                <th>EC_IMPGEN</th>
                                <th>EC_IMPTIERS</th>
                                <th>EC_MONIMPDEB</th>
                                <th>EC_MONIMPCRED</th>
                                <th>NAT_CODE</th>
                                <th>EC_POSITION</th>
                                <th>EC_TYPEDEB</th>
                                <th>EC_BASECALC_DEB</th>
                                <th>EC_BASECALC_CRE</th>
                                <th>EC_LIB_SCHEMA</th>
                                <th>N_DE_FACTURE</th>
                                <th>ANNEE_LIBELLE</th>
                                <th>CLIENT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                                    <td>{item.EC_CODE}</td>
                                    <td>{item.MO_CODE}</td>
                                    <td>{item.FF_CODE}</td>
                                    <td>{item.FC_CODE}</td>
                                    <td>{item.JR_CODE}</td>
                                    <td>{item.EC_LIGNE}</td>
                                    <td>{item.EC_TYPE}</td>
                                    <td>{item.EC_IMPGEN}</td>
                                    <td>{item.EC_IMPTIERS}</td>
                                    <td>{item.EC_MONIMPDEB}</td>
                                    <td>{item.EC_MONIMPCRED}</td>
                                    <td>{item.NAT_CODE}</td>
                                    <td>{item.EC_POSITION}</td>
                                    <td>{item.EC_TYPEDEB}</td>
                                    <td>{item.EC_BASECALC_DEB}</td>
                                    <td>{item.EC_BASECALC_CRE}</td>
                                    <td>{item.EC_LIB_SCHEMA}</td>
                                    <td>{item.N_DE_FACTURE.replace(/^NÂ°Fact\s*:\s*/, '')}</td>
                                    <td>{item.ANNEE_LIBELLE}</td>
                                    <td>{item.CLIENT}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Facture;
