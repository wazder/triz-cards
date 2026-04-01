let currentIndex = 0;
const wrappers = document.querySelectorAll('.card-wrapper');
const totalCards = wrappers.length;
const tabBtns = document.querySelectorAll('.tab-btn');

function updateTabs() {
  tabBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === currentIndex);
  });
}

function goToCard(index) {
  if (index < 0 || index >= totalCards || index === currentIndex) return;

  const currentCard = document.getElementById(`card-${currentIndex}`);
  if (currentCard) currentCard.classList.remove('flipped');

  wrappers[currentIndex].classList.remove('active');
  currentIndex = index;
  wrappers[currentIndex].classList.add('active');

  updateTabs();
}

function nextCard() {
  goToCard((currentIndex + 1) % totalCards);
}

function prevCard() {
  goToCard((currentIndex - 1 + totalCards) % totalCards);
}

function flipCard(index) {
  const card = document.getElementById(`card-${index}`);
  card.classList.toggle('flipped');
}

// Klavye navigasyonu
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevCard();
  if (e.key === 'ArrowRight') nextCard();
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    flipCard(currentIndex);
  }
});

// Dokunmatik kaydırma
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) nextCard();
    else prevCard();
  }
}, { passive: true });
