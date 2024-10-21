import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function AllFinished() {
    const [finishedProducts, setFinishedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch all finished products
    const fetchFinishedProducts = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/get-all-finished');
            setFinishedProducts(response.data.data); // Assuming `data.data` contains the list of finished products
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch finished products');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFinishedProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:7000/api/v1/delete-finished/${id}`);
            toast.success('Finished product deleted successfully!');
            fetchFinishedProducts(); // Refresh the list
        } catch (error) {
            toast.error('Failed to delete the product');
        }
    };

    if (loading) return <div>Loading finished products...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container-fluid">
            <h2 className="d-flex justify-content-between align-items-center">
                All Finished Products
                <Link to="/Stock-Manage/Add-Finshied">
                    <button className="btn btn-success">Create Finished Product</button>
                </Link>
            </h2>
            <div className="card-body bg-white">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Production Date</th>
                            <th>Expiration Date</th>
                            <th>Semi-Finished Goods</th> {/* New column for semi-finished goods */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {finishedProducts.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center">No finished products available</td>
                            </tr>
                        ) : (
                            finishedProducts.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>{new Date(product.productionDate).toLocaleDateString()}</td>
                                    <td>{product.expirationDate ? new Date(product.expirationDate).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        {product.semiFinishedGoods.map((semiFinished) => (
                                            <span key={semiFinished._id}>{semiFinished.productName} </span>
                                        ))} {/* Displaying semi-finished goods */}
                                    </td>
                                    <td>
                                        <Link to={`/Stock-Manage/edit-Finshied/${product._id}`} className="btn btn-primary">Edit</Link>
                                        <button className="btn btn-danger ml-2" onClick={() => handleDelete(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllFinished;
