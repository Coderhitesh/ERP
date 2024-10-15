import React, { useState } from 'react';
import logo from './erp (1).png';

const ManufactureOrder = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        companyContactNumber: '',
        vendorName: '',
        vendorAddress: '',
        vendorEmail: '',
        vendorContactNumber: ''
    });

    const [products, setProducts] = useState([
        {
            id: 1,
            item: '',
            quantity: '',
            mrp: '',
            discount: '',
            sku: '',
            totalPrice: ''
        }
    ]);

    const [subtotal, setSubtotal] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [total, setTotal] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);

    const d = new Date();
    const formattedDate = d.toLocaleDateString();

    const generatePurchaseNumber = () => {
        const StartWith = "Man";
        const NumberRange = "1234567890";
        let quotationNumber = StartWith;
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * NumberRange.length);
            quotationNumber += NumberRange[randomIndex];
        }
        return quotationNumber;
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...products];
        updatedProducts[index][name] = value;

        // Calculate total price if quantity, MRP, or discount changes
        if (name === 'quantity' || name === 'mrp' || name === 'discount') {
            const quantity = parseFloat(updatedProducts[index].quantity);
            const mrp = parseFloat(updatedProducts[index].mrp);
            const discount = parseFloat(updatedProducts[index].discount);
            const totalPrice = ((mrp * quantity) * (1 - (discount / 100))).toFixed(2);
            updatedProducts[index].totalPrice = totalPrice;
        }

        setProducts(updatedProducts);
    };


    const handleAddRow = () => {
        const newRow = {
            id: products.length + 1,
            item: '',
            quantity: '',
            mrp: '',
            discount: '',
            sku: '',
            totalPrice: ''
        };
        setProducts([...products, newRow]);
    };

    const handleDeleteRow = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    const calculateTotalAmounts = () => {
        let sub = 0;
        products.forEach(product => {
            sub += parseFloat(product.totalPrice);
        });
        setSubtotal(sub);
        const tax = sub * (taxPercentage / 100);
        const totalAmount = sub + tax;
        setTotal(totalAmount);
        const final = totalAmount; // Assuming no additional charges
        setFinalAmount(final);
    };

    const handleTaxChange = (e) => {
        const { value } = e.target;
        setTaxPercentage(parseFloat(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission
        console.log('Form data:', formData);
        console.log('Products:', products);
        calculateTotalAmounts();
    };

    return (
        <div className='w-100 bg-white'>
            <div className='container'>
                <div className='col-12 col-md-12'>
                    <div className='row'>
                        <div className='purchaseOrder'>
                            {/* Header */}
                            <div className='col-12 my-2 py-2 head-section text-center px-2'>
                                <div className="col-6">
                                    <div className="img-logo">
                                        <img src={logo} alt="logo-Erp" className=' w-10' />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h2 className='head blue fw-boldest'>Manufacturing Order</h2>
                                </div>
                            </div>
                            {/* Company Info */}
                            <div className='col-12 company-info col-md-12'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className="col-6">
                                            <h2>Company Info</h2>
                                        </div>
                                        <div className="col-6 my-2">
                                            <ul className='list-unstyled'>
                                                <li>Date : {formattedDate}</li>
                                                <li>Purchase id : {generatePurchaseNumber()}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* Company Form */}
                                <div className='row'>
                                    <div className='my-2 col-6'>
                                        <input type="text" className='form-control' placeholder='Company Name' />
                                    </div>
                                    <div className='my-2 col-6'>
                                        <input type="text" className='form-control' placeholder='Company Address' />
                                    </div>
                                    <div className='my-2 col-6'>
                                        <input type="text" className='form-control' placeholder='Company Email' />
                                    </div>
                                    <div className='my-2 col-6'>
                                        <input type="text" className='form-control' placeholder='Company Contact Number' />
                                    </div>
                                </div>
                            </div>
                            {/* Vendor Info */}
                            <div className='col-12 company-info col-md-12'>
                                <h2>Client Info</h2>
                                {/* Vendor Form */}
                                <div className='row'>
                                    <div className='my-2 col-6'>
                                        <input type="text" className='form-control' placeholder='Client Name' />
                                    </div>
                                    <div className='my-2 col-6'>
                                        <input type="text" className='form-control' placeholder='Client Address' />
                                    </div>
                                    <div className='my-2 col-6'>
                                        <input type="text" className='form-control' placeholder='Client Email' />
                                    </div>
                                    <div className='my-2 col-6'>
                                        <input type="text" className='form-control' placeholder='Client Contact Number' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 company-info col-md-12'>
                                <h2>Payment Info</h2>
                                {/* Vendor Form */}
                                <div className='row'>
                                    <div className='my-2 col-4'>
                                        <input type="text" className='form-control' placeholder='Down Payment ' />
                                    </div>
                                    <div className='my-2 col-4'>
                                        <input type="text" className='form-control' placeholder='Total Amount ' />
                                    </div>
                                    <div className='my-2 col-4'>
                                        <input type="text" className='form-control' placeholder='Payment Due' />
                                    </div>
                                </div>
                            </div>
                            {/* Product table */}
                            <div className='col-12'>
                                <h2>Product Table</h2>
                                <button className='btn btn-success mb-2' onClick={handleAddRow}>Add Row</button>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>MRP</th>
                                            <th>Discount %</th>
                                            <th>SKU</th>
                                            <th>Total Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td><input type="text" name="item" value={product.item} onChange={(e) => handleChange(index, e)} className='form-control' /></td>
                                                <td><input type="text" name="quantity" value={product.quantity} onChange={(e) => handleChange(index, e)} className='form-control' /></td>
                                                <td><input type="text" name="mrp" value={product.mrp} onChange={(e) => handleChange(index, e)} className='form-control' /></td>
                                                <td><input type="text" name="discount" value={product.discount} onChange={(e) => handleChange(index, e)} className='form-control' /></td>
                                                <td><input type="text" name="sku" value={product.sku} onChange={(e) => handleChange(index, e)} className='form-control' /></td>
                                                <td><input type="text" name="totalPrice" value={product.totalPrice} onChange={(e) => handleChange(index, e)} className='form-control' /></td>
                                                <td><button className='btn btn-danger' onClick={() => handleDeleteRow(product.id)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* Subtotal, Tax, Total, and Final Amount */}
                                <div className='col-12'>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Tax Percentage:</label>
                                            <input type="number" value={taxPercentage} onChange={handleTaxChange} className='form-control' />
                                        </div>
                                        <div className="col-6">


                                            <button className='btn my-4 btn-primary' onClick={calculateTotalAmounts}>Calculate Total</button>
                                        </div>
                                    </div>
                                    <table className="table mt-3">
                                        <tbody>
                                            <tr>
                                                <td>Subtotal:</td>
                                                <td>{subtotal}</td>
                                            </tr>
                                            <tr>
                                                <td>Tax:</td>
                                                <td>{subtotal * (taxPercentage / 100)}</td>
                                            </tr>
                                            <tr>
                                                <td>Total:</td>
                                                <td>{total}</td>
                                            </tr>
                                            <tr>
                                                <td>Final Amount:</td>
                                                <td>{finalAmount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* Form submission */}
                                <div className='col-12'>
                                    <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManufactureOrder;
