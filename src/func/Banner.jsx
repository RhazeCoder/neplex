import React from "react";
import '../index.css';

import PlayIcon from '../images/play_circle.webp';

const Banner = ({ data, featuredIndex }) => {
    return (
        <>
            {
                data.map((movie, index) => (
                    <div key={index} className={`slider-item ${index === featuredIndex ? 'active' : ''}`}>
                        <img loading='eager' className='img-cover' src={movie.imgSrc} alt={movie.altText} />
                        <div className='banner-content'>
                            <h4 className='heading'>{movie.title}</h4>
                            <div className='meta-list'>
                                <div className='meta-item'>{movie.year}</div>
                                <div className='meta-item card-badge'>{movie.rating.toFixed(1)}</div>
                            </div>
                            <p className='genre'>{movie.genres.join(' • ')}</p>
                            <a className='btn' href={movie.detailsUrl}>
                                <img aria-hidden='true' src={PlayIcon} alt='play circle' style={{ height: '24px', width: '24px' }} />
                                <span className='span'>Watch Now</span>
                            </a>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default Banner;