import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    Button,
    Dropdown,
    Pagination,
    Form,
} from "react-bootstrap";
import moment from "moment";
import toast from "react-hot-toast";

const AllPerforma = () => {
    const [performas, setPerformas] = useState([]);
    const [filteredPerformas, setFilteredPerformas] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [performasPerPage] = useState(10);

    useEffect(() => {
        fetchPerformas();
    }, []);

    const fetchPerformas = async () => {
        try {
            const response = await axios.get("http://localhost:7000/api/v1/get-all-performa-invoice");
            setPerformas(response.data.data);
            setFilteredPerformas(response.data.data);
        } catch (error) {
            console.error("Error fetching performas:", error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:7000/api/v1/delete-performa-invoice/${id}`);
            fetchPerformas(); // Refresh quotations after deletion
            toast.success("Performa Invoice deleted Successful")
        } catch (error) {
            console.error("Error deleting quotation:", error);
        }
    };
    const handleEdit = () => {

    }


    // Pagination logic
    const indexOfLastPerforma = currentPage * performasPerPage;
    const indexOfFirstPerforma = indexOfLastPerforma - performasPerPage;
    const currentPerformas = filteredPerformas.slice(
        indexOfFirstPerforma,
        indexOfLastPerforma
    );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Search functionality
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());

        const filtered = performas.filter((performa) => {
            return (
                performa.invoiceNumber.toLowerCase().includes(e.target.value.toLowerCase()) ||
                (performa.quotationId?.quotationNumber && performa.quotationId.quotationNumber.toLowerCase().includes(e.target.value.toLowerCase())) ||
                moment(performa.createdAt).format("YYYY-MM-DD").includes(e.target.value) ||
                (performa.customerId?.customerName && performa.customerId.customerName.toLowerCase().includes(e.target.value.toLowerCase()))
            );
        });

        setFilteredPerformas(filtered);
        setCurrentPage(1); // Reset to page 1 after search
    };
    const handleView = (quotation, type) => {
        const printWindow = window.open("", "_blank");
        console.log(quotation)
        if (!quotation) {
            alert("No quotation details available to print.");
            return;
        }

        // Extracting the necessary details from the quotation object
        const { invoiceNumber, quotationId, customerId, items, totalAmount, createdAt } = quotation;

        // Extract Business Owner Details using quotationId
        const businessOwnerId = quotationId.BusinessOwnerDetails;

        // Assuming you have a function or a way to get business owner details using the ID
        const BusinessOwnerDetails = businessOwnerId; // replace this with actual data retrieval

        // Calculate totals
        const subtotal = items.reduce(
            (acc, item) =>
                acc + parseFloat(item.UnitPrice) * parseFloat(item.Quantity),
            0
        );
        const gst = (subtotal * 0.18).toFixed(2);
        const finalTotal = (subtotal + parseFloat(gst)).toFixed(2);

        // Constructing the HTML for printing
        const itemsHtml = items
            .map(
                (item) => `
                <tr>
                    <td class="whitespace">${item.NameOfProduct}</td>
                    <td class="whitespace">${item.UnitPrice}</td>
                    <td class="whitespace">${item.Quantity}</td>
                    <td class="whitespace">${(
                        parseFloat(item.UnitPrice) * parseFloat(item.Quantity)
                    ).toFixed(2)}</td>
                </tr>
            `
            )
            .join("");

        const paymentTermsHtml = BusinessOwnerDetails.paymentTerms
            ? BusinessOwnerDetails.paymentTerms.map((term) => `<li>${term.term}</li>`).join("")
            : "";

        printWindow.document.write(`
            <html>
                <head>
                    <title>Quotation ${quotationId.quotationNumber}</title>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                    <style>
                        .logo { width: 100px; }
                        .header { text-align: center; margin-bottom: 20px; }
                        .signature-box { margin-top: 40px; border-top: 2px solid black; padding: 20px; position: relative; }
                        .signature-box::before { content: ""; display: block; position: absolute; top: -10px; left: 0; right: 0; height: 5px; background-color: #007bff; }
                        .totals { margin-top: 20px; }
                        .payment-terms { margin-top: 20px; }
                        .footer { text-align: center; margin-top: 40px; font-weight: bold; }
                        .table th { background-color: #007bff; color: white; }
                        .table tbody tr:nth-child(even) { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <div class="container mt-4">
                        <div class="header">
                            <img src="${BusinessOwnerDetails.businessLogo}" alt="Business Logo" class="logo" />
                            <h2>${BusinessOwnerDetails.businessName}</h2>
                        </div>
                        <div class="text-start mb-4">
                            <h4>Quotation Number: <span class="font-weight-bold">${quotationId.quotationNumber}</span></h4>
                            <p>Date: <span class="font-weight-bold">${new Date(createdAt).toLocaleDateString()}</span></p>
                        </div>
                        <div class="row mb-4">
                            <div class="col-md-6 border p-3">
                                <h4>Business Owner Details:</h4>
                                <p><strong>Name:</strong> ${BusinessOwnerDetails.ownerName}</p>
                                <p><strong>Email:</strong> ${BusinessOwnerDetails.email}</p>
                                <p><strong>Contact Number:</strong> ${BusinessOwnerDetails.contactNumber}</p>
                                <p><strong>GST Number:</strong> ${BusinessOwnerDetails.gstNumber}</p>
                                <p><strong>PAN Number:</strong> ${BusinessOwnerDetails.panNumber}</p>
                            </div>
                            <div class="col-md-6 border p-3">
                                <h4>Customer Details:</h4>
                                <p><strong>Name:</strong> ${customerId.customerName}</p>
                                <p><strong>Email:</strong> ${customerId.email}</p>
                                <p><strong>Contact Number:</strong> ${customerId.contactDetails.phone}</p>
                                <p><strong>Business Name:</strong> ${customerId.businessInfo.businessName}</p>
                                <p><strong>Address:</strong> ${customerId.businessInfo.businessAddress.street}, ${customerId.businessInfo.businessAddress.city}, ${customerId.businessInfo.businessAddress.state}, ${customerId.businessInfo.businessAddress.postalCode}, ${customerId.businessInfo.businessAddress.country}</p>
                            </div>
                        </div>
                        <h4>Items:</h4>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                        </table>
                        <div class="totals card mt-4">
                            <div class="card-header bg-primary text-white">
                                <h5 class="mb-0">Invoice Summary</h5>
                            </div>
                            <div class="card-body">
                                <h4>Subtotal: <span class="font-weight-bold">${subtotal.toFixed(2)}</span></h4>
                                <h4>GST (18%): <span class="font-weight-bold">${gst}</span></h4>
                                <h4>Total Amount: <span class="font-weight-bold">${finalTotal}</span></h4>
                            </div>
                        </div>
                        <div class="payment-terms card mt-4">
                            <div class="card-header bg-secondary text-white">
                                <h5 class="mb-0">Payment Terms</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-unstyled">
                                    ${paymentTermsHtml}
                                </ul>
                            </div>
                        </div>
                        <div class="signature-box mt-4">
                            <p>Signature:</p>
                            <div style="border-top: 2px solid black; padding-top: 20px;"></div>
                        </div>
                        <div class="text-center mt-4">
                            <p class="font-weight-bold">Thank you from ${BusinessOwnerDetails.businessName}</p>
                        </div>
                    </div>
                </body>
            </html>
        `);

        printWindow.document.close();
        if (type === "print") {
            printWindow.print();
        }
    };
    const handleStatusChange = async (quotationId, newStatus) => {
        try {
            await axios.put(
                `http://localhost:7000/api/v1/update-performa-invoice/${quotationId}`,
                { status: newStatus }
            );
            fetchPerformas(); // Refresh quotations after status update
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };


    const renderPerformaRows = (currentPerformas) => {
        return currentPerformas.map((performa) => {
            console.log("Performa",performa)
            const isInvalid = moment().isAfter(moment(performa.quotationId.validityPeriod));
            const isButtonDisabled = [
               'Pending', 'Issued', 'Cancelled'
            ].includes(performa.status);

            return (
                <tr key={performa._id}>
                    <td>{performa.invoiceNumber}</td>
                    <td>{performa.quotationId?.quotationNumber || "N/A"}</td>
                    <td>{performa.customerId?.customerName || "N/A"}</td>
                    <td>
                        {performa.items.map(item => item.NameOfProduct).join(", ") || "N/A"}
                    </td>
                    <td className="whitespace">
                        <select
                            value={performa.status}
                            onChange={(e) =>
                                handleStatusChange(performa._id, e.target.value)
                            }
                            className="form-select"
                            style={{ width: "150px" }}
                        >
                            {[ 'Pending', 'Issued', 'Cancelled','Converted to Invoice'].map(
                                (option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )
                            )}
                        </select>
                    </td>
                    <td>{moment(performa.createdAt).format("YYYY-MM-DD")}</td>
                    <td>{performa.totalAmount}</td>
                    <td>
                        <Button variant="primary" size="sm" onClick={() => handleView(performa)}>
                            View
                        </Button>
                        <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle variant="success" size="sm">
                                Actions
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item 
    onClick={() => { window.location.href = `/order/create-purchase-order/${performa._id}`; }} 
    disabled={isButtonDisabled || isInvalid}
    style={{ pointerEvents: isButtonDisabled || isInvalid ? 'none' : 'auto', opacity: isButtonDisabled || isInvalid ? 0.5 : 1 }}
>
    Purchase Order
</Dropdown.Item>

                                <Dropdown.Item onClick={() => handleView(performa, 'print')}>Print</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDelete(performa._id)}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            );
        });
    };


    return (
        <div className="container-fluid mt-4">
            <h2>All Proforma invoice</h2>

            {/* Search Input */}
            <Form.Group controlId="search">
                <Form.Control
                    type="text"
                    placeholder="Search by Invoice Number, Quotation Number, or Client Name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </Form.Group>

            {/* Table */}
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Quotation Number</th>
                        <th>Client Name</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{renderPerformaRows(currentPerformas)}</tbody>
            </Table>

            {/* Pagination */}
            <Pagination>
                {[...Array(Math.ceil(filteredPerformas.length / performasPerPage)).keys()].map((number) => (
                    <Pagination.Item
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default AllPerforma;
