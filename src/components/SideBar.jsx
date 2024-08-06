import React, { useEffect, useState } from 'react'
import Genres from '../genres.json';
import Languages from '../languages.json';

import Tmdb from '../images/tmdb-logo.webp';
import '../index.css';

const SideBar = () => {
    const [genre, setGenre] = useState('');
    const [lang, setLang] = useState('');

    useEffect(() => {
        const genre = new URLSearchParams(window.location.search).get('genre') || '';
        const lang = new URLSearchParams(window.location.search).get('lang') || 'en';
        setGenre(genre);
        setLang(lang);
    }, []);

    const changeGenre = (e) => {
        const genre = e.target.id.split('-')[1];
        setGenre(genre);
    }

    const changeLanguage = (e) => {
        const lang = e.target.id.split('-')[1];
        setLang(lang);
    }

    return (
        <aside id='sidebar'>
            <div className='sidebar'>
                <div className='sidebar-inner'>
                    <div className='sidebar-list'>
                        <p className='title'>Genre</p>
                        {Object.entries(Genres).map(([id, name]) => (
                            <a key={id} className='sidebar-link' id={`genre-${id}`} href={`/movielist?genre=${id}&lang=${lang}`} onClick={changeGenre} >
                                {name}
                            </a>
                        ))}
                    </div>
                    <div className='sidebar-list lang'>
                        <p className='title'>Language</p>
                        {Object.entries(Languages).map(([id, name]) => (
                            <a key={id} className='sidebar-link' id={`lang-${id}`} href={`/movielist?${genre !== '' ? `&genre=${genre} ` : ''}&lang=${id}`} onClick={changeLanguage} >
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
                <div className='sidebar-footer'>
                    <p className='copyright'>
                        Copyright 2024&nbsp;
                        <a aria-label='copyright-owner' className='link' href='https://www.facebook.com/justine.agcanas.7' target='_blank'>Justine Agcanas</a>
                    </p>
                    <img style={{ height: '17px', width: '130px' }} alt='tmdb logo' src={Tmdb} />
                </div>
            </div>
        </aside>
    )
}

export default SideBar;