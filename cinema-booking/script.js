// DOM elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.rows .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Global variables
let ticketPrice = +movieSelect.value;

// Get data from LS and write to DOM
const populateUI = () => {
  const selectedSeats = JSON.parse(
    localStorage.getItem('selectedSeats')
  );

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem(
    'selectedMovieIndex'
  );

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const selectedMoviePrice = localStorage.getItem(
    'selectedMoviePrice'
  );
};

populateUI();

// Update total price and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(
    '.rows .seat.selected'
  );

  const seatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Set movie price and name to localstorage
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Event listeners
// Movie select handler
movieSelect.addEventListener('change', event => {
  ticketPrice = event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

// Seat click handler
container.addEventListener('click', event => {
  if (
    event.target.classList.contains('seat') &&
    !event.target.classList.contains('occupied')
  ) {
    event.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// Initial ui population
updateSelectedCount();
