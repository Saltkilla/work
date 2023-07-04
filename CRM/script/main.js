function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

function translit(word) {
  let answer = '';
  let converter = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
    'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
    'э': 'e', 'ю': 'yu', 'я': 'ya',

    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
    'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
    'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
    'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
    'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch',
    'Ш': 'Sh', 'Щ': 'Sch', 'Ь': '', 'Ы': 'Y', 'Ъ': '',
    'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
  };

  for (let i = 0; i < word.length; ++i) {
    if (converter[word[i]] == undefined) {
      answer += word[i];
    } else {
      answer += converter[word[i]];
    }
  }

  return answer;
}

function createError(btn, input, text) {
  const parent = btn.parentNode;
  input.classList.add('error');
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = text;
  parent.prepend(errorMessage);
}

function removeError(btn, input) {
  const parent = btn.parentNode;

  if (input.classList.contains('error')) {
    const allErrorMessage = parent.querySelectorAll('.error-message');
    allErrorMessage.forEach(error => {
      error.remove()
    })
    input.classList.remove('error');
  }
}

function removeErrorForContact(input) {
  const allForm = document.querySelectorAll('.form__general');

  if (input.classList.contains('error')) {
    allForm.forEach(form => {
      const allErrorMessage = form.querySelectorAll('.error-message');
      allErrorMessage.forEach(error => {
        error.remove();
      })
      input.classList.remove('error');
    })
  }
}

function validation(form, btn) {

  let result = true;

  let allInputs = form.querySelectorAll('.form__validation');

  for (let input of allInputs) {
    removeError(btn, input)

    if (input.dataset.name) {
      if (input.value.trim() === '') {
        removeError(btn, input)
        createError(btn, input, 'Введите имя');
        result = false;
      }
    }

    if (input.dataset.surname) {
      if (input.value.trim() === '') {
        removeError(btn, input)
        createError(btn, input, 'Введите фамилию');
        result = false;
      }
    }

    if (input.dataset.contact) {
      if (input.value.trim() === '') {
        removeError(btn, input)
        createError(btn, input, 'Введите контактные данные');
        result = false;
      }
    }

  }

  return result;
}

function formatHourMinutes(date) {
  let hh = date.getHours();
  if (hh < 10) hh = '0' + hh;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;

  return hh + ':' + minutes;
}

const contactSelects = () => {
  const elements = document.querySelectorAll('.contact__select');

  for (let select of elements) {
    if (select.dataset.use) continue;
    else {
      select.dataset.use = true;
      const choices = new Choices(select, {
        position: "bottom",
        searchEnabled: false,
        allowHTML: true,
      });
    }
  }


}

function addNewContact(btn) {
  const contactContainer = document.createElement('div');
  contactContainer.classList.add('contact');

  const select = document.createElement('select');
  select.setAttribute('name', 'select');
  select.id = 'customSelect';
  select.classList.add('contact__select');

  contactContainer.append(select);

  const optionTelephone = document.createElement('option');
  optionTelephone.value = 'Телефон';
  optionTelephone.textContent = 'Телефон';
  select.append(optionTelephone);

  const optionVk = document.createElement('option');
  optionVk.value = 'VK';
  optionVk.textContent = 'VK';
  select.append(optionVk);

  const optionEmail = document.createElement('option');
  optionEmail.value = 'Email';
  optionEmail.textContent = 'Email';
  select.append(optionEmail);

  const optionFacebook = document.createElement('option');
  optionFacebook.value = 'Facebook';
  optionFacebook.textContent = 'Facebook';
  select.append(optionFacebook);

  const optionOther = document.createElement('option');
  optionOther.value = 'Другое';
  optionOther.textContent = 'Другое';
  select.append(optionOther);

  const allOptions = [optionTelephone, optionVk, optionEmail, optionFacebook, optionOther];

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.classList.add('contact__input');
  input.classList.add('form__validation');
  input.classList.add('remove-error-add');
  input.dataset.contact = 'true';

  input.addEventListener('keyup', () => {
    removeErrorForContact(input);
  })

  contactContainer.append(input);


  const deleteContainer = document.createElement('div');
  deleteContainer.classList.add('contact__delete');
  contactContainer.append(deleteContainer);

  deleteContainer.addEventListener('click', () => {
    const allContacts = document.querySelectorAll('.contact');
    let containerBtn = btn.parentNode;
    if (allContacts.length === 10) {
      deleteContact(deleteContainer);
      containerBtn.style.display = 'flex';
    } else {
      deleteContact(deleteContainer);
    }
  })

  let svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  let useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/sprite.svg#delete');
  svgElem.classList.add('contact__icon');
  svgElem.style.width = '16';
  svgElem.style.height = '16';
  svgElem.setAttribute('viewBox', '0 0 16 16');
  svgElem.appendChild(useElem);
  deleteContainer.append(svgElem);

  let btnContainer = btn.parentNode;
  let parentBtnContainer = btnContainer.parentNode;
  parentBtnContainer.prepend(contactContainer);

  contactContainer.scrollIntoView(false);

  return {
    input,
    select,
    allOptions,
  };
}

