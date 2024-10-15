import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Headings from '../../components/Headings/Headings';
import './AllSalesOrder.css'
const AllSales = () => {
    const [allSales, setAllSales] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('/sales.json');
            setAllSales(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
const handleMakeQuotation = (sale) => {
    // Convert the sale object to a regular JavaScript object
    const saleObject = {
        ...sale,
        BillTo: JSON.stringify(sale.BillTo),
        products: JSON.stringify(sale.products)
    };

    // Construct the query string
    const queryString = new URLSearchParams(saleObject).toString();

    // Construct the URL with the query string
    const url = `/sales-order/Quatation?${queryString}`;

    // Redirect to the URL
    window.location.href = url;
};
const handleMakePerforma = (sale) => {
    // Convert the sale object to a regular JavaScript object
    const saleObject = {
        ...sale,
        BillTo: JSON.stringify(sale.BillTo),
        products: JSON.stringify(sale.products)
    };

    // Construct the query string
    const queryString = new URLSearchParams(saleObject).toString();

    // Construct the URL with the query string
    const url = `/sales-order/Performa?${queryString}`;

    // Redirect to the URL
    window.location.href = url;
};
    return (
        <>


        <div className='head-part'>
            <h1>Orders</h1>
        </div>
            <div class="w-100 py-2 px-2 ">
                <div class="card">
                    <div class="">

                        <div class="table-responsive">
                            <table class="table  table-hover">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date Issued</th>
                                        {/* <th>Customer ID</th> */}
                                        <th>Ship To</th>
                                        <th>Sales Date</th>
                                        {/* <th>PO</th> */}
                                        <th>Sales Person</th>
                                        {/* <th>Total</th>
                                        <th>Total Discount</th>
                                        <th>GST</th>
                                        <th>Other Fees</th> */}
                                        <th>Final Total</th>
                                        <th>Make Performa</th>
                                        <th>Make Quation </th>
                                        <th>Delete</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {allSales.map((sale, index) => (
                                        <tr key={index}>
                                            <td>{sale.OrderId}</td>
                                            <td>{new Date(sale.DateIssued).toLocaleDateString()}</td>
                                            {/* <td>{sale.CustomerId}</td> */}

                                            <td>
                                                {sale.shipTo.Name}<br />
                                                {sale.shipTo.CompanyName}<br />
                                                {sale.shipTo.ContactDetails}<br />
                                                {sale.shipTo.email}
                                            </td>
                                            <td>{new Date(sale.salesDate).toLocaleDateString()}</td>
                                            {/* <td>{sale.PO}</td> */}
                                            <td>{sale.salesPerson}</td>
                                            {/* <td>{sale.Total}</td>
                                            <td>{sale.TotalDiscount}</td>
                                            <td>{sale.Gst}</td>
                                            <td>{sale.OtherFees}</td> */}
                                            <td>{sale.FinalTotal}</td>
                                            <td className='btn-groups'>

                                                <button onClick={() => handleMakePerforma(sale)} className=' btn btn-primary'>Make Performa</button>


                                            </td>
                                            <td className='btn-groups'>

                                                <button  onClick={() => handleMakeQuotation(sale)}  className=' btn btn-success'>Make Quation</button>


                                            </td><td className='btn-groups'>

                                                <button className=' btn btn-danger'>Delete</button>


                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AllSales;
