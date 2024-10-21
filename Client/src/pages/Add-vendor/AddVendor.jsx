import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Headings from '../../components/Headings/Headings';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const AddVendor = () => {
  const [formData, setFormData] = useState({
    supplierName: '',
    contactPerson: '',
    email: '',
    contactNumber: '',
    gstNumber: '',
    panNumber: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    paymentTerms: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Mobile Number Validation (10 digits)
  const isValidPhoneNumber = (number) => /^[0-9]{10}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!isValidPhoneNumber(formData.contactNumber)) {
      toast.error('Phone number must be exactly 10 digits');
      return;
    }

    // Prepare data for submission
    const dataToSubmit = {
      supplierName: formData.supplierName,
      contactPerson: formData.contactPerson,
      email: formData.email,
      contactNumber: formData.contactNumber,
      gstNumber: formData.gstNumber,
      panNumber: formData.panNumber,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentTerms: formData.paymentTerms,
    };

    setLoading(true);
    setError('');

    try {
      // Replace the API endpoint with your actual one
      const response = await axios.post('http://localhost:7000/api/v1/create-supplier', dataToSubmit);
      toast.success('Vendor added successfully!');
      console.log(response.data);
    } catch (err) {
      setError('Failed to add vendor. Please try again.');
      toast.error(err.response?.data.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Headings heading={'Add Vendor'} />
      <div className="container px-4 py-3 mt-4">
        <div className='col-12 col-md-12'>
          <div className="row">
            <div className="col-12 mt-5 col-md-12">
              <form className='text-capitalize' onSubmit={handleSubmit}>

                {/* Supplier Name and Contact Person */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                        <input type="text" className="form-control" id="supplierName" name="supplierName" value={formData.supplierName} onChange={handleChange} required />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="contactPerson" className="form-label">Contact Person</label>
                        <input type="text" className="form-control" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email and Contact Number */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="contactNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>
                </div>

                {/* GST Number and PAN Number */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="gstNumber" className="form-label">GST Number</label>
                        <input type="text" className="form-control" id="gstNumber" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="panNumber" className="form-label">PAN Number</label>
                        <input type="text" className="form-control" id="panNumber" name="panNumber" value={formData.panNumber} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address: Street, City, State, Postal Code, Country */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input type="text" className="form-control" id="street" name="street" value={formData.street} onChange={handleChange} />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name="city" value={formData.city} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className="form-control" id="state" name="state" value={formData.state} onChange={handleChange} />
                      </div>
                      <div className="col-6 mb-3">
                        <label htmlFor="postalCode" className="form-label">Postal Code</label>
                        <input type="text" className="form-control" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input type="text" className="form-control" id="country" name="country" value={formData.country} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Terms */}
                <div className='container'>
                  <div className='col-12'>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label htmlFor="paymentTerms" className="form-label">Payment Terms</label>
                        <textarea className="form-control" id="paymentTerms" name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='ml-5'>
                  <button type="submit" className="px-5 py-2 bg-yellow text-white fw-bolder" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add Vendor'}
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
};

export default AddVendor;
