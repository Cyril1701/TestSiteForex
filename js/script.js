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
  const isOpen = nav.classList.toggle('nav--open');
  burgerBtn.classList.toggle('is-active', isOpen);
  burgerBtn.setAttribute('aria-expanded', String(isOpen));
  burgerBtn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
});

// ==============================
// Плавное появление карточек при прокрутке.
// Класс .reveal вешаем прямо здесь, через JS — так не
// пришлось вручную дописывать его в разметку каждой
// страницы: достаточно того, что элемент подходит под
// один из селекторов ниже.
// ==============================
const revealSelector = [
  '.course-card', '.guide-card', '.problem-card',
  '.stat-card', '.review-card', '.pricing-card', '.accordion-item',
].join(', ');

const revealEls = document.querySelectorAll(revealSelector);

if (revealEls.length && 'IntersectionObserver' in window) {
  revealEls.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // однократно, дальше не следим
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  // на случай отсутствия поддержки IntersectionObserver — не прячем контент
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ==============================
// Ripple-эффект на кнопках (.btn) — один обработчик
// на весь документ вместо навешивания на каждую кнопку
// ==============================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const ripple = document.createElement('span');
    ripple.className = 'btn__ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

// ==============================
// Переключатель языка (RU/UA). Это не переключение состояния
// внутри одной страницы, а переход на отдельный файл — поэтому
// сначала проигрываем анимацию сдвига бегунка, и только потом,
// с небольшой задержкой, переходим по ссылке из data-target.
// ==============================
const langSwitch = document.getElementById('langSwitch');

if (langSwitch) {
  langSwitch.addEventListener('click', () => {
    const target = langSwitch.dataset.target;
    if (!target) return;

    langSwitch.classList.toggle('is-uk');
    const delay = prefersReducedMotion ? 0 : 350;

    setTimeout(() => {
      window.location.href = target;
    }, delay);
  });
}
