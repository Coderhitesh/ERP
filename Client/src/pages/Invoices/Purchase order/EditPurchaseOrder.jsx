// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import { useNavigate, useParams } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const EditPurchaseOrder = () => {
//     const { id } = useParams(); // Get the purchase order ID from the URL
//     const navigate = useNavigate();

//     // Form state for Purchase Order
//     const [formData, setFormData] = useState({
//         orderNumber: '',
//         supplierId: null,
//         quotationId: null,
//         performaInvoiceId: null,
//         items: [
//             {
//                 description: '',
//                 quantity: 0,
//                 unitPrice: 0,
//                 totalPrice: 0,
//             },
//         ],
//         totalAmount: 0,
//         paymentTerms: '',
//     });

//     const [suppliers, setSuppliers] = useState([]);
//     const [quotations, setQuotations] = useState([]);
//     const [performaInvoices, setPerformaInvoices] = useState([]);

//     // Fetch suppliers, quotations, performa invoices, and purchase order data
//     const fetchData = async () => {
//         try {
//             const [supplierResponse, quotationResponse, performaResponse, purchaseOrderResponse] = await Promise.all([
//                 axios.get('http://localhost:7000/api/v1/get-all-supplier'),
//                 axios.get('http://localhost:7000/api/v1/get-all-quatation'),
//                 axios.get('http://localhost:7000/api/v1/get-all-performa-invoice'),
//                 axios.get(`http://localhost:7000/api/v1/get-single-purchase/${id}`),
//             ]);

//             setSuppliers(supplierResponse.data.data.map(s => ({ value: s._id, label: s.supplierName })));
//             setQuotations(quotationResponse.data.data.map(q => ({ value: q._id, label: q.quotationNumber })));
//             setPerformaInvoices(performaResponse.data.data.map(p => ({ value: p._id, label: p.invoiceNumber })));

//             const purchaseOrder = purchaseOrderResponse.data;
//             setFormData({
//                 ...purchaseOrder,
//                 supplierId: { value: purchaseOrder.supplierId, label: purchaseOrder.supplierName },
//                 quotationId: purchaseOrder.quotationId ? { value: purchaseOrder.quotationId, label: purchaseOrder.quotationNumber } : null,
//                 performaInvoiceId: purchaseOrder.performaInvoiceId ? { value: purchaseOrder.performaInvoiceId, label: purchaseOrder.invoiceNumber } : null,
//             });
//         } catch (error) {
//             toast.error('Error fetching data');
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [id]);

//     // Handle item input change
//     const handleItemChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedItems = [...formData.items];
//         updatedItems[index][name] = value;

//         if (name === 'quantity' || name === 'unitPrice') {
//             const quantity = parseFloat(updatedItems[index].quantity);
//             const unitPrice = parseFloat(updatedItems[index].unitPrice);
//             const totalPrice = (quantity * unitPrice).toFixed(2);
//             updatedItems[index].totalPrice = totalPrice;
//         }

//         setFormData({ ...formData, items: updatedItems });
//         calculateTotalAmount();
//     };

//     // Add a new row for items
//     const handleAddItem = () => {
//         const newItem = {
//             description: '',
//             quantity: 0,
//             unitPrice: 0,
//             totalPrice: 0,
//         };
//         setFormData({ ...formData, items: [...formData.items, newItem] });
//     };

//     // Delete an item row
//     const handleDeleteItem = (index) => {
//         const updatedItems = formData.items.filter((item, i) => i !== index);
//         setFormData({ ...formData, items: updatedItems });
//     };

//     // Calculate the total amount for the order
//     const calculateTotalAmount = () => {
//         const totalAmount = formData.items.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
//         setFormData({ ...formData, totalAmount });
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:7000/api/v1/update-purchase/${id}`, formData);
//             toast.success('Purchase Order updated successfully!');
//             navigate('/purchase-orders'); // Navigate to the purchase orders list
//         } catch (error) {
//             toast.error('Error updating Purchase Order');
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="my-4">Edit Purchase Order</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* Supplier Selection */}
//                 <div className="form-group">
//                     <label>Supplier</label>
//                     <Select
//                         options={suppliers}
//                         value={formData.supplierId}
//                         onChange={(selectedOption) => setFormData({ ...formData, supplierId: selectedOption.value })}
//                         placeholder="Select Supplier"
//                     />
//                 </div>

//                 {/* Quotation Selection */}
//                 <div className="form-group">
//                     <label>Quotation</label>
//                     <Select
//                         options={quotations}
//                         value={formData.quotationId}
//                         onChange={(selectedOption) => setFormData({ ...formData, quotationId: selectedOption.value })}
//                         placeholder="Select Quotation"
//                     />
//                 </div>

//                 {/* Performa Invoice Selection */}
//                 <div className="form-group">
//                     <label>Performa Invoice</label>
//                     <Select
//                         options={performaInvoices}
//                         value={formData.performaInvoiceId}
//                         onChange={(selectedOption) => setFormData({ ...formData, performaInvoiceId: selectedOption.value })}
//                         placeholder="Select Performa Invoice"
//                     />
//                 </div>

//                 {/* Payment Terms */}
//                 <div className="form-group">
//                     <label>Payment Terms</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={formData.paymentTerms}
//                         onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
//                         required
//                     />
//                 </div>

//                 {/* Items */}
//                 <h4>Items</h4>
//                 <button type="button" className="btn btn-success mb-2" onClick={handleAddItem}>
//                     Add Item
//                 </button>
//                 {formData.items.map((item, index) => (
//                     <div className="row mb-2" key={index}>
//                         <div className="col-md-3">
//                             <input
//                                 type="text"
//                                 name="description"
//                                 value={item.description}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 placeholder="Item Description"
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="col-md-2">
//                             <input
//                                 type="number"
//                                 name="quantity"
//                                 value={item.quantity}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 placeholder="Quantity"
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="col-md-2">
//                             <input
//                                 type="number"
//                                 name="unitPrice"
//                                 value={item.unitPrice}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 placeholder="Unit Price"
//                                 className="form-control"
//                             />
//                         </div>
//                         <div className="col-md-2">
//                             <input
//                                 type="text"
//                                 name="totalPrice"
//                                 value={item.totalPrice}
//                                 onChange={(e) => handleItemChange(index, e)}
//                                 placeholder="Total Price"
//                                 className="form-control"
//                                 readOnly
//                             />
//                         </div>
//                         <div className="col-md-2">
//                             <button type="button" className="btn btn-danger" onClick={() => handleDeleteItem(index)}>
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}

//                 {/* Total Amount */}
//                 <div className="form-group">
//                     <label>Total Amount</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={formData.totalAmount.toFixed(2)}
//                         readOnly
//                     />
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-primary">
//                     Update Purchase Order
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditPurchaseOrder;
