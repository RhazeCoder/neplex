import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BlinkBlur } from 'react-loading-indicators';
import '../index.css';

import Banner from '../func/Banner';
import Languages from '../languages.json';
import GenresFunc from '../func/GenresFunc';
import Popular from '../func/Popular';
import Slider from '../func/Slider';
import Genres from '../genres.json';

const Article = () => {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [genreData, setGenreData] = useState([]);
    const [popularData, setPopularData] = useState([]);
    const [topRatedData, setTopRatedData] = useState([]);
    const [upcomingData, setUpcomingData] = useState([]);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [genrePage, setGenrePage] = useState(1);
    const [genreId, setGenreId] = useState(0);
    const [langId, setLangId] = useState(0);
    let isFirstRender = true;

    useEffect(() => {
        const genre = new URLSearchParams(window.location.search).get('genre') || 0;
        const lang = new URLSearchParams(window.location.search).get('lang') || 0;
        setGenreId(genre);
        setLangId(lang);    
    }, []);

    useEffect(() => {
        if (genreId !== 0 || langId !== 0) {
            fetchGenreData(1);
        }
    }, [genreId, langId]);

    useEffect(() => {
        if (isFirstRender) {
            isFirstRender = false;
            fetchAllData();
        }
    }, [isFirstRender]);

    const getGenreName = (id) => {
        return Genres[id] || "Unknown";
    };

    const getLanguageName = (id) => {
        return Languages[id] || "Unknown";
    };

    const fetchAllData = async () => {
        try {
            const [popularRes, topRatedRes, upcomingRes] = await Promise.all([
                axios.get('/api/popular'),
                axios.get('/api/top-rated'),
                axios.get('/api/upcoming')
            ]);

            setPopularData(mapMovieData(popularRes.data.results));
            setTopRatedData(mapMovieData(topRatedRes.data.results));
            setUpcomingData(mapMovieData(upcomingRes.data.results));
            setPageLoaded(true);
        } catch (err) {
            console.log(err.message);
        }
    };

    const fetchGenreData = async (page) => {
        try {
            const response = await axios.get(`/api/genre?id=${genreId}&lang=${langId}&page=${page}`);
            setGenreData([...genreData, ...mapMovieData(response.data.results)]);
            if (response.data.total_pages == page) {
                let loadMoreContainer = document.getElementById('load');
                loadMoreContainer.style.display = 'none';
            }   
        } catch (err) {
            console.log(err.message);
        }
    };

    const mapMovieData = (data) => {
        return data.map(movie => ({
            imgSrc: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            altText: movie.title,
            title: movie.title,
            year: new Date(movie.release_date).getFullYear().toString(),
            rating: movie.vote_average,
            genres: movie.genre_ids.map(id => getGenreName(id)),
            description: movie.overview,
            detailsUrl: `/details?id=${movie.id}`,
            controlImgSrc: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
    };

    const changeFeatured = (index) => {
        setFeaturedIndex(index);
    };

    return (
        <Router>
            <article id='router' className='containers'>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            !pageLoaded ? (
                                <div className="loading-container">
                                    <BlinkBlur color="hsla(349, 100%, 43%, 1)" />
                                </div>
                            ) : (
                                <>
                                    <section id='banner-slider' aria-label='popular movies' className='banner'>
                                        <div className='banner-slider'>
                                            <Banner data={popularData} featuredIndex={featuredIndex} />
                                        </div>
                                        <div className='slider-control'>
                                            <div className='control-inner'>
                                                <Slider data={popularData} changeFeatured={changeFeatured} featuredIndex={featuredIndex} />
                                            </div>
                                        </div>
                                    </section>
                                    <section id='movie-list' aria-label='popular movies' className='movie-list'>
                                        <div className='movie-list'>
                                            <div className='title-wrapper'>
                                                <h3 className='title-large'>Popular Movies</h3>
                                            </div>
                                            <div className='slider-list'>
                                                <div className='slider-inner'>
                                                    <Popular data={popularData} />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section id='movie-list' aria-label='top rated movies' className='movie-list'>
                                        <div className='movie-list'>
                                            <div className='title-wrapper'>
                                                <h3 className='title-large'>Top Rated Movies</h3>
                                            </div>
                                            <div className='slider-list'>
                                                <div className='slider-inner'>
                                                    <Popular data={topRatedData} />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section id='movie-list' aria-label='upcoming movies' className='movie-list'>
                                        <div className='movie-list'>
                                            <div className='title-wrapper'>
                                                <h3 className='title-large'>Upcoming Movies</h3>
                                            </div>
                                            <div className='slider-list'>
                                                <div className='slider-inner'>
                                                    <Popular data={upcomingData} />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </>
                            )
                        }
                    />
                    <Route
                        path='/movielist'
                        element={
                            <section id='movie-list' aria-label='genres'>
                                <section className='movie-list genre-list' aria-label={`${getGenreName(genreId)} Movies`}>
                                    <div className='title-wrapper'>
                                        <h2 className='heading'>{`${getLanguageName(langId)} ${getGenreName(genreId) === 'Unknown' ? 'Movies' : getGenreName(genreId)}`}</h2>
                                    </div>
                                    <div className='grid-list'>
                                        <GenresFunc data={genreData} />
                                    </div>
                                    <div className='load' id='load'>
                                        <button className='load-more' onClick={() => {
                                            setGenrePage(genrePage + 1);
                                            fetchGenreData(genrePage + 1);                                            
                                        }}>
                                            Load More
                                        </button>
                                    </div>
                                </section>
                            </section>
                        }
                    />
                </Routes>
            </article>
        </Router>
    );
};

export default Article;