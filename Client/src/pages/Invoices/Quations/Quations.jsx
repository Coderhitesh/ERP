import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const Quotation = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([
        {
            id: "",
            NameOfProduct: "",
            Quantity: 1,
            UnitPrice: "",
            Discount: 0,
            Description: "",
        },
    ]);
    const [formattedDate] = useState(new Date().toLocaleDateString());
    const [quotationNumber, setQuotationNumber] = useState(""); // Changed to useState
    const [BusinessData, setBusinessData] = useState({});
    const [customerData, setCustomerData] = useState({});
    const [searchParams] = useSearchParams();
    const CustomerId = searchParams.get("clientId");
    const dataOfCustomer = searchParams.get("data");

    const [formData, setFormData] = useState({
        BusinessOwnerDetails: "",
        quotationNumber: quotationNumber,
        customerId: "",
        items: products,
        totalAmount: "",
        PaymentTerms: "",
        validityPeriod: "", 
    });

    useEffect(() => {
        if (dataOfCustomer) {
            try {
                const decodedData = decodeURIComponent(dataOfCustomer);
                const parsedData = JSON.parse(decodedData);
                setCustomerData(parsedData);
                console.log(parsedData);
                setFormData((prev) => ({ ...prev, customerId: parsedData._id })); // Update customerId in formData
            } catch (error) {
                console.error("Error parsing customer data:", error);
                setCustomerData({}); // Reset to an empty object on error
            }
        } else {
            setCustomerData({}); // Reset to an empty object if no data
        }
    }, [dataOfCustomer]);

    // Generate a unique quotation number on component mount
    useEffect(() => {
        const generatedUuid = uuidv4().replace(/-/g, ""); // Remove hyphens
        const generatedQuotationNumber = `QT-${generatedUuid.slice(0, 8)}`; // Limit to 8 characters after "QT-"
        setQuotationNumber(generatedQuotationNumber);
    }, []);

    const handleAddProduct = () => {
        setProducts([
            ...products,
            {
                id: uuidv4(),
                NameOfProduct: "",
                Quantity: 1,
                UnitPrice: "",
                Discount: 0,
                Description: "",
            },
        ]);
    };

    const handleRemoveProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleChange = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setProducts(newProducts);
    };

    const getRoute = "http://localhost:7000/api/v1/get-all-bussiness-settings";

    useEffect(() => {
        const fetchBusinessSettings = async () => {
            try {
                const res = await axios.get(getRoute);
                if (res.data.data && res.data.data.length > 0) {
                    setBusinessData(res.data.data[0]);
                    setFormData((prev) => ({
                        ...prev,
                        PaymentTerms: res.data.data[0]._id,
                    })); // Update PaymentTerms
                }
            } catch (error) {
                console.error("Error fetching business settings:", error);
                toast.error("Failed to fetch business settings.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBusinessSettings();
    }, []);

    const calculateTotalAmount = () => {
        return products.reduce((total, product) => {
            const priceAfterDiscount = product.UnitPrice - (product.UnitPrice * product.Discount) / 100;
            return total + priceAfterDiscount * product.Quantity;
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Calculate total amount before submitting
        const totalAmount = calculateTotalAmount();

        const QuotationData = {
            BusinessOwnerDetails: BusinessData._id,
            quotationNumber: quotationNumber,
            customerId: CustomerId,
            items: products,
            totalAmount: totalAmount,
            PaymentTerms: BusinessData._id,
            validityPeriod: formData.validityPeriod, // Ensure this is filled
        };
        console.log(QuotationData)
        try {
            const response = await axios.post(
                "http://localhost:7000/api/v1/create-quatation",
                QuotationData
            );
            console.log(response.data)
            toast.success("Quotation created successfully!");
        } catch (error) {
            console.error("Error creating quotation:", error);
            toast.error("Failed to create quotation.");
        }
    };

    return (
        <div className="container-fluid bg-light p-4 rounded">
            {isLoading ? (
                <p className="text-center text-primary">Loading...</p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="p-4 shadow-lg bg-white rounded"
                >
                    {/* Business Logo */}
                    <div className="text-center mb-3">
                        {BusinessData.businessLogo && (
                            <img
                                src={BusinessData.businessLogo}
                                alt="Business Logo"
                                className="mb-3 rounded-circle shadow-sm"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "contain",
                                    border: "1px solid #6c757d",
                                }}
                            />
                        )}
                    </div>

                    {/* Business Info Section */}
                    <h4 className="mb-4 text-secondary border-bottom pb-2">
                        Company Info
                    </h4>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Business Name:</strong>
                            </label>
                            <input
                                type="text"
                                value={BusinessData.businessName || "N/A"}
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Owner:</strong>
                            </label>
                            <input
                                type="text"
                                value={BusinessData.ownerName || "N/A"}
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Email:</strong>
                            </label>
                            <input
                                type="email"
                                value={BusinessData.email || "N/A"}
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Contact Number:</strong>
                            </label>
                            <input
                                type="text"
                                value={BusinessData.contactNumber || "N/A"}
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>GST Number:</strong>
                            </label>
                            <input
                                type="text"
                                value={BusinessData.gstNumber || "N/A"}
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Address:</strong>
                            </label>
                            <input
                                type="text"
                                value={
                                    BusinessData.address
                                        ? `${BusinessData.address.street}, ${BusinessData.address.city}, ${BusinessData.address.state} - ${BusinessData.address.postalCode}, ${BusinessData.address.country}`
                                        : "N/A"
                                }
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Quotation Details */}
                    <div className="row g-4 my-4">
                        <h4 className="text-secondary border-bottom pb-2">
                            Quotation Details
                        </h4>
                        <div className="col-md-3">
                            <label className="form-label">
                                <strong>Date:</strong>
                            </label>
                            <input
                                type="text"
                                value={formattedDate}
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                <strong>Quotation No:</strong>
                            </label>
                            <input
                                type="text"
                                value={quotationNumber}
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                <strong>Customer ID:</strong>
                            </label>
                            <input
                                type="text"
                                value={CustomerId}
                                readOnly
                                placeholder="Enter Customer ID"
                                className="form-control form-control-sm"
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">
                                <strong>Valid Until:</strong>
                            </label>
                            <input
                                type="text"
                                value={`6 Days From ${formattedDate}`}
                                className="form-control form-control-sm"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Customer Info Section */}
                    <h4 className="mb-4 text-secondary border-bottom pb-2">
                        Customer Info
                    </h4>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Customer Name:</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Customer Name"
                                value={customerData.customerName || ""}
                                onChange={(e) =>
                                    setCustomerData({ ...customerData, name: e.target.value })
                                }
                                className="form-control form-control-sm"
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Email:</strong>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={customerData.email || ""}
                                onChange={(e) =>
                                    setCustomerData({ ...customerData, email: e.target.value })
                                }
                                className="form-control form-control-sm"
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Business Name:</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Business Name"
                                value={customerData.businessInfo?.businessName || ""}
                                onChange={(e) =>
                                    setCustomerData({
                                        ...customerData,
                                        businessName: e.target.value,
                                    })
                                }
                                className="form-control form-control-sm"
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Business Category:</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Business Category"
                                value={customerData.businessInfo?.businessCategory || ""}
                                onChange={(e) =>
                                    setCustomerData({
                                        ...customerData,
                                        businessCategory: e.target.value,
                                    })
                                }
                                className="form-control form-control-sm"
                            />
                        </div>
                        <div className="col-md-8">
                            <label className="form-label">
                                <strong>Contact Number:</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Contact Number"
                                value={customerData.contactDetails.phone || ""}
                                onChange={(e) =>
                                    setCustomerData({
                                        ...customerData,
                                        contactNumber: e.target.value,
                                    })
                                }
                                className="form-control form-control-sm"
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">
                                <strong>Address:</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Address"
                                value={
                                    customerData.businessInfo?.businessAddress
                                        ? `${customerData.businessInfo?.businessAddress.street}, ${customerData.businessInfo?.businessAddress.city}, ${customerData.businessInfo?.businessAddress.state}, ${customerData.businessInfo?.businessAddress.postalCode}, ${customerData.businessInfo?.businessAddress.country}`
                                        : ""
                                }
                                onChange={(e) =>
                                    setCustomerData({
                                        ...customerData,
                                        businessAddress: {
                                            ...customerData.businessAddress,
                                            street: e.target.value,
                                        },
                                    })
                                }
                                className="form-control form-control-sm"
                            />
                        </div>
                    </div>

                    {/* Products Section */}
                    <h4 className="mb-4 text-secondary border-bottom pb-2">Products</h4>
                    {products.map((product, index) => (
                        <div key={index} className="row g-4 mb-2">
                            <div className="col-md-4">
                                <label className="form-label">
                                    <strong>Product Name:</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Product Name"
                                    value={product.NameOfProduct}
                                    onChange={(e) =>
                                        handleChange(index, "NameOfProduct", e.target.value)
                                    }
                                    className="form-control form-control-sm"
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">
                                    <strong>Quantity:</strong>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={product.Quantity}
                                    onChange={(e) =>
                                        handleChange(index, "Quantity", e.target.value)
                                    }
                                    className="form-control form-control-sm"
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">
                                    <strong>Unit Price:</strong>
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={product.UnitPrice}
                                    onChange={(e) =>
                                        handleChange(index, "UnitPrice", e.target.value)
                                    }
                                    className="form-control form-control-sm"
                                    required
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">
                                    <strong>Discount:</strong>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={product.Discount}
                                    onChange={(e) =>
                                        handleChange(index, "Discount", e.target.value)
                                    }
                                    className="form-control form-control-sm"
                                />
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveProduct(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-end mb-3">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleAddProduct}
                        >
                            Add Product
                        </button>
                    </div>
                    {/* Total Amount Calculation */}
                    <div className="mb-3">
                        <label className="form-label">
                            <strong>Total Amount:</strong>
                        </label>
                        <input
                            type="text"
                            value={products
                                .reduce((acc, product) => {
                                    const price = parseFloat(product.UnitPrice) || 0;
                                    const quantity = parseInt(product.Quantity) || 0;
                                    const discount = parseFloat(product.Discount) || 0;
                                    return acc + price * quantity - discount;
                                }, 0)
                                .toFixed(2)}
                            className="form-control form-control-sm"
                            readOnly
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Save Quotation
                        </button>
                    </div>
                    {/* Payment Terms */}
                    <div className="mb-4">
                        <h4 className="text-dark pb-2" style={{ fontWeight: '600' }}>Payment Terms</h4>
                        {BusinessData.paymentTerms && BusinessData.paymentTerms.map((term, index) => (
                            <span
                                key={index}
                                className="badge text-wrap p-3 m-2 d-inline-flex align-items-center"
                                style={{
                                    backgroundColor: '#198754', // Bright green for the badge
                                    color: '#fff', // White text for good contrast
                                    fontSize: '1rem', // Slightly larger font for readability
                                    borderRadius: '30px', // Rounded badge for a smooth look
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow for depth
                                }}
                            >
                                <span
                                    style={{
                                        marginRight: '8px',
                                        fontSize: '1.2rem',
                                    }}
                                >
                                    ✔️
                                </span>
                                {term.term}
                            </span>
                        ))}
                    </div>



                </form>
            )}
        </div>
    );
};

export default Quotation;
