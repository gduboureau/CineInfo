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
    }, []); // Empty dependency array ensures the effect runs only once

    // console.log(data);
    // const first15Movies = data.slice(0, 15);
    // console.log(first15Movies);

    return (
        <div>
            <div className="home-carroussel">
                <h2>Top 15 Popular Movies</h2>
                <ul>
                    {data.map(movie => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Homepage