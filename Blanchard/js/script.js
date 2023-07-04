// меню

document.querySelectorAll(".dropdown__simplebar").forEach(dropdown => {
  new SimpleBar(dropdown, {
  autoHide: false,
  scrollbarMaxSize: 40,
});
})

const btns = document.querySelectorAll(".menu__btn");
const dropdowns = document.querySelectorAll(".dropdown");
const activeClassdropdowns = "dropdown__active";
const activeClassbtns = "btn__active";

btns.forEach(item => {
  item.addEventListener("click", function() {
    let DropThis = this.parentElement.querySelector(".dropdown");
    dropdowns.forEach(el => {
      if (el != DropThis) {
        el.classList.remove(activeClassdropdowns)
      }
    });
    btns.forEach(el => {
      if (el != this) {
        el.classList.remove(activeClassbtns)
      }
    });
    DropThis.classList.toggle(activeClassdropdowns);
    this.classList.toggle(activeClassbtns);
  })
})

// слайдер в блое hero

new Swiper('.hero__slider', {
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  spaceBetween: 0,
  speed: 2000,
  autoplay: {
    delay: 2000
  },
  effect: "fade",
  allowTouchMove: false,
})


// селект в галерее

const element = document.querySelector('#customSelect');
const choices = new Choices(element, {
  position: "bottom",
  searchEnabled: false,
});

// слайдер в галерее

new Swiper('.gallery__slider', {
  navigation: {
    nextEl: '.gallery-button-next',
    prevEl: '.gallery-button-prev'
  },
  pagination: {
    el: '.gallery-pagination',
    type: 'fraction',
  },
  slidesPerView: 'auto',
  spaceBetween: 50,
  slidesPerGroup: 3,
  breakpoints: {
    1480: {
      slidesPerGroup: 3,
      spaceBetween: 50
    },
    1305: {
      slidesPerGroup: 3,
      spaceBetween: 40
    },
    1024: {
      spaceBetween: 20,
      slidesPerGroup: 2
    },
    520: {
      slidesPerGroup: 2,
      spaceBetween: 25,
    },
    350: {
      spaceBetween: 10,
      slidesPerGroup: 2
    },

    320: {
      spaceBetween: 0,
      slidesPerGroup: 1
    },
  }
})

// аккордион в каталоге

$(function() {
  $('.creator__accordion').accordion({
  heightStyle: "content",
  collapsible: true,
  icons: false
});
});

// табы в каталоге

const tabsBtn = document.querySelectorAll('.creator__name--link');
const tabsItem = document.querySelectorAll('.creator__card');

tabsBtn.forEach(el => {
  el.addEventListener('click', (e) => {
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(el => el.classList.remove('creator__name--link--active'));
    e.currentTarget.classList.add('creator__name--link--active');

    tabsItem.forEach(el => el.classList.remove('creator__card--active'));
    document.querySelector(`[data-target="${path}"]`).classList.add('creator__card--active');
  });
});

// слайдер в событиях

const mySwiper = new Swiper('.event__slider', {
  navigation: {
    nextEl: '.event-button-next',
  },
  pagination: {
    el: '.event-pagination',
    clickable: true,
  },
  slidesPerView: 'auto',
  spaceBetween: 50,
  slidesPerGroup: 2,
  loop: 'true',
  breakpoints: {
    1630: {
      spaceBetween: 50
    },
    1305: {
      spaceBetween: 35
    },
    1024: {
      spaceBetween: 25
    },
    768: {
      spaceBetween: 20
    },
    520: {
      slidesPerGroup: 2,
      spaceBetween: 15
    },
    320: {
      slidesPerGroup: 1,
      spaceBetween: 0,
    },
  }
})

const swiperNext = document.getElementById('swiperNext')
swiperNext.addEventListener('click', () => {
  mySwiper.slideNext();
})

// слайдер в проектах

