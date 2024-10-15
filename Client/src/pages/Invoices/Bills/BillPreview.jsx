import React from 'react'
import './BillPreview.css'
import { Link } from 'react-router-dom'

const BillPreview = () => {
    return (
        <>
            <section className="bill-preview">
                <div className="container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <p class="company-name"><strong>SDD Industries</strong></p>
                            <p class="address">Shop No.12, Sec 24, Pocket- 26, Rohini, New Delhi, Delhi 110085</p>
                        </div>
                        <div class="col-6 text-end">
                            <h2>BILL</h2>
                            <p>Bill# 123456</p>
                        </div>
                        <div class="col-12 mt-4 text-end">
                            <h5>Balance Due</h5>
                            <p>₹ 10,000</p>
                        </div>
                        <div class="col-8 mt-4">
                            <p>Vendor Address</p>
                            <p><strong>Digi India Solutions</strong></p>
                        </div>
                        <div class="col-4 mt-4">
                            <table class="text-end">
                                <tbody>
                                    <tr>
                                        <th>Order Number : </th>
                                        <td>PO-00007</td>
                                    </tr>
                                    <tr>
                                        <th>Bill Date : </th>
                                        <td>17 Feb 2024</td>
                                    </tr>
                                    <tr>
                                        <th>Due Date : </th>
                                        <td>17 Feb 2024</td>
                                    </tr>
                                    <tr>
                                        <th>Terms : </th>
                                        <td>Due on Receipt</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12 mt-4">
                            <table className='table main-table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item & Description</th>
                                        <th>Qty</th>
                                        <th>Rate</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>3.5mm Earphone</td>
                                        <td>10.0 pcs</td>
                                        <td>2.55</td>
                                        <td>2.55</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>5.5mm Earphone</td>
                                        <td>50.0 pcs</td>
                                        <td>20.55</td>
                                        <td>12.55</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="col-8"></div>
                        <div class="col-4 mt-5">
                            <table class="mini-table">
                                <tbody>
                                    <tr>
                                        <th>Sub Total INR</th>
                                        <td>400,000.00</td>
                                    </tr>
                                    <tr>
                                        <th>Discount</th>
                                        <td>-</td>
                                    </tr>
                                    <tr>
                                        <th>GST%</th>
                                        <td>18.00</td>
                                    </tr>
                                    <tr>
                                        <th>GST INR</th>
                                        <td>72,000.00</td>
                                    </tr>
                                    <tr>
                                        <th>Total INR</th>
                                        <td>472,000.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bottom-btns">
                
                <Link to="" className='bt download'>Download PDF <i class="fa-solid fa-download"></i>  </Link>
                <Link to="" className='bt share'>Share PDF <i class="fa-solid fa-arrow-up-from-bracket"></i> </Link>
            </section>
            
        </>
    )
}

export default BillPreview