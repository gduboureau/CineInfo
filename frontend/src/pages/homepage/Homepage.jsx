import React from "react";
import { useState, useEffect } from 'react';
import Carousel from './CarouselPopmovies';

const Homepage = () => {
    return (
        <div>
            <div className="home-carroussel">
                <Carousel />
            </div>
        </div>
    )
}

export default Homepage