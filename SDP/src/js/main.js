// Burger

let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu--display');
let menuLinks = menu.querySelectorAll('.menu__link');

burger.addEventListener('click', function () {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('menu--display--active');
})

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger--active');
    menu.classList.remove('menu--display--active');
  })
})

// select

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'placeholder не указан'

  const items = data.map(item => {
    let cls = ''
    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `
          <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
      `
  })
  return `
      <input type="hidden" class="hidden-input">
      <div class="select__backdrop" data-type="backdrop"></div>
      <div class="select__input" data-type="input">
          <span data-type="value">${text}</span>
          <img src="img/down-arrow.svg" alt="arrow" data-type="arrow" class="select__arrow">
      </div>
      <div class="select__dropdown">
          <ul class="select__list">
              ${items.join('')}
          </ul>
      </div>
  `
}
class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

    this.render()
    this.setup()
  }

  render() {
    const { placeholder, data } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }
  setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler(event) {
    const { type } = event.target.dataset
    if (type === 'input') {
      this.toggle()
    } else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
    } else if (type === 'backdrop') {
      this.close()
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId)
  }

  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value

    this.$el.querySelectorAll(`[data-type="item"]`).forEach(el => el.classList.remove('selected'))
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

    this.options.onSelect ? this.options.onSelect(this.current) : null
    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.$el.classList.add('open')
    this.$arrow.classList.add('open')
  }

  close() {
    this.$el.classList.remove('open')
    this.$arrow.classList.remove('open')
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}


// Select upper
const select = new Select('#select', {
  placeholder: 'Москва',
  selectedId: '1',
  data: [
    { id: '1', value: 'Москва' },
    { id: '2', value: 'Уфа' },
    { id: '3', value: 'Пермь' },
    { id: '4', value: 'Казань' },
  ],
  onSelect(item) {
    const input = document.querySelector('.hidden__input')
    input.value = item.value
  }
})

// Select bottom
const selectBottom = new Select('#select-bottom', {
  placeholder: 'Категория',
  data: [
    { id: '1', value: 'Диваны' },
    { id: '2', value: 'Кресла' },
    { id: '3', value: 'Пуфы' },
    { id: '4', value: 'Кровати' },
    { id: '5', value: 'Тумбы' },
    { id: '6', value: 'Комоды' },
    { id: '7', value: 'Стулья' },
    { id: '8', value: 'Столы' },
    { id: '9', value: 'Аксессуары' },
  ],
  onSelect(item) {
    const input = document.querySelector('.hidden__input')
    input.value = item.value
  }
})


// слайдер в блое hero

const swiperHero = new Swiper('.hero__slider', {
  pagination: {
    el: '.hero__pagination',
    clickable: true,
  },
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

// слайдер в спецпредложениях

const swiperOffer = new Swiper('.offer__slider', {
  navigation: {
    nextEl: '.offer__next',
    prevEl: '.offer__prev'
  },
  slidesPerView: 'auto',
  spaceBetween: 32,
  slidesPerGroup: 3,
  loop: 'true',
  breakpoints: {
    320: {
      slidesPerGroup: 1,
    },
    769: {
      slidesPerGroup: 3,
    },
  }
})


// Показать больше

const showMore = document.querySelector('.show-more');
const productsLength = document.querySelectorAll('.rating__card').length;
let items = 8;

try {

  showMore.addEventListener('click', () => {
    items += 4;
    const array = Array.from(document.querySelector('.rating__grid').children);
    const visItems = array.slice(0, items);

    visItems.forEach(el => el.classList.add('is-visible'));

    if (visItems.length === productsLength) {
      showMore.style.display = 'none';
    }
  });

} catch (error) {
  console.log(error);
}

// слайдер в полезное

const swiperUseful = new Swiper('.useful__slider', {
  navigation: {
    nextEl: '.useful__next',
    prevEl: '.useful__prev'
  },
  slidesPerView: 'auto',
  spaceBetween: 32,
  slidesPerGroup: 1,
  loop: 'true',
})


// тултип

try {

  tippy('#tooltip', {
    content: 'Реплицированные с зарубежных источников, исследования формируют глобальную сеть.',
    placement: 'top',
    maxWidth: 160,
    theme: 'black',
  });

} catch (error) {
  console.log(error);
}

// валидация

try {

  const validation = new JustValidate('#form-contact', {
    errorLabelStyle: {
      color: '#FF6972',
    },
  });

  validation

    .addField('#email-contact', [
      {
        rule: 'required',
        errorMessage: 'Введите E-mail',
      },
      {
        rule: 'email',
        errorMessage: 'Не валидный E-mail',
      },
    ]);

  validation

    .addField('#name-contact', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели имя',
      },

      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Недопустимый формат',
      },
    ]);

  validation

    .addField('#tel-contact', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели телефон',
      },

      {
        rule: 'minLength',
        value: 11,
        errorMessage: 'Недостаточно цифр',
      },
    ]);

  validation

    .onSuccess((event) => {

      // модалка

      const modalOpen = document.querySelector('.open');
      const modal = document.querySelector('.modal');
      // const modalClose = document.querySelector('.modal__close');

      modalOpen.addEventListener('click', function () {
        modal.classList.add('modal--visible');
      })

      // modalClose.addEventListener('click', function () {
      //   modal.classList.toggle('modal--visible');
      // })
    });

    const modalClose = document.querySelector('.modal__close');

    modalClose.addEventListener('click', function () {
      modal.classList.toggle('modal--visible');
    })

} catch (error) {
  console.log(error);
}


