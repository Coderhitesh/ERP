import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const Chart = ({firstcol,secondcol,thirdcol,text}) => {
    const options = {
        plugins: {
            title: {
                display: true,
                text:text
            },
        },
        responsive: true,

        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
                backgroundColor:firstcol,
                stack: 'Stack 0',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
                backgroundColor: secondcol,
                stack: 'Stack 0',
            },
            {
                label: 'Dataset 3',
                data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
                backgroundColor: thirdcol,
                stack: 'Stack 1',
            },
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} />;
        </div>
    )
}

export default Chart