import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Raw = () => {
    const [raws, setRaws] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(7);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFetchRaws = async () => {
        try {
            const response = await axios.get('/raw.json');
            setRaws(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchRaws();
    }, []);

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = raws.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Search
    const filteredProducts = raws.filter(raw => {
        return raw.ProductName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='container-fluid'>
            <div className='col-12'>
                <div className='head-part w-50'>
                    <h1>All Raw Products</h1>
                </div>
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
                                <th>Product Name</th>
                                <th>Category Name</th>
                                <th>Raw Materials</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!searchTerm ? currentProducts : filteredProducts).map((raw, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{raw.ProductName}</td>
                                    <td>{raw.CategoryName}</td>
                                    <td>
                                        {raw.RawMaterials.map((material, idx) => (
                                            <React.Fragment key={idx}>
                                                <span>{material.name}</span>
                                                {idx !== raw.RawMaterials.length - 1 && <b className='black'>, </b>}
                                            </React.Fragment>
                                        ))}
                                    </td>
                                    <td className='d-flex gap-2'>
                                        <button className='btn btn-primary'>Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
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

export default Raw;
