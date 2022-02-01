const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Current Card State
let currentActiveCard = 0;

// DOM Cards
const cardsEl = [];

// Card Data
const cardsData = getCardsData();

// Get Cards Data From Local Storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add Cards To Local Storage
function setCardsData(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

// Create All Cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create A Single Card In DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  // Add Active Class To The First Card
  index === 0 && card.classList.add('active');

  card.innerHTML = `
      <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
      </div>
`;

  card.addEventListener('click', () =>
    card.classList.toggle('show-answer')
  );

  // Add Card To DOM
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Update Current Text In The Navigation
function updateCurrentText() {
  currentEl.innerText = `
  ${currentActiveCard + 1} / ${cardsEl.length}
  `;
}

// Append Cards to DOM
createCards();

// Event Listeners

// Next Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1)
    currentActiveCard = cardsEl.length - 1;

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Previous Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard -= 1;

  if (currentActiveCard < 0) currentActiveCard = 0;

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show Add Container
showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

// Hide Add Container
hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

// Add New Card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value.toString().trim();
  const answer = answerEl.value.toString().trim();

  if (!question && !answer)
    return alert('Please Enter Correct Values');

  // Create New Card
  const newCard = {
    question,
    answer,
  };

  createCard(newCard);

  // Reset Values
  questionEl.value = '';
  answerEl.value = '';

  // Hide Add Container
  addContainer.classList.remove('show');

  // Add Dara To DOM And Local Storage
  cardsData.push(newCard);
  setCardsData(cardsData);
});

// Clear Cards Data
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
