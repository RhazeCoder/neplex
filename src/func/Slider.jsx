import React from "react";
import '../index.css';

const Slider = ({ data, changeFeatured, featuredIndex }) => {
    return (
        <>
            {
                data.map((movie, index) => (
                    <button key={index} data-slide={index} className={`poster-box slider-item btn-slide ${index === featuredIndex ? 'active' : ''}`} onClick={() => changeFeatured(index)}>
                        <img draggable='false' loading='lazy' alt={`Slide to ${movie.title}`} src={movie.controlImgSrc} />
                    </button>
                ))
            }
        </>
    );
}

export default Slider;
