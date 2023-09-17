const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', performSearch);

function performSearch() {
  const searchInput = document.querySelector('#searchInput');
  const searchQuery = searchInput.value;

  $.ajax({
    url: `https://imdb8.p.rapidapi.com/auto-complete?q=${searchQuery}`,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'use_your_API_key',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
    },
    dataType: 'json',
  })
    .done(data => {
      const list = data.d;
      const moviesElement = document.querySelector('.movies');
      moviesElement.innerHTML = '';

      list.forEach((item) => {
        const name = item.l;
        const cast = item.s;
        const rank = item.rank;
        const year = item.y;

        const movie = document.createElement('li');

        const img = document.createElement('img');
        img.src = item.i?.imageUrl || 'images/placeholder.png';
        //const poster = item.i.imageUrl;

        movie.appendChild(img);

        const h2Name = document.createElement('h2');
        h2Name.textContent = name;
        movie.appendChild(h2Name);

        const h2Cast = document.createElement('h2');
        h2Cast.textContent = cast;
        movie.appendChild(h2Cast);

        const h2Rank = document.createElement('h2');
        h2Rank.textContent = rank;
        movie.appendChild(h2Rank);

        const h2Year = document.createElement('h2');
        h2Year.textContent = year;
        movie.appendChild(h2Year);

        moviesElement.appendChild(movie);
      });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      console.error(textStatus, errorThrown);
    });
}
