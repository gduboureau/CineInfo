import React from "react";
import { useState, useEffect } from 'react';

const Homepage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/popular-movies');
                const responseJson = await response.json();
                setData(responseJson);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="home-carroussel">
                <h2>Top 15 Popular Movies</h2>
                <ul>
                    {data.slice(0, 15).map((movie, index) => (
                        <li key={index}>{movie.original_title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Homepage