'use strict';

const radioButtons = document.querySelectorAll("input[type='radio']");
const products = document.querySelectorAll('.products');
const firstProduct = document.querySelector('.container');
let productCount = 5;

// радиокнопки
for (let i = 0; i < radioButtons.length; i++) {
  const radioButton = radioButtons[i];
  radioButton.addEventListener('click', function () {
    addClass();
    if (radioButton.checked) {
      productCount = radioButton.value;
      return productCount;
    }
  });
}

function addClass() {
  for (let j = 0; j < radioButtons.length; j++) {
    if (radioButtons[j].checked) {
      products[j].classList.add('_active');
    } else {
      products[j].classList.remove('_active');
    }
  }
}

function addProduct() {
  if (productCount > 1) {
    for (let i = 2; i <= productCount; i++) {
      // этот страшный код - разметка
      let textCode = `<div class='product' id=forDel${i}><div class='num'><h2 class='marg'>Product ${i}</h2><button type="button" class="close" id='${i}'><img src="img/btn_close.png" alt="closeButton" /></button></div><label for='products${i}'><p class='description'>Enter main keyword for the product</p><input placeholder="for example, sylicon wine cup" type="text" name="products${i}" id="products${i}"/></label><label for="products${i}__link"><p class="description d_link">Enter link to the similar product as a reference</p><input  placeholder="https://..."  type="url"  name="products${i}__link"  id="products${i}__link"/></label></div>`;

      firstProduct.insertAdjacentHTML('beforeEnd', textCode);
    }

    switch (Number(productCount)) {
      case 5:
        price.value = `Submit and Pay 80 USD`;
        break;
      case 4:
        price.value = `Submit and Pay 72 USD`;
        break;
      case 3:
        price.value = `Submit and Pay 60 USD`;
        break;
      case 2:
        price.value = `Submit and Pay 44 USD`;
        break;
    }
  }
  const closeButtons = document.querySelectorAll('.close');

  removeProducts(closeButtons);
}

const price = document.querySelector('#pay');
const continueButton = document.querySelector('.next');
continueButton.addEventListener('click', function () {
  addProduct();
  slide(1, 2);
});

function removeProducts(closeButtons) {
  if (closeButtons.length > 0) {
    for (let i = 0; i < closeButtons.length; i++) {
      const closeButton = closeButtons[i];
      closeButton.addEventListener('click', function (e) {
        if (e.target.closest(`#forDel${i + 2}`)) {
          e.target.closest(`#forDel${i + 2}`).classList.add('_deleted');
          setTimeout(() => {
            e.target.closest(`#forDel${i + 2}`).remove();
            const h2Family = document.querySelectorAll('.product .marg');
            for (let j = 0; j < h2Family.length; j++) {
              let h2 = h2Family[j];
              h2.innerHTML = `Product ${j + 1}`;
            }

            switch (h2Family.length) {
              case 5:
                price.value = `Submit and Pay 80 USD`;
                break;
              case 4:
                price.value = `Submit and Pay 72 USD`;
                break;
              case 3:
                price.value = `Submit and Pay 60 USD`;
                break;
              case 2:
                price.value = `Submit and Pay 44 USD`;
                break;
              case 1:
                price.value = `Submit and Pay 24.99 USD`;
                break;
            }
          }, 500);
        }
      });
    }
  }
}

const pricesLoaders = document.querySelectorAll('.form__body.load');
const pricesText = document.querySelectorAll('.pay');

for (let j = 0; j < pricesText.length; j++) {
  const anim = pricesText[j];

  anim.addEventListener('click', function () {
    let price = anim.value;
    anim.value = '';
    for (let z = 0; z < pricesLoaders.length; z++) {
      if (z == j) {
        const pricesLoader = pricesLoaders[z];
        const loaderCode = `<img src="img/loader.png" alt="loader" />`;
        pricesLoader.insertAdjacentHTML('beforeEnd', loaderCode);
        const loader = document.querySelector("img[alt = 'loader']");
        setTimeout(() => {
          loader.remove();
          let payStatus = Math.round(Math.random());
          console.log(payStatus);
          if (payStatus) {
            if (j == 0) {
              slide(0, 3);
            } else {
              slide(2, 3);
            }
            // location.href = 'paymentsuccess';
          } else {
            if (j == 0) {
              slide(0, 4);
            } else {
              slide(2, 4);
            }
            // location.href = 'paymenterror';
          }

          // код выше - добавление в url приставки о выполнении/невыполнении платежа, не совсем понял, какая была задумка, поэтому закоментировал эту часть кода
        }, 2000);
        setTimeout(() => {
          anim.value = price;
        }, 3000);
      }
    }
  });
}

// переходы
const forms = document.querySelectorAll('.form');

function slide(firstForm, secondForm) {
  if (
    forms[firstForm].classList.contains('_nextForm') ||
    forms[secondForm].classList.contains('_prevForm') ||
    forms[firstForm].classList.contains('_conveyor') ||
    forms[secondForm].classList.contains('_conveyor')
  ) {
    forms[firstForm].classList.remove('_nextForm');
    forms[secondForm].classList.remove('_prevForm');
    forms[firstForm].classList.remove('_conveyor');
    forms[secondForm].classList.remove('_conveyor');
  }
  forms[firstForm].classList.add('_prevForm');
  forms[secondForm].classList.add('_nextForm');
  setTimeout(() => {
    forms[firstForm].classList.add('_conveyor');
  }, 1000);
  if (!secondForm) {
    //обнуляем количество уже созданных продуктов
    firstProduct.innerHTML = `<div class='product'><h2 class='marg'>Product 1</h2><label for='products1'><p class='description'>Enter main keyword for the product</p><input placeholder="for example, sylicon wine cup" type="text" name="products1" id="products1"/></label><label for="products1__link"><p class="description d_link">Enter link to the similar product as a reference</p><input  placeholder="https://..."  type="url"  name="products1__link"  id="products1__link"/></label></div>`;
    //обнуляем значения вводных данных
    const emailClear = document.querySelectorAll("input[type='email']");
    const textClear = document.querySelectorAll("input[type='text']");
    const linksClear = document.querySelectorAll("input[type='url']");
    for (let i = 0; i < 2; i++) {
      const email = emailClear[i];
      const text = textClear[i];
      const links = linksClear[i];
      email.value = '';
      text.value = '';
      links.value = '';
    }
  }
}

const addBtn = document.querySelector('.add__btn');
addBtn.addEventListener('click', function () {
  slide(0, 1);
});

const backBtn = document.querySelector('.back.greenBtn');
backBtn.addEventListener('click', function () {
  slide(3, 0);
});

const backBtnRed = document.querySelector('.back.redBtn');
backBtnRed.addEventListener('click', function () {
  slide(4, 0);
});
