import React, { useRef, useState } from 'react';
import axios from 'axios';

import CloseIcon from '../images/close.webp';
import Logo from '../images/logo.png';
import MenuIcon from '../images/menu.webp';
import MenuCloseIcon from '../images/menu-close.webp';
import SearchIcon from '../images/search.webp';
import Genres from '../genres.json';
import '../index.css';

const Header = ({ setSearchedData }) => {
    const debounceTimeout = useRef(null);
    const [activeSideBar, setActiveSideBar] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const getGenreName = (id) => {
        return Genres[id] || "Unknown";
    };

    const showSearchBox = () => {
        const searchBox = document.querySelector('.search-box');
        searchBox.classList.toggle('active');
    }

    const showSideBar = () => {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.overlay');
        const menuImg = document.querySelector('.menu');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        if (activeSideBar) {
            setActiveSideBar(false);
            menuImg.src = MenuIcon;
        } else {
            setActiveSideBar(true);
            menuImg.src = MenuCloseIcon;
        }
    }

    const fetchSearch = async (title, page) => {
        axios.get(`/api/search?title=${title}&page=${page}`)
            .then((res) => {
                let data = res.data.results;
                setSearchedData(data.map(movie => ({
                    imgSrc: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                    altText: movie.title,
                    title: movie.title,
                    year: new Date(movie.release_date).getFullYear().toString(),
                    rating: movie.vote_average,
                    genres: movie.genre_ids.map(id => getGenreName(id)),
                    description: movie.overview,
                    detailsUrl: `/details?id=${movie.id}`,
                    controlImgSrc: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                })));
            })
            .catch((err) => {
                console.log(err.message);
                setSearchedData([]);
            });
    }

    const searchMovie = async (e) => {
        e.preventDefault();
        const loading = document.querySelector('.search-wrapper');
        loading.classList.add('searching');
        const value = e.target.value;
        setSearchValue(value);

        clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(async () => {
            try {
                await fetchSearch(value, 1);
                loading.classList.remove('searching');
            } catch (error) {
                console.error(error.message);
            }
        }, 2000);
    };

    return (
        <header className='Headers position-sticky top-0 w-100'>
            <nav className='navbar-black px-3 py-4'>
                <div className='navbar'>
                    <a id='logo' className='logo' href='/' aria-label='logo link'>
                        <img src={Logo} className='logo' alt='logo' style={{ width: '130px', height: '40px' }} />
                    </a>
                    <div search-box='true' className='search-box'>
                        <div search-wrapper='true' className='search-wrapper'>
                            <input search-field='true' autoComplete='off' className='search-field' placeholder='Search for movies...' aria-label='search movie' name='search' onChange={searchMovie} />
                            <img className='leading-icon' alt='search-icon' style={{ width: '24px', height: '24px' }} src={SearchIcon}></img>
                        </div>
                        <button search-toggler='true' className='search-btn' onClick={showSearchBox}>
                            <img alt='close search box' style={{ width: '24px', height: '24px' }} src={CloseIcon}></img>
                        </button>
                    </div>
                    <button menu-close='true' search-toggler='true' className='search-btn' onClick={showSearchBox}>
                        <img alt='open search box' style={{ width: '24px', height: '24px' }} src={SearchIcon}></img>
                    </button>
                    <button menu-toggler='true' menu-btn='true' className='menu-btn' onClick={showSideBar}>
                        <img className='menu' alt='open menu' style={{ width: '24px', height: '24px' }} src={MenuIcon}></img>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header;