// слайдер цен

const priceSlider = document.getElementById('price-slider');

if (priceSlider) {
  noUiSlider.create(priceSlider, {
    start: [2000, 150000],
    connect: true,
    step: 1,
    padding: [10, 10],
    range: {
      'min': [2000],
      'max': [150000]
    }
  });
  const input1 = document.getElementById('input-price1');
  const input2 = document.getElementById('input-price2');
  const inputs = [input1, input2];

  priceSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    console.log(arr);

    priceSlider.noUiSlider.set(arr);
  };

  inputs.forEach((el, index) => {
    el.addEventListener('change', (e) => {
      console.log(index);
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}

// табы в каталоге

const tabsBtn = document.querySelectorAll('.catalog__btn');
const tabsItem = document.querySelectorAll('.catalog__grid');
const tabsItem768 = document.querySelectorAll('.catalog__grid768');
const tabsBtn768 = document.querySelectorAll('.catalog__btn768');

try {

tabsBtn768.forEach(el => {
  el.addEventListener('click', (e) => {
    const path = e.currentTarget.dataset.path;

    tabsBtn768.forEach(el => el.classList.remove('catalog__btn768--active'));
    e.currentTarget.classList.add('catalog__btn768--active');

    tabsItem768.forEach(el => el.classList.remove('catalog__grid768--active'));
    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__grid768--active');
  });
});

tabsBtn.forEach(el => {
  el.addEventListener('click', (e) => {
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(el => el.classList.remove('catalog__btn--active'));
    e.currentTarget.classList.add('catalog__btn--active');

    tabsItem.forEach(el => el.classList.remove('catalog__grid--active'));
    document.querySelector(`[data-target="${path}"]`).classList.add('catalog__grid--active');
  });
});

} catch (error) {
  console.log(error);
}


// слайдер в продуктах

const swiperProduct = new Swiper('.product__slider', {
  navigation: {
    nextEl: '.product__next',
    prevEl: '.product__prev'
  },
  slidesPerView: 'auto',
  spaceBetween: 32,
  slidesPerGroup: 1,
  loop: 'true',

  breakpoints: {
    0: {
      spaceBetween: 16,
    },
    339: {
      spaceBetween: 32,
    },
  }
})

// картинки товара

const tabsPicture = document.querySelectorAll('.sofa__picture');
const tabsImg = document.querySelectorAll('.sofa__img');
const tabsPictureNone = document.querySelector('.sofa__picture--size');

try {

  tabsPicture.forEach(el => {
    el.addEventListener('click', (e) => {
      tabsPictureNone.classList.add('sofa__picture--size--active');
    });
  });

  tabsPictureNone.addEventListener('click', function () {
    tabsPictureNone.classList.remove('sofa__picture--size--active');
  })

  tabsPicture.forEach(el => {
    el.addEventListener('click', (e) => {
      const path = e.currentTarget.dataset.path;

      tabsPicture.forEach(el => el.classList.remove('sofa__picture--display'));
      e.currentTarget.classList.add('sofa__picture--display');

      tabsImg.forEach(el => el.classList.remove('sofa__img--active'));
      document.querySelector(`[data-target="${path}"]`).classList.add('sofa__img--active');
    });
  });

} catch (error) {
  console.log(error);
}

// модалка с формой

const modalFirstOpen = document.querySelector('.product__btn-first');
const modalFormOpen = document.querySelector('.product__btn');
const modalForm = document.querySelector('.buy');
const modalFormClose = document.querySelector('.buy__close');

try {

  modalFirstOpen.addEventListener('click', function () {
    modalForm.classList.add('buy--visible');
  })

  modalFormOpen.addEventListener('click', function () {
    modalForm.classList.add('buy--visible');
  })

  modalFormClose.addEventListener('click', function () {
    modalForm.classList.toggle('buy--visible');
  })

} catch (error) {
  console.log(error);
}

const modalFormSubmit = document.querySelector('.buy__submit');
const modalThanks = document.querySelector('.thanks');
const modalThanksClose = document.querySelector('.thanks__close');

try {

  modalFormSubmit.addEventListener('click', function () {
    modalThanks.classList.add('thanks--visible');
  })

  modalThanksClose.addEventListener('click', function () {
    modalThanks.classList.toggle('thanks--visible');
  })

} catch (error) {
  console.log(error);
}

// модалка с картинками

const modalImgOpen = document.querySelector('.sofa__img--active');
const modalOpen = document.querySelector('.open');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');

try {

  modalImgOpen.addEventListener('click', function () {
    modal.classList.add('modal--visible');
  })

  modalClose.addEventListener('click', function () {
    modal.classList.toggle('modal--visible');
  })

} catch (error) {
  console.log(error);
}

const tabsPictureModal = document.querySelectorAll('.modal__picture');
const tabsImgModal = document.querySelectorAll('.modal__imgs');
const tabsPictureNoneModal = document.querySelector('.modal__picture--size');

try {

  tabsPictureModal.forEach(el => {
    el.addEventListener('click', (e) => {
      tabsPictureNoneModal.classList.add('modal__picture--size--active');
    });
  });

  tabsPictureNoneModal.addEventListener('click', function () {
    tabsPictureNone.classList.remove('modal__picture--size--active');
  })

  tabsPictureModal.forEach(el => {
    el.addEventListener('click', (e) => {
      const path = e.currentTarget.dataset.path;

      tabsPictureModal.forEach(el => el.classList.remove('modal__picture--display'));
      e.currentTarget.classList.add('modal__picture--display');

      tabsImgModal.forEach(el => el.classList.remove('modal__imgs--active'));
      document.querySelector(`[data-target="${path}"]`).classList.add('modal__imgs--active');
    });
  });

} catch (error) {
  console.log(error);
}

// Select category

try {

  const selectCategory = new Select('#category-select', {
    placeholder: 'Категория',
    data: [
      { id: '1', value: 'Диваны' },
      { id: '2', value: 'Кресла' },
      { id: '3', value: 'Пуфы' },
      { id: '4', value: 'Кровати' },
      { id: '5', value: 'Тумбы' },
      { id: '6', value: 'Комоды' },
      { id: '7', value: 'Стулья' },
      { id: '8', value: 'Столы' },
      { id: '9', value: 'Аксессуары' },
    ],
    onSelect(item) {
      const input = document.querySelector('.hidden__input')
      input.value = item.value
    }
  })

} catch (error) {
  console.log(error);
}

// Select
try {

  const selectPrice = new Select('#price-select', {
    placeholder: 'Цена',
    data: [
      { id: '1', value: 'от 2000' },
      { id: '2', value: 'от 5000' },
      { id: '3', value: 'от 10000' },
      { id: '4', value: 'от 20000' },
      { id: '5', value: 'до 200000' },
      { id: '6', value: 'до 150000' },
      { id: '7', value: 'до 100000' },
      { id: '8', value: 'до 50000' },
    ],
    onSelect(item) {
      const input = document.querySelector('.hidden__input')
      input.value = item.value
    }
  })

} catch (error) {
  console.log(error);
}

// Select discount

try {
  const selectDiscount = new Select('#discount-select', {
    placeholder: 'Скидка',
    data: [
      { id: '1', value: 'Более 5 000' },
      { id: '2', value: 'Менее 5 000' },
      { id: '3', value: 'Не важно' },
    ],
    onSelect(item) {
      const input = document.querySelector('.hidden__input')
      input.value = item.value
    }
  })

} catch (error) {
  console.log(error);
}

// Select color
try {

  const selectColor = new Select('#color-select', {
    placeholder: 'Цвет',
    data: [
      { id: '1', value: 'Коричневый' },
      { id: '2', value: 'Черный' },
      { id: '3', value: 'Бежевый' },
      { id: '4', value: 'Серый' },
      { id: '5', value: 'Белый' },
      { id: '6', value: 'Синий' },
      { id: '7', value: 'Оранжевый' },
      { id: '8', value: 'Желтый' },
      { id: '9', value: 'Зеленый' },
    ],
    onSelect(item) {
      const input = document.querySelector('.hidden__input')
      input.value = item.value
    }
  })

} catch (error) {
  console.log(error);
}

// слайдер тщвара

const swiperSofa = new Swiper('.sofa__slider', {
  navigation: {
    nextEl: '.sofa__next',
    prevEl: '.sofa__prev'
  },
  direction: 'vertical',
  slidesPerView: 'auto',
  slidesPerGroup: 1,

  breakpoints: {
    0: {
      direction: 'horizontal',
    },
    339: {
      direction: 'vertical',
    },
    951: {
      direction: 'horizontal',
    },
  }
})

// слайдер товаров модалка

const swiperSofaModal = new Swiper('.sofa__slider-modal', {
  navigation: {
    nextEl: '.sofa__next',
    prevEl: '.sofa__prev'
  },
  slidesPerView: 'auto',
  slidesPerGroup: 1,
})



