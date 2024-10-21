import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// import Headings from '../../../components/Headings/Headings';
import Select from 'react-select';
import toast from 'react-hot-toast';
import Headings from '../../components/Headings/Headings';

function EditFinished() {
    const { id } = useParams(); // Get the finished good ID from the route params
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        unitPrice: '',
        semiFinishedGoods: [], // Multiple selection for semi-finished goods
        productionDate: '',
        expirationDate: ''
    });

    const [semiFinishedGoodsOptions, setSemiFinishedGoodsOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch semi-finished goods for dropdown
    const fetchSemiFinishedGoods = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/v1/get-all-semifinished');
            const options = response.data.data.map(semiFinished => ({
                value: semiFinished._id,
                label: semiFinished.productName,
            }));
            setSemiFinishedGoodsOptions(options);
        } catch (error) {
            console.error('Error fetching semi-finished goods:', error);
        }
    };

    // Fetch finished good data for editing
    const fetchFinishedGood = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/v1/get-single-finished/${id}`);
            const finishedGood = response.data.data;
            setFormData({
                productName: finishedGood.productName,
                quantity: finishedGood.quantity,
                unitPrice: finishedGood.unitPrice,
                semiFinishedGoods: finishedGood.semiFinishedGoods.map(sfg => sfg._id), // Pre-select semi-finished goods
                productionDate: finishedGood.productionDate.split('T')[0], // Convert date format
                expirationDate: finishedGood.expirationDate ? finishedGood.expirationDate.split('T')[0] : ''
            });
        } catch (error) {
            setError('Error fetching finished good data');
            console.error('Error fetching finished good data:', error);
        }
    };

    useEffect(() => {
        fetchSemiFinishedGoods();
        fetchFinishedGood();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (selectedOptions) => {
        const selectedIds = selectedOptions.map(option => option.value);
        setFormData({
            ...formData,
            semiFinishedGoods: selectedIds,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put(`http://localhost:7000/api/v1/update-finished/${id}`, formData);
            toast.success('Finished Product updated successfully!');
            //   navigate('/finished-products'); // Navigate to a list of finished products after successful update
        } catch (error) {
            setError('Error updating finished product');
            console.log(error)
            toast.error('Error updating finished product');
        }

        setLoading(false);
    };

    return (
        <>
            <Headings heading={'Edit Finished Product'} />
            <div className="container px-4 py-3 mt-4">
                <div className='col-12 col-md-12'>
                    <div className="row">
                        <div className="col-12 mt-5 col-md-12">
                            <form className='text-capitalize' onSubmit={handleSubmit}>

                                {/* Product Name */}
                                {/* <div className='container'>
                                    <div className='col-12'>
                                        <div className="row">
                                            
                                        </div>
                                    </div>
                                </div> */}

                                {/* Quantity and Unit Price */}
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
                                            
                                            <div className="col-6 mb-3">
                                                <label htmlFor="semiFinishedGoods" className="form-label">Select Semi-Finished Goods</label>
                                                <Select
                                                    isMulti
                                                    options={semiFinishedGoodsOptions}
                                                    value={semiFinishedGoodsOptions.filter(option =>
                                                        formData.semiFinishedGoods.includes(option.value)
                                                    )}
                                                    onChange={handleSelectChange}
                                                    placeholder="Select Semi-Finished Goods"
                                                    id="semiFinishedGoods"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className='ml-5'>
                                    <button type="submit" className="px-5 py-2 bg-yellow text-white fw-bolder" disabled={loading}>
                                        {loading ? 'Updating...' : 'Update Finished Product'}
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

export default EditFinished;
