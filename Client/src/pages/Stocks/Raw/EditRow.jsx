import React, { useEffect, useState } from 'react';
import './add-row.css';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function EditRow() {
    const { id } = useParams(); // Correct useParams
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [allSupplier, setAllSupplier] = useState([]);
    
    // Set fetched raw material directly to 'raw'
    const [raw, setRaw] = useState({
        materialName: "",
        quantity: "",
        unitPrice: "",
        supplier: "",
        unitOfMeasurement: "",
        storageLocation: ""
    });

    // Fetch existing raw material
    const fetchExistingRaw = async () => {
        try {
            const res = await axios.get(`http://localhost:7000/api/v1/get-single-raw-material/${id}`);
            // console.log(res.data.data)
            setRaw(res.data.data); // Set raw state with fetched data
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExistingRaw();
    }, [id]);

    // Fetch supplier list
    const fetchSupplier = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/v1/get-all-supplier');
            setAllSupplier(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSupplier();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRaw((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use PUT request for editing existing raw material
            await axios.put(`http://localhost:7000/api/v1/update-raw-material/${id}`, raw, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Raw Material Updated Successfully');
        } catch (error) {
            console.log(error);
            toast.error('Error updating Raw Material');
        }
    };

    return (
        <div className="container-fluid w-100">
            <div className="Raw-add">
                <div className="col-12 mx-auto col-md-8">
                    <div className="col-12">
                        <div className="head-part w-75 py-5">
                            <h1><i className="fa-solid fa-circle-plus"></i> Edit Raw Product</h1>
                        </div>
                        <div className="card z-index position-relative">
                            <div className="secured">
                                Secured By 3D Layer
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <label htmlFor="materialName" className="form-label">Material Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="materialName"
                                                name="materialName"
                                                value={raw.materialName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="quantity" className="form-label">Quantity</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="quantity"
                                                name="quantity"
                                                value={raw.quantity}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="unitPrice" className="form-label">Unit Price</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="unitPrice"
                                                name="unitPrice"
                                                value={raw.unitPrice}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="unitOfMeasurement" className="form-label">Measurement of Unit</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="unitOfMeasurement"
                                                name="unitOfMeasurement"
                                                value={raw.unitOfMeasurement}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="storageLocation" className="form-label">Storage Location</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="storageLocation"
                                                name="storageLocation"
                                                value={raw.storageLocation}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="supplier" className="form-label">Supplier</label>
                                            <select
                                                name="supplier"
                                                id="supplier"
                                                className="form-select"
                                                value={raw.supplier}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Supplier</option>
                                                {allSupplier && allSupplier.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.supplierName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditRow;
