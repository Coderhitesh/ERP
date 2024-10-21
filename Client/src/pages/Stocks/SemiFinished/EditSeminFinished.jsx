import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Headings from '../../../components/Headings/Headings';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';

function EditSeminFinished() {
    const { id } = useParams(); // Assuming you're using react-router-dom to get the product ID
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        unitPrice: '',
        rawMaterials: [], // For multiple raw materials selection
        productionDate: '',
        expirationDate: '',
        roles: [] // For roles input
    });

    const [rawMaterialsOptions, setRawMaterialsOptions] = useState([]); // Options for Select
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch raw materials for dropdown
    const fetchRawMaterials = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/get-all-raw-material');
            const options = response.data.data.map(rawMaterial => ({
                value: rawMaterial._id,
                label: rawMaterial.materialName
            }));
            setRawMaterialsOptions(options);
        } catch (error) {
            console.error('Error fetching raw materials:', error);
        }
    };

    // Fetch the semi-finished product details by ID
    const fetchSemiFinishedProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/v1/get-single-semifinished/${id}`);
            const product = response.data.data;

            // Prepopulate the form data with the fetched product
            setFormData({
                productName: product.productName,
                quantity: product.quantity,
                unitPrice: product.unitPrice,
                rawMaterials: product.rawMaterials.map(material => material._id), // Use _id of raw materials
                productionDate: product.productionDate.split('T')[0], // format the date correctly
                expirationDate: product.expirationDate ? product.expirationDate.split('T')[0] : '',
                roles: product.roles || []
            });
        } catch (error) {
            console.error('Error fetching semi-finished product:', error);
        }
    };

    useEffect(() => {
        fetchRawMaterials();
        fetchSemiFinishedProduct(); // Load the product data when the component mounts
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle select change for raw materials (multiple select)
    const handleRawMaterialsChange = (selectedOptions) => {
        const selectedRawMaterials = selectedOptions.map(option => option.value);
        setFormData({
            ...formData,
            rawMaterials: selectedRawMaterials
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`http://localhost:7000/api/v1/update-semifinished/${id}`, formData);
            toast.success('Semi-Finished Product updated successfully!');
            // navigate('/semi-finished-products'); // Redirect to another page after successful update
        } catch (error) {
            console.log(error)
            setError('Error updating semi-finished product');
            toast.error('Error updating semi-finished product');
        }

        setLoading(false);
    };

    return (
        <>
            <Headings heading={'Edit Semi-Finished Product'} />
            <div className="container px-4 py-3 mt-4">
                <div className='col-12 col-md-12'>
                    <div className="row">
                        <div className="col-12 mt-5 col-md-12">
                            <form className='text-capitalize' onSubmit={handleSubmit}>

                                {/* Product Name */}
                                <div className='container'>
                                    <div className='col-12'>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label htmlFor="productName" className="form-label">Product Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="productName"
                                                    name="productName"
                                                    value={formData.productName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity and Unit Price */}
                                <div className='container'>
                                    <div className='col-12'>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="quantity"
                                                    name="quantity"
                                                    value={formData.quantity}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label htmlFor="unitPrice" className="form-label">Unit Price</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    className="form-control"
                                                    id="unitPrice"
                                                    name="unitPrice"
                                                    value={formData.unitPrice}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Raw Material Dropdown (Multiple Select) */}
                                <div className='container'>
                                    <div className='col-12'>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label htmlFor="rawMaterials" className="form-label">Select Raw Materials</label>
                                                <Select
                                                    isMulti
                                                    name="rawMaterials"
                                                    options={rawMaterialsOptions}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={handleRawMaterialsChange}
                                                    value={rawMaterialsOptions.filter(option => formData.rawMaterials.includes(option.value))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Production Date and Expiration Date */}
                                <div className='container'>
                                    <div className='col-12'>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <label htmlFor="productionDate" className="form-label">Production Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="productionDate"
                                                    name="productionDate"
                                                    value={formData.productionDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-6 mb-3">
                                                <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="expirationDate"
                                                    name="expirationDate"
                                                    value={formData.expirationDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Roles (Optional Input) */}
                                <div className='container'>
                                    <div className='col-12'>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label htmlFor="roles" className="form-label">Roles</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="roles"
                                                    name="roles"
                                                    value={formData.roles}
                                                    onChange={handleChange}
                                                    placeholder="Enter roles separated by commas"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className='ml-5'>
                                    <button type="submit" className="px-5 py-2 bg-yellow text-white fw-bolder" disabled={loading}>
                                        {loading ? 'Updating...' : 'Update Semi-Finished Product'}
                                    </button>
                                </div>

                                {error && <p className="text-danger mt-3">{error}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditSeminFinished;
