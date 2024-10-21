import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Headings from '../../../components/Headings/Headings';
import Select from 'react-select';
import toast from 'react-hot-toast';
import Headings from '../../components/Headings/Headings';

function AddFinished() {
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    unitPrice: '',
    semiFinishedGoods: [], // Multiple selection for semi-finished goods
    productionDate: '',
    expirationDate: '',
  });

  const [semiFinishedGoodsOptions, setSemiFinishedGoodsOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch semi-finished goods for dropdown
  const fetchSemiFinishedGoods = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/v1/get-all-semifinished');
      const options = response.data.data.map(semiFinished => ({
        value: semiFinished._id,
        label: semiFinished.productName,
      }));
      setSemiFinishedGoodsOptions(options);
    } catch (error) {
      console.error('Error fetching semi-finished goods:', error);
    }
  };

  useEffect(() => {
    fetchSemiFinishedGoods();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setFormData({
      ...formData,
      semiFinishedGoods: selectedIds,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:7000/api/v1/create-finished', formData);
      toast.success('Finished Product created successfully!');
      setFormData({
        productName: '',
        quantity: '',
        unitPrice: '',
        semiFinishedGoods: [],
        productionDate: '',
        expirationDate: ''
      });
    } catch (error) {
      setError('Error creating finished product');
      toast.error('Error creating finished product');
    }

    setLoading(false);
  };

  return (
    <>
      <Headings heading={'Add Finished Product'} />
      <div className="container px-4 py-3 mt-4">
        <div className='col-12 col-md-12'>
          <div className="row">
            <div className="col-12 mt-5 col-md-12">
              <form className='text-capitalize' onSubmit={handleSubmit}>

                {/* Product Name */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          name="productName"
                          value={formData.productName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantity and Unit Price */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="unitPrice" className="form-label">Unit Price</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          id="unitPrice"
                          name="unitPrice"
                          value={formData.unitPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Semi-Finished Goods (Multi-Select) */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label htmlFor="semiFinishedGoods" className="form-label">Select Semi-Finished Goods</label>
                        <Select
                          isMulti
                          options={semiFinishedGoodsOptions}
                          value={semiFinishedGoodsOptions.filter(option =>
                            formData.semiFinishedGoods.includes(option.value)
                          )}
                          onChange={handleSelectChange}
                          placeholder="Select Semi-Finished Goods"
                          id="semiFinishedGoods"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Production Date and Expiration Date */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="productionDate" className="form-label">Production Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="productionDate"
                          name="productionDate"
                          value={formData.productionDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="expirationDate"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='ml-5'>
                  <button type="submit" className="px-5 py-2 bg-yellow text-white fw-bolder" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add Finished Product'}
                  </button>
                </div>

                {error && <p className="text-danger mt-3">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFinished;
