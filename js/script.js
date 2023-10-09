const clickingAreaNode = document.querySelector('.js-clicking-area-container');
const winningCoinsContainerNode = document.querySelector('.js-winning-coins-part');
const employeeContainerNode = document.querySelector('.js-employees-part');

// állapottér
let { seconds, gold, goldPerClick, goldPerSec, winningCoinList, employeeList, startTimestamp } = getInitialState(); // destrukturálás
let needWinningCoinRender = true;
let needEmployeeRender = true;

// alapértelmezésbe hozás
function getInitialState() {
  return {
    intervalId: setInterval(administrateTime, 200), // aszinkron hívás
    startTimestamp: new Date().getTime(),
    seconds: 0,
    gold: 0,
    goldPerClick: 1,
    goldPerSec: 0,
    winningCoinList: [
      {
        coinName: 'Sas',
        goldPerClickIncrement: 1,
        description: 'Az arany Sas Érme egy mágikus madarat rejt, mely a hatalmas magasságok ura.',
        amount: 0,
        price: 10,
        link: './images/golden-eagle.png',
      },
      {
        coinName: 'Sárkány',
        goldPerClickIncrement: 3,
        description: 'A Sárkány Érme egy ősi lény erejét hordozza, amely tűzokádó képességgel bír.',
        amount: 0,
        price: 50,
        link: './images/golden-dragon.png',
      },
      {
        coinName: 'Tigris',
        goldPerClickIncrement: 5,
        description: 'A Tigris Érme mögött egy vad és hatalmas ragadozó rejlik, mely az erő és elegancia megtestesítője.',
        amount: 0,
        price: 100,
        link: './images/golden-tiger.png',
      },
      {
        coinName: 'Ló',
        goldPerClickIncrement: 7,
        description: 'Az arany Ló Érme a szél gyorsaságát és mozgékonyságát hozza el.',
        amount: 0,
        price: 150,
        link: './images/golden-horse.png',
      },
      {
        coinName: 'Hiúz',
        goldPerClickIncrement: 10,
        description: 'A Hiúz Érme mögött egy rejtélyes és csendes vadász lakozik, aki az éleslátás és a kitartás mestere.',
        amount: 0,
        price: 250,
        link: './images/golden-bobcat.png',
      },
      {
        coinName: 'Farkas',
        goldPerClickIncrement: 15,
        description: 'A Farkas Érme a falka szellemi vezetőjét rejtő titokzatos erővel bír, aki mindig készen áll a védelmezésre és a segítségre.',
        amount: 0,
        price: 450,
        link: './images/golden-wolf.png',
      },
    ],
    employeeList: [
      {
        employeeName: 'Majom',
        goldPerSecIncrement: 1,
        description: 'A Majom Varázsló képességei közé tartozik az ötletek varázslatos megvalósítása és a nevetés gyógyító ereje.',
        amount: 0,
        price: 100,
        link: './images/wizard-monkey.jpg',
      },
      {
        employeeName: 'Kutya',
        goldPerSecIncrement: 2,
        description: 'A Kutya Varázsló hűségével és odaadásával tűnik ki. Ő a barátság és a védelmezés mestere, mindig melletted áll, és figyel rád.',
        amount: 0,
        price: 200,
        link: './images/wizard-dog.jpg',
      },
      {
        employeeName: 'Nyuszi',
        goldPerSecIncrement: 5,
        description: 'A Nyuszi Varázsló képes a gyors gondolkodásra és a megoldások pillanatnyi megtalálására.',
        amount: 0,
        price: 350,
        link: './images/wizard-bunny.jpg',
      },
      {
        employeeName: 'Mackó',
        goldPerSecIncrement: 10,
        description: 'A Mackó Varázsló a bölcs és jóindulatú lény, aki a harmónia és a békesség hírnöke.',
        amount: 0,
        price: 500,
        link: './images/wizard-bear.jpg',
      },
      {
        employeeName: 'Süni',
        goldPerSecIncrement: 15,
        description: 'A Süni Varázsló a védelem és a kitartás mestere. Képes megvédeni társait, és soha nem adja fel.',
        amount: 0,
        price: 600,
        link: './images/wizard-hedgehog.jpg',
      },
      {
        employeeName: 'Macska',
        goldPerSecIncrement: 20,
        description: 'A Macska Varázsló a titokzatosság és az intuíció szellemi vezetője. Képes észrevenni a rejtett lehetőségeket.',
        amount: 0,
        price: 700,
        link: './images/wizard-cat.jpg',
      },
    ],
  };
};