function deleteContact(btn) {
  const contactContainer = btn.parentNode;

  contactContainer.remove();
}

function openDeleteModal() {
  const deleteWrraper = document.querySelector('.delete');
  const deleteModal = document.querySelector('.modal-delete');
  deleteWrraper.classList.add('wrraper--active');
  deleteModal.classList.add('modal--active');

  const closeDeleteModal = document.querySelectorAll('.delete-close');

  closeDeleteModal.forEach(btn => {
    btn.addEventListener('click', () => {
      deleteWrraper.classList.remove('wrraper--active');
      deleteModal.classList.remove('modal--active');
    })
  })
}

function addNewClient(clientObj) {
  const clientContainer = document.querySelector('.user');

  const clientItem = document.createElement('li');
  clientItem.classList.add('user__item');

  clientContainer.prepend(clientItem);

  const clientId = document.createElement('p');
  clientId.classList.add('user__id');
  const clientIdValue = String(clientObj.id).slice(8);
  const clientIdValueNum = Number(clientIdValue);
  clientId.textContent = clientIdValueNum;

  clientItem.append(clientId);

  const clientName = document.createElement('h3');
  clientName.classList.add('user__name');
  clientName.textContent = clientObj.surname + ' ' + clientObj.name + ' ' + clientObj.lastName;

  clientItem.append(clientName);

  const clientCreate = document.createElement('p');
  clientCreate.classList.add('user__create');
  const spanInsideCreate = document.createElement('span');
  let clientCreateTime = new Date(clientObj.createdAt);
  let formatClientCreateDate = formatDate(clientCreateTime);
  let formatClientCreateTime = formatHourMinutes(clientCreateTime);
  clientCreate.textContent = formatClientCreateDate;
  spanInsideCreate.textContent = formatClientCreateTime;

  clientCreate.append(spanInsideCreate);
  clientItem.append(clientCreate);

  const clientLastChange = document.createElement('p');
  clientLastChange.classList.add('user__last-change');
  const spanInsideLastChange = document.createElement('span');
  let clientLastChangeTime = new Date(clientObj.updatedAt);
  let formatClientLastChangeDate = formatDate(clientLastChangeTime);
  let formatClientLastChangeTime = formatHourMinutes(clientLastChangeTime);
  clientLastChange.textContent = formatClientLastChangeDate;
  spanInsideLastChange.textContent = formatClientLastChangeTime;

  clientLastChange.append(spanInsideLastChange);
  clientItem.append(clientLastChange);

  const clientContainerContacts = document.createElement('div');
  clientContainerContacts.classList.add('user__contacts');

  let contactsArray = clientObj.contacts;

  for (let obj of contactsArray) {

    let { type, value } = obj;

    switch (type) {
      case 'Телефон':
        let svgElemTel = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let useElemTel = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElemTel.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/sprite.svg#telephone');
        svgElemTel.classList.add('user__icon');
        svgElemTel.style.width = '16';
        svgElemTel.style.height = '16';
        svgElemTel.setAttribute('viewBox', '0 0 16 16');
        svgElemTel.appendChild(useElemTel);
        clientContainerContacts.append(svgElemTel);

        tippy(svgElemTel, {
          content: value,
          interactive: true,
          theme: 'tooltip',
          placement: 'top',
          animation: 'fade',
        });

        break;
      case 'Email':
        let svgElemMail = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let useElemMail = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElemMail.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/sprite.svg#mail');
        svgElemMail.classList.add('user__icon');
        svgElemMail.style.width = '16';
        svgElemMail.style.height = '16';
        useElemMail.setAttribute('viewBox', '0 0 16 16');
        svgElemMail.appendChild(useElemMail);
        clientContainerContacts.append(svgElemMail);

        tippy(svgElemMail, {
          content: value,
          interactive: true,
          theme: 'tooltip',
          placement: 'top',
          animation: 'fade',
        });

        break;
      case 'Facebook':
        let svgElemFacebook = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let useElemFacebook = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElemFacebook.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/sprite.svg#facebook');
        svgElemFacebook.classList.add('user__icon');
        svgElemFacebook.style.width = '16';
        svgElemFacebook.style.height = '16';
        useElemFacebook.setAttribute('viewBox', '0 0 16 16');
        svgElemFacebook.appendChild(useElemFacebook);
        clientContainerContacts.append(svgElemFacebook);

        tippy(svgElemFacebook, {
          content: value,
          interactive: true,
          theme: 'tooltip',
          placement: 'top',
          animation: 'fade',
        });

        break;
      case 'VK':
        let svgElemVk = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let useElemVk = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElemVk.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/sprite.svg#vk');
        svgElemVk.classList.add('user__icon');
        svgElemVk.style.width = '16';
        svgElemVk.style.height = '16';
        useElemVk.setAttribute('viewBox', '0 0 16 16');
        svgElemVk.appendChild(useElemVk);
        clientContainerContacts.append(svgElemVk);

        tippy(svgElemVk, {
          content: value,
          interactive: true,
          theme: 'tooltip',
          placement: 'top',
          animation: 'fade',
        });

        break;
      case 'Другое':
        let svgElemOther = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let useElemOther = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElemOther.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/sprite.svg#other');
        svgElemOther.classList.add('user__icon');
        svgElemOther.style.width = '16';
        svgElemOther.style.height = '16';
        useElemOther.setAttribute('viewBox', '0 0 16 16');
        svgElemOther.appendChild(useElemOther);
        clientContainerContacts.append(svgElemOther);

        tippy(svgElemOther, {
          content: value,
          interactive: true,
          theme: 'tooltip',
          placement: 'top',
          animation: 'fade',
        });

        break;
    }

  }

  clientItem.append(clientContainerContacts);

  const clientActionContainer = document.createElement('div');
  clientActionContainer.classList.add('user__actions');

  const clientChangeBtn = document.createElement('p');
  clientChangeBtn.classList.add('user__change');
  clientChangeBtn.classList.add('user__action');
  clientChangeBtn.tabIndex = '0';
  clientChangeBtn.textContent = 'Изменить';

  const changeFormWrraper = document.getElementById('change-client-form-wrraper');
  const modalChange = document.querySelector('.modal-change');
  let clientFIO = clientObj.surname + clientObj.name + clientObj.lastName;
  let translitClientFIOHash = '#' + translit(clientFIO);

  function changeForm() {
    changeFormWrraper.classList.add('wrraper--active');
    modalChange.classList.add('modal--active');

    const clientFormID = document.querySelector('.form__id');
    clientFormID.textContent = clientIdValueNum;
    const changeSurnameFormInput = document.getElementById('change-surname');
    changeSurnameFormInput.value = clientObj.surname;
    const changeNameFormInput = document.getElementById('change-name');
    changeNameFormInput.value = clientObj.name;
    const changeLastnameFormInput = document.getElementById('change-lastname');
    changeLastnameFormInput.value = clientObj.lastName;

    if (contactsArray.length > 0) {
      const btn = document.querySelector('.form__add-contact');
      for (let obj of contactsArray) {
        let contact = addNewContact(btn);
        let { type, value } = obj;
        contact.input.value = value;
        for (let i = 0; i < contact.allOptions.length; i++) {
          if (contact.allOptions[i].textContent === type) {
            contact.allOptions[i].selected = true;
            contactSelects();
          }
        }
      }
      if (contactsArray.length === 10) {
        const btnAddContainer = document.querySelector('.form__add');
        btnAddContainer.style.display = 'none';
      }
    }

    let clientID = clientObj.id;

    const openDeleteModalWrraper = document.querySelector('.form__btn-delete');

    openDeleteModalWrraper.addEventListener('click', (e) => {
      e.preventDefault()
      openDeleteModal();

      const deleteBtn = document.querySelector('.delete__btn');

      deleteBtn.addEventListener('click', async () => {
        await fetch(`http://localhost:3000/api/clients/${clientID}`, {
          method: 'DELETE',
        });
      })
    })

    const changeForm = document.getElementById('change-client-form');

    changeForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      mask.classList.remove('mask-hide');
      window.location.hash = '';

      if (validation(this, saveClientBtn) === true) {
        const inputNameChange = document.getElementById('change-name');
        const inputSurnameChange = document.getElementById('change-surname');
        const inputLastnameChange = document.getElementById('change-lastname');

        const allContactsType = document.querySelectorAll('.contact__select');
        const allInputsContact = document.querySelectorAll('.contact__input');


        let contactObjArray = [];
        let contactObj = {};

        for (let i = 0; allInputsContact.length > i; i++) {
          contactObj.type = allContactsType[i].value;
          contactObj.value = allInputsContact[i].value;

          contactObjArray.push(contactObj);
          contactObj = {};
        }

        const response = await fetch(`http://localhost:3000/api/clients/${clientID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: inputNameChange.value.trim(),
            surname: inputSurnameChange.value.trim(),
            lastName: inputLastnameChange.value.trim(),
            contacts: contactObjArray,
          }),
        })

        let clientObj = await response.json();

        addNewClient(clientObj);

        newClientFormWrraper.classList.remove('wrraper--active');
      }

      mask.classList.add('mask-hide');
    })

    const closeChangeForm = document.getElementById('change-client-close');
    closeChangeForm.addEventListener('click', () => {
      changeFormWrraper.classList.remove('wrraper--active');
      modalChange.classList.remove('modal--active');
      window.location.hash = '';
      location.reload()
    })
  }

  function changeFormFirstOpen() {
    if (this.isRun) {
      return false;
    }
    changeForm();
    this.isRun = true;
  }

  if (window.location.hash === translitClientFIOHash) {
    changeFormFirstOpen();
  }

  clientChangeBtn.addEventListener('click', () => {
    window.location.hash = translit(clientFIO);
    changeForm();
  });

  clientActionContainer.append(clientChangeBtn);

  const clientDeleteBtn = document.createElement('p');
  clientDeleteBtn.classList.add('user__delete');
  clientDeleteBtn.classList.add('user__action');
  clientDeleteBtn.tabIndex = '0';
  clientDeleteBtn.textContent = 'Удалить';

  clientDeleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openDeleteModal();

    let clientID = clientObj.id;

    const deleteBtn = document.querySelector('.delete__btn')

    deleteBtn.addEventListener('click', async () => {
      await fetch(`http://localhost:3000/api/clients/${clientID}`, {
        method: 'DELETE'
      });
    })
  });

  clientActionContainer.append(clientDeleteBtn);

  clientItem.append(clientActionContainer);
}

