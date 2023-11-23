const url = 'https://moviestack.onrender.com/api/movies'
const { createApp } = Vue
const requisitoFetch = { headers: { "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" } }
const options = {
    data() {
        return {
            movies: [],
            genres: [],
            selected: "all",
            search: "",
            moviesFiltradas: [],
            favs: [],
            favoritas: [],
            favsfiltradas: [],
        }
    },
    created() {
        fetch(url, requisitoFetch)
            .then(res => res.json())
            .then(data => {
                this.movies = data.movies
                this.moviesFiltradas = this.movies
                this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
                this.favoritas = JSON.parse(localStorage.getItem("favs"))
                this.favsfiltradas = this.movies.filter(movie => this.favoritas.some(favorita => favorita.id === movie.id))
            })
            .catch(err => console.log(err))
    },
    methods: {
        fav1(movie) {
            let favorites = JSON.parse(localStorage.getItem('favs')) || []
            let moviesFav = favorites.some(favorite => favorite.id === movie.id)
            if (moviesFav) {
                favorites = favorites.filter(favorite => favorite.id !== movie.id)
            }
            localStorage.setItem("favs", JSON.stringify(favorites))
            this.favorites = JSON.parse(localStorage.getItem("favs"))
            this.favsfilter = this.movies.filter(movie => this.favorites.some(favorite => favorite.id === movie.id))

        }

    }
}
const app = createApp(options)
app.mount("#app")