// ==============================
// Аккордеон: используется и в FAQ, и в программе курса.
// Каждая .accordion-group работает независимо: открытие
// пункта в одной группе не закрывает пункты в другой.
// ==============================
document.querySelectorAll('.accordion-group').forEach((group) => {
  const items = group.querySelectorAll('.accordion-item');

  items.forEach((item) => {
    const question = item.querySelector('.accordion-item__question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // в пределах своей группы держим открытым только один пункт
      items.forEach((other) => other.classList.remove('is-open'));

      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
});

// ==============================
// Переключатель дневной/ночной темы
// ==============================
const themeToggle = document.getElementById('themeToggle');
const htmlRoot = document.documentElement;

themeToggle.addEventListener('click', () => {
  const isLight = htmlRoot.getAttribute('data-theme') === 'light';
  const nextTheme = isLight ? 'dark' : 'light';

  htmlRoot.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
});

// ==============================
// Мобильное меню: бургер открывает/закрывает навигацию
// ==============================
const burgerBtn = document.getElementById('burgerBtn');
const nav = document.querySelector('.nav');

burgerBtn.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
  burgerBtn.classList.toggle('is-active');
});