async function renderAllClients(action) {
  const response = await fetch('http://localhost:3000/api/clients');
  const allClients = await response.json();

  allClients.forEach(client => {
    action(client);
    sortClient('id', true);
  })
}

async function sortClient(prop, dir = false) {
  const response = await fetch('http://localhost:3000/api/clients');
  const clientsList = await response.json();

  let clientsArray = [...clientsList];

  if (prop === 'FIO') {
    for (let client of clientsArray) {
      client.FIO = client.surname + client.name + client.lastName;
    }
  }

  let result = clientsArray.sort(function (a, b) {
    let dirIf = dir === false ? a[prop] < b[prop] : a[prop] > b[prop];
    if (dirIf === true) return -1;
  })

  const allLi = document.querySelectorAll('.user__item');

  for (let li of allLi) {
    li.remove();
  }

  for (let client of clientsArray) {
    addNewClient(client);
  }

  return result;
}

async function searchClientFIO(value, action) {
  mask.classList.remove('mask-hide');

  const response = await fetch('http://localhost:3000/api/clients');
  const allClients = await response.json();

  let clientsArray = [...allClients];

  for (let client of clientsArray) {
    let clientFIO = client.surname + ' ' + client.name + ' ' + client.lastName;
    let clientFIOCase = clientFIO.toLowerCase();
    client.FIO = clientFIOCase;
  }

  let result = [];

  for (let client of clientsArray) {
    if (String(client['FIO']).includes(value.toLowerCase()) === true) result.push(client);
  }

  for (let client of result) {
    action(client);
  }

  mask.classList.add('mask-hide');
}

