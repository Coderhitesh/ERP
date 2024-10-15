import React from 'react';

const Companyes = () => {
    const data = [
        {
            name: 'Company A',
            location: 'City X',
            industryType: 'Technology',
        },
        {
            name: 'Company B',
            location: 'City Y',
            industryType: 'Finance',
        },
        {
            name: 'Company B',
            location: 'City Y',
            industryType: 'Finance',
        },
        {
            name: 'Company B',
            location: 'City Y',
            industryType: 'Finance',
        },
        {
            name: 'Company B',
            location: 'City Y',
            industryType: 'Finance',
        },
        {
            name: 'Company B',
            location: 'City Y',
            industryType: 'Finance',
        },
        {
            name: 'Company B',
            location: 'City Y',
            industryType: 'Finance',
        },
        
        // Add more company data as needed
    ];

    return (
        <div className="container">
            <h2 className='indigo fw-bolder fs-1'>Recent Added Companies</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Industry Type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((company, index) => (
                        <tr key={index}>
                            <td>{company.name}</td>
                            <td>{company.location}</td>
                            <td>{company.industryType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Companyes;
