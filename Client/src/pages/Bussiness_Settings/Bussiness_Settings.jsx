import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Bussiness_Settings = () => {
    const createRoute = 'http://localhost:7000/api/v1/create-bussiness-settings';

    const [businessData, setBusinessData] = useState({
        businessLogo: '',
        businessName: '',
        ownerName: '',
        email: '',
        contactNumber: '',
        gstNumber: '',
        panNumber: '',
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        discountRules: {
            percentage: 0,
            applicableOn: 'All',
            startDate: '',
            endDate: ''
        },
        paymentTerms: [{ term: '' }] // Initialize with one empty term
    });

    // Create business settings
    const createBusinessSettings = async () => {
        try {
            const res = await axios.post(createRoute, businessData);
            console.log('Create Response:', res.data); // Log the response data to the console
            toast.success('Business settings created successfully!');
            // Reset form fields after successful creation
            setBusinessData({
                businessLogo: '',
                businessName: '',
                ownerName: '',
                email: '',
                contactNumber: '',
                gstNumber: '',
                panNumber: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: ''
                },
                discountRules: {
                    percentage: 0,
                    applicableOn: 'All',
                    startDate: '',
                    endDate: ''
                },
                paymentTerms: [{ term: '' }] // Reset payment terms
            });
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        const errorMessage = error.response
            ? `Failed to create business settings: ${error.response.data.message || error.message} (Route: ${error.config.url})`
            : `Failed to create business settings: ${error.message}`;

        console.error('Error response:', error.response); // Log the full error response to the console
        toast.error(errorMessage); // Display detailed error message
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setBusinessData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else if (name.startsWith('discountRules.')) {
            const discountField = name.split('.')[1];
            setBusinessData((prev) => ({
                ...prev,
                discountRules: {
                    ...prev.discountRules,
                    [discountField]: value
                }
            }));
        } else if (name.startsWith('paymentTerms.')) {
            const index = name.split('.')[1];
            const updatedTerms = [...businessData.paymentTerms];
            updatedTerms[index].term = value;
            setBusinessData((prev) => ({
                ...prev,
                paymentTerms: updatedTerms
            }));
        } else {
            setBusinessData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle adding a new payment term
    const addPaymentTerm = () => {
        setBusinessData((prev) => ({
            ...prev,
            paymentTerms: [...prev.paymentTerms, { term: '' }]
        }));
    };

    // Handle removing a payment term
    const removePaymentTerm = (index) => {
        setBusinessData((prev) => ({
            ...prev,
            paymentTerms: prev.paymentTerms.filter((_, i) => i !== index)
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createBusinessSettings(); // Call create function on form submit
    };

    return (
        <div className="erp-business-settings">
            <h2>Create Business Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Business Logo:</label>
                        <input
                            type="text"
                            name="businessLogo"
                            value={businessData.businessLogo}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter business logo URL"
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Business Name:</label>
                        <input
                            type="text"
                            name="businessName"
                            value={businessData.businessName}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter business name"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Owner Name:</label>
                        <input
                            type="text"
                            name="ownerName"
                            value={businessData.ownerName}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter owner's name"
                            required
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={businessData.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Contact Number:</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={businessData.contactNumber}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter contact number"
                            required
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>GST Number:</label>
                        <input
                            type="text"
                            name="gstNumber"
                            value={businessData.gstNumber}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter GST number"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>PAN Number:</label>
                        <input
                            type="text"
                            name="panNumber"
                            value={businessData.panNumber}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter PAN number"
                        />
                    </div>
                </div>

                <h3>Address</h3>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Street:</label>
                        <input
                            type="text"
                            name="address.street"
                            value={businessData.address.street}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter street"
                            required
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="address.city"
                            value={businessData.address.city}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter city"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>State:</label>
                        <input
                            type="text"
                            name="address.state"
                            value={businessData.address.state}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter state"
                            required
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Postal Code:</label>
                        <input
                            type="text"
                            name="address.postalCode"
                            value={businessData.address.postalCode}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter postal code"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Country:</label>
                        <input
                            type="text"
                            name="address.country"
                            value={businessData.address.country}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter country"
                            required
                        />
                    </div>
                </div>

                <h3>Discount Rules</h3>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Percentage:</label>
                        <input
                            type="number"
                            name="discountRules.percentage"
                            value={businessData.discountRules.percentage}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter discount percentage"
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Applicable On:</label>
                        <select
                            name="discountRules.applicableOn"
                            value={businessData.discountRules.applicableOn}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="All">All</option>
                            <option value="Selected">Selected Items</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="discountRules.startDate"
                            value={businessData.discountRules.startDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="discountRules.endDate"
                            value={businessData.discountRules.endDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-5'>
                    <h3>Payment Terms</h3>

                    </div>
                    <div className='col-md-5'>
                    <button type="button" className="add-term mb-2 btn btn-primary" onClick={addPaymentTerm}>
                        Add Payment Term
                    </button>
                    </div>
                </div>
                {businessData.paymentTerms.map((term, index) => (
                    <div key={index} className="payment-term row">
                        <div className="col-md-10 mb-2">
                            <input
                                type="text"
                                name={`paymentTerms.${index}`}
                                value={term.term}
                                onChange={handleChange}
                                className="form-control"
                                placeholder={`Enter payment term ${index + 1}`}
                            />
                        </div>
                        <div className="col-md-2">
                            <button
                                type="button"
                                className="remove-term btn btn-danger"
                                onClick={() => removePaymentTerm(index)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}


                <button type="submit" className="btn btn-success">
                    Create Business Settings
                </button>
            </form>
        </div>

    );
};

export default Bussiness_Settings;
