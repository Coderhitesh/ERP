import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    Table,
    Button,
    Dropdown,
    Pagination,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import moment from "moment";
import PrintableQuotation from "./Print"; // Ensure this path is correct
import EditQuotations from "./EditQuotations";

const AllQuotations = () => {
    const [quotations, setQuotations] = useState([]);
    const [filteredQuotations, setFilteredQuotations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editQuation, setEditQuation] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [quotationsPerPage] = useState(10);

    const printableRef = useRef();

    useEffect(() => {
        fetchQuotations();
    }, []);

    const fetchQuotations = async () => {
        try {
            const response = await axios.get(
                "http://localhost:7000/api/v1/get-all-quatation"
            );
            setQuotations(response.data.data);
            setFilteredQuotations(response.data.data);
        } catch (error) {
            console.error("Error fetching quotations:", error);
        }
    };

    // Pagination logic
    const indexOfLastQuotation = currentPage * quotationsPerPage;
    const indexOfFirstQuotation = indexOfLastQuotation - quotationsPerPage;
    const currentQuotations = filteredQuotations.slice(
        indexOfFirstQuotation,
        indexOfLastQuotation
    );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Search functionality
    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());

        const filtered = quotations.filter((quotation) => {
            const customer = quotation.customerId;
            const business = quotation.BusinessOwnerDetails;

            return (
                quotation.items.some((item) =>
                    item.NameOfProduct.toLowerCase().includes(
                        e.target.value.toLowerCase()
                    )
                ) ||
                quotation.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
                quotation.quotationNumber
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                moment(quotation.createdAt)
                    .format("YYYY-MM-DD")
                    .includes(e.target.value) ||
                customer?.customerName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                customer?.contactDetails?.phone.includes(
                    e.target.value.toLowerCase()
                ) ||
                customer?.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
                business?.businessName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                business?.contactNumber.includes(e.target.value.toLowerCase())
            );
        });

        setFilteredQuotations(filtered);
        setCurrentPage(1); // Reset to page 1 after search
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:7000/api/v1/delete-quotation/${id}`);
            fetchQuotations(); // Refresh quotations after deletion
        } catch (error) {
            console.error("Error deleting quotation:", error);
        }
    };

    const ViewQuotation = (quotation, type) => {
        const printWindow = window.open("", "_blank");

        if (!quotation) {
            alert("No quotation details available to print.");
            return;
        }

        // Extracting the necessary details from the quotation object
        const {
            BusinessOwnerDetails,
            customerId,
            items,
            totalAmount,
            quotationNumber,
            createdAt,
        } = quotation;

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
                <td className='whitespace'>${item.NameOfProduct}</td>
                <td className='whitespace'>${item.UnitPrice}</td>
                <td className='whitespace'>${item.Quantity}</td>
                <td className='whitespace'>${(
                        parseFloat(item.UnitPrice) * parseFloat(item.Quantity)
                    ).toFixed(2)}</td>
            </tr>
        `
            )
            .join("");

        const paymentTermsHtml = BusinessOwnerDetails.paymentTerms
            .map((term) => `<li>${term.term}</li>`)
            .join("");

        printWindow.document.write(`
            <html>
                <head>
                    <title>Quotation ${quotationNumber}</title>
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
                            <img src="${BusinessOwnerDetails.businessLogo
            }" alt="Business Logo" class="logo" />
                            // <h2>${BusinessOwnerDetails.businessName}</h2>
                        </div>
                        <div class="text-start mb-4">
                            <h4>Quotation Number: <span class="font-weight-bold">${quotationNumber}</span></h4>
                            <p>Date: <span class="font-weight-bold">${new Date(
                createdAt
            ).toLocaleDateString()}</span></p>
                        </div>
                        <div class="row mb-4">
                            <div class="col-md-6 border p-3">
                                <h4>Business Owner Details:</h4>
                                <p><strong>Name:</strong> ${BusinessOwnerDetails.ownerName
            }</p>
                                <p><strong>Email:</strong> ${BusinessOwnerDetails.email
            }</p>
                                <p><strong>Contact Number:</strong> ${BusinessOwnerDetails.contactNumber
            }</p>
                                <p><strong>GST Number:</strong> ${BusinessOwnerDetails.gstNumber
            }</p>
                                <p><strong>PAN Number:</strong> ${BusinessOwnerDetails.panNumber
            }</p>
                            </div>
                            <div class="col-md-6 border p-3">
                                <h4>Customer Details:</h4>
                                <p><strong>Name:</strong> ${customerId.customerName
            }</p>
                                <p><strong>Email:</strong> ${customerId.email
            }</p>
                                <p><strong>Contact Number:</strong> ${customerId.contactDetails.phone
            }</p>
                                <p><strong>Business Name:</strong> ${customerId.businessInfo.businessName
            }</p>
                                <p><strong>Address:</strong> ${customerId.businessInfo.businessAddress.street
            }, ${customerId.businessInfo.businessAddress.city
            }, ${customerId.businessInfo.businessAddress.state}, ${customerId.businessInfo.businessAddress.postalCode
            }, ${customerId.businessInfo.businessAddress.country}</p>
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
        <h4>Subtotal: <span class="font-weight-bold">${subtotal.toFixed(
                2
            )}</span></h4>
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
    <p class="font-weight-bold">Thank you from ${BusinessOwnerDetails.businessName
            }</p>
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
                `http://localhost:7000/api/v1/update-quatation/${quotationId}`,
                { status: newStatus }
            );
            fetchQuotations(); // Refresh quotations after status update
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    const handleEdit = (quotation) => {
        setEditQuation(quotation)

    }

    const renderQuotationRows = (currentQuotations) => {
        return currentQuotations.map((quotation) => {
            const isInvalid = moment().isAfter(moment(quotation.validityPeriod));
            const isButtonDisabled = [
                "Draft",
                "Sent",
                "Rejected",
                "Expired",
            ].includes(quotation.status);

            return (
                <tr
                    key={quotation._id}
                    className={isInvalid ? "bg-danger text-white" : ""}
                >
                    <td className="whitespace">{quotation.quotationNumber}</td>
                    <td className="whitespace">
                        {quotation.customerId?.businessInfo?.businessName}
                    </td>
                    <td className="whitespace">
                        {quotation.customerId?.customerName || "N/A"}
                    </td>
                    <td className="whitespace">
                        {quotation.items.map((item) => item.NameOfProduct).join(", ")}
                    </td>
                    <td className="whitespace">
                        <select
                            value={quotation.status}
                            onChange={(e) =>
                                handleStatusChange(quotation._id, e.target.value)
                            }
                            className="form-select"
                            style={{ width: "150px" }}
                        >
                            {["Draft", "Sent", "Accepted", "Rejected", "Expired"].map(
                                (option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )
                            )}
                        </select>
                    </td>
                    <td className="whitespace">
                        {moment(quotation.createdAt).format("YYYY-MM-DD")}
                    </td>
                    <td className="whitespace">
                        {moment(quotation.validityPeriod).format("YYYY-MM-DD")}
                    </td>
                    <td className="whitespace">{quotation.totalAmount}</td>

                    <td className="d-flex">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => ViewQuotation(quotation)}
                            className="me-2"
                        >
                            View
                        </Button>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(quotation._id)}
                            className="me-2"
                        >
                            Delete
                        </Button>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" size="sm">
                                Actions
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=>{window.location.href=`/Create-Performa/${quotation._id}`}} disabled={isButtonDisabled} href="#">
                                    Performa Order
                                </Dropdown.Item>
                                {isButtonDisabled && (
                                    <Dropdown.Item as="div" className="text-muted" style={{ pointerEvents: 'none' }}>
                                        <small>Action disabled for Draft, Sent, Rejected, and Expired statuses.</small>
                                    </Dropdown.Item>
                                )}
                                {/* <Dropdown.Item onClick={()=>handleEdit(quotation)}>Edit</Dropdown.Item> */}
                                <Dropdown.Item onClick={() => ViewQuotation(quotation, 'print')}>Print</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="container-fluid mt-4">
            <h2>All Quotations</h2>

            {/* Search Input */}
            <Form.Group controlId="search">
                <Form.Control
                    type="text"
                    placeholder="Search by product name, status, date, client name, or business name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </Form.Group>

            {/* Table */}
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Quotation Number</th>
                        <th>Business Name</th>
                        <th>Client Name</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Valid Upto</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{renderQuotationRows(currentQuotations)}</tbody>
            </Table>

            {/* Pagination */}
            <Pagination>
                {[
                    ...Array(
                        Math.ceil(filteredQuotations.length / quotationsPerPage)
                    ).keys(),
                ].map((number) => (
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

export default AllQuotations;
