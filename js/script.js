// ---------- Navegación tipo SPA ----------
const views = document.querySelectorAll('.view');
const VALID_VIEWS = ['profiles','home','aniversarios','cumpleanos','reconocimientos','dinamica'];

function goTo(name){
  views.forEach(v => v.hidden = v.id !== `view-${name}`);
  document.body.classList.toggle('on-landing', name === 'profiles');
  document.getElementById('profileDropdown').hidden = true;
  window.scrollTo({top:0, behavior:'instant'});
  history.replaceState(null, '', `#${name}`);
}

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-nav]');
  if(!trigger) return;
  e.preventDefault();
  goTo(trigger.dataset.nav);
});

window.addEventListener('DOMContentLoaded', () => {
  const initial = location.hash.replace('#','') || 'profiles';
  goTo(VALID_VIEWS.includes(initial) ? initial : 'profiles');
});

// ---------- Menú de perfil (arriba a la izquierda) ----------
const profileBtn = document.getElementById('profileBtn');
const profileBtnImg = document.getElementById('profileBtnImg');
const profileDropdown = document.getElementById('profileDropdown');

profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown.hidden = !profileDropdown.hidden;
});

document.addEventListener('click', () => {
  profileDropdown.hidden = true;
});

document.querySelectorAll('.profile-card:not(.profile-card--add)').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('.profile-avatar img');
    if(img){
      profileBtnImg.src = img.src;
      profileBtnImg.alt = img.alt;
    }
  });
});

// ---------- Confetti ----------
function spawnConfetti(containerId, count, colors){
  const el = document.getElementById(containerId);
  if(!el) return;
  for(let i = 0; i < count; i++){
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
    piece.style.animationDelay = (Math.random() * -5) + 's';
    el.appendChild(piece);
  }
}

spawnConfetti('anniversaryConfetti', 24, ['#f6d488', '#e0a83f', '#4fc3ff', '#1ea0e8']);
spawnConfetti('birthdayConfetti', 34, ['#4fc3ff', '#1ea0e8', '#f6d488', '#ffb3d9']);

// ---------- Datos de películas ----------
const peliculas = [
  { img:'assets/posters/toy-story.jpg', titulo:'Toy Story', sub:'1995 · Animación' },
  { img:'assets/posters/godfather.jpg', titulo:'El Padrino', sub:'1972 · Drama' },
  { img:'assets/posters/jurassic-park.jpg', titulo:'Jurassic Park', sub:'1993 · Aventura' },
  { img:'assets/posters/titanic.png', titulo:'Titanic', sub:'1997 · Romance' },
  { img:'assets/posters/lion-king.jpg', titulo:'El Rey León', sub:'1994 · Animación' },
  { img:'assets/posters/avengers-endgame.jpg', titulo:'Avengers: Endgame', sub:'2019 · Acción' },
  { img:'assets/posters/la-la-land.png', titulo:'La La Land', sub:'2016 · Musical' },
  { img:'assets/posters/spiderman-nwh.jpg', titulo:'Spider-Man: No Way Home', sub:'2021 · Acción' },
  { img:'assets/posters/coco.jpg', titulo:'Coco', sub:'2017 · Animación' },
  { img:'assets/posters/interstellar.jpg', titulo:'Interstellar', sub:'2014 · Ciencia ficción' }
];

const peliculas2 = [
  { img:'assets/posters/frozen.jpg', titulo:'Frozen', sub:'2013 · Animación' },
  { img:'assets/posters/finding-nemo.jpg', titulo:'Buscando a Nemo', sub:'2003 · Animación' },
  { img:'assets/posters/dark-knight.jpg', titulo:'The Dark Knight', sub:'2008 · Acción' },
  { img:'assets/posters/forrest-gump.jpg', titulo:'Forrest Gump', sub:'1994 · Drama' },
  { img:'assets/posters/back-to-the-future.jpg', titulo:'Volver al Futuro', sub:'1985 · Aventura' },
  { img:'assets/posters/shrek.jpg', titulo:'Shrek', sub:'2001 · Animación' },
  { img:'assets/posters/up.jpg', titulo:'Up', sub:'2009 · Animación' },
  { img:'assets/posters/inside-out.jpg', titulo:'Intensa-Mente', sub:'2015 · Animación' },
  { img:'assets/posters/matrix.png', titulo:'The Matrix', sub:'1999 · Ciencia ficción' },
  { img:'assets/posters/moana.jpg', titulo:'Moana', sub:'2016 · Animación' }
];