function autocomplite(client) {
  clientList.classList.add('autocomplete-list--active');

  const clientItem = document.createElement('li');
  clientItem.classList.add('client-item');
  clientItem.textContent = client.surname + ' ' + client.name + ' ' + client.lastName;

  clientItem.addEventListener('click', async () => {
    const allItem = document.querySelectorAll('.client-item');
    const arr = Array.from(allItem);
    selectItem(arr.indexOf(clientItem));
    findClient();
  })

  clientList.append(clientItem);
}

function focusItem(index) {
  const allItem = document.querySelectorAll('.client-item');
  if (!allItem.length) return false;

  if (index > allItem.length - 1) return focusItem(0);
  if (index < 0) return focusItem(allItem.length - 1);

  focusedItem = index;

  allItem.forEach(item => {
    item.classList.remove('focused-item');
  })

  allItem[focusedItem].classList.add('focused-item');
}

function selectItem(index) {
  const allItem = document.querySelectorAll('.client-item');
  search.value = allItem[index].textContent;
  clientList.classList.remove('autocomplete-list--active');
}

function findClient() {
  const allNameClient = document.querySelectorAll('.user__name');

    for(let clientName of allNameClient) {
      if(clientName.textContent === search.value) {
        let clientLi = clientName.parentNode;
        clientLi.classList.add('find-client');
        clientLi.scrollIntoView();
        setTimeout(() => {
          clientLi.classList.remove('find-client');
        }, 1500)
      }
    }
}

