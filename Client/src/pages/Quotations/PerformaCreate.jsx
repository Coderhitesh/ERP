import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Ensure to install this package if you haven't already

const PerformaCreate = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [performa, setPerforma] = useState({
        invoiceNumber: '',
        quotationId: '',
        items: [],
        totalAmount: 0,
        status: '',
        validityPeriod: '',
        customerDetails: {},
        quotationDate: '',
        businessOwner: {},
        gstPercentage: 18,
        signature: '', 
    });
    const [isDirty, setIsDirty] = useState(false);
    const [qunationInfo, setQunationInfo] = useState({});
    const [BusinessOwnerDetails, setBusinessOwnerDetails] = useState({});
    const [customerId, SetCustomerId] = useState({});


    const handleGenreate = ()=>{
        const generatedUuid = uuidv4().replace(/-/g, ""); // Remove hyphens
        const generatedInvoiceNumber = `INV-${generatedUuid.slice(0, 8)}`; // Limit to 8 characters after "INV-"
        setPerforma((prev) => ({ ...prev, invoiceNumber: generatedInvoiceNumber }));
    }
    // Generate a unique invoice number on component mount
    useEffect(() => {
        handleGenreate()
    }, []);
    useEffect(() => {
        if (products) {
            setPerforma((prev) => ({
                ...prev,
                items: products.map((item) => ({
                    id: item.id, // Maintain unique ID for each product
                    NameOfProduct: item.NameOfProduct || '',
                    Quantity: item.Quantity || 1,
                    UnitPrice: item.UnitPrice || 0,
                    Discount: item.Discount || 0,
                }))
            }));
        }
    }, [products]);

    const fetchOldQuotation = async () => {
        try {
            const { data } = await axios.get(`http://localhost:7000/api/v1/get-single-quatation/${id}`);
            const response = data.data;
            console.log("All Response", response)
            setQunationInfo(response);
            if (response?.BusinessOwnerDetails && response?.customerId) {
                setBusinessOwnerDetails(response.BusinessOwnerDetails);
                SetCustomerId(response.customerId);
                setProducts(response.items.map(item => ({
                    ...item,
                    id: uuidv4() // Ensure each item has a unique ID
                })));
            } else {
                alert('Invalid Quotation ID');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOldQuotation();
    }, [id]);

    const handleAddProduct = () => {
        const newProduct = {
            id: uuidv4(),
            NameOfProduct: "",
            Quantity: 1,
            UnitPrice: 0,
            Discount: 0,
        };
        setIsDirty(true);
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const handleRemoveProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
        setIsDirty(true);
    };

    // Update product details
    const handleProductChange = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setProducts(newProducts);
        setIsDirty(true);
    };

    // Calculate subtotal
    const calculateSubtotal = () => {
        return products.reduce((total, product) => {
            // Ensure discount is a valid number; if not, set it to 0
            const discount = product?.Discount && !isNaN(product.Discount) ? product.Discount : 0;

            // Calculate the total for the current product
            const productTotal = product.Quantity * product.UnitPrice;

            // Calculate the discount amount
            const discountAmount = (discount / 100) * productTotal;

            // Return the total after applying the discount
            return total + (productTotal - discountAmount);
        }, 0);
    };


    // Calculate total amount including GST
    const calculateTotalAmount = () => {
        const subtotal = calculateSubtotal();
        const gstAmount = (subtotal * (performa.gstPercentage / 100));
        return subtotal + gstAmount;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const validityPeriod = new Date(currentDate);
        validityPeriod.setDate(currentDate.getDate() + 7);

        // Prepare the performa data
        const performaData = {
            invoiceNumber: performa.invoiceNumber,
            customerId: customerId._id,
            quotationId: qunationInfo._id,
            totalAmount: calculateTotalAmount().toFixed(2),
            validityPeriod: validityPeriod.toISOString().split('T')[0], // Format as YYYY-MM-DD
            items: products,
        };

        if (!performaData.invoiceNumber || !performaData.quotationId || !performaData.totalAmount || !performaData.items.length) {
            toast.error('Please fill in all required fields and ensure you have added items.');
            return;
        }

        console.log(performaData);

        try {
            await axios.post('http://localhost:7000/api/v1/create-performa-invoice', performaData);
            toast.success('Performa created successfully!'); // Success toast
            setIsDirty(false);
            handleGenreate();
        } catch (error) {
            console.error(error); // Log the error for further debugging
            // Check if there is a response and extract error message
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Error: ${error.response.data.message}`); // Display specific error message
            } else {
                toast.error('Failed to create performa.'); // Fallback message
            }
        }
    };


    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = ''; // Show default confirmation dialog
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

    return (
        <div className='container-fluid bg-white mt-4 px-4 py-5'>
            <form >
                <div className='section'>
                    <div className='row'>
                        <div className='col-md-6 mb-4'>
                            <div className=''>
                                <img src={BusinessOwnerDetails.businessLogo} alt="" className='img-fluid w-25' />
                            </div>
                        </div>
                        <div className='col-md-6 mb-4'>
                            <div className='text-end'>
                                <p className='fs-8 fw-bold'>Quotation No: {qunationInfo.quotationNumber}</p>
                                <p className='fs-8 text-muted'>Quotation Date {new Date(qunationInfo.updatedAt).toLocaleDateString('en-US')}</p>
                                <p className='fs-8 fw-bold'>
    Invoice No: {performa.invoiceNumber}
    <button
        onClick={(e) => {
            e.preventDefault(); // Prevent any default action
            handleGenreate(); // Update the invoice number
        }}
        type='button' // Ensure it's not treated as a submit button
        className='btn btn-outline-secondary ms-2' // Tailwind CSS class for styling
        title='Reload Page' // Optional: Tooltip for better UX
    >
        🔄️
    </button>
</p>

                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {BusinessOwnerDetails && (
                            <div className='col-md-6 mb-4'>
                                <h4 className='text-danger text-decoration-underline'>Company Details</h4>
                                <ul className='list-unstyled'>
                                    <li>{BusinessOwnerDetails.ownerName}</li>
                                    <li>{BusinessOwnerDetails.gstNumber}</li>
                                    <li>{BusinessOwnerDetails.address?.street}</li>
                                    <li>{BusinessOwnerDetails.contactNumber}</li>
                                </ul>
                            </div>
                        )}
                        <div className='col-md-6 mb-4'>
                            <h4 className='text-danger text-decoration-underline'>Partner Company Details</h4>
                            <ul className='list-unstyled'>
                                <li>{customerId.customerName}</li>
                                <li>{customerId?.businessInfo?.businessName}</li>
                                <li>{customerId.contactDetails?.phone}</li>
                                <li>
                                    {`${customerId.businessInfo?.businessAddress?.street || "Street Name"}, 
                                        ${customerId.businessInfo?.businessAddress?.city || "Delhi"}, 
                                        ${customerId.businessInfo?.businessAddress?.state || "Delhi"}, 
                                        ${customerId.businessInfo?.businessAddress?.postalCode || "110085"}, 
                                        ${customerId.businessInfo?.businessAddress?.country || "India"}`}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=' mt-4'>
                        <h4 className='text-start'>Product Table</h4>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Name of Product</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Discount (%)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>
                                            <input
                                                type='text'
                                                value={product.NameOfProduct}
                                                onChange={(e) => handleProductChange(index, 'NameOfProduct', e.target.value)}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='number'
                                                value={product.Quantity}
                                                onChange={(e) => handleProductChange(index, 'Quantity', e.target.value)}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='number'
                                                value={product.UnitPrice}
                                                onChange={(e) => handleProductChange(index, 'UnitPrice', e.target.value)}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type='number'
                                                value={product.Discount}
                                                onChange={(e) => handleProductChange(index, 'Discount', e.target.value)}
                                                className='form-control'
                                            />
                                        </td>
                                        <td>
                                            <button type='button' onClick={() => handleRemoveProduct(index)} className='btn btn-danger'>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type='button' onClick={handleAddProduct} className='btn btn-primary'>Add Product</button>
                    </div>

                    {/* Price Breakdown */}
                    <div className='mt-4'>
                        <h4 className='text-start'>Price Breakdown</h4>
                        <ul className='list-group border rounded p-3'>
                            <li className='list-group-item d-flex justify-content-between align-items-center'>
                                <span>Subtotal:</span>
                                <span className='fw-bold'>Rs {calculateSubtotal().toFixed(2)}</span>
                            </li>
                            <li className='list-group-item d-flex justify-content-between align-items-center'>
                                <span>GST:</span>
                                <span className='fw-bold'>Rs {(calculateSubtotal() * (performa.gstPercentage / 100)).toFixed(2)}</span>
                            </li>
                            <li className='list-group-item d-flex justify-content-between align-items-center border-top'>
                                <span className='fw-bold'>Total:</span>
                                <span className='fw-bold'>Rs {calculateTotalAmount().toFixed(2)}</span>
                            </li>
                        </ul>
                    </div>



                </div>
                <button onClick={handleSubmit} type='submit' className='btn btn-success mt-4'>Submit</button>
            </form>
        </div>
    );
};

export default PerformaCreate;
