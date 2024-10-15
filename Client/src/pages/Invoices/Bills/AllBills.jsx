import React, { useEffect, useState } from 'react'
import axios from 'axios'
const AllBills = () => {
    const [allBills, setallBills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const handleFetchallBills = async () => {
        try {
            const response = await axios.get('/biils.json');
            setallBills(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleFetchallBills();
    }, []);
    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allBills.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Search
    const filteredProducts = allBills.filter(raw => {
        return raw.BillIinNumber.toLowerCase().includes(searchTerm.toLowerCase());
    });
    const handleOrder = (raw) => {
        const saleObject = {
            ...raw,
            RawNeeded: JSON.stringify(raw.RawNeeded),
        };

        // Construct the query string
        const queryString = new URLSearchParams(saleObject).toString();

        // Construct the URL with the query string
        const url = `/Stock-Manage/Make-Raw-Order?${queryString}`;

        // Redirect to the URL
        window.location.href = url;
    }


    return (
        // Ye agr Raw Ki Zarurat hai toh yaha se order Hoga
        <div className=' bg-white container-fluid'>
            <div className="col-12 col-md-12">
                <div className='head-part w-25'>
                    <h1>All Bills</h1>
                </div>
                <div className='card-body '>
                    <div className="input-group mb-3">
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search by Product Name'
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">Search</button>
                        </div>
                    </div>

                    <table className='table py-2 px-2 table-bordered'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Bill Number</th>
                                {/* <th>Product Count</th> */}
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>MRP</th>
                                <th>Discount %</th>
                                <th>SKU</th>
                                <th>Total Price</th>
                                <th>Tax Percentage</th>
                                <th>Total Amount</th>

                            </tr>
                        </thead>

                        {(!searchTerm ? currentProducts : filteredProducts).map((bill, index) => (
                            <React.Fragment key={index}>
                                {bill.product.map((product, productIndex) => (
                                    <tr key={`${index}-${productIndex}`}>
                                        <td>{index + 1}</td>
                                        <td className='text-primary text-decoration-underline pointers'>{bill.BillIinNumber}</td>
                                        {/* <td>{bill.product.length}</td> */}

                                        <td>{product.item}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.mrp}</td>
                                        <td>{product.discount}</td>
                                        <td>{product.sku}</td>
                                        <td>{product.totalPrice}</td>
                                        <td>{bill.Taxpercenge}</td>
                                        <td>{bill.finalAmount}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </table>
                    {/* Pagination */}
                    {/* <ul className='pagination justify-content-center'>
            {Array.from({ length: Math.ceil(allBills.length / productsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className='page-link'>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul> */}
                </div>
            </div>
        </div>
    )
}

export default AllBills