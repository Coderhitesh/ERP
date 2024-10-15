import React, { useEffect, useState } from 'react'
import axios from 'axios'
const OrderRaw = () => {
  const [OrderRaw, setOrderRaw] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const handleFetchOrderRaw = async () => {
    try {
      const response = await axios.get('/orderaw.json');
      setOrderRaw(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchOrderRaw();
  }, []);
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = OrderRaw.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Search
  const filteredProducts = OrderRaw.filter(raw => {
    return raw.ProductName.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className='container-fluid'>
      <div className="col-12 col-md-12">
        <div className='head-part w-50'>
          <h1>All Raw Orders List</h1>
        </div>
        <div className='card-body bg-white'>
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
                <th>Order Id</th>
                <th>Product Name</th>
                <th>Its Any Urgent</th>
                <th>Raw Materials</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(!searchTerm ? currentProducts : filteredProducts).map((raw, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{raw.OrderId}</td>
                  <td>{raw.ProductName}</td>
                  <td>{raw.Urgent ? "Yes" : 'No'}</td>
                  <td>
                    <ul className="list-unstyled">
                      {raw.RawNeeded.map((material, idx) => (
                        <li key={idx}>
                          <span className="black">Name: {material.name}</span>
                          <span className="black">Quantity: {material.quantity} pcs</span>
                          {idx !== raw.RawNeeded.length - 1 && <b className='blue'>, </b>}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className='d-flex gap-2'>
                  <button onClick={() => handleOrder(raw)} className='btn btn-primary'>Make Order</button>
                    {/* <button className='btn btn-danger'>Delete</button> */}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          {/* Pagination */}
          <ul className='pagination justify-content-center'>
            {Array.from({ length: Math.ceil(OrderRaw.length / productsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className='page-link'>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OrderRaw