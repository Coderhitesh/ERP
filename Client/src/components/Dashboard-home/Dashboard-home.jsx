import React from 'react';
import './dashboard.css';
import ChartComponent from './Chart';
import Companyes from './Companyes';

const Dashboardhome = () => {
    return (
        <div className='container-fluid h-screen py-2 ml-2 mt-2 '>
            <div className='row'> 
                <div className='col-lg-12 '>
                    <div className='py-3 w-full'>
                        <h2 className='blue fw-bolder text-start'>Dashboard</h2>
                    </div>
                    <div className='row '>
                        <div className='col-md-3 pointer  glass border py-3'>
                            <div className='p-2'>
                                <h3>Total Page Views</h3>
                                <div className='d-flex  gap-2 mt-3'>
                                    <p className='btn btn-primary'>4,42,236</p>
                                    <p className='btn btn-warning'><i className="fas fa-stairs"></i> 59.3%</p>
                                </div>
                                <p className='mt-3'>You made an extra $35,000 this year</p>
                            </div>
                        </div>
                        <div className='col-md-3 pointer  glass border py-3'>
                            <div className='p-2'>
                                <h3>Total Sales</h3>
                                <div className='d-flex  gap-2 mt-3'>
                                    <p className='btn btn-dark'>14,42,236</p>
                                    <p className='btn btn-success'><i className="fas fa-stairs"></i> 79.3%</p>
                                </div>
                                <p className='mt-3'>You made an extra $35,000 this year</p>
                            </div>
                        </div>
                        <div className='col-md-3 pointer  glass border py-3'>
                            <div className='p-2'>
                                <h3>Total Bills Pending</h3>
                                <div className='d-flex  gap-2 mt-3'>
                                    <p className='btn btn-primary'>14,236</p>
                                    <p className='btn btn-danger'><i className="fas fa-stairs"></i> 69.3%</p>
                                </div>
                                <p className='mt-3'>You made an extra $35,000 this year</p>
                            </div>
                        </div>
                        <div className='col-md-3 pointer  glass border py-3'>
                            <div className='p-2'>
                                <h3>Total Bills Pending</h3>
                                <div className='d-flex  gap-2 mt-3'>
                                    <p className='btn btn-primary'>14,236</p>
                                    <p className='btn btn-danger'><i className="fas fa-stairs"></i> 69.3%</p>
                                </div>
                                <p className='mt-3'>You made an extra $35,000 this year</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* charts */}
            <div className='container-fluid mt-4 ml'>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-6' style={{ height: '400px' }}>
                            <ChartComponent firstcol={'#6610f2'} secondcol={'#fd7e14'} thirdcol={'#1cc88a'} text={'Production Chart Of Month'} />
                        </div>
                        <div className='col-6' style={{ height: '400px' }}>
                            <ChartComponent firstcol={'#36b9cc'} secondcol={'#f6c23e'} thirdcol={'#e74a3b'} text={'Sales Chart Of Week'} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Recent companys */}
            <div className='container-fluid  ml'>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-6' style={{ height: '400px' }}>
                            <Companyes/>
                        </div>
                        <div className='col-6' style={{ height: '400px' }}>
                            <ChartComponent firstcol={'#36b9cc'} secondcol={'#f6c23e'} thirdcol={'#e74a3b'} text={'Sales Chart Of Week'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboardhome;
