import React, { useState } from 'react';
import Headings from '../../components/Headings/Headings';

const CreateSalesOrder = () => {
    const [formData, setFormData] = useState({
        DateIssued: new Date(),
        OrderId: `Order${Math.floor(Math.random() * 10) + 1}`.padStart(10, '0'),
        CustomerId: "Customer-1",
        BillTo: {
            Name: "",
            CompanyName: "",
            ContactDetails: "",
            email: ""
        },
        shipTo: {
            Name: "",
            CompanyName: "",
            ContactDetails: "",
            email: ""
        },
        salesDate: new Date(),
        PO: "",
        salesPerson: "",
        products: [
            {
                id: "",
                NameOfProduct: "",
                Quantity: "",
                UnitPrice: "",
                Discount: "",
                Description: ""
            }
        ],
        Total: 0,
        TotalDiscount: 0,
        Gst: 0,
        OtherFees: 0,
        FinalTotal: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...formData.products];
        updatedProducts[index][name] = value;
        setFormData(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
    };

    const handleAddProduct = () => {
        setFormData(prevState => ({
            ...prevState,
            products: [...prevState.products, {
                id: "",
                NameOfProduct: "",
                Quantity: "",
                UnitPrice: "",
                Discount: "",
                Description: ""
            }]
        }));
    };

    // Function to calculate totals
    const calculateTotals = () => {
        let total = 0;
        let totalDiscount = 0;
        let gst = 0;
        let otherFees = 0;

        formData.products.forEach(product => {
            total += product.Quantity * product.UnitPrice;
            totalDiscount += (product.Quantity * product.UnitPrice * product.Discount) / 100;
        });

        // Calculate GST and other fees (you can define your own calculation logic)
        gst = total * 0.18;
        otherFees = total * 0.05;

        const finalTotal = total - totalDiscount + gst + otherFees;

        setFormData(prevState => ({
            ...prevState,
            Total: total,
            TotalDiscount: totalDiscount,
            Gst: gst,
            OtherFees: otherFees,
            FinalTotal: finalTotal
        }));
    };

    return (
        <>
        
        <Headings heading={"Create Sales Order"} />

        <div className="container-fluid mt-5">
            <form>
                <div className='container-fluid'>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-4">
                                {/* Order Information */}
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Order Information</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Date Issued</td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="DateIssued"
                                                    value={formData.DateIssued}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Order ID</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="OrderId"
                                                    value={formData.OrderId}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    readOnly
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Customer Id</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="CustomerId"
                                                    value={formData.CustomerId}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    readOnly
                                                />
                                            </td>
                                        </tr>
                                        {/* Add other order information fields here */}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-4">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Bill To</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="BillTo.Name"
                                                    value={formData.BillTo.Name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Company Name</td>
                                            <input
                                                type="text"
                                                name="BillTo.CompanyName"
                                                value={formData.BillTo.CompanyName}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </tr>
                                        <tr >
                                            <td>Contact Details</td>
                                            <input
                                                type="text"
                                                name="BillTo.ContactDetails"
                                                value={formData.BillTo.ContactDetails}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </tr>
                                        <tr >
                                            <td>Email</td>
                                            <input
                                                type="text"
                                                name="BillTo.email"
                                                value={formData.BillTo.email}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </tr>
                                        {/* Add other fields here */}
                                    </tbody>
                                </table>

                            </div>
                            <div className="col-4">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Ship To</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="shipTo.Name"
                                                    value={formData.shipTo.Name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Company Name</td>
                                            <input
                                                type="text"
                                                name="shipTo.CompanyName"
                                                value={formData.shipTo.CompanyName}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </tr>
                                        <tr >
                                            <td> Contact Details</td>
                                            <input
                                                type="text"
                                                name="shipTo.ContactDetails"
                                                value={formData.shipTo.ContactDetails}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </tr>
                                        <tr >
                                            <td>Email</td>
                                            <input
                                                type="text"
                                                name="shipTo.email"
                                                value={formData.shipTo.email}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </tr>
                                        {/* Add other Bill To fields here */}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>


                {/* Salesperson Information */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="2">Salesperson Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        <div className="col-12">
                            <div className='row'>

                                <div className="col-4">
                                    <tr>
                                        <td>Sales Date</td>
                                        <td>
                                            <input
                                                type="date"
                                                name="salesDate"
                                                value={formData.salesDate}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </td>
                                    </tr></div>
                                <div className="col-4">  <tr>
                                    <td>P.O</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="salesDate"
                                            value={formData.PO}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </td>
                                </tr></div>
                                <div className="col-4">
                                    <tr>
                                        <td> Name</td>
                                        <td>
                                            <input
                                                type="date"
                                                name="salesDate"
                                                value={formData.salesPerson}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </td>
                                    </tr>
                                </div>



                            </div>
                        </div>
                        {/* Add other Salesperson fields here */}
                    </tbody>
                </table>
                <tr>

                </tr>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="6">Products</th>
                            <th colSpan={"5"}>                <button type="button" className="btn btn-success" onClick={handleAddProduct}>Add Product</button>
                            </th>
                        </tr>
                        <tr>
                            <th>S.No</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.products.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        type="text"
                                        name={`products[${index}].id`}
                                        value={product.id}
                                        onChange={(e) => handleProductChange(index, e)}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name={`products[${index}].NameOfProduct`}
                                        value={product.NameOfProduct}
                                        onChange={(e) => handleProductChange(index, e)}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name={`products[${index}].Quantity`}
                                        value={product.Quantity}
                                        onChange={(e) => handleProductChange(index, e)}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name={`products[${index}].UnitPrice`}
                                        value={product.UnitPrice}
                                        onChange={(e) => handleProductChange(index, e)}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name={`products[${index}].Discount`}
                                        value={product.Discount}
                                        onChange={(e) => handleProductChange(index, e)}
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name={`products[${index}].Description`}
                                        value={product.Description}
                                        onChange={(e) => handleProductChange(index, e)}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>


                {/* Prices */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="4">Prices</th>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <th>Total Discount</th>
                            <th>GST</th>
                            <th>Other Fees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Prices fields */}
                    </tbody>
                </table>

                {/* Submit button */}
                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        </>

    );

};

export default CreateSalesOrder;
