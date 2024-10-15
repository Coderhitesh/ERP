import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AllManufactOrder = () => {
    const AllOrders = [
        {
          employeeName: "Arjun Sharma",
          contactNumber: "+91-9876543210",
          manufactureId: "MANUF001",
          issuedDate: "15-05-2024",
          expectedDate: "25-05-2024",
          totalQuantity: 852
        },
        {
          employeeName: "Priya Gupta",
          contactNumber: "+91-8765432109",
          manufactureId: "MANUF002",
          issuedDate: "16-05-2024",
          expectedDate: "26-05-2024",
          totalQuantity: 720
        },
        {
          employeeName: "Rajesh Singh",
          contactNumber: "+91-7654321098",
          manufactureId: "MANUF003",
          issuedDate: "17-05-2024",
          expectedDate: "27-05-2024",
          totalQuantity: 630
        },
        {
          employeeName: "Sneha Patel",
          contactNumber: "+91-6543210987",
          manufactureId: "MANUF004",
          issuedDate: "18-05-2024",
          expectedDate: "28-05-2024",
          totalQuantity: 550
        },
        {
          employeeName: "Vijay Kumar",
          contactNumber: "+91-5432109876",
          manufactureId: "MANUF005",
          issuedDate: "19-05-2024",
          expectedDate: "29-05-2024",
          totalQuantity: 480
        },
        {
          employeeName: "Aarti Singh",
          contactNumber: "+91-4321098765",
          manufactureId: "MANUF006",
          issuedDate: "20-05-2024",
          expectedDate: "30-05-2024",
          totalQuantity: 400
        },
        {
          employeeName: "Amit Kumar",
          contactNumber: "+91-3210987654",
          manufactureId: "MANUF007",
          issuedDate: "21-05-2024",
          expectedDate: "31-05-2024",
          totalQuantity: 350
        },
        {
          employeeName: "Neha Sharma",
          contactNumber: "+91-2109876543",
          manufactureId: "MANUF008",
          issuedDate: "22-05-2024",
          expectedDate: "01-06-2024",
          totalQuantity: 300
        },
        {
          employeeName: "Rahul Gupta",
          contactNumber: "+91-1098765432",
          manufactureId: "MANUF009",
          issuedDate: "23-05-2024",
          expectedDate: "02-06-2024",
          totalQuantity: 250
        },
        {
          employeeName: "Kritika Singh",
          contactNumber: "+91-0987654321",
          manufactureId: "MANUF010",
          issuedDate: "24-05-2024",
          expectedDate: "03-06-2024",
          totalQuantity: 200
        },
        {
          employeeName: "Ravi Patel",
          contactNumber: "+91-9876543210",
          manufactureId: "MANUF011",
          issuedDate: "25-05-2024",
          expectedDate: "04-06-2024",
          totalQuantity: 150
        },
        {
          employeeName: "Ananya Mishra",
          contactNumber: "+91-8765432109",
          manufactureId: "MANUF012",
          issuedDate: "26-05-2024",
          expectedDate: "05-06-2024",
          totalQuantity: 100
        }
      ];
      

    const [vendorFilter, setVendorFilter] = useState("");

    // Function to filter orders based on selected filters
    const filteredOrders = AllOrders.filter(order => {  
        if (vendorFilter && order.employeeName !== vendorFilter) {
            return false;
        }
        return true;
    });
  return (
    <>
        <div className="flex-head">
            <h2>Manufacturing Orders </h2>
            <Link to="/order/create-manufacturing-order">Create Manufacturing Order</Link>
        </div>

        <section className="filter">
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="col-md-4">
                        <select className="form-select" value={vendorFilter} onChange={(e) => setVendorFilter(e.target.value)}>
                            <option value="">Choose Employee Name</option>
                            {AllOrders.map((order, index) => (
                                <option key={index}>{order.employeeName}</option>
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
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Contact Number</th>
                                    <th scope="col">Manufacture Id</th>
                                    <th scope="col">Issued Date</th>
                                    <th scope="col">Expected Date</th>
                                    <th scope="col">Total Quantity</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{order.employeeName}</td>
                                        <td>{order.contactNumber}</td>
                                        <td>{order.manufactureId}</td>
                                        <td>{order.issuedDate}</td>
                                        <td>{order.expectedDate}</td>
                                        <td>{order.totalQuantity}</td>
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

export default AllManufactOrder