//DOM Render Functions
function renderOneMovie(movie){
    //Build Website Poster
    const remTickets = movie.capacity - movie.tickets_sold
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = 
`
<div class="container">
    <p> ${movie.id}</p>
<div class="pics">
      <img src="${movie.poster}">
  </div <div class="movie-title">
  <h4> ${movie.title}</h4>
  <p class="movie-description">
      ${movie.description}
  </p>
  <p>Show Time: ${movie.showtime}</p>
  <p class="runtime">Runtime: ${movie.runtime} minutes</p>
   <p>Available Tickets: 
      <span class="Tickets">${remTickets}</span>
    <p>
    <button id="purchase_ticket">Purchase Ticket</span>
    </button>
</div>
</div>    
    `
    card.querySelector('#purchase_ticket').addEventListener('click', () => {
        if (movie.tickets_sold < movie.capacity) {
            movie.tickets_sold += 1;

        if(movie.tickets_sold === movie.capacity){
            alert("Tickets are Sold Out!")
        }

        updateTicketsSold(movie);
    }else{
        alert("Tickets are Sold Out!")
    }
    });
//add Movie card to DOM
document.querySelector('#films').appendChild(card)  
}

//Fetch Requests
//Fetching all Animals
function getAllMovies(){
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(films => films.forEach(movie => renderOneMovie(movie)))
     
}

 function updateTicketsSold(movieObj){
     fetch(`http://localhost:3000/films/${movieObj.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieObj)
    })
    .then(res => res.json())
    .then(movie => console.log(movie))
}


//Initial Render
//Gate Data and Render our Animals to the DOM
function initialize(){
    getAllMovies()
    // animalData.forEach(animal => renderOneAnimal(animal))
}
initialize()

