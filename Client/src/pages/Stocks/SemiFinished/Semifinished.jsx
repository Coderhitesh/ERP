import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap';

function Semifinished() {
    const [raws, setRaws] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(7);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFetchRaws = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/get-all-raw-material');
            setRaws(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchRaws();
    }, []);

    const handleDelete = async (id) => {
        // console.log('id',id)
        try {
            const res = await axios.delete(`http://localhost:7000/api/v1/delete-raw-material/${id}`)
            toast.success('Raw Material Deleted Successfully!')
            await handleFetchRaws();
        } catch (error) {
            console.log(error)
            toast.error('Internal server error in deleting Raw Material')
        }
    }

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = raws.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Search
    const filteredProducts = raws.filter(raw => {
        return raw.materialName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='container-fluid'>
            <div className='col-12'>
            <h2 className="d-flex justify-content-between align-items-center">
                All Vendors
                <a href="/Clients-Vendor/Add-Vendors"><Button variant="success">Create Vendor</Button></a>
            </h2>
                <div className='card-body bg-white'>
                    <div className="input-group mb-3">
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search by Product Name'
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">Search</button>
                        </div>
                    </div>

                    <table className='table py-2 px-2 table-bordered'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Raw Material Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Supplier</th>
                                <th>Measurement Of Unit</th>
                                <th>Storage Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!searchTerm ? currentProducts : filteredProducts).map((raw, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{raw.materialName}</td>
                                    <td>{raw.quantity}</td>
                                    <td>{raw.unitPrice}</td>
                                    <td>{raw.supplier}</td>
                                    <td>{raw.unitOfMeasurement}</td>
                                    <td>{raw.storageLocation}</td>
                                    {/* <td>
                                        {raw.RawMaterials.map((material, idx) => (
                                            <React.Fragment key={idx}>
                                                <span>{material.name}</span>
                                                {idx !== raw.RawMaterials.length - 1 && <b className='black'>, </b>}
                                            </React.Fragment>
                                        ))}
                                    </td> */}
                                    <td className='d-flex gap-2'>
                                        <Link to={`/Stock-Manage/edit-raw/${raw._id}`} className='btn btn-primary'>Edit</Link>
                                        <button className='btn btn-danger' onClick={() => handleDelete(raw._id)}>Delete</button>
                                        </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {/* Pagination */}
                    <ul className='pagination justify-content-center'>
                        {Array.from({ length: Math.ceil(raws.length / productsPerPage) }).map((_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className='page-link'>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Semifinished
