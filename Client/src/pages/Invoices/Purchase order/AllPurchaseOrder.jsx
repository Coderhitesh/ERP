import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllPurchaseOrder = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [vendorFilter, setVendorFilter] = useState("");

    // Fetch purchase orders from backend
    useEffect(() => {
        const fetchPurchaseOrders = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/v1/get-all-purchase');
                setAllOrders(response.data.data); // Assume API sends an array of orders
            } catch (error) {
                console.error("Error fetching purchase orders", error);
            }
        };
        fetchPurchaseOrders();
    }, []);

    // Function to filter orders based on selected filters
    const filteredOrders = allOrders.filter(order => {
        if (vendorFilter && order.supplierId.supplierName !== vendorFilter) {
            return false;
        }
        return true;
    });

    return (
        <>
            <div className="flex-head">
                <h2>Purchase Orders</h2>
                <Link to="/order/create-purchase-order">Create Purchase Order</Link>
            </div>

            <section className="filter">
                <div className="container-fluid py-3">
                    <div className="row">
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={vendorFilter}
                                onChange={(e) => setVendorFilter(e.target.value)}
                            >
                                <option value="">Choose Vendor Name</option>
                                {allOrders.map((order, index) => (
                                    <option key={index} value={order.supplierId?.supplierName}>
                                        {order.supplierId?.supplierName}
                                    </option>
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
                                        <th scope="col">Order Number</th>
                                        <th scope="col">Issued Date</th>
                                        <th scope="col">Total Quantity</th>
                                        <th scope="col">Total Amount</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td>{index + 1}</td>
                                            <td>{order.supplierId?.supplierName}</td>
                                            <td>{order.orderNumber}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                                            </td>
                                            <td>{order.totalAmount.toLocaleString()}</td>
                                            <td>{order.status}</td>
                                            <td className="action-btns">
                                               <a style={{background:"none"}} href="">
                                               <button className="view">
                                                    <i className="fa-regular fa-eye"></i>
                                                </button>
                                               </a>
                                               <Link to={`/order/edit-purchase-order/${order._id}`} style={{background:"none"}}>
                                                <button className="update">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                               </Link>
                                               <a style={{background:"none"}} href="">
                                                <button className="delete">
                                                    <i className="fa-solid fa-trash-can-arrow-up"></i>
                                                </button>
                                               </a>
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
    );
};

export default AllPurchaseOrder;
