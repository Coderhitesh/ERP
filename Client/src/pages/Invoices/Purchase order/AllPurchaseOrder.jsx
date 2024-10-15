import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AllPurchaseOrder = () => {

    const AllOrders = [
        {
            id: "01",
            vendorName: "Digi India Solutions",
            orderId: "ORGF001",
            issuedDate: "15-05-2024",
            totalQuantity: 450,
            totalPrice: "55,000"
        },
        {
            id: "02",
            vendorName: "Tech World",
            orderId: "ORGF002",
            issuedDate: "16-05-2024",
            totalQuantity: 300,
            totalPrice: "35,000"
        },
        {
            id: "03",
            vendorName: "Electro Hub",
            orderId: "ORGF003",
            issuedDate: "17-05-2024",
            totalQuantity: 500,
            totalPrice: "60,000"
        },
        {
            id: "04",
            vendorName: "Smart Solutions",
            orderId: "ORGF004",
            issuedDate: "18-05-2024",
            totalQuantity: 600,
            totalPrice: "75,000"
        },
        {
            id: "05",
            vendorName: "Innovative Tech",
            orderId: "ORGF005",
            issuedDate: "19-05-2024",
            totalQuantity: 350,
            totalPrice: "40,000"
        },
        {
            id: "06",
            vendorName: "Tech Innovators",
            orderId: "ORGF006",
            issuedDate: "20-05-2024",
            totalQuantity: 400,
            totalPrice: "50,000"
        },
        {
            id: "07",
            vendorName: "Future Tech",
            orderId: "ORGF007",
            issuedDate: "21-05-2024",
            totalQuantity: 450,
            totalPrice: "55,000"
        },
        {
            id: "08",
            vendorName: "Digital Era",
            orderId: "ORGF008",
            issuedDate: "22-05-2024",
            totalQuantity: 320,
            totalPrice: "38,000"
        },
        {
            id: "09",
            vendorName: "Smart Systems",
            orderId: "ORGF009",
            issuedDate: "23-05-2024",
            totalQuantity: 470,
            totalPrice: "57,000"
        },
        {
            id: "10",
            vendorName: "Tech Giants",
            orderId: "ORGF010",
            issuedDate: "24-05-2024",
            totalQuantity: 520,
            totalPrice: "65,000"
        },
        {
            id: "11",
            vendorName: "Digital Solutions",
            orderId: "ORGF011",
            issuedDate: "25-05-2024",
            totalQuantity: 530,
            totalPrice: "68,000"
        },
        {
            id: "12",
            vendorName: "Electro Innovations",
            orderId: "ORGF012",
            issuedDate: "26-05-2024",
            totalQuantity: 480,
            totalPrice: "62,000"
        },
        {
            id: "13",
            vendorName: "Tech Giants",
            orderId: "ORGF013",
            issuedDate: "24-05-2024",
            totalQuantity: 520,
            totalPrice: "65,000"
        },
    ];

    const [vendorFilter, setVendorFilter] = useState("");

    // Function to filter orders based on selected filters
    const filteredOrders = AllOrders.filter(order => {
        if (vendorFilter && order.vendorName !== vendorFilter) {
            return false;
        }
        return true;
    });

    return (
        <>
            <div className="flex-head">
                <h2>Purchase Orders </h2>
                <Link to="/order/create-purchase-order">Create Purchase Order</Link>
            </div>

            <section className="filter">
                <div className="container-fluid py-3">
                    <div className="row">
                        <div className="col-md-4">
                            <select className="form-select" value={vendorFilter} onChange={(e) => setVendorFilter(e.target.value)}>
                                <option value="">Choose Vendor Name</option>
                                {AllOrders.map((order, index) => (
                                    <option key={index}>{order.vendorName}</option>
                                ))}
                            </select>

                        </div>
                        
                    </div>
                </div>
            </section>

            <section className="allTable">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Vendor Name</th>
                                        <th scope="col">Order Id</th>
                                        <th scope="col">Issued Date</th>
                                        <th scope="col">Total Quantity</th>
                                        <th scope="col">Total Price</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.id}</td>
                                            <td>{order.vendorName}</td>
                                            <td>{order.orderId}</td>
                                            <td>{order.issuedDate}</td>
                                            <td>{order.totalQuantity}</td>
                                            <td>{order.totalPrice}</td>
                                            <td className="action-btns">
                                                <button className="view"><i className="fa-regular fa-eye"></i></button>
                                                <button className="update"><i className="fa-solid fa-pen-to-square"></i></button>
                                                <button className="delete"><i className="fa-solid fa-trash-can-arrow-up"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AllPurchaseOrder