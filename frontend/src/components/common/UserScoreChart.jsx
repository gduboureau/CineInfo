import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import './assets/userScoreChart.css';

const UserScoreChart = ({ percent }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            const colorBelowThreshold = percent < 70 ? '#ffcc00' : '#21d07a';

            chartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [
                        {
                            data: [percent, 100 - percent],
                            backgroundColor: [colorBelowThreshold, '#0c0c0c'],
                        },
                    ],
                },
                options: {
                    cutout: '80%',
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    events: []
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [percent]);

    return (
        <div className="user-score-chart">
            <div className="percent">
                <span>{percent}%</span>
            </div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default UserScoreChart;
