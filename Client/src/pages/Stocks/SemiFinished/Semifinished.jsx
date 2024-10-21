import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap';

function Semifinished() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(7);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/get-all-semifinished');
            setProducts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:7000/api/v1/delete-semifinished/${id}`);
            toast.success('Product Deleted Successfully!');
            await handleFetchProducts();
        } catch (error) {
            console.log(error);
            toast.error('Internal server error in deleting Product');
        }
    };

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Search
    const filteredProducts = products.filter(product => {
        return product.productName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='container-fluid'>
            <div className='col-12'>
                <h2 className="d-flex justify-content-between align-items-center">
                    All Products
                    <Link to="/Stock-Manage/create-semi-finished">
                        <Button variant="success">Create Semi Finished</Button>
                    </Link>
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
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Raw Materials</th>
                                <th>Production Date</th>
                                <th>Expiration Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(!searchTerm ? currentProducts : filteredProducts).map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.rawMaterials.join(', ')}</td> {/* Display raw materials as comma-separated values */}
                                    <td>{new Date(product.productionDate).toLocaleDateString()}</td>
                                    <td>{new Date(product.expirationDate).toLocaleDateString()}</td>
                                    <td className='d-flex gap-2'>
                                        <Link to={`/Stock-Manage/edit-semi-finished/${product._id}`} className='btn btn-primary'>Edit</Link>
                                        <button className='btn btn-danger' onClick={() => handleDelete(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <ul className='pagination justify-content-center'>
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
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

export default Semifinished;
