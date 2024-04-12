import createBanner from "./banner.js";
import { pushMovie } from "./swiper.js";
import { getMovies, getTrending, getUpcoming } from "./utilis.js";

const titles = {
    0: "Top Rated Movies",
    1: "popular movies",
    4: "Top Rated Tv Shows",
    5: "Popular Tv Shows",
};

getTrending("all").then(({ results }) => pushMovie(results, 5, null, titles[5]));

getMovies().then((res) => {
    const [movies, tv] = res;
    const all = [...movies, ...tv];

    createBanner({ ...movies[0].results[5], type: "movie" });

    all.forEach(({ results }, i) => {
        const type = i < 2 ? types[0] : types[1];
        pushMovie(results, i, type, titles[i]);
    });
});

getUpcoming().then(({ results }) => pushMovie(results, 4, "movie", titles[4]));




