import { useEffect, useState } from "react";

import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';


// c46c4276 || API key

const API_URL = 'http://www.omdbapi.com?apikey=c46c4276'; // added apikey from omdbapi.com/apikey.aspx

const movie1 = { // copy from inspected console "Array"
    "Title": "Kenshi Ironman: The Thunderdome",
    "Year": "2018",
    "imdbID": "tt11459796",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {
    const [movies, setMovies] = useState([]); // component 1
    const [searchTerm, setSearchTerm] = useState(''); // component 2

    const searchMovies = async (title) => { // create the new function to fetch the movies
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json(); // get the data const

        // console.log(data.Search);
        setMovies(data.Search);
        
    }
    
    useEffect(()=>{
        searchMovies('Ironman'); 
    }, []);

    return(
        <div className="app">
            <h1> MovieLand </h1>

            <div className="search">
                <input
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // e talking about event
                />

                <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                    {movies.map((movie) => ( // this says movie1 was stand for movie
                        <MovieCard  movie={movie}/> // Or
                        // <MovieCard key={movie.imdbID} movie={movie}/>
                    ))}
                </div>
                ): (
                    <div className="empty">
                        <h2>No movies found</h2>
                    
                    </div>

                )

            }           

        </div>
    );
}


export default App;