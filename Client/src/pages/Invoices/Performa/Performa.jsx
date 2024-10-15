import React, { useEffect, useState } from 'react'
import logo from './erp (1).png'
import Loder from '../../../components/Loading/Loder';
const Performa = () => {
    const [products, setProducts] = useState([]);
    const [allInfo, setAllInfo] = useState({});
    const [BillToUser, setBillToUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    const [quotationNumber, setQuotationNumber] = useState('');

    useEffect(() => {
        const queryString = window.location.search;
        const paramsString = queryString.substring(1);
        const paramsArray = paramsString.split('&');
        const paramsObject = {};
        paramsArray.forEach(param => {
            const [key, value] = param.split('=');
            paramsObject[key] = decodeURIComponent(value);
        });

        // Set allInfo state with the entire paramsObject
        setAllInfo(paramsObject);

        // Parse products from paramsObject and setProducts state
        const productsArray = JSON.parse(paramsObject.products);
        setProducts(productsArray);
        setTimeout(() => {

            setIsLoading(false);
        }, 2000);
    }, []);

    const [ValidDate, setValidDate] = useState(new Date());
    const [todayDate, setTodayDate] = useState(new Date());

    useEffect(() => {
        const today = new Date();
        setTodayDate(today);
    }, []);
    const formattedDate = new Date(todayDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    // Print function to trigger print command
    const handlePrint = () => {
        window.print();
    };

    // Add event listener to listen for F2 key press
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'F2') {
                handlePrint();
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const generateQuotationNumber = () => {
        const StartWith = "Per";
        const NumberRange = "1234567890";
        let quotationNumber = StartWith;
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * NumberRange.length);
            quotationNumber += NumberRange[randomIndex];
        }
        return quotationNumber;
    }
    useEffect(() => {
        // Generate and set quotation number when allInfo state is set
        if (allInfo.BillTo) {
            const BillToUser = JSON.parse(allInfo.BillTo);

            setBillToUser(BillToUser)
            const generatedQuotationNumber = generateQuotationNumber();
            setQuotationNumber(generatedQuotationNumber);
        }
    }, [allInfo]);


    console.log(allInfo)


    return (
        <div className='w-100'>
            {isLoading && <Loder />}
            <div className="container">
                <div className="col-12">
                    <div className="row">
                        <div className='Quation-body'>
                            <div className='col-12 py-2 head-section text-center px-2'>

                                <div className="col-6">
                                    <div className="img-logo">
                                        <img src={logo} alt="logo-Erp" className=' w-10' />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h2 className='head blue fw-boldest'>Performa</h2>
                                </div>


                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="company-info col-6">
                                        <h2>Company Info</h2>
                                        <ul>
                                            <li><b>Primary Bussiness Name :</b> {BillToUser.CompanyName || "XYZ Company"} </li>
                                            <li><b>Bussiness Address:</b> XYZ Rohini</li>
                                            <li><b>Contact Number:</b> {BillToUser.ContactDetails || "+91 7485745965"} </li>
                                            <li><b>Email:</b>{BillToUser.email || " Xyz@gmail.com"}</li>


                                        </ul>
                                    </div>
                                    <div className="Date-info col-6">
                                        <h2 className='vis'>Company Info</h2>
                                        <ul>
                                            <li><b>Date :</b> {formattedDate}</li>
                                            <li><b>Performa No :</b> {quotationNumber}</li>
                                            <li><b>Vaild Until:</b> 6 Days Of Issued Date {formattedDate}</li>


                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className='col-12 com-md-4'>

                                <div className="tags-quatation">
                                    <h2>Customer Info</h2>
                                    <div className="company-info">

                                        <ul>
                                            <li><b> Name :</b> {BillToUser.Name} </li>
                                            <li><b> Address:</b> {BillToUser.ContactDetails}</li>
                                            <li><b>Customer Id:</b> Xyz123</li>
                                            <li><b>Email:</b> {BillToUser.email}</li>


                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div className="productTable">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className='bg-blue bg-blue-print fw-bolder text-white'>S.NO</th>
                                            <th className='bg-blue bg-blue-print fw-bolder text-white'>ID</th>
                                            <th className='bg-blue bg-blue-print fw-bolder text-white'>Name</th>
                                            <th className='bg-blue bg-blue-print fw-bolder text-white'>Quantity</th>
                                            <th className='bg-blue bg-blue-print fw-bolder text-white'>Unit Price (Rs)</th>
                                            <th className='bg-blue bg-blue-print fw-bolder text-white'>Discount</th>
                                            <th className='bg-blue bg-blue-print fw-bolder text-white'>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={product.id}>
                                                <td contentEditable={true}>{index + 1}</td>
                                                <td contentEditable={true}>{product.id}</td>
                                                <td contentEditable={true}>{product.NameOfProduct}</td>
                                                <td contentEditable={true}>{product.Quantity}</td>
                                                <td contentEditable={true}>{product.UnitPrice}</td>
                                                <td contentEditable={true}>{product.Discount} %</td>
                                                <td contentEditable={true}>{product.Description}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                            <hr className='blue bg-blue' />
                            <div className='price-section'>
                                <div class="w-75">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <div class="any-note">
                                                <form action="">
                                                    <div class="mb-3">
                                                        <label for="anyNote" class="form-label black">Any Note</label>
                                                        <textarea class="w-75 form-control" id="anyNote" name="anyNote" rows="4"></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='prices-break'>
                                    <p className='blue fw-bolder'><b className='text-black black'>Gst :</b>{allInfo.Gst}</p>
                                    <p className='blue fw-bolder'><b className='text-black black'>SubTotal :</b>Rs {allInfo.Total}</p>
                                    <p className='blue fw-bolder'><b className='text-black black'>Discount :</b>Rs {allInfo.TotalDiscount}</p>
                                    <p className='blue fw-bolder'><b className='text-black black'>Other Fees :</b>Rs {allInfo.OtherFees}</p>

                                    <p className='blue fw-bolder'><b className='text-black black'>Final Price :</b>Rs {allInfo.FinalTotal}</p>



                                </div>


                            </div>
                            <div className='terms container-fluid text-center py-2 bg-blue'>
                                <h5 className='white'>Term And Condtions</h5>


                            </div>
                            <div class="conditions">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">All prices are subject to change without prior notice.</li>
                                    <li class="list-group-item">Payment terms are <span class="fw-bold">Net 30 days</span> from the date of the invoice unless otherwise specified.</li>
                                    <li class="list-group-item">Any additional charges or taxes not included in the quotation will be added to the final invoice.</li>
                                    <li class="list-group-item">Delivery timelines mentioned are estimates and may vary based on factors beyond our control.</li>
                                    <li class="list-group-item">All goods remain the property of DigiIndiaSolutions until paid for in full.</li>
                                </ul>
                            </div>
                            <div className='signature-box'>
                                <div className="box">
                                    <img src="https://img.freepik.com/premium-vector/vector-template-typography-poster-sticker-banner-sticker-etc_98908-478.jpg" alt="" />
                                </div>
                                <p className='black mt-2'>Done By Anish Jha</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Performa