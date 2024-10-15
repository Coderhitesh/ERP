import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

const CreateBills = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

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
    const [bills, setBills] = useState({
        product: [],
        BillIinNumber: '',
        taxInfo: '',
        finalAmount: '',
        Taxpercenge: ''
    });



    const [subtotal, setSubtotal] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [total, setTotal] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...products];
        updatedProducts[index][name] = value;

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

    const generatePurchaseNumber = () => {
        const StartWith = "Bill";
        const NumberRange = "1234567890";
        let quotationNumber = StartWith;
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * NumberRange.length);
            quotationNumber += NumberRange[randomIndex];
        }
        return quotationNumber;
    };

    const handleTaxChange = (e) => {
        const { value } = e.target;
        setTaxPercentage(parseFloat(value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any field is empty
        const isEmpty = products.some(product => (
            product.item === '' ||
            product.quantity === '' ||
            product.mrp === '' ||
            product.discount === '' ||
            product.sku === '' ||
            product.totalPrice === ''
        ));

        if (isEmpty) {
            const key = enqueueSnackbar('Please fill in all fields', {
                variant: 'error', // Customize the appearance of the snackbar
                persist: true, // Allow the snackbar to persist until dismissed

            });
            setTimeout(() => {
                closeSnackbar(key);
            }, 800);
            console.log('Please fill in all fields');
            return;
        }


        const newBill = {
            product: products,
            BillIinNumber: generatePurchaseNumber(),
            taxInfo: subtotal * (taxPercentage / 100),
            finalAmount: total,
            Taxpercenge: taxPercentage
        };

        setBills(newBill);
        console.log(newBill);
        // Clear form or navigate to another page
        // e.target.reset(); // Uncomment this to clear the form after submission
    };


    return (
        <div className='container-fluid bg-white my-2 py-2 mx-auto '>
            <div className='container w-100'>
                <div className='col-12'>
                    <h2 className='head blue fw-boldest'>Create Bill</h2>
                </div>
                <div className='container-fluid'>

                    <form onSubmit={handleSubmit}>
                        {/* Bill Details */}
                        <div className='col-12 row col-xl-12 col-md-12'>
                            {/* <div className='my-2 col-4 col-xl-4 col-md-4'>
                                <label htmlFor="" className='text-black text-danger'>Bill Number</label>
                                <input type="text" contentEditable={false} value={bills.BillIinNumber} className='form-control' placeholder='Bill Number' />
                            </div> */}
                            <div className='my-2 col-4 col-xl-6 col-md-6'>
                                <label htmlFor="" className='text-black text-danger'>Billing Date</label>
                                <input type="date" className='form-control' placeholder='Billing Date ' />
                            </div>
                            <div className='my-2 col-4 col-xl-6 col-md-6'>
                                <label htmlFor="" className='text-black text-danger'>Billing Reference</label>
                                <input type="text" className='form-control' placeholder='Billing Reference ' />
                            </div>
                        </div>
                        <div className='col-12 row col-xl-12 col-md-12'>
                            <div className='my-2 col-4 col-xl-4 col-md-4'>
                                <label htmlFor="" className='text-black text-danger'>Supplier id</label>
                                <select name="supplier_id" id="supplier_id" class="form-control">
                                    <option value="1">---Select Supplier --- </option>

                                    <option value="1">Supplier 1</option>
                                    <option value="2">Supplier 2</option>
                                    <option value="3">Supplier 3</option>
                                </select>
                            </div>

                            <div className='my-2 col-4 col-xl-4 col-md-4'>
                                <label htmlFor="" className='text-black text-danger'>Supplier Name</label>
                                <select name="supplier_id" id="supplier_id" class="form-control">
                                    <option value="1">---Select Supplier name --- </option>

                                    <option value="1">Supplier 1</option>
                                    <option value="2">Supplier 2</option>
                                    <option value="3">Supplier 3</option>
                                </select>
                            </div>
                            <div className='my-2 col-4 col-xl-4 col-md-4'>
                                <label htmlFor="" className='text-black text-danger'>Address </label>
                                <input type="text" className='form-control' placeholder='Address ' />
                            </div>
                        </div>
                        <div className='col-12'>
                            <h6>Product Information</h6>
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
                                <button onClick={handleSubmit} className='btn btn-primary'>Save This Bill</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBills;