// ---------- Datos de series (pósters reales) ----------
const series = [
  { img:'assets/series/squid-game.png', titulo:'El Juego del Calamar', sub:'2021 · Thriller' },
  { img:'assets/series/stranger-things.jpg', titulo:'Stranger Things', sub:'2016 · Ciencia ficción' },
  { img:'assets/series/got.jpg', titulo:'Game of Thrones', sub:'2011 · Fantasía' },
  { img:'assets/series/breaking-bad.jpg', titulo:'Breaking Bad', sub:'2008 · Drama' },
  { img:'assets/series/friends.jpg', titulo:'Friends', sub:'1994 · Comedia' },
  { img:'assets/series/the-office.jpg', titulo:'The Office', sub:'2005 · Comedia' },
  { img:'assets/series/simpsons.jpg', titulo:'Los Simpson', sub:'1989 · Animación' },
  { img:'assets/series/walking-dead.jpg', titulo:'The Walking Dead', sub:'2010 · Terror' },
  { img:'assets/series/mandalorian.jpg', titulo:'The Mandalorian', sub:'2019 · Ciencia ficción' },
  { img:'assets/series/chernobyl.jpg', titulo:'Chernobyl', sub:'2019 · Drama' }
];

function posterCardImage({img, titulo, sub}){
  const el = document.createElement('div');
  el.className = 'poster poster--img';
  el.innerHTML = `
    <img src="${img}" alt="${titulo}">
    <div class="poster-info">
      <div class="poster-title">${titulo}</div>
      <div class="poster-sub">${sub}</div>
    </div>
  `;
  return el;
}

function fillRow(selector, items, builder){
  const track = document.querySelector(`[data-row="${selector}"] .row-track`);
  if(!track) return;
  items.forEach(item => track.appendChild(builder(item)));
}

fillRow('peliculas', peliculas.concat(peliculas2), posterCardImage);
fillRow('series', series, posterCardImage);

// ---------- Fondo de pósters en movimiento (Dinámica) ----------
(function buildPosterBg(){
  const bg = document.getElementById('posterBg');
  if(!bg) return;
  const allPosters = peliculas.concat(peliculas2).map(p => p.img);
  const numCols = 6;
  for(let c = 0; c < numCols; c++){
    const col = document.createElement('div');
    col.className = 'poster-bg-col' + (c % 2 === 1 ? ' poster-bg-col--down' : '');
    col.style.animationDuration = (55 + c * 8) + 's';
    // desfase por columna para que no queden alineadas
    const shifted = allPosters.slice(c * 3).concat(allPosters.slice(0, c * 3));
    // duplicamos para un loop continuo (translateY -50%)
    shifted.concat(shifted).forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.loading = 'lazy';
      img.alt = '';
      col.appendChild(img);
    });
    bg.appendChild(col);
  }
})();

// ---------- Juego de emojis (Dinámica) ----------
const emojiGame = [
  { emojis:'🦁👑', tipo:'Película', respuestas:['el rey leon', 'the lion king'] },
  { emojis:'🚢🧊❤️', tipo:'Película', respuestas:['titanic'] },
  { emojis:'🤠🚀🧸', tipo:'Película', respuestas:['toy story'] },
  { emojis:'🦕🏝️🦖', tipo:'Película', respuestas:['jurassic park', 'parque jurasico'] },
  { emojis:'⚡🧙‍♂️🧹🍷', tipo:'Película', respuestas:['harry potter'] },
  { emojis:'🐠🔍🌊', tipo:'Película', respuestas:['buscando a nemo', 'finding nemo', 'nemo'] },
  { emojis:'👸❄️⛄', tipo:'Película', respuestas:['frozen'] },
  { emojis:'😄😡😢🤢😨', tipo:'Película', respuestas:['intensamente', 'inside out'] },
  { emojis:'💍🧙‍♂️⚔️', tipo:'Película', respuestas:['el senor de los anillos', 'lord of the rings'] },
  { emojis:'💀🎸👻', tipo:'Película', respuestas:['coco'] },

  { emojis:'🦑🎭🍬', tipo:'Serie', respuestas:['el juego del calamar', 'squid game'] },
  { emojis:'🏠💰🎭', tipo:'Serie', respuestas:['la casa de papel', 'money heist'] },
  { emojis:'🚲💡👹', tipo:'Serie', respuestas:['stranger things'] },
  { emojis:'👑🐉⚔️', tipo:'Serie', respuestas:['game of thrones', 'juego de tronos'] },
  { emojis:'🧪💙🕶️', tipo:'Serie', respuestas:['breaking bad'] },
  { emojis:'☕🛋️👫', tipo:'Serie', respuestas:['friends'] },
  { emojis:'🏢📎😂', tipo:'Serie', respuestas:['the office', 'la oficina'] },
  { emojis:'🍩💛👨‍👩‍👧‍👦', tipo:'Serie', respuestas:['los simpson', 'the simpsons'] },
  { emojis:'🧟🩸🔫', tipo:'Serie', respuestas:['the walking dead'] },

  { emojis:'🌪️👠🦁', tipo:'Película', respuestas:['el mago de oz', 'wizard of oz'] },
  { emojis:'🏴‍☠️⚔️🍺', tipo:'Película', respuestas:['piratas del caribe', 'pirates of the caribbean'] },
  { emojis:'👻🚫', tipo:'Película', respuestas:['ghostbusters', 'cazafantasmas'] },
  { emojis:'🚗⚡🕰️', tipo:'Película', respuestas:['volver al futuro', 'back to the future'] },
  { emojis:'🍍💛🧽', tipo:'Serie', respuestas:['bob esponja', 'spongebob'] },
  { emojis:'💊🔴💊🔵', tipo:'Película', respuestas:['the matrix', 'matrix'] },
  { emojis:'🚀🌌🌾', tipo:'Película', respuestas:['interestelar', 'interstellar'] },
  { emojis:'🦇🌃🃏', tipo:'Película', respuestas:['batman'] }
];

