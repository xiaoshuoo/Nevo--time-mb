let cartCount = 5;
let cartSum = 34000;

if (window.name.indexOf('cart:') === 0) {
  const parts = window.name.split(':');
  cartCount = Number(parts[1]);
  cartSum = Number(parts[2]);
} else if (localStorage.getItem('cartCount') !== null) {
  cartCount = Number(localStorage.getItem('cartCount'));
  cartSum = Number(localStorage.getItem('cartSum'));
}

function showCart() {
  document.getElementById('cart-count').textContent = cartCount;
  document.getElementById('cart-sum').textContent = cartSum + '\u00A0₽';
}

function saveCart() {
  localStorage.setItem('cartCount', cartCount);
  localStorage.setItem('cartSum', cartSum);
  window.name = 'cart:' + cartCount + ':' + cartSum;
}

function closeAllMenus() {
  const items = document.querySelectorAll('.has-drop');
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('open');
  }
}

function countDigits(text) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if ('0123456789'.indexOf(text[i]) !== -1) {
      count = count + 1;
    }
  }
  return count;
}

showCart();

const dropLinks = document.querySelectorAll('.drop-link');
for (let i = 0; i < dropLinks.length; i++) {
  dropLinks[i].addEventListener('click', function(event) {
    event.preventDefault();
    const item = this.parentNode;
    const wasOpen = item.classList.contains('open');
    closeAllMenus();
    if (wasOpen === false) {
      item.classList.add('open');
    }
  });
}

document.addEventListener('click', function(event) {
  if (event.target.closest('.has-drop') === null) {
    closeAllMenus();
  }
});

const sendButton = document.getElementById('send-button');
if (sendButton !== null) {
  sendButton.addEventListener('click', function() {
    const nameInput = document.getElementById('form-name');
    const phoneInput = document.getElementById('form-phone');
    const commentInput = document.getElementById('form-comment');
    const message = document.getElementById('form-message');
    message.classList.remove('error');
    if (nameInput.value.trim() === '') {
      message.textContent = 'Введите ваше имя';
      message.classList.add('error');
    } else if (countDigits(phoneInput.value) < 10) {
      message.textContent = 'Введите номер телефона полностью';
      message.classList.add('error');
    } else {
      message.textContent = 'Спасибо! Мы свяжемся с Вами в ближайшее время';
      nameInput.value = '';
      phoneInput.value = '';
      commentInput.value = '';
    }
  });
}

const subscribeButton = document.getElementById('subscribe-button');
if (subscribeButton !== null) {
  subscribeButton.addEventListener('click', function() {
    const emailInput = document.getElementById('subscribe-email');
    const email = emailInput.value.trim();
    if (email.indexOf('@') < 1 || email.indexOf('.') === -1) {
      alert('Введите правильный e-mail');
    } else {
      alert('Вы подписались на новинки и скидки');
      emailInput.value = '';
    }
  });
}

const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav');
if (burger !== null) {
  burger.addEventListener('click', function() {
    if (navMenu.classList.contains('nav--open')) {
      navMenu.classList.remove('nav--open');
      burger.classList.remove('burger--open');
      closeAllMenus();
    } else {
      navMenu.classList.add('nav--open');
      burger.classList.add('burger--open');
    }
  });
}
