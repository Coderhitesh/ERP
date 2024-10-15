import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const AllVendors = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [vendorsPerPage] = useState(5);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/v1/get-all-supplier');
                if (response.data.success) {
                    setVendors(response.data.data);
                } else {
                    setError('Failed to fetch vendors.');
                }
            } catch (err) {
                setError('An error occurred while fetching vendors.');
            } finally {
                setLoading(false);
            }
        };

        fetchVendors();
    }, []);

    const filteredVendors = vendors.filter((vendor) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            vendor.supplierName?.toLowerCase().includes(lowerCaseSearchTerm) ||
            vendor.panNumber?.toLowerCase().includes(lowerCaseSearchTerm) ||
            vendor.contactNumber?.includes(lowerCaseSearchTerm)
        );
    });

    const indexOfLastVendor = currentPage * vendorsPerPage;
    const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
    const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);
    const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEditClick = (vendor) => {
        setSelectedVendor(vendor);
        setShowModal(true);
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this vendor?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:7000/api/v1/delete-supplier/${id}`); // Replace with your actual delete endpoint
                setVendors(vendors.filter(vendor => vendor._id !== id));
            } catch (err) {
                console.error('Failed to delete vendor:', err);
            }
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedVendor(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedVendor(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateVendor = async () => {
        try {
            const response = await axios.put(`http://localhost:7000/api/v1/update-supplier/${selectedVendor._id}`, selectedVendor); // Replace with your actual update endpoint
            if (response.data.success) {
                const updatedVendors = vendors.map(vendor =>
                    vendor._id === selectedVendor._id ? selectedVendor : vendor
                );
                setVendors(updatedVendors);
                handleModalClose();
            } else {
                console.error('Failed to update vendor');
            }
        } catch (err) {
            console.error('Failed to update vendor:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-danger">{error}</div>;
    }   

    return (
        <div className=" mt-4">
            <h2 className="d-flex justify-content-between align-items-center">
                All Vendors
                <a href="/Clients-Vendor/Add-Vendors"><Button variant="success">Create Vendor</Button></a>
            </h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name, PAN number, or contact number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>GST Number</th>
                        <th>PAN Number</th>
                        {/* <th>Address</th> */}
                        <th>Payment Terms</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentVendors.length > 0 ? (
                        currentVendors.map((vendor) => (
                            <tr key={vendor._id}>
                                <td className='whitespace'>{vendor.supplierName}</td>
                                <td className='whitespace'>{vendor.contactPerson}</td>
                                <td className='whitespace'>{vendor.email}</td>
                                <td className='whitespace'>{vendor.contactNumber}</td>
                                <td className='whitespace'>{vendor.gstNumber}</td>
                                <td className='whitespace'>{vendor.panNumber}</td>
                                {/* <td className='whitespace'>
                  {vendor.address.street}, {vendor.address.city}, {vendor.address.state} - {vendor.address.postalCode}, {vendor.address.country}
                </td> */}
                                <td className='whitespace'>{vendor.paymentTerms}</td>
                                <td className='whitespace'>
                                    <button className="btn btn-primary me-2" onClick={() => handleEditClick(vendor)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(vendor._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No vendors found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handlePrevPage}>Previous</button>
                    </li>
                    {[...Array(totalPages).keys()].map((number) => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handleNextPage}>Next</button>
                    </li>
                </ul>
            </nav>

            {/* Edit Modal */}
            <Modal size='lg' show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Vendor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedVendor && (
                        <form>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="supplierName"
                                        name="supplierName"
                                        value={selectedVendor.supplierName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="contactPerson" className="form-label">Contact Person</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactPerson"
                                        name="contactPerson"
                                        value={selectedVendor.contactPerson}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={selectedVendor.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-4">
                                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={selectedVendor.contactNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="gstNumber" className="form-label">GST Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gstNumber"
                                        name="gstNumber"
                                        value={selectedVendor.gstNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="panNumber" className="form-label">PAN Number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="panNumber"
                                        name="panNumber"
                                        value={selectedVendor.panNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        name="address.street"
                                        value={selectedVendor.address.street}
                                        onChange={handleInputChange}
                                        placeholder="Street"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        name="address.city"
                                        value={selectedVendor.address.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        name="address.state"
                                        value={selectedVendor.address.state}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="postalCode"
                                        name="address.postalCode"
                                        value={selectedVendor.address.postalCode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="country"
                                        name="address.country"
                                        value={selectedVendor.address.country}
                                        onChange={handleInputChange}
                                    />

                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label htmlFor="paymentTerms" className="form-label">Payment Terms</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="paymentTerms"
                                        name="paymentTerms"
                                        value={selectedVendor.paymentTerms}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateVendor}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default AllVendors;
