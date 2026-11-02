const sliderTitles = [
  'Сезонные скидки в фирменном <br>магазине Michael Kors',
  'Бесплатная доставка <br>по всей России',
  'Подарочные сертификаты <br>на любую сумму',
  'Официальная гарантия <br>на все аксессуары',
  'Новинки коллекции <br>Michael Kors'
];

const sliderTexts = [
  'Только сейчас скидки на оригинальные аксессуары MICHAEL <br>KORS до 40% ! Успей купить наручные часы, браслеты, сумки, <br>рюкзаки и кошельки по лучшей цене!',
  'Привезём часы, сумки и аксессуары Michael Kors <br>в любой город за 2-5 дней. Оплата производится <br>после осмотра и примерки!',
  'Не знаете, что подарить? Подарочный сертификат <br>на 10.000, 15.000, 20.000 или 30.000 рублей — <br>отличный выбор!',
  'Мы продаём только оригинальную продукцию, <br>имеющую соответствующие сертификаты. <br>Гарантийный талон выдаётся при покупке.',
  'Следите за обновлениями каталога: новые модели <br>часов, браслетов и сумок появляются <br>каждую неделю.'
];

const sliderNotes = [
  '* Акция действительна до 31.03.2024 года включительно.',
  '* Доставка осуществляется транспортной компанией «СДЭК».',
  '* Срок действия сертификата 2 месяца.',
  '* Официальная гарантия производителя.',
  '* Подпишитесь на рассылку, чтобы ничего не пропустить.'
];

let currentSlide = 0;
let extraShown = false;

function showSlide(index) {
  currentSlide = index;
  document.getElementById('slider-title').innerHTML = sliderTitles[index];
  document.getElementById('slider-desc').innerHTML = sliderTexts[index];
  document.getElementById('slider-note').textContent = sliderNotes[index];
  const dots = document.querySelectorAll('.dot');
  for (let i = 0; i < dots.length; i++) {
    if (i === index) {
      dots[i].classList.add('active');
    } else {
      dots[i].classList.remove('active');
    }
  }
}

function nextSlide() {
  let next = currentSlide + 1;
  if (next >= sliderTitles.length) {
    next = 0;
  }
  showSlide(next);
}

function prevSlide() {
  let prev = currentSlide - 1;
  if (prev < 0) {
    prev = sliderTitles.length - 1;
  }
  showSlide(prev);
}

function updateProducts() {
  const text = document.getElementById('search-input').value.trim().toLowerCase();
  const cards = document.querySelectorAll('.card');
  let found = 0;
  for (let i = 0; i < cards.length; i++) {
    const article = cards[i].getAttribute('data-article').toLowerCase();
    const isExtra = cards[i].classList.contains('extra');
    let visible = false;
    if (text === '') {
      if (isExtra === false || extraShown === true) {
        visible = true;
      }
    } else if (article.indexOf(text) !== -1) {
      visible = true;
    }
    if (visible === true) {
      cards[i].classList.remove('hidden');
      found = found + 1;
    } else {
      cards[i].classList.add('hidden');
    }
  }
  const nothing = document.getElementById('nothing');
  if (found === 0) {
    nothing.style.display = 'block';
  } else {
    nothing.style.display = 'none';
  }
  const showMore = document.getElementById('show-more');
  if (text === '' && extraShown === false) {
    showMore.style.display = 'block';
  } else {
    showMore.style.display = 'none';
  }
}

document.getElementById('slider-next').addEventListener('click', nextSlide);
document.getElementById('slider-prev').addEventListener('click', prevSlide);

const dots = document.querySelectorAll('.dot');
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', function() {
    showSlide(Number(this.getAttribute('data-index')));
  });
}

setInterval(nextSlide, 6000);

const cartButtons = document.querySelectorAll('.btn-cart');
for (let i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener('click', function() {
    const card = this.parentNode;
    const price = Number(card.getAttribute('data-price'));
    cartCount = cartCount + 1;
    cartSum = cartSum + price;
    saveCart();
    showCart();
    this.classList.add('btn-cart--outline');
    this.textContent = 'В корзине';
  });
}

document.getElementById('search-input').addEventListener('input', updateProducts);

document.getElementById('show-more').addEventListener('click', function() {
  extraShown = true;
  updateProducts();
});

showSlide(0);
