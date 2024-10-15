import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import './DailyReport.css'

const DailyReport = () => {

    const rawMaterialData = [50, 30, 70, 40, 60, 80, 55];
    const semiFinishedData = [40, 20, 60, 30, 50, 70, 45];
    const finishedData = [30, 10, 50, 20, 40, 60, 35];


    // Data for raw material, semi-finished, and finished items chart
    const inventoryChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Raw Material',
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: rawMaterialData
            },
            {
                label: 'Semi-Finished',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: semiFinishedData
            },
            {
                label: 'Finished',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: finishedData
            }
        ]
    }


    // Dummy data for each section
    const orderData = {
        quotation: 25,
        performa: 15
    };
    const clientVendorData = {
        clientsAdded: 10,
        vendorsAdded: 5,
        workingVendors: 3
    };
    const leadsFollowUpData = {
        leads: 20,
        followUp: 15
    };
    const billsData = {
        pending: 8,
        paid: 15,
        unpaid: 5
    };

    // Options for the charts
    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    // Data for order chart
    const orderChart = {
        labels: ['Quotation', 'Performa'],
        datasets: [
            {
                data: [orderData.quotation, orderData.performa],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                hoverBackgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)']
            }
        ]
    };

    // Data for client/vendor chart
    const clientVendorChart = {
        labels: ['Clients Added', 'Vendors Added', 'Working Vendors'],
        datasets: [
            {
                label: 'Count',
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
                data: [clientVendorData.clientsAdded, clientVendorData.vendorsAdded, clientVendorData.workingVendors]
            }
        ]
    };

    // Data for leads/follow-up chart
    const leadsFollowUpChart = {
        labels: ['Leads', 'Follow-up'],
        datasets: [
            {
                data: [leadsFollowUpData.leads, leadsFollowUpData.followUp],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                hoverBackgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)']
            }
        ]
    };

    // Data for bills chart
    const billsChart = {
        labels: ['Pending', 'Paid', 'Unpaid'],
        datasets: [
            {
                label: 'Count',
                backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
                data: [billsData.pending, billsData.paid, billsData.unpaid]
            }
        ]
    };

    return (
        <div className="container-fluid dailyReport">
            <h1>Daily Reporting</h1>
            <div className="row">
                <div className="col-md-6 graph">
                    <h2>Inventory Overview</h2>
                    <Bar data={inventoryChart} options={options} />
                </div>
                <div className="col-md-6 graph">
                    <h2>Order</h2>
                    <Pie data={orderChart} options={options} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 graph">
                    <h2>Client / Vendor</h2>
                    <Bar data={clientVendorChart} options={options} />
                </div>
                <div className="col-md-6 graph">
                    <h2>Leads / Follow-up</h2>
                    <Pie data={leadsFollowUpChart} options={options} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 graph">
                    <h2>Bills</h2>
                    <Bar data={billsChart} options={options} />
                </div>
            </div>
        </div>
    );
}

export default DailyReport;
