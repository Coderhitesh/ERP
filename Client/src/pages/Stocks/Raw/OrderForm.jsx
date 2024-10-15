import React, { useEffect, useState } from 'react';
import Loader from '../../../components/Loading/Loder';
import { useSnackbar } from 'notistack'

const OrderForm = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [formData, setFormData] = useState({
        OrderId: "",
        ProductName: "",
        ProductCategory: "",
        ThingWhichNeed: [],
        vendorName: "",
        RawOrderId: ""
    });
    const [allInfo, setAllInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        // Update formData state with values from allInfo
        setFormData({
            OrderId: allInfo.OrderId || "",
            ProductName: allInfo.ProductName || "",
            ProductCategory: allInfo.ProductCategory || "",
            ThingWhichNeed: allInfo.RawNeeded ? JSON.parse(allInfo.RawNeeded) : [],
            vendorName: allInfo.vendorName || "",
            RawOrderId: generateRawOrderIdNumber()
        });
    }, [allInfo]);

    const generateRawOrderIdNumber = () => {
        const StartWith = "RawOrderId";
        const NumberRange = "1234567890";
        let quotationNumber = StartWith;
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * NumberRange.length);
            quotationNumber += NumberRange[randomIndex];
        }
        return quotationNumber;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const key = enqueueSnackbar('Order submitted successfully', {
                variant: 'success', // Customize the appearance of the snackbar
                persist: true, // Allow the snackbar to persist until dismissed

            });
            setTimeout(() => {
                closeSnackbar(key);
            }, 2500);
            console.log('Order submitted successfully!', formData);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };
    return (
        <div className='container-fluid'>
            {isLoading && <Loader />}
            <div className='container'>
                <div className='head-part w-75'>
                    <h1>Do Order From Here (Raw) </h1>
                </div>
                <div className='container-fluid'>
                    <div className='card-body bg-white'>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="orderId" className="form-label">Order ID</label>
                                <input type="text" className="form-control" id="orderId" name="orderId" value={formData.OrderId} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="productName" name="productName" value={formData.ProductName} readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productCategory" className="form-label">Product Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="productCategory"
                                    name="productCategory"
                                    value={formData.ProductCategory}
                                    onChange={(e) => setFormData({ ...formData, ProductCategory: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="thingWhichNeed" className="form-label">Thing Which Need</label>
                                <div className="row">
                                    {formData.ThingWhichNeed.map((item, index) => (
                                        <div key={index} className="col-md-4">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text bg-blue text-white">{item.name}</span>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder={`Quantity for ${item.name}`}
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const updatedThingWhichNeed = [...formData.ThingWhichNeed];
                                                        updatedThingWhichNeed[index] = {
                                                            ...updatedThingWhichNeed[index],
                                                            quantity: parseInt(e.target.value)
                                                        };
                                                        setFormData({
                                                            ...formData,
                                                            ThingWhichNeed: updatedThingWhichNeed
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="mb-3">
                                <label htmlFor="vendorName" className="form-label">Vendor Name</label>
                                <input type="text" className="form-control" id="vendorName" name="vendorName" value={formData.vendorName} readOnly />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="urgent" name="urgent" checked={formData.Urgent} readOnly />
                                <label className="form-check-label" htmlFor="urgent">Urgent</label>
                            </div>
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderForm;
