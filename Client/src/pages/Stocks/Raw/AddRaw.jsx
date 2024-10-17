import React, { useEffect, useState } from 'react';
import './add-row.css'
import { useSnackbar } from 'notistack'
import { Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddRaw = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [allSupplier, setAllSupplier] = useState([])

    const [raw, setRaw] = useState({
        materialName: "",
        quantity: "",
        unitPrice: "",
        supplier: "",
        unitOfMeasurement: "",
        storageLocation: ""
    });

    const fetchSupplier = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/v1/get-all-supplier')
            // console.log(res.data.data)
            setAllSupplier(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSupplier();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRaw(prevState => {
            return { ...prevState, [name]: value }
        });
    };

    const handleAddRawMaterials = () => {
        setRaw(prevState => ({
            ...prevState,
            RawMaterials: [...prevState.RawMaterials, { name: "" }]
        }));
    };

    const handleRemoveMaterials = (index) => {
        setRaw(prevState => ({
            ...prevState,
            RawMaterials: prevState.RawMaterials.filter((material, i) => i !== index)
        }));
        const key = enqueueSnackbar('Success Full Removed', {
            variant: 'success',
            persist: true,

        });
        setTimeout(() => {
            closeSnackbar(key);
        }, 2500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:7000/api/v1/create-raw-material', raw, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            toast.success('Raw Material Added Successfully')
        } catch (error) {
            console.log(error)
            toast.error('Error in creating Raw Material')
        }
    };



    return (
        <div className='container-fluid w-100'>
            <div className='Raw-add'>
                <div className='col-12 mx-auto col-md-8'>
                    <div className='col-12'>
                        <div className='head-part w-75 py-5'>
                            <h1><i className="fa-solid fa-circle-plus"></i> Add Raw Products</h1>
                        </div>
                        <div className="card z-index position-relative">
                            <div className='secured'>
                                Secured By 3D Layer
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <label htmlFor="materialName" className="form-label">Material Name</label>
                                            <input type="text" className="form-control" id="materialName" name="materialName" value={raw.materialName} onChange={handleChange} />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="quantity" className="form-label">Quantity</label>
                                            <input type="text" className="form-control" id="quantity" name="quantity" value={raw.quantity} onChange={handleChange} />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="unitPrice" className="form-label">Unit Price</label>
                                            <input type="text" className="form-control" id="unitPrice" name="unitPrice" value={raw.unitPrice} onChange={handleChange} />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="unitOfMeasurement" className="form-label">Measurement of Unit</label>
                                            <input type="text" className="form-control" id="unitOfMeasurement" name="unitOfMeasurement" value={raw.unitOfMeasurement} onChange={handleChange} />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="storageLocation" className="form-label">Storage Location</label>
                                            <input type="text" className="form-control" id="storageLocation" name="storageLocation" value={raw.storageLocation} onChange={handleChange} />
                                        </div>
                                        <div className="col-6 mb-3">
                                            <label htmlFor="supplier" className="form-label">Supplier</label>
                                            <select
                                                name="supplier"
                                                id="supplier"
                                                className="form-select"
                                                value={raw.supplier}
                                                onChange={handleChange} // Add onChange to handle state update
                                            >
                                                <option value="">Select Supplier</option>
                                                {
                                                    allSupplier && allSupplier.map((item, index) => (
                                                        <option key={index} value={item._id}>{item.supplierName}</option>
                                                    ))
                                                }
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
};

export default AddRaw;
