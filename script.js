const btnShow = document.getElementById('btnShow');
const btnClose = document.getElementById('btnClose');
const btnShowOrigin = document.getElementById('btnShowOrigin');
const modalOverlay = document.getElementById('modal_overlay');
const factContent = document.getElementById('fact');

const clickCountSpan = document.getElementById('click_count');
const seenCount = document.getElementById('seen_count');

let timerInterval;
let clicks = 0;
const seenFacts = new Set();
const facts = [
         `
         <p>Я слухаю цю пісню доки роблю цю лабораторну</p>
         <audio controls src ="audio/indian-jingle-bells.mp3"></audio>
         `,

         `
         <p>Якщо я б влаштувалася кухарем на день, то могла б купити 10 таких лаб в індійських фрілансерів</p>
         `,

         `
         <p>Мій вік прямо зараз: </p>
         <div id="age" style="font-weight: bold; color: #45a977"></div>
         `,
         `
         <div id="timer" style="font-weight: bold; color: #45a977"></div>
         Можу закрутити 10 піц за 40 хвилин
         <br>
         <div id="pizza"></div>
         `,
         `
         <p>Чіт: В лівому нижньому кутку є приховано кнопка. Щоб побачити ще непрочитаний факт натисніть на неї</p>`
];

function pizza() {
         const pizzaContainer = document.getElementById('pizza');
         const timerContainer = document.getElementById('timer');
         if (!pizzaContainer || !timerContainer) {
                  return;
         }
         pizzaContainer.innerHTML = '';
         timerContainer.textContent = '40';
         let timer = 40;
         let pizza_count = 0;
         timerInterval = setInterval(() => {
                  timer--;
                  timerContainer.textContent = timer;
                  if ((40 - timer) % 4 === 0 && pizza_count < 10) {
                           pizzaContainer.textContent += '🍕';
                           pizza_count++;
                  }
                  if (timer <= 0) {
                           clearInterval(timerInterval);
                  }
         }, 1000);
}



function age_timer() {
         const ageContainer = document.getElementById('age');
         if (!ageContainer) {
                  return;
         }

         const birthDate = new Date(2007, 4, 9, 1, 0, 0);
         const now = new Date();

         let years = now.getFullYear() - birthDate.getFullYear();
         let months = now.getMonth() - birthDate.getMonth();
         let days = now.getDate() - birthDate.getDate();
         let hours = now.getHours() - birthDate.getHours();
         let minutes = now.getMinutes() - birthDate.getMinutes();
         let seconds = now.getSeconds() - birthDate.getSeconds();

         if (seconds < 0) {
                  seconds += 60; minutes--;
         }
         if (minutes < 0) {
                  minutes += 60; hours--;
         }
         if (hours < 0) {
                  hours += 24; days--;
         }
         if (days < 0) {
                  const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                  days += prevMonth.getDate();
                  months--;
         }
         if (months < 0) {
                  months += 12; years--;
         }

         const hh = String(hours).padStart(2, '0');
         const mm = String(minutes).padStart(2, '0');
         const ss = String(seconds).padStart(2, '0');

         ageContainer.textContent = `${years} років, ${months} місяців, ${days} днів ${hh}:${mm}:${ss}`;
}

btnShow.addEventListener('click', function () {
         clicks++;
         clickCountSpan.textContent = clicks;

         const randomIndex = Math.floor(Math.random() * facts.length);
         factContent.innerHTML = facts[randomIndex];

         seenFacts.add(randomIndex);
         seenCount.textContent = seenFacts.size;

         modalOverlay.classList.remove('hidden');

         clearInterval(timerInterval);

         if (randomIndex === 2) {
                  age_timer();
                  timerInterval = setInterval(age_timer, 1000);
         } else if (randomIndex === 3) {
                  pizza();
         }
});

btnShowOrigin.addEventListener('click', function () {
         clicks++;
         clickCountSpan.textContent = clicks;
         if (seenFacts.size === facts.length) {
                  alert("Ви вже побачили усі факти, і можете переглядати лише повторно, натискаючи на основну кнопку");
         } else {
                  let randomIndex = 0;
                  do {
                           randomIndex = Math.floor(Math.random() * facts.length);
                  } while (seenFacts.has(randomIndex));

                  factContent.innerHTML = facts[randomIndex];

                  seenFacts.add(randomIndex);
                  seenCount.textContent = seenFacts.size;

                  modalOverlay.classList.remove('hidden');

                  clearInterval(timerInterval);

                  if (randomIndex === 2) {
                           age_timer();
                           timerInterval = setInterval(age_timer, 1000);
                  } else if (randomIndex === 3) {
                           pizza();
                  }
         }
});

btnClose.addEventListener('click', function () {
         modalOverlay.classList.add('hidden');
         factContent.innerHTML = '';
         clearInterval(timerInterval);
});