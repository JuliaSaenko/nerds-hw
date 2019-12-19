const button = document.querySelector(".popup-open");
const popup = document.querySelector(".contact-us");
const close = popup.querySelector(".form-close");
const form = popup.querySelector("form");
const contactSubmit = popup.querySelector('.contact-button');
const registrationOpenBtn = document.querySelector('.registration-btn');

button.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add('popup-show');
  form.reset();
  const formName = form.elements.name;
  formName.focus();
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove('popup-show');
  popup.classList.remove("popup-error");
});

contactSubmit.addEventListener('click', function () {
  if (formValidate()) {
    popup.classList.remove('popup-show');
    showSuccessMassage('Ваше сообщение успешно отправлено!', 'Мы обязательно свяжимся с Вами в ближайшее время.');

    popup.classList.remove("popup-error");
   } else {
    if(popup.classList.contains('popup-error')) {
      popup.classList.remove('popup-error');
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add('popup-error');
    }
   }
});

const showSuccessMassage = (messageHeading, messageText) => {
  const successMessage = document.querySelector('.success-message')
  const successMessageCloseBtn = document.querySelector('.success-message-close');
  const successMessageHeading = successMessage.querySelector('.success-message-lead');
  const successMessageText = successMessage.querySelector('.success-message-text');

  successMessage.classList.add('popup-show');
  successMessageHeading.textContent = messageHeading;
  successMessageText.textContent = messageText;

  successMessageCloseBtn.addEventListener('click', function () {
    successMessage.classList.remove('popup-show');
  });
};

const formValidate = () => {
  let valid = true;
  const errorPopupClass = 'popup-error';
  const formName = form.elements.name;
  const formEmail = form.elements.email;

  popup.classList.remove(errorPopupClass);

  const nameValidate = /^[^0-9]\w[^#&<>\"~;$^%{}?]{1,15}$/;
  const emailValidate = /^\w+[.!#$%&'*+/=?^_`{|}~-]*?\w*?@[a-z]+?\.[a-z]{2,4}$/;

  if (!formName.value.match(nameValidate)) {
    popup.classList.add(errorPopupClass);
    valid = false;
  }

  if (!formEmail.value.match(emailValidate)) {
    popup.classList.add(errorPopupClass);
    valid = false;
  }

  if(!form.elements.text.value) {
    popup.classList.add(errorPopupClass);
    valid = false;
  }

    return valid
};

const mainSlider = new Swiper ('.slider-list__wrapper', {
  direction: 'horizontal',
  loop: true,
  width: 1160,
  centeredSlides: true,
  spaceBetween: 100,

  pagination: {
    el: '.slider-pagination',
    type: 'bullets',
    dynamicBullets: true,
    clickable: true,
    bulletClass: 'slider-pagination-bullet'
  },

  autoplay: {
    delay: 2500,
  },
});

const getElementsFromJSON = () => {
  const menuList = document.querySelector('.site-navigation');

  fetch('data.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        const menuElements = response.menu;
        const images = response.images;
        renderMenuElements(menuElements, menuList);
        setImagesElements(images);
      });
};

const renderMenuElements = (menuArray, menuList) => {
  for(let i = 0; i < menuArray.length; i++) {
    let newMenuElement = renderElement('li', null, null);
    newMenuElement.innerHTML = `<a href="#">${menuArray[i]}</a>`;
    menuList.appendChild(newMenuElement);
  }
};

const setImagesElements = (array) => {
  const clients = document.querySelectorAll('.client-img');
  for (let i = 0; i < clients.length; i++) {
    clients[i].src = 'img/' + array[i];
  }
 };

$(window).on("scroll", function(){
  if($(window).scrollTop() + $(window).height() - 100 >= $(".about").offset().top){
    changeNumbers();
  }
});

function changeNumbers() {
  const aboutSection = document.querySelector('.about');
  const currentDedicationNumber = $('.advantages-percent-one').text();
  const currentTermNumber = $('.advantages-percent-two').text();
  const currentPrepayNumber = $('.advantages-percent-three').text();

  if (!aboutSection.classList.contains('animate')) {
    aboutSection.classList.add('animate');
    $({numberValue: currentDedicationNumber + '%'}).animate({numberValue: 146 + '%'}, {
      duration: 2500,
      easing: 'linear',
      step: function() {
        $('.advantages-percent-one').text(Math.ceil(this.numberValue) + '%');
      }
    });

    $({numberValue: currentTermNumber + '%'}).animate({numberValue: 100 + '%'}, {
      duration: 2500,
      easing: 'linear',
      step: function() {
        $('.advantages-percent-two').text(Math.ceil(this.numberValue) + '%');
      }
    });

    $({numberValue: currentPrepayNumber + '%'}).animate({numberValue: 50 + '%'}, {
      duration: 2500,
      easing: 'linear',
      step: function() {
        $('.advantages-percent-three').text(Math.ceil(this.numberValue) + '%');
      }
    });
  }
}

$('.contacts-btn').click(function() {
  $('html, body').animate({
    scrollTop: $('.main-footer').offset().top
  }, 2000);
});


registrationOpenBtn.addEventListener('click', function () {
  showRegistrationForm();
});

const showRegistrationForm = () => {
  const registrationPopup = document.querySelector('.registration');
  const registrationForm = registrationPopup.querySelector('.registration-form');
  const registrationFormClose = registrationPopup.querySelector('.registration-close');
  const registrationFormSubmit = registrationForm.querySelector('.registration-button');

  registrationForm.reset();
  const formName = registrationForm.elements.regName;
  formName.focus();

  registrationPopup.classList.add('popup-show');

  registrationFormClose.addEventListener('click', function () {
    registrationPopup.classList.remove('popup-show');
  });

  registrationFormSubmit.addEventListener('click', function () {
    if(validateRegistrationForm(registrationForm, registrationPopup)) {
      registrationPopup.classList.remove('popup-show');
      showSuccessMassage('Регистрация прошла успешно', 'Пожалйста, проверьте указаную почту для подтверждения регистрации');
    } else {
      if(registrationPopup.classList.contains('popup-error')) {
        registrationPopup.classList.remove('popup-error');
        registrationPopup.offsetWidth = registrationPopup.offsetWidth;
        registrationPopup.classList.add('popup-error');
      }
    }
  });
};

const validateRegistrationForm = (registrationForm, popup) => {
  let valid = true;
  const errorPopupClass = 'popup-error';

  popup.classList.remove(errorPopupClass);

  const nameValidate = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/;
  const emailValidate = /^\w+[.!#$%&'*+/=?^_`{|}~-]*?\w*?@[a-z]+?\.[a-z]{2,4}$/;
  const phoneValidate = /^\+[0-9]{5}\-[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/;
  const passwordValidate = /^[a-z0-9_-]{6,18}$/;

  if (!registrationForm.elements.regName.value.match(nameValidate)) {
    popup.classList.add(errorPopupClass);
    valid = false;
  }

  if (!registrationForm.elements.regEmail.value.match(emailValidate)) {
    popup.classList.add(errorPopupClass);
    valid = false;
  }

  if(!registrationForm.elements.phone.value.match(phoneValidate)) {
    popup.classList.add(errorPopupClass);
    valid = false;
  }

  if(!registrationForm.elements.password.value.match(passwordValidate)) {
    popup.classList.add(errorPopupClass);
    valid = false;
  }

  if(registrationForm.elements.password.value !== registrationForm.elements.password2.value) {
    popup.classList.add(errorPopupClass);
    valid = false;
  }

  return valid
};