renderAllClients(addNewClient);

const headerSearchIcon = document.querySelector('.header__icon');
const headerSearch = document.querySelector('.header__search');
const headerLogo = document.querySelector('.header__logo');
const headerCloseSearch = document.querySelector('.header__close');
const addNewClientBtn = document.querySelector('.form__btn-add');
const saveClientBtn = document.querySelector('.form__btn-save');

headerSearchIcon.addEventListener('click', () => {
  headerSearchIcon.classList.add('header__icon--nonactive');
  headerLogo.style.display = 'none';
  headerCloseSearch.style.display = 'block';

  headerSearch.classList.add('header__search--active');
})

headerCloseSearch.addEventListener('click', () => {
  headerSearchIcon.classList.remove('header__icon--nonactive');
  headerLogo.style.display = 'block';
  headerCloseSearch.style.display = 'none';

  headerSearch.classList.remove('header__search--active');
})

const btnAddNewClient = document.querySelector('.main__add');
const newClientFormWrraper = document.getElementById('new-client-form-wrraper');
const newClientClose = document.querySelectorAll('.new-client-close');
const modalAddNewClient = document.querySelector('.modal-new');

btnAddNewClient.addEventListener('click', () => {
  newClientFormWrraper.classList.add('wrraper--active');
  modalAddNewClient.classList.add('modal--active');
})

newClientClose.forEach(close => {
  close.addEventListener('click', (e) => {
    e.preventDefault();
    newClientFormWrraper.classList.remove('wrraper--active');
    modalAddNewClient.classList.remove('modal--active');
  })
})

const btnAddNewContact = document.querySelectorAll('.form__add-contact');

btnAddNewContact.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();

    addNewContact(btn);
    contactSelects();

    const allContacts = document.querySelectorAll('.contact');
    let containerBtn = btn.parentNode;

    if (allContacts.length === 10) {
      containerBtn.style.display = 'none';
    }
  })
})

const newClientForm = document.getElementById('new-client-form');

newClientForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  mask.classList.remove('mask-hide');

  if (validation(this, addNewClientBtn) === true) {
    const inputName = document.getElementById('add-name');
    const inputSurname = document.getElementById('add-surname');
    const inputLastname = document.getElementById('add-lastname');

    const allContactsType = document.querySelectorAll('.contact__select');
    const allInputsContact = document.querySelectorAll('.contact__input');

    let contactObjArray = [];
    let contactObj = {};

    for (let i = 0; allInputsContact.length > i; i++) {
      contactObj.type = allContactsType[i].value;
      contactObj.value = allInputsContact[i].value;

      contactObjArray.push(contactObj);
      contactObj = {};
    }

    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify({
        name: inputName.value.trim(),
        surname: inputSurname.value.trim(),
        lastName: inputLastname.value.trim(),
        contacts: contactObjArray,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })

    let clientObj = await response.json();

    addNewClient(clientObj);

    newClientFormWrraper.classList.remove('wrraper--active');
  }

  mask.classList.add('mask-hide');
})

const sortBtnId = document.getElementById('sort-id');

sortBtnId.addEventListener('click', () => {
  sortBtnId.classList.toggle('line__title--up-arrow--active');
  if (sortBtnId.dataset.sort === 'false') {
    sortClient('id', true);
    sortBtnId.dataset.sort = 'true';
  } else if (sortBtnId.dataset.sort === 'true') {
    sortClient('id', false);
    sortBtnId.dataset.sort = 'false';
  }
})

const sortBtnName = document.getElementById('sort-name');

sortBtnName.addEventListener('click', () => {
  sortBtnName.classList.toggle('line__title--up-arrow--active');
  if (sortBtnName.dataset.sort === 'false') {
    sortClient('FIO', true);
    sortBtnName.dataset.sort = 'true';
  } else if (sortBtnName.dataset.sort === 'true') {
    sortClient('FIO', false);
    sortBtnName.dataset.sort = 'false';
  }
})

const sortBtnCreate = document.getElementById('sort-create');

sortBtnCreate.addEventListener('click', () => {
  sortBtnCreate.classList.toggle('line__title--up-arrow--active');
  if (sortBtnCreate.dataset.sort === 'false') {
    sortClient('createdAt', true);
    sortBtnCreate.dataset.sort = 'true';
  } else if (sortBtnCreate.dataset.sort === 'true') {
    sortClient('createdAt', false);
    sortBtnCreate.dataset.sort = 'false';
  }
})

const sortBtnUpdate = document.getElementById('sort-update');

sortBtnUpdate.addEventListener('click', () => {
  sortBtnUpdate.classList.toggle('line__title--up-arrow--active');
  if (sortBtnUpdate.dataset.sort === 'false') {
    sortClient('updatedAt', true);
    sortBtnUpdate.dataset.sort = 'true';
  } else if (sortBtnUpdate.dataset.sort === 'true') {
    sortClient('updatedAt', false);
    sortBtnUpdate.dataset.sort = 'false';
  }
})

const search = document.querySelector('.header__search');
let timer = null;
const clientList = document.querySelector('.autocomplete-list')
let focusedItem = -1;

search.addEventListener('input', function () {
  clearTimeout(timer);

  clientList.innerHTML = '';

  if (search.value.trim() !== '') {
    timer = setTimeout(searchClientFIO, 300, search.value, autocomplite);
  } else {
    clientList.classList.remove('autocomplete-list--active');
    clientList.innerHTML = '';
  } 

})

search.addEventListener('keydown', (e) => {
  let keyCode = e.keyCode;

  switch (keyCode) {
    case 40:
      e.preventDefault();
      focusedItem++
      focusItem(focusedItem);
      break;
    case 38:
      e.preventDefault();
      if(focusedItem > 0) focusedItem--;
      focusItem(focusedItem);
      break;
    case 27:
      e.preventDefault();
      clientList.classList.remove('autocomplete-list--active');
      focusedItem = -1;
      break;
    case 13:
      selectItem(focusedItem)
      findClient();
      focusedItem = -1;
  }

})

const removeErrorInputsAdd = document.querySelectorAll('.remove-error-add');
const removeErrorInputsChange = document.querySelectorAll('.remove-error-change');

removeErrorInputsAdd.forEach(addInput => {
  addInput.addEventListener('keyup', () => {
    removeError(addNewClientBtn, addInput);
  })
})

removeErrorInputsChange.forEach(changeInput => {
  changeInput.addEventListener('keyup', () => {
    removeError(saveClientBtn, changeInput);
  })
})

const mask = document.querySelector('.mask');

window.addEventListener('load', () => {
  mask.classList.add('mask-hide');
})