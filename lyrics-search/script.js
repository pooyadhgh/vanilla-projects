const form = document.getElementById('form');
const results = document.getElementById('results');
const search = document.getElementById('search');
const more = document.getElementById('more');

const APIURL = 'https://api.lyrics.ovh/';

// Search Handler
async function searchSongs(searchTerm) {
  let data;

  try {
    const res = await fetch(`${APIURL}/suggest/${searchTerm}`);
    data = await res.json();
  } catch (error) {
    alert(error.message);
  }

  showData(data);
}

// Show Data Into the DOM
function showData(data) {
  results.innerHTML = `
  <ul class='songs'>
    ${data.data
      .map(
        song => `
    <li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class='btn' data-artist='${song.artist.name}' data-songtitle='${song.title}'>Get Lyrics</button>
    </li>
    `
      )
      .join('')}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class='btn' onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ''
    }
    ${
      data.next
        ? `<button class='btn' onclick="getMoreSongs('${data.next}')">Next</button>`
        : ''
    }
    `;
  } else {
    more.innerHTML = '';
  }
}

// Get prev/next Results
async function getMoreSongs(url) {
  let data;

  try {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/${url}`
    );
    data = await res.json();
  } catch (error) {
    alert(error.message);
  }

  showData(data);
}

// Get Lyrics By Artist and Song
async function getLyrics(artist, songTitle) {
  let data;

  try {
    const res = await fetch(`${APIURL}/v1/${artist}/${songTitle}`);
    data = await res.json();
  } catch (error) {
    alert(error.message);
  }

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  results.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

  more.innerHTML = '';
}

// Event Listeners
form.addEventListener('submit', event => {
  event.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) return alert('Please type a search term');

  searchSongs(searchTerm);
});

results.addEventListener('click', event => {
  const clickedEl = event.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});