const mySwiperProject = new Swiper('.project__slider', {
  navigation: {
    nextEl: '.project-button-next',
    prevEl: '.project-button-prev'
  },
  slidesPerView: 'auto',
  spaceBetween: 47,
  slidesPerGroup: 1,
  loop: 'true',
  breakpoints: {
    1630: {
      spaceBetween: 47
    },
    1480: {
      spaceBetween: 40
    },
    1305: {
      spaceBetween: 33
    },
    1024: {
      spaceBetween: 37
    },
    820: {
      spaceBetween: 42
    },
    768: {
      spaceBetween: 35
    },
    680: {
      spaceBetween: 38
    },
    615: {
      spaceBetween: 30
    },
    520: {
      spaceBetween: 25
    },
    320: {
      spaceBetween: 0
    },
  }
})

const swiperNextProject = document.getElementById('swiperNextProject')
swiperNext.addEventListener('click', () => {
  mySwiperProject.slideNext();
})

const swiperPrevProject = document.getElementById('swiperPrevProject')
swiperNext.addEventListener('click', () => {
  mySwiperProject.slidePrev();
})

// тултипы в каталоге

tippy('#tooltip-img1', {
  content: 'Хорошего настроения',
  placement: 'top',
  maxWidth: 300,
  theme: 'tooltip-theme',
});

tippy('#tooltip-img2', {
  content: 'Не болейте',
  placement: 'top',
  maxWidth: 300,
  theme: 'tooltip-theme',
});

tippy('#tooltip-img3', {
  content: 'Хочу спать',
  placement: 'top',
  maxWidth: 300,
  theme: 'tooltip-theme',
});

// валидация

const validation  = new window.JustValidate('#form', {
  errorLabelStyle: {
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    color: '#D11616',
  },
  submitHandler: function() {
    let formData = new formData();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    }
    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);
    form.reset();
  }
})

validation

  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Введите больше 3-ех символов'
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Недопустимый формат'
    },
    {
      rule: 'required',
      errorMessage: 'Вы не ввели имя'
    },
  ])

  .addField('#tel', [

    {
      rule: 'required',
      errorMessage: 'Вы не ввели телефон'
    },
  ])

  // карта

  type = "text/javascript" >

  ymaps.ready(init);
function init() {

  var myMap = new ymaps.Map("map", {
    center: [55.758468, 37.601088],
    zoom: 16
  });

  var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout: 'default#image',
    iconImageHref: "../img/map-point.svg",
    iconImageSize: [20, 20],
    iconImageOffset: [-3, -42]
  });

  myMap.geoObjects.add(myPlacemark);
}

// поиск

let search = document.querySelector('.search__btn--top');
let form = document.querySelector('.header__search');
let closed = document.querySelector('.search__close');
let logo = document.querySelector('.header__logo-link');

search.addEventListener('click', function () {
  form.classList.toggle('header__search--active');
  search.classList.toggle('search__btn--disabled');
  logo.classList.toggle('header__logo-link--disabled');
  burger.classList.toggle('burger--disabled');
})

closed.addEventListener('click', function () {
  form.classList.remove('header__search--active');
  search.classList.remove('search__btn--disabled');
  logo.classList.remove('header__logo-link--disabled');
  burger.classList.remove('burger--disabled');
})

// бургер

let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__nav');
let menuLinks = menu.querySelectorAll('.nav__link');

burger.addEventListener('click', function () {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header__nav--active');
})

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger--active');
    menu.classList.remove('header__nav--active');
  })
})


// изменение значения value кнопки submit при разрешении экрана 350 или меньше

if (document.documentElement.clientWidth < 350) {
  document.getElementById('submit').value = 'Заказать';
}

// модалка

const slide = document.querySelectorAll('.gallery__slide');
const modalOverlay = document.querySelector('.modal__overlay');
const modals = document.querySelectorAll('.modal');
const modalClose = document.querySelector('.modal__close');

slide.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal__overlay--visible');
	});
});

modalClose.addEventListener('click', function () {
  modalOverlay.classList.toggle('modal__overlay--visible');
  modals.classList.toggle('modal--visible');
})
