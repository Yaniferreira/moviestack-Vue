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
        }
    },
    created() {
        fetch(url, requisitoFetch)
            .then(res => res.json())
            .then(data => {
                this.movies = data.movies
                this.moviesFiltradas = this.movies
                this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]

            })
            .catch(err => console.log(err))
    },
    methods: {
        searchs(event) {
            this.search = event.target.value
            this.filtrar()
        },
        select(event) {
            this.selected = event.target.value
            this.filtrar()
        },
        filtrar() {
            this.moviesFiltradas = this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase()) && (this.selected === "all" || movie.genres.includes(this.selected)));
        },
        fav(movie) {
            let favorites = JSON.parse(localStorage.getItem('favs')) || []
            const moviesFav = favorites.some(favorite => favorite.id === movie.id)

            if (!moviesFav) {
                favorites.push({ id: movie.id })

            } else {
                if (moviesFav) {
                    favorites = favorites, filter(favorite => favorite.id !== movie.id)
                }
            }
            localStorage.setItem('favs', JSON.stringify(favorites))


        },
    }
}
const app = createApp(options)
app.mount("#app")