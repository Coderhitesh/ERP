import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const PrintableQuotation = ({ quotations }) => {
    return (
        <div style={{ padding: '20px', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Quotation Details</h2>
            <Table striped bordered hover>
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
                    </tr>
                </thead>
                <tbody>
                    {quotations.length > 0 ? (
                        quotations.map((quotation) => (
                            <tr key={quotation._id}>
                                <td>{quotation.quotationNumber}</td>
                                <td>{quotation.BusinessOwnerDetails.businessName}</td>
                                <td>{quotation.customerId?.customerName || 'N/A'}</td>
                                <td>{quotation.items.map((item) => item.NameOfProduct).join(', ')}</td>
                                <td>{quotation.status}</td>
                                <td>{moment(quotation.createdAt).format('YYYY-MM-DD')}</td>
                                <td>{moment(quotation.validityPeriod).format('YYYY-MM-DD')}</td>
                                <td>{quotation.totalAmount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No quotations available to print.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default PrintableQuotation;
