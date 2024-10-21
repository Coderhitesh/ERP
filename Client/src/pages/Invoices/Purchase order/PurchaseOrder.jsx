import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddPurchaseOrder = () => {
    const navigate = useNavigate();

    // Form state for Purchase Order
    const [formData, setFormData] = useState({
        orderNumber: '',
        supplierId: null,
        quotationId: null,
        performaInvoiceId: null,
        items: [
            {
                description: '',
                quantity: 0,
                unitPrice: 0,
                totalPrice: 0,
            },
        ],
        totalAmount: 0,
        paymentTerms: '',
    });

    const [suppliers, setSuppliers] = useState([]);
    const [quotations, setQuotations] = useState([]);
    const [performaInvoices, setPerformaInvoices] = useState([]);

    // Fetch suppliers, quotations, and performa invoices
    const fetchData = async () => {
        try {
            const [supplierResponse, quotationResponse, performaResponse] = await Promise.all([
                axios.get('http://localhost:7000/api/v1/get-all-supplier'),
                axios.get('http://localhost:7000/api/v1/get-all-quatation'),
                axios.get('http://localhost:7000/api/v1/get-all-performa-invoice'),
            ]);

            setSuppliers(supplierResponse.data.data.map(s => ({ value: s._id, label: s.supplierName })));
            setQuotations(quotationResponse.data.data.map(q => ({ value: q._id, label: q.quotationNumber })));
            setPerformaInvoices(performaResponse.data.data.map(p => ({ value: p._id, label: p.invoiceNumber })));
        } catch (error) {
            toast.error('Error fetching supplier/quotation/performa invoice data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Generate unique Purchase Order number
    const generatePurchaseNumber = () => {
        const startWith = 'Pur';
        const numberRange = '1234567890';
        let orderNumber = startWith;
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * numberRange.length);
            orderNumber += numberRange[randomIndex];
        }
        return orderNumber;
    };

    useEffect(() => {
        setFormData({ ...formData, orderNumber: generatePurchaseNumber() });
    }, []);

    // Handle item input change
    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index][name] = value;

        if (name === 'quantity' || name === 'unitPrice') {
            const quantity = parseFloat(updatedItems[index].quantity);
            const unitPrice = parseFloat(updatedItems[index].unitPrice);
            const totalPrice = (quantity * unitPrice).toFixed(2);
            updatedItems[index].totalPrice = totalPrice;
        }

        setFormData({ ...formData, items: updatedItems });
        calculateTotalAmount()
    };

    // Add a new row for items
    const handleAddItem = () => {
        const newItem = {
            description: '',
            quantity: 0,
            unitPrice: 0,
            totalPrice: 0,
        };
        setFormData({ ...formData, items: [...formData.items, newItem] });
    };

    // Delete an item row
    const handleDeleteItem = (index) => {
        const updatedItems = formData.items.filter((item, i) => i !== index);
        setFormData({ ...formData, items: updatedItems });
    };

    // Calculate the total amount for the order
    const calculateTotalAmount = () => {
        const totalAmount = formData.items.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
        setFormData({ ...formData, totalAmount });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // const totalAmount = formData.items.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
        
        // const updatedFormData = { ...formData, totalAmount };
      
        try {
          await axios.post('http://localhost:7000/api/v1/create-purchase', formData);
          toast.success('Purchase Order created successfully!');
        //   navigate('/purchase-orders'); // Navigate to the purchase orders list
        } catch (error) {
            console.log(error)
          toast.error('Error creating Purchase Order');
        }
      };
      

    return (
        <div className="container">
            <h2 className="my-4">Create Purchase Order</h2>
            <form onSubmit={handleSubmit}>
                {/* Supplier Selection */}
                <div className="form-group">
                    <label>Supplier</label>
                    <Select
                        options={suppliers}
                        onChange={(selectedOption) => setFormData({ ...formData, supplierId: selectedOption.value })}
                        placeholder="Select Supplier"
                    />
                </div>

                {/* Quotation Selection */}
                <div className="form-group">
                    <label>Quotation</label>
                    <Select
                        options={quotations}
                        onChange={(selectedOption) => setFormData({ ...formData, quotationId: selectedOption.value })}
                        placeholder="Select Quotation"
                    />
                </div>

                {/* Performa Invoice Selection */}
                <div className="form-group">
                    <label>Performa Invoice</label>
                    <Select
                        options={performaInvoices}
                        onChange={(selectedOption) => setFormData({ ...formData, performaInvoiceId: selectedOption.value })}
                        placeholder="Select Performa Invoice"
                    />
                </div>

                {/* Payment Terms */}
                <div className="form-group">
                    <label>Payment Terms</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.paymentTerms}
                        onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                        required
                    />
                </div>

                {/* Items */}
                <h4>Items</h4>
                <button type="button" className="btn btn-success mb-2" onClick={handleAddItem}>
                    Add Item
                </button>
                {formData.items.map((item, index) => (
                    <div className="row mb-2" key={index}>
                        <div className="col-md-3">
                            <input
                                type="text"
                                name="description"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, e)}
                                placeholder="Item Description"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, e)}
                                placeholder="Quantity"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                name="unitPrice"
                                value={item.unitPrice}
                                onChange={(e) => handleItemChange(index, e)}
                                placeholder="Unit Price"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                name="totalPrice"
                                value={item.totalPrice}
                                onChange={(e) => handleItemChange(index, e)}
                                placeholder="Total Price"
                                className="form-control"
                                readOnly
                            />
                        </div>
                        <div className="col-md-2">
                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteItem(index)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {/* Total Amount */}
                <div className="form-group">
                    <label>Total Amount</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.totalAmount.toFixed(2)}
                        readOnly
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                    Create Purchase Order
                </button>
            </form>
        </div>
    );
};

export default AddPurchaseOrder;
