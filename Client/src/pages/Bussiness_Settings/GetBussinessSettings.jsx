import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const GetBusinessSettings = () => {
    const getRoute = 'http://localhost:7000/api/v1/get-all-bussiness-settings';

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

    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

    // Fetch business settings on component mount
    useEffect(() => {
        const fetchBusinessSettings = async () => {
            try {
                const res = await axios.get(getRoute);
                setBusinessData(res.data.data[0]);
            } catch (error) {
                console.error('Error fetching business settings:', error);
                toast.error('Failed to fetch business settings.');
            }
        };

        fetchBusinessSettings();
    }, []);

    // Create or update business settings
    const createBusinessSettings = async () => {
        try {
            const res = await axios.put(`http://localhost:7000/api/v1/update-bussiness-settings/${businessData._id}`, businessData);
            console.log('Create Response:', res.data);
            toast.success('Business settings updated successfully!');
            setIsEditing(false); // Exit edit mode after successful update
        } catch (error) {
            handleError(error);
        }
    };

    const handleError = (error) => {
        const errorMessage = error.response
            ? `Failed to update business settings: ${error.response.data.message || error.message} (Route: ${error.config.url})`
            : `Failed to update business settings: ${error.message}`;

        console.error('Error response:', error.response);
        toast.error(errorMessage);
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
            <h2>Business Settings</h2>
            <button onClick={() => setIsEditing((prev) => !prev)} className="btn btn-primary mb-3">
                {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Business Logo:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="businessLogo"
                                value={businessData.businessLogo}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter business logo URL"
                            />
                        ) : (
                            <p>{businessData.businessLogo}</p>
                        )}
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Business Name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="businessName"
                                value={businessData.businessName}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter business name"
                                required
                            />
                        ) : (
                            <p>{businessData.businessName}</p>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Owner Name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="ownerName"
                                value={businessData.ownerName}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter owner's name"
                                required
                            />
                        ) : (
                            <p>{businessData.ownerName}</p>
                        )}
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Email:</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={businessData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter email"
                                required
                            />
                        ) : (
                            <p>{businessData.email}</p>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Contact Number:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="contactNumber"
                                value={businessData.contactNumber}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter contact number"
                                required
                            />
                        ) : (
                            <p>{businessData.contactNumber}</p>
                        )}
                    </div>
                    <div className="col-md-6 form-group">
                        <label>GST Number:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="gstNumber"
                                value={businessData.gstNumber}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter GST number"
                            />
                        ) : (
                            <p>{businessData.gstNumber}</p>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>PAN Number:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="panNumber"
                                value={businessData.panNumber}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter PAN number"
                            />
                        ) : (
                            <p>{businessData.panNumber}</p>
                        )}
                    </div>
                </div>

                <h3>Address</h3>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Street:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address.street"
                                value={businessData.address.street}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter street"
                                required
                            />
                        ) : (
                            <p>{businessData.address.street}</p>
                        )}
                    </div>
                    <div className="col-md-6 form-group">
                        <label>City:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address.city"
                                value={businessData.address.city}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter city"
                                required
                            />
                        ) : (
                            <p>{businessData.address.city}</p>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>State:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address.state"
                                value={businessData.address.state}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter state"
                                required
                            />
                        ) : (
                            <p>{businessData.address.state}</p>
                        )}
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Postal Code:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address.postalCode"
                                value={businessData.address.postalCode}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter postal code"
                                required
                            />
                        ) : (
                            <p>{businessData.address.postalCode}</p>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Country:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address.country"
                                value={businessData.address.country}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter country"
                                required
                            />
                        ) : (
                            <p>{businessData.address.country}</p>
                        )}
                    </div>
                </div>

                <h3>Discount Rules</h3>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Discount Percentage:</label>
                        {isEditing ? (
                            <input
                                type="number"
                                name="discountRules.percentage"
                                value={businessData.discountRules.percentage}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter discount percentage"
                                required
                            />
                        ) : (
                            <p>{businessData.discountRules.percentage}</p>
                        )}
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Applicable On:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="discountRules.applicableOn"
                                value={businessData.discountRules.applicableOn}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter applicable on"
                            />
                        ) : (
                            <p>{businessData.discountRules.applicableOn}</p>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Start Date:</label>
                        {isEditing ? (
                            <input
                                type="date"
                                name="discountRules.startDate"
                                value={businessData.discountRules.startDate}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        ) : (
                            <p>{businessData.discountRules.startDate}</p>
                        )}
                    </div>
                    <div className="col-md-6 form-group">
                        <label>End Date:</label>
                        {isEditing ? (
                            <input
                                type="date"
                                name="discountRules.endDate"
                                value={businessData.discountRules.endDate}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        ) : (
                            <p>{businessData.discountRules.endDate}</p>
                        )}
                    </div>
                </div>

                <h3>Payment Terms</h3>
                {businessData.paymentTerms.map((term, index) => (
                    <div className="row" key={index}>
                        <div className="col-md-6 form-group">
                            <label>Payment Term:</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name={`paymentTerms.${index}`}
                                    value={term.term}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter payment term"
                                />
                            ) : (
                                <p>{term.term}</p>
                            )}
                        </div>
                        {isEditing && (
                            <div className="col-md-6 form-group">
                                <button type="button" onClick={() => removePaymentTerm(index)} className="btn btn-danger">Remove</button>
                            </div>
                        )}
                    </div>
                ))}
                {isEditing && (
                    <button type="button" onClick={addPaymentTerm} className="btn btn-secondary mb-3">Add Payment Term</button>
                )}

                {isEditing && (
                    <button type="submit" className="btn btn-success">Save Changes</button>
                )}
            </form>
        </div>
    );
};

export default GetBusinessSettings;
