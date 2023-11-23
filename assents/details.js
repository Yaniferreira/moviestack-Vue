const url = "https://moviestack.onrender.com/api/movies/"
const requisitoFetch = { headers: { "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" } }
const { createApp } = Vue
const options = {
    data() {
        return {
            id: null,
            movie: [],
        }

    },
    Created() {
        const search = location.search
        const params = new URLSearchParams(search)
        this.id = params.get("id")
        fetch(url + this.id, requisitoFetch)
            .then(res => res.json())
            .then(data => {
                this.movie = data
            })
            .catch(error => console.log(error))

    },
    computed: {
        formatDate() {
            const order = { day: 'numeric', month: 'long', year: 'numeric' }
            const release = new Date(this.movie.release_date)
            return release.toLocaleDateString("es-ES", order)
        },
        formatRevenue() {
            return this.dotsNumbers(this.movie.revenue)
        },
        formatBudget() {
            return this.dotsNumbers(this.movie.budget)
        },
        formatVoteAverage() {
            return (this.movie.vote_average * 10).toFixed(1)
        }
    },
    methods: {
        dotsNumbers(number) {
            if (number !== undefined && number !== null) {
                return number.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractingDigits: 0,
                })
            }
        }
    },
}
const app = createApp(options)
app.mount('#app')