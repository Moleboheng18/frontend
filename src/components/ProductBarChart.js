// src/components/ProductBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductBarChart = ({ products }) => {
    const data = {
        labels: products.map(product => product.name),  // Product names
        datasets: [
            {
                label: 'Product Quantity',
                data: products.map(product => product.quantity), // Corresponding quantities
                backgroundColor: 'rgba(54, 162, 235, 0.8)',  // Darker shade for bars
                borderColor: 'rgba(54, 162, 235, 1)',         // Darker border color
                borderWidth: 2,
                barThickness: 100, // Make bars thinner (adjust as needed)
                maxBarThickness: 100, // Optional: limit max thickness for large datasets
            },
        ],
    };

    const options = {
        scales: {
            x: {
                ticks: {
                    color: '#333', 
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#333', 
                }
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#333', 
                }
            }
        }
    };

    return <Bar data={data} options={options} />;
};

export default ProductBarChart;