function administrateTime() {
  const currentTimestamp = new Date().getTime();
  const elapsedTime = Math.floor((currentTimestamp - startTimestamp) / 1000);
  const rewardSeconds = elapsedTime - seconds;
  if (rewardSeconds > 0) {
    gold += goldPerSec * rewardSeconds;
    seconds = elapsedTime;
    render();
  };
};

/********** Click event listeners **********/

function handleGoldClicked(event) {
  if (event.target.dataset.enable_click) {
    gold += goldPerClick;
    render();
  };
};

function handleWinnerCoinClicked(event) {
  let clickIndex = event.target.dataset.index;
  if (typeof clickIndex !== 'undefined') {
    const clickedWinningCoin = winningCoinList[clickIndex];
    if (gold < clickedWinningCoin.price) {
      alert('Nem áll rendelkezésedre elég arany!');
      return;
    };
    gold -= clickedWinningCoin.price;
    goldPerClick += clickedWinningCoin.goldPerClickIncrement;
    clickedWinningCoin.amount += 1;
    render();
    needWinningCoinRender = true;
  };
};

function handleEmployeeClicked(event) {
  let clickIndex = event.target.dataset.index;
  if (typeof clickIndex !== 'undefined') {
    const clickedEmployee = employeeList[clickIndex];
    if (gold < clickedEmployee.price) {
      alert('Nem áll rendelkezésedre elég arany!');
      return;
    };
    gold -= clickedEmployee.price;
    goldPerSec += clickedEmployee.goldPerSecIncrement;
    clickedEmployee.amount += 1;
    render();
    needEmployeeRender = true;
  };
};

/********** Templates **********/

function getClickingAreaTemplate() {
  return `
  <div>
    <p><strong>${seconds.toLocaleString('hu-HU')} másodperc</strong></p>
    <img src="./images/goldcoin.png" alt="Arany klikkelő" data-enable_click="true" class="gold-coin">
    <p class="gold-counter"><strong>${gold.toLocaleString('hu-HU')} arany</strong></p>
    <p>${goldPerClick} arany / klikk</p>
    <p>${goldPerSec} arany / mp</p>
  </div>
  <figure class="school-image-container" title="Diákok jelentkezését várjuk">
    <img src="./images/wizard-cat-at-school.jpg" alt="Varázslótanonc cica">
    <figcaption>Varázslóiskolánk</figcaption>
  </figure>
  `;
};

function getWinningCoin({ coinName, goldPerClickIncrement, description, amount, price, link }, index) {
  return `
  <div class="winning-coin-card">
    <div class="description-part">
      <p class="card-name"><strong>${coinName} (${goldPerClickIncrement} arany / klikk)</strong></p>
      <p class="description">${description}</p>
    </div>
    <div>
      <p>db: ${amount}</p>
      <p>ár: ${price}</p>
    </div>
    <div class="image-container">
      <img src=${link} alt=${coinName} title="Megveszem" data-index="${index}">
    </div>
  </div>
  `;
};

function getEmployee({ employeeName, goldPerSecIncrement, description, amount, price, link }, index) {
  return `
  <div class="employee-card">
    <div class="description-part">
      <p class="card-name"><strong>${employeeName} (${goldPerSecIncrement} arany / mp)</strong></p>
      <p class="description">${description}</p>
    </div>
    <div>
      <p>fő: ${amount}</p>
      <p>ár: ${price}</p>
    </div>
    <div class="image-container">
      <img src="${link}" alt="${employeeName}" title="Alkalmazom" data-index="${index}">
    </div>
  </div>
  `;
};

function render() {
  clickingAreaNode.innerHTML = getClickingAreaTemplate();
  if (needWinningCoinRender) {
    winningCoinsContainerNode.innerHTML = winningCoinList.map(getWinningCoin).join('');
    needWinningCoinRender = false;
  };
  if (needEmployeeRender) {
    employeeContainerNode.innerHTML = employeeList.map(getEmployee).join('');
    needEmployeeRender = false;
  };
};

function initialize() {
  const data = getInitialState();
  seconds = data.seconds;
  gold = data.gold;
  goldPerClick = data.goldPerClick;
  goldPerSec = data.goldPerSec;

  clickingAreaNode.addEventListener('click', handleGoldClicked);
  winningCoinsContainerNode.addEventListener('click', handleWinnerCoinClicked);
  employeeContainerNode.addEventListener('click', handleEmployeeClicked);
  render();
};

initialize();