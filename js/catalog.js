let slides = [];
let current = 0;
let showAll = false;

// слайдер
function showSlide(n) {
  if (n < 0) {
    n = slides.length - 1;
  }
  if (n >= slides.length) {
    n = 0;
  }
  current = n;
  document.getElementById('slider-title').innerHTML = slides[n].title;
  document.getElementById('slider-desc').innerHTML = slides[n].text;
  document.getElementById('slider-note').textContent = slides[n].note;
  const dots = document.querySelectorAll('.dot');
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  dots[n].classList.add('active');
}

document.getElementById('slider-next').addEventListener('click', function() {
  showSlide(current + 1);
});
document.getElementById('slider-prev').addEventListener('click', function() {
  showSlide(current - 1);
});
const dots = document.querySelectorAll('.dot');
for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', function() {
    showSlide(i);
  });
}

loadJSON('data/slider.json', function(list) {
  slides = list;
  showSlide(0);
});

// поиск и кнопка "показать ещё"
function filterCards() {
  const text = document.getElementById('search-input').value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  let found = 0;
  for (let i = 0; i < cards.length; i++) {
    const article = cards[i].getAttribute('data-article').toLowerCase();
    let show = article.indexOf(text) !== -1;
    if (text === '' && !showAll && cards[i].classList.contains('extra')) {
      show = false;
    }
    cards[i].classList.toggle('hidden', !show);
    if (show) {
      found++;
    }
  }
  document.getElementById('nothing').style.display = found === 0 ? 'block' : 'none';
  document.getElementById('show-more').style.display = (text === '' && !showAll) ? 'block' : 'none';
}

document.getElementById('search-input').addEventListener('input', filterCards);
document.getElementById('show-more').addEventListener('click', function() {
  showAll = true;
  filterCards();
});

// товары
loadJSON('data/products.json', function(list) {
  let html = '';
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    let badge = '';
    if (p.badge !== '') {
      badge = '<span class="badge' + (p.badgeLow ? ' badge--low' : '') + '">' + p.badge + '</span>';
    }
    html += '<div class="card' + (p.extra ? ' extra hidden' : '') + '" data-article="' + p.article + '" data-price="' + p.price + '">' +
      badge +
      '<img src="' + p.image + '" alt="' + p.name + '">' +
      '<a class="card-name" href="#">' + p.name + '</a>' +
      '<p class="card-price"><s>' + p.oldPriceText + '</s> <b>' + p.priceText + '</b></p>' +
      '<button class="btn-cart' + (p.outline ? ' btn-cart--outline' : '') + '">В корзину</button>' +
      '</div>';
  }
  document.getElementById('products').innerHTML = html;

  const buttons = document.querySelectorAll('.btn-cart');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      cartCount++;
      cartSum += Number(this.parentNode.getAttribute('data-price'));
      localStorage.setItem('cartCount', cartCount);
      localStorage.setItem('cartSum', cartSum);
      showCart();
      this.classList.add('btn-cart--outline');
      this.textContent = 'В корзине';
    });
  }
  filterCards();
});