let gameOrder = [];
let gameIndex = 0;
let gameScore = 0;

const gameIntro = document.getElementById('gameIntro');
const gamePanel = document.getElementById('gamePanel');
const gameEnd = document.getElementById('gameEnd');
const gameProgressText = document.getElementById('gameProgressText');
const gameScoreText = document.getElementById('gameScoreText');
const gameHintBadge = document.getElementById('gameHintBadge');
const gameEmojis = document.getElementById('gameEmojis');
const gameInput = document.getElementById('gameInput');
const gameSubmit = document.getElementById('gameSubmit');
const gameSkip = document.getElementById('gameSkip');
const gameRestart = document.getElementById('gameRestart');
const gameToast = document.getElementById('gameToast');
const btnStartGame = document.getElementById('btnStartGame');
const btnReplay = document.getElementById('btnReplay');
const gameEndScore = document.getElementById('gameEndScore');

function normalizeAnswer(str){
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function shuffle(list){
  const copy = list.slice();
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startGame(){
  gameOrder = shuffle(emojiGame);
  gameIndex = 0;
  gameScore = 0;
  gameIntro.hidden = true;
  gameEnd.hidden = true;
  gamePanel.hidden = false;
  showQuestion();
}

function goToIntro(){
  gamePanel.hidden = true;
  gameEnd.hidden = true;
  gameIntro.hidden = false;
}

function showQuestion(){
  const item = gameOrder[gameIndex];
  gameProgressText.textContent = `Pregunta ${gameIndex + 1} de ${gameOrder.length}`;
  gameScoreText.textContent = `Aciertos: ${gameScore}`;
  gameHintBadge.textContent = item.tipo;
  gameHintBadge.className = 'game-hint-badge ' + (item.tipo === 'Serie' ? 'game-hint-badge--serie' : 'game-hint-badge--pelicula');
  gameEmojis.textContent = item.emojis;
  gameInput.value = '';
  gameInput.classList.remove('is-wrong', 'is-correct');
  gameInput.focus();
}

function checkAnswer(){
  const item = gameOrder[gameIndex];
  const userAnswer = normalizeAnswer(gameInput.value);
  if(!userAnswer) return;
  const correct = item.respuestas.some(r => normalizeAnswer(r) === userAnswer);
  if(correct){
    gameScore++;
    gameInput.classList.remove('is-wrong');
    gameInput.classList.add('is-correct');
    showToast();
    setTimeout(nextQuestion, 1100);
  } else {
    gameInput.classList.remove('is-correct');
    gameInput.classList.add('is-wrong');
  }
}

function showToast(){
  gameToast.classList.add('show');
  setTimeout(() => gameToast.classList.remove('show'), 1000);
}

function nextQuestion(){
  gameIndex++;
  if(gameIndex >= gameOrder.length){
    endGame();
  } else {
    showQuestion();
  }
}

function endGame(){
  gamePanel.hidden = true;
  gameEnd.hidden = false;
  gameEndScore.textContent = `Acertaste ${gameScore} de ${gameOrder.length} preguntas.`;
}

btnStartGame.addEventListener('click', startGame);
btnReplay.addEventListener('click', startGame);
gameRestart.addEventListener('click', goToIntro);
gameSubmit.addEventListener('click', checkAnswer);
gameSkip.addEventListener('click', nextQuestion);
gameInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    checkAnswer();
  }
});
gameInput.addEventListener('input', () => {
  gameInput.classList.remove('is-wrong');
});
