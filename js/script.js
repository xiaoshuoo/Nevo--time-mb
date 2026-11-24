// смотрим что системы норм
let asukaCount = Number(localStorage.getItem('asukaCount')) || 5;
let asukaSum = Number(localStorage.getItem('asukaSum')) || 34000;
let shinjiBase = [];

// цифры корзины в шапке
function showAsuka() {
  document.querySelector('.asukaCartCount').textContent = asukaCount;
  document.querySelector('.asukaCartSum').textContent = asukaSum + ' ₽';
}

function burgerClick() {
  let nervNav = document.querySelector('.nervNav');
  if (nervNav.className.indexOf('nav--open') !== -1) {
    nervNav.classList.remove('nav--open');
    this.classList.remove('burger--open');
  } else {
    nervNav.classList.add('nav--open');
    this.classList.add('burger--open');
  }
}

// рисуем карточки из products.json
function showProducts() {
  let angel = JSON.parse(this.responseText);
  let synchroResult = '';
  shinjiBase = angel;
  for (let i = 0; i < angel.length; i++) {
    synchroResult += '<div class="card"><span class="' + angel[i].badgeClass + '">' + angel[i].badge + '</span>' +
      '<img src="' + angel[i].image + '" alt="' + angel[i].name + '">' +
      '<a class="card-name" href="#">' + angel[i].name + '</a>' +
      '<p class="card-price"><s>' + angel[i].oldPriceText + '</s> <b>' + angel[i].priceText + '</b></p>' +
      '<button class="' + angel[i].btnClass + '">В корзину</button></div>';
  }
  document.querySelector('.evaProducts').innerHTML = synchroResult;
  let pilotBtns = document.querySelectorAll('.btn-cart');
  for (let i = 0; i < pilotBtns.length; i++) {
    pilotBtns[i].addEventListener('click', cartClick);
  }
}

// ищем какую кнопку нажали, цена лежит в том же индексе
function cartClick() {
  let pilotBtns = document.querySelectorAll('.btn-cart');
  for (let j = 0; j < pilotBtns.length; j++) {
    if(pilotBtns[j] === this){
      asukaCount++;
      asukaSum += Number(shinjiBase[j].price);
    }
  }
  localStorage.setItem('asukaCount', asukaCount);
  localStorage.setItem('asukaSum', asukaSum);
  showAsuka();
  this.classList.add('btn-cart--outline');
  this.textContent = 'В корзине';
}

function synchroFilter() {
  let query = document.querySelector(".mariSearch").value;
  let cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++) {
    if (shinjiBase[i].article.indexOf(query) !== -1) {
      cards[i].classList.remove('hidden');
    } else {
      cards[i].classList.add('hidden');
    }
  }
  // console.log(query);
}


showAsuka();
document.querySelector('.shinjiBurger').addEventListener('click', burgerClick);
if (document.querySelector('.evaProducts')) {
  let magiRequest = new XMLHttpRequest();
  magiRequest.open('GET', 'data/products.json');
  magiRequest.onload = showProducts;
  magiRequest.send();
  document.querySelector('.mariSearch').addEventListener('input', synchroFilter);
}
