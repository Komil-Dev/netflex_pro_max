const API_KEY = "86783762237ff3e97be67f3473685c59";
const BASE_PATH = "https://api.themoviedb.org/3";

// const moviesList = document.getElementById('movies-list');
// const movieDetailsContainer = document.getElementById('movie-details');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchContainer = document.getElementById('searchContainer'); // Add this line

const getTrendingMovies = async () => {
    try {
        const response = await fetch(`${BASE_PATH}/trending/movie/day?api_key=${API_KEY}`);
        const { results: movies } = await response.json();

        moviesList.innerHTML = ''; // Clear existing movies

        movies.forEach((movie) => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;

            // Add click event listener to the movie image
            img.addEventListener('click', () => {
                // Show movie details when clicked
                showMovieDetails(movie);
            });

            movieDiv.appendChild(img);
            moviesList.appendChild(movieDiv);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const showMovieDetails = (movie) => {
    // Show movie details container
    movieDetailsContainer.style.display = 'block';

    // Populate movie details
    const title = document.querySelector('#movie-details h1');
    title.textContent = movie.title;

    const image = document.querySelector('#movie-details img');
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
};

const searchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${query}`);
        const { results: movies } = await response.json();
        displayMovies(movies);
        // Toggle the visibility of the search container
        searchContainer.style.display = movies.length > 0 ? 'block' : 'none'; // Add this line
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayMovies = (movies) => {
    searchResults.innerHTML = ''; // Clear existing movies

    movies.forEach((movie) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        const title = document.createElement('p');
        title.textContent = movie.title;

        movieDiv.appendChild(img);
        movieDiv.appendChild(title);
        searchResults.appendChild(movieDiv);
    });
};

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        searchResults.innerHTML = '';
        // Hide the search container when input is empty
        searchContainer.style.display = 'none'; // Add this line
    } else {
        searchMovies(query);
    }
});

getTrendingMovies();




let toggles = document.querySelectorAll(".faq-toggle");

toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
        toggle.parentNode.classList.toggle("active");
    });
});