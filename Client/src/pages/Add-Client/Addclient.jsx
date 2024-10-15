import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import toast from 'react-hot-toast';
import Loder from '../../components/Loading/Loder';
const AddClient = () => {
    const [clientData, setClientData] = useState({
        customerName: '',
        email: '',
        contactDetails: {
            phone: '',
            email: '',
            secondaryPhone: '',
            secondaryEmail: ''
        },
        businessInfo: {
            businessName: '',
            businessCategory: '',
            establishmentDate: '',
            head: '',
            businessAddress: {
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            }
        },
        additionalAddress: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        clientStatus: 'Active',
        followUpDate: '',
        followUp: false,
        comments: '',
        Roles: []
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(false);

    const [isSameAddress, setIsSameAddress] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClientData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (e, section, field) => {
        const { value } = e.target;
        setClientData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleNestedNestedChange = (e, section, nestedSection, field) => {
        const { value } = e.target;
        setClientData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [nestedSection]: {
                    ...prev[section][nestedSection],
                    [field]: value
                }
            }
        }));
    };

    const handleAdditionalAddressChange = (e, field) => {
        const { value } = e.target;
        setClientData((prev) => ({
            ...prev,
            additionalAddress: {
                ...prev.additionalAddress,
                [field]: value
            }
        }));
    };

    const handleCheckboxChange = () => {
        setIsSameAddress(!isSameAddress);
        if (!isSameAddress) {
            setClientData((prev) => ({
                ...prev,
                additionalAddress: { ...prev.businessInfo.businessAddress }
            }));
        } else {
            setClientData((prev) => ({
                ...prev,
                additionalAddress: {
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: ''
                }
            }));
        }
    };
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const minDate = `${year}-${month}-${day}`;

    const validateForm = () => {
        const newErrors = {};
        if (!clientData.customerName) newErrors.customerName = 'Customer Name is required';
        if (!clientData.email) newErrors.email = 'Email is required';
        if (!clientData.contactDetails.phone) newErrors.phone = 'Phone number is required';
        if (!clientData.businessInfo.businessName) newErrors.businessName = 'Business Name is required';
        if (!clientData.businessInfo.establishmentDate) newErrors.establishmentDate = 'Establish Date  is required';
        if (!clientData.businessInfo.head) newErrors.head = 'Head Of Bussiness Name is required';

        if (!clientData.businessInfo.businessCategory) newErrors.businessCategory = 'Business Category is required';
        if (!clientData.businessInfo.businessAddress.street) newErrors.businessStreet = 'Street is required';
        if (!clientData.businessInfo.businessAddress.city) newErrors.businessCity = 'City is required';
        if (!clientData.businessInfo.businessAddress.state) newErrors.businessState = 'State is required';
        if (!clientData.businessInfo.businessAddress.postalCode) newErrors.businessPostalCode = 'Postal Code is required';
        if (!clientData.businessInfo.businessAddress.country) newErrors.businessCountry = 'Country is required';


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true)
            // console.log("i am hit")
            try {
                const { data } = await axios.post(`http://localhost:7000/api/v1/create-customer`, clientData)
                toast.success(data?.message)
                setLoading(false)
                window.location.href="/Clients-Vendor/Clients"
            } catch (error) {
                console.log(error)
                setLoading(false)

                toast.error(error?.response?.data?.message || "Internal server error")
            }
        }
    };

    return (
   <>
   {isLoading ? <Loder/> :(
         <div className="container mt-4">
         <h2>Add New Client</h2>
         <Form >
             <Row>
                 <Col md={6}>
                     <Form.Group controlId="customerName">
                         <Form.Label>Customer Name</Form.Label>
                         <Form.Control
                             type="text"
                             name="customerName"
                             value={clientData.customerName}
                             onChange={handleChange}
                             isInvalid={!!errors.customerName}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.customerName}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
                 <Col md={6}>
                     <Form.Group controlId="email">
                         <Form.Label>Email</Form.Label>
                         <Form.Control
                             type="email"
                             name="email"
                             value={clientData.email}
                             onChange={handleChange}
                             isInvalid={!!errors.email}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.email}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
             </Row>

             <h4 className="mt-4">Contact Details</h4>
             <Row>
                 <Col md={6}>
                     <Form.Group controlId="phone">
                         <Form.Label>Phone</Form.Label>
                         <Form.Control
                             type="text"
                             name="phone"
                             value={clientData.contactDetails.phone}
                             onChange={(e) => handleNestedChange(e, 'contactDetails', 'phone')}
                             isInvalid={!!errors.phone}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.phone}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
                 <Col md={6}>
                     <Form.Group controlId="contactEmail">
                         <Form.Label>Contact Email</Form.Label>
                         <Form.Control
                             type="email"
                             name="contactEmail"
                             value={clientData.contactDetails.email}
                             onChange={(e) => handleNestedChange(e, 'contactDetails', 'email')}
                         />
                     </Form.Group>
                 </Col>
             </Row>

             <h4 className="mt-4">Business Info</h4>
             <Row>
                 <Col md={6}>
                     <Form.Group controlId="businessName">
                         <Form.Label>Business Name</Form.Label>
                         <Form.Control
                             type="text"
                             name="businessName"
                             value={clientData.businessInfo.businessName}
                             onChange={(e) => handleNestedChange(e, 'businessInfo', 'businessName')}
                             isInvalid={!!errors.businessName}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.businessName}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
                 <Col md={6}>
                     <Form.Group controlId="businessCategory">
                         <Form.Label>Business Category</Form.Label>
                         <Form.Control
                             type="text"
                             name="businessCategory"
                             value={clientData.businessInfo.businessCategory}
                             onChange={(e) => handleNestedChange(e, 'businessInfo', 'businessCategory')}
                             isInvalid={!!errors.businessCategory}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.businessCategory}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
             </Row>
             <Row>
                 <Col md={6}>
                     <Form.Group controlId="establishmentDate">
                         <Form.Label>Establishment Date</Form.Label>
                         <Form.Control
                             type="date"
                             name="establishmentDate"
                             value={clientData.businessInfo.establishmentDate}
                             onChange={(e) => handleNestedChange(e, 'businessInfo', 'establishmentDate')}
                             isInvalid={!!errors.establishmentDate} // Add error handling here
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.establishmentDate}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
                 <Col md={6}>
                     <Form.Group controlId="head">
                         <Form.Label>Head of Business</Form.Label>
                         <Form.Control
                             type="text"
                             name="head"
                             value={clientData.businessInfo.head}
                             onChange={(e) => handleNestedChange(e, 'businessInfo', 'head')}
                             isInvalid={!!errors.head} // Add error handling here
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.head}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
             </Row>


             {/* Client Status */}
             <h4 className="mt-4">Client Status</h4>
             <Form.Group controlId="clientStatus">
                 <Form.Label>Status</Form.Label>
                 <Form.Control
                     as="select"
                     name="clientStatus"
                     value={clientData.clientStatus}
                     onChange={handleChange}
                 >
                     <option value="Active">Active</option>
                     <option value="Inactive">Inactive</option>
                     <option value="Suspended">Suspended</option>
                 </Form.Control>
             </Form.Group>

             <h4 className="mt-4">Business Address</h4>
             <Row>
                 <Col md={4}>
                     <Form.Group controlId="businessStreet">
                         <Form.Label>Street</Form.Label>
                         <Form.Control
                             type="text"
                             name="street"
                             value={clientData.businessInfo.businessAddress.street}
                             onChange={(e) =>
                                 handleNestedNestedChange(e, 'businessInfo', 'businessAddress', 'street')
                             }
                             isInvalid={!!errors.businessStreet}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.businessStreet}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
                 <Col md={4}>
                     <Form.Group controlId="businessCity">
                         <Form.Label>City</Form.Label>
                         <Form.Control
                             type="text"
                             name="city"
                             value={clientData.businessInfo.businessAddress.city}
                             onChange={(e) =>
                                 handleNestedNestedChange(e, 'businessInfo', 'businessAddress', 'city')
                             }
                             isInvalid={!!errors.businessCity}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.businessCity}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
                 <Col md={4}>
                     <Form.Group controlId="businessState">
                         <Form.Label>State</Form.Label>
                         <Form.Control
                             type="text"
                             name="state"
                             value={clientData.businessInfo.businessAddress.state}
                             onChange={(e) =>
                                 handleNestedNestedChange(e, 'businessInfo', 'businessAddress', 'state')
                             }
                             isInvalid={!!errors.businessState}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.businessState}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
             </Row>
             <Row>
                 <Col md={4}>
                     <Form.Group controlId="businessPostalCode">
                         <Form.Label>Postal Code</Form.Label>
                         <Form.Control
                             type="text"
                             name="postalCode"
                             value={clientData.businessInfo.businessAddress.postalCode}
                             onChange={(e) =>
                                 handleNestedNestedChange(e, 'businessInfo', 'businessAddress', 'postalCode')
                             }
                             isInvalid={!!errors.businessPostalCode}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.businessPostalCode}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
                 <Col md={4}>
                     <Form.Group controlId="businessCountry">
                         <Form.Label>Country</Form.Label>
                         <Form.Control
                             type="text"
                             name="country"
                             value={clientData.businessInfo.businessAddress.country}
                             onChange={(e) =>
                                 handleNestedNestedChange(e, 'businessInfo', 'businessAddress', 'country')
                             }
                             isInvalid={!!errors.businessCountry}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.businessCountry}
                         </Form.Control.Feedback>
                     </Form.Group>
                 </Col>
             </Row>

             <h4 className="mt-4">Additional Address</h4>
             <Form.Group controlId="sameAddressCheckbox">
                 <Form.Check
                     type="checkbox"
                     label="Same as Business Address"
                     checked={isSameAddress}
                     onChange={handleCheckboxChange}
                 />
             </Form.Group>

             <Row>
                 <Col md={4}>
                     <Form.Group controlId="additionalStreet">
                         <Form.Label>Street</Form.Label>
                         <Form.Control
                             type="text"
                             name="street"
                             value={clientData.additionalAddress.street}
                             onChange={(e) => handleAdditionalAddressChange(e, 'street')}
                         />
                     </Form.Group>
                 </Col>
                 <Col md={4}>
                     <Form.Group controlId="additionalCity">
                         <Form.Label>City</Form.Label>
                         <Form.Control
                             type="text"
                             name="city"
                             value={clientData.additionalAddress.city}
                             onChange={(e) => handleAdditionalAddressChange(e, 'city')}
                         />
                     </Form.Group>
                 </Col>
                 <Col md={4}>
                     <Form.Group controlId="additionalState">
                         <Form.Label>State</Form.Label>
                         <Form.Control
                             type="text"
                             name="state"
                             value={clientData.additionalAddress.state}
                             onChange={(e) => handleAdditionalAddressChange(e, 'state')}
                         />
                     </Form.Group>
                 </Col>
             </Row>
             <Row>
                 <Col md={4}>
                     <Form.Group controlId="additionalPostalCode">
                         <Form.Label>Postal Code</Form.Label>
                         <Form.Control
                             type="text"
                             name="postalCode"
                             value={clientData.additionalAddress.postalCode}
                             onChange={(e) => handleAdditionalAddressChange(e, 'postalCode')}
                         />
                     </Form.Group>
                 </Col>
                 <Col md={4}>
                     <Form.Group controlId="additionalCountry">
                         <Form.Label>Country</Form.Label>
                         <Form.Control
                             type="text"
                             name="country"
                             value={clientData.additionalAddress.country}
                             onChange={(e) => handleAdditionalAddressChange(e, 'country')}
                         />
                     </Form.Group>
                 </Col>
             </Row>

             <h4 className="mt-4">Follow Up</h4>
             <Form.Group controlId="followUp">
                 <Form.Label>Follow-Up</Form.Label>
                 <Form.Control
                     as="select"
                     name="followUp"
                     value={clientData.followUp}
                     onChange={handleChange}
                 >
                     <option value="true">Yes</option>
                     <option value="false">No</option>
                 </Form.Control>
             </Form.Group>
             {clientData.followUp && (
                 <Form.Group controlId="followUpDate">
                     <Form.Label>Follow Up Date</Form.Label>
                     <Form.Control
                         type="date"
                         name="followUpDate"
                         value={clientData.followUpDate}
                         onChange={handleChange}
                         min={minDate}
                     />
                 </Form.Group>
             )}

             <Form.Group controlId="comments" className="mt-4">
                 <Form.Label>Comments</Form.Label>
                 <Form.Control
                     as="textarea"
                     rows={3}
                     name="comments"
                     value={clientData.comments}
                     onChange={handleChange}
                 />
             </Form.Group>

             <Button onClick={handleSubmit} className="mt-4" type="submit">
                 Submit
             </Button>
         </Form>
     </div>
   )}
   </>
    );
};

export default AddClient;
