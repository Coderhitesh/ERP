import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CSVLink } from 'react-csv'; // For exporting to CSV
import Modal from 'react-modal'; // Importing Modal for client details
import { useNavigate } from 'react-router-dom';
// Define a custom styles for the modal
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    },
    content: {
        top: '50%',

        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxHeight: '80%',
        overflowY: 'auto',
    },
};


const AllClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [clientsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);
    const [followUpFilter, setFollowUpFilter] = useState('All');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    // Fetch data from API
    const fetchClients = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/v1/get-all-customer`);
            if (response.data.success) {
                setClients(response.data.data);
                setFilteredClients(response.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Internal server error");
        } finally {
            setLoading(false);
        }
    };

    // Handle search filter
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = clients.filter(client =>
            client.customerName.toLowerCase().includes(term.toLowerCase()) ||
            client.businessInfo.businessName.toLowerCase().includes(term.toLowerCase()) ||
            client.businessInfo.businessCategory.toLowerCase().includes(term.toLowerCase()) ||
            client.email.toLowerCase().includes(term.toLowerCase()) ||
            client.contactDetails.phone.includes(term)
        );
        setFilteredClients(filtered);
        setPage(1);
    };

    // Handle sorting



    // Handle follow-up filter
    const handleFollowUpFilter = (e) => {
        const value = e.target.value;
        setFollowUpFilter(value);
        const filtered = clients.filter(client => {
            if (value === 'All') return true;
            return (value === 'Yes') ? client.followUp : !client.followUp;
        });
        setFilteredClients(filtered);
        setPage(1);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    // Pagination logic
    const indexOfLastClient = page * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
    const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

    // Handler for deleting a client
    const handleDelete = async (id) => {
        toast.promise(
            axios.delete(`http://localhost:7000/api/v1/delete-customer/${id}`),
            {
                loading: 'Deleting client...',
                success: <b>Client deleted successfully!</b>,
                error: <b>Failed to delete client.</b>,
            }
        ).then(() => {
            fetchClients();
        }).catch((error) => {
            console.error(error);
        });
    };

    // Prepare CSV data
    const csvData = filteredClients.map(client => ({
        'Customer Name': client.customerName,
        'Email': client.email,
        'Contact Number': client.contactDetails.phone,
        'Business Name': client.businessInfo.businessName,
        'Business Category': client.businessInfo.businessCategory,
        'Establishment Date': client.businessInfo.establishmentDate ? new Date(client.businessInfo.establishmentDate).toLocaleDateString() : 'N/A',
        'Follow Up': client.followUp ? 'Yes' : 'No',
        'Follow Up Date': client.followUpDate ? new Date(client.followUpDate).toLocaleDateString() : 'N/A',
        'Comments': client.comments.join(', '),
        'Client Status': client.clientStatus,
        'Business Address': `${client.businessInfo.businessAddress.street}, ${client.businessInfo.businessAddress.city}, ${client.businessInfo.businessAddress.state}, ${client.businessInfo.businessAddress.postalCode}, ${client.businessInfo.businessAddress.country}`,
        'Additional Address': `${client.additionalAddress.street}, ${client.additionalAddress.city}, ${client.additionalAddress.state}, ${client.additionalAddress.postalCode}, ${client.additionalAddress.country}`,
        'Created At': new Date(client.createdAt).toLocaleString(),
        'Updated At': new Date(client.updatedAt).toLocaleString(),
    }));

    const openModal = (client) => {
        setSelectedClient(client);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedClient(null);
    };

    return (
        <div className="all-clients-container">
            <div className="flex-head mb-3">
                <h2>All Clients</h2>
                <Link to="/Clients-Vendor/Add-Clients" className="btn btn-primary">Create Clients</Link>
                <CSVLink data={csvData} filename="clients.csv" className="btn btn-success ms-2">
                    Export
                </CSVLink>
            </div>

            <div className='row gap-2'>
                <div className='col-md-4'>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Search by Name, Business Name, Business Category, Email, Mobile Number..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="form-control"
                        />
                    </div>


                </div>
                <div className='col-md-4'>
                    <div className="mb-3">

                        <select value={followUpFilter} onChange={handleFollowUpFilter} className="form-select ms-2">
                            <option value="All">All</option>
                            <option value="Yes">Follow Up</option>
                            <option value="No">No Follow Up</option>
                        </select>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className="d-flex justify-content-between align-items-center ">
                        <button
                            className="btn btn-primary"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            className="btn btn-primary"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="table-responsive all-clients-container">
                    <table className="table table-striped">
                        <thead className="table-light">
                            <tr>
                                <th className='whitespace'>S.No</th>
                                <th className='whitespace'>Customer Name</th>
                                <th className='whitespace'>Email</th>
                                <th className='whitespace'>Contact Number</th>
                                <th className='whitespace'>Business Name</th>
                                <th className='whitespace'>Follow Up</th>
                                <th className='whitespace'>Follow Up Date</th>
                                <th className='whitespace'>Comments</th>
                                <th className='whitespace'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentClients.map((client, index) => (
                                <tr key={client._id}>
                                    <td className='whitespace'>{index + 1 + indexOfFirstClient}</td>
                                    <td className='whitespace'>{client.customerName}</td>
                                    <td className='whitespace'>{client.email}</td>
                                    <td className='whitespace'>{client.contactDetails.phone}</td>
                                    <td className='whitespace'>{client.businessInfo.businessName}</td>
                                    <td className='whitespace'>
                                        <select
                                            value={client.followUp ? 'true' : 'false'}
                                            onChange={(e) => {
                                                // Handle Follow Up Update
                                                console.log(`Follow Up updated to: ${e.target.value}`);
                                            }}
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </td>
                                    <td className='whitespace'>{client.followUpDate ? new Date(client.followUpDate).toLocaleDateString() : 'N/A'}</td>
                                    <td className='whitespace'>{client.comments.join(', ')}</td>
                                    <td className='whitespace'>
                                        <button onClick={() => openModal(client)} className="btn btn-primary btn-sm">View</button>
                                        <div className="dropdown d-inline-block ms-2">
                                            <button
                                                className="btn btn-secondary btn-sm dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Actions
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            console.log('Quotation clicked');
                                                            
                                                            if (!client || !client._id) {
                                                                console.error('Client is not defined or has no ID');
                                                                return;
                                                            }
                                                        
                                                            const encodedClientData = encodeURIComponent(JSON.stringify(client));
                                                        
                                                            // console.log(encodedClientData);
                                                            navigate(`/sales-order/Quatation?clientId=${client._id}&data=${encodedClientData}`);
                                                        }}
                                                        
                                                    >
                                                        <span className="text-info">Quotation</span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            console.log('Perform clicked');
                                                            navigate('/perform'); // Redirect to Perform page
                                                        }}
                                                    >
                                                        <span className="text-success">Perform</span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            console.log('Edit clicked');
                                                            navigate(`/Clients-Vendor/Clients/edit/${client._id}`); // Redirect to Edit page
                                                        }}
                                                    >
                                                        <span className="text-warning">Edit</span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            console.log('View Order clicked');
                                                            navigate('/view-order'); // Redirect to View Order page
                                                        }}
                                                    >
                                                        <span className="text-danger">View Order</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>

                                        <button onClick={() => handleDelete(client._id)} className="btn btn-danger btn-sm ms-2">Delete</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination controls */}


            {/* Modal for Client Details */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>

                <div className='d-flex align-item-center  justify-content-between'>
                    <h2>Client Details</h2>
                    <button onClick={closeModal} className="btn btn-primary ">Close</button>

                </div>
                {selectedClient && (
                    <div>
                        <p><strong>Customer Name:</strong> {selectedClient.customerName}</p>
                        <p><strong>Email:</strong> {selectedClient.email}</p>
                        <p><strong>Contact Number:</strong> {selectedClient.contactDetails.phone}</p>
                        <p><strong>Business Name:</strong> {selectedClient.businessInfo.businessName}</p>
                        <p><strong>Business Category:</strong> {selectedClient.businessInfo.businessCategory}</p>
                        <p><strong>Establishment Date:</strong> {selectedClient.businessInfo.establishmentDate ? new Date(selectedClient.businessInfo.establishmentDate).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Follow Up:</strong> {selectedClient.followUp ? 'Yes' : 'No'}</p>
                        <p><strong>Follow Up Date:</strong> {selectedClient.followUpDate ? new Date(selectedClient.followUpDate).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Comments:</strong> {selectedClient.comments.join(', ')}</p>
                        <p><strong>Client Status:</strong> {selectedClient.clientStatus}</p>
                        <p><strong>Business Address:</strong> {`${selectedClient.businessInfo.businessAddress.street}, ${selectedClient.businessInfo.businessAddress.city}, ${selectedClient.businessInfo.businessAddress.state}, ${selectedClient.businessInfo.businessAddress.postalCode}, ${selectedClient.businessInfo.businessAddress.country}`}</p>
                        <p><strong>Additional Address:</strong> {`${selectedClient.additionalAddress.street}, ${selectedClient.additionalAddress.city}, ${selectedClient.additionalAddress.state}, ${selectedClient.additionalAddress.postalCode}, ${selectedClient.additionalAddress.country}`}</p>
                        <p><strong>Created At:</strong> {new Date(selectedClient.createdAt).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(selectedClient.updatedAt).toLocaleString()}</p>

                        {/* Close Button */}
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default AllClients;
