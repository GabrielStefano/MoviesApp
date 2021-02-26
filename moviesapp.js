const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='
// const IMGPATH = 'https://image.tmdb.org/t/p/original' original size

const main = document.querySelector('main')
const form = document.querySelector('form')
const search = document.querySelector('#search')

getMovies(APIURL)

async function getMovies(url){
    const resp = await fetch(url)
    const respData = await resp.json()

    showMovies(respData)
    // respData.results.forEach(movie => {
    //     const img = document.createElement('img')
    //     img.src = IMGPATH + movie.poster_path

    //     document.body.appendChild(img)
    // });

}

function showMovies(respData){
    main.innerHTML = ''
    respData.results.forEach(movie => {
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMGPATH+movie.poster_path}" alt="${movie.title}">
        <div class="movie-info">
            <h3>${movie.original_title}</h3>
            <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average.toFixed(1)}</span>
        </div>
        <div class='overview'>
            <h4>Overview:</h4>
            ${movie.overview}
        </div>
        `
        
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote){
    if (vote>=8){
        return 'green';
    }
    else if(vote>=5){
        return 'orange'
    }
    else{
        return 'red'
    }
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchTerm = search.value
    if (searchTerm){
        search.value=''
    }
    searchMovie(searchTerm)
 
    // respData.results.forEach(movie => {
    //     const movieEl = document.createElement('div')
    //     movieEl.classList.add('movie')
    //     movieEl.innerHTML = `
    //     <img src="${IMGPATH+movie.poster_path}" alt="${movie.title}">
    //     <div class="movie-info">
    //         <h3>${movie.original_title}</h3>
    //         <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average.toFixed(1)}</span>
    //     </div>
    //     `
        
    //     main.appendChild(movieEl)
    // });
});

async function searchMovie(searchTerm){
    // const resp = await fetch(`${SEARCHAPI+searchTerm}`)
    // const respData = await resp.json()
    getMovies(`${SEARCHAPI+searchTerm}`)
    

}