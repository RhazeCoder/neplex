import React from 'react';
import '../index.css';

import StarIcon from '../images/star.webp';

const GenresFunc = ({ data }) => {

    return (
        <>
            {
                data.map((movie, index) => (
                    <div className='movie-card' key={index}>
                        <figure className='poster-box card-banner'>
                            <img className='img-cover' alt={movie.title} src={movie.controlImgSrc} />
                        </figure>
                        <h4 className='title'>{movie.title}</h4>
                        <div className='meta-list'>
                            <div className='meta-item'>
                                <img loading='lazy' style={{ height: '20', width: '20' }} src={StarIcon} alt='rating' />
                                <span className='span' style={{ fontSize: '16px' }}>{movie.rating.toFixed(1)}</span>
                            </div>
                            <div className='card-badge'>{movie.year}</div>
                        </div>
                        <a title={movie.title} className='card-btn' href={movie.detailsUrl} />
                    </div>
                ))
            }
        </>
    );
}

export default GenresFunc;