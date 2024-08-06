import React from 'react';
import '../index.css';

import StarIcon from '../images/star.webp';

const SearchModal = ({ data = [] }) => {
    return (
        <div className={`search-modal ${data.length > 0 ? 'active' : ''}`}>
            <h4 className='heading'><span className='label'>Results</span></h4>
            <div className='movie-list'>
                <div className='grid-list'>
                    {data.length > 0 ? (
                        data.map((movie, index) => (
                            <div className='movie-card' key={index}>
                                <figure className='poster-box card-banner'>
                                        <img className='img-cover' alt={movie.altText} src={movie.imgSrc} />
                                </figure>
                                <h4 className='title'>{movie.title}</h4>
                                <div className='meta-list'>
                                    <div className='meta-item'>
                                        <img loading='lazy' style={{ height: '20px', width: '20px' }} src={StarIcon} alt='rating' />
                                        <span className='span' style={{ fontSize: '16px' }}>{movie.rating}</span>
                                    </div>
                                    <div className='card-badge'>{movie.year}</div>
                                </div>
                                <a title={movie.title} className='card-btn' href={movie.detailsUrl} />

                            </div>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchModal;