import React, { useState } from 'react';
import '@fontsource/dm-sans';
import 'bootstrap/dist/css/bootstrap.css';
import Article from '../components/Article';
import Header from '../components/Header';
import SearchModal from '../components/SearchModal';
import SideBar from '../components/SideBar';
import '../index.css';

const Home = () => {
    const [searchedData, setSearchedData] = useState([]);

    return (
        <>
            <div className='Home position-relative'>
                <Header setSearchedData={setSearchedData} />
            </div>
            <div className='d-flex'>
                <SideBar />
                <div menu-toggler='true' overlay='true' className='overlay'></div>
                <Article />
            </div>
            <main id='search-modal' className='search-container'>
                <SearchModal data={searchedData} />
            </main>
        </>
    )
}

export default Home;