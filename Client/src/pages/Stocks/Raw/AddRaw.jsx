import React, { useState } from 'react';
import './add-row.css'
import { useSnackbar } from 'notistack'
import { Button } from '@mui/material';
const AddRaw = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [raw, setRaw] = useState({
        ProductName: "",
        CategoryName: "",
        RawMaterials: [
            { name: "" }
        ]
    });

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setRaw(prevState => {
            const updatedMaterials = prevState.RawMaterials.map((material, i) => {
                if (i === index) {
                    return { ...material, [name]: value };
                }
                return material;
            });
            return { ...prevState, RawMaterials: updatedMaterials };
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
            variant: 'success', // Customize the appearance of the snackbar
            persist: true, // Allow the snackbar to persist until dismissed
           
        });
        setTimeout(() => {
            closeSnackbar(key);
        }, 2500); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!raw.CategoryName || !raw.ProductName  || !raw.RawMaterials) {
            const key = enqueueSnackbar('Please fill in all fields', {
                variant: 'error', // Customize the appearance of the snackbar
                persist: true, // Allow the snackbar to persist until dismissed
                action: (key) => ( // Provide a close button
                    <button className='bg- btnsclose ' onClick={() => closeSnackbar(key)}>Dismiss</button>
                )
            });
            setTimeout(() => {
                closeSnackbar(key);
            }, 2500); 
        }else{
            console.log(raw)
            setRaw({
                ProductName: "",
                CategoryName: "",
                RawMaterials: [
                    { name: "" }
                ]
            })
            const key = enqueueSnackbar('Raw is AddedSuccessfull', {
                variant: 'success', // Customize the appearance of the snackbar
                persist: true, // Allow the snackbar to persist until dismissed
               
            });
            setTimeout(() => {
                closeSnackbar(key);
            }, 2500); 
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
                                    <div className="mb-3">
                                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                                        <input type="text" className="form-control" id="ProductName" name="ProductName" value={raw.ProductName} onChange={(e) => setRaw({ ...raw, ProductName: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="CategoryName" className="form-label">Category Name</label>
                                        <input type="text" className="form-control" id="CategoryName" name="CategoryName" value={raw.CategoryName} onChange={(e) => setRaw({ ...raw, CategoryName: e.target.value })} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Raw Materials</label>
                                        {raw.RawMaterials.map((material, index) => (
                                            <div key={index} className="row mb-2">
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Name"
                                                        value={material.name}
                                                        name='name'
                                                        onChange={(e) => handleChange(e, index)}
                                                    />
                                                </div>
                                                <div className="col-auto">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleRemoveMaterials(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <button type="button" className="btn btn-primary" onClick={handleAddRawMaterials}>Add Raw Material</button>
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
