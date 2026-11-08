// загрузка json
function loadJSON(url, callback) {
  fetch(url).then(function(r) {
    return r.json();
  }).then(callback);
}

// корзина
let cartCount = 5;
let cartSum = 34000;

if (localStorage.getItem('cartCount')) {
  cartCount = Number(localStorage.getItem('cartCount'));
  cartSum = Number(localStorage.getItem('cartSum'));
}

function showCart() {
  document.getElementById('cart-count').textContent = cartCount;
  document.getElementById('cart-sum').textContent = cartSum + ' ₽';
}
showCart();

// выпадающее меню
const dropItems = document.querySelectorAll('.has-drop');
for (let i = 0; i < dropItems.length; i++) {
  dropItems[i].querySelector('.drop-link').addEventListener('click', function(e) {
    e.preventDefault();
    dropItems[i].classList.toggle('open');
  });
}

// бургер
document.getElementById('burger').addEventListener('click', function() {
  document.getElementById('nav').classList.toggle('nav--open');
  this.classList.toggle('burger--open');
});

// форма
const sendButton = document.getElementById('send-button');
if (sendButton) {
  sendButton.addEventListener('click', function() {
    const message = document.getElementById('form-message');
    message.classList.remove('error');
    if (document.getElementById('form-name').value === '') {
      message.textContent = 'Введите ваше имя';
      message.classList.add('error');
    } else if (document.getElementById('form-phone').value.length < 10) {
      message.textContent = 'Введите номер телефона полностью';
      message.classList.add('error');
    } else {
      message.textContent = 'Спасибо! Мы свяжемся с Вами в ближайшее время';
    }
  });
}

// подписка
document.getElementById('subscribe-button').addEventListener('click', function() {
  const email = document.getElementById('subscribe-email').value;
  if (email.indexOf('@') < 1) {
    alert('Введите правильный e-mail');
  } else {
    alert('Вы подписались на новинки и скидки');
  }
});
