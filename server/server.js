import axios from 'axios';
import cors from 'cors';
import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Listening on port:", port);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/api/popular', async (req, res) => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.TMDB_ACCESS_KEY}`
        }
    });

    try {
        res.json(response.data);
    } catch (error) {
        console.error(error.message.message);
    }
});

app.get('/api/top-rated', async (req, res) => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.TMDB_ACCESS_KEY}`
        }
    });

    try {
        res.json(response.data);
    } catch (error) {
        console.error(error.message.message);
    }
});

app.get('/api/upcoming', async (req, res) => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.TMDB_ACCESS_KEY}`
        }
    });

    try {
        res.json(response.data);
    } catch (error) {
        console.error(error.message.message);
    }
});

app.get('/api/search', async (req, res) => {
    const { title, page } = req.query;
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${title}&page=${page}&include_adult=false&sort_by=popularity.desc`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.TMDB_ACCESS_KEY}`
        }
    });

    try {
        res.json(response.data);
    } catch (error) {
        console.error(error.message.message);
    }
});

app.get('/api/genre', async (req, res) => {
    const { id, lang, page } = req.query;
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?${id != 0 ? `with_genres=${id}&` : ''}with_original_language=${lang}&page=${page}&sort_by=popularity.desc`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.TMDB_ACCESS_KEY}`
        }
    });

    try {
        res.json(response.data);
    } catch (error) {
        console.error(error.message.message);
    }
});