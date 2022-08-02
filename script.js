"strict mode";
const quantityEl = document.querySelector(".quantity");
let quantity = +quantityEl.textContent;
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const addToCart = document.querySelector(".add");
const cartBadge = document.querySelector(".badge");
let numItemsInCart = +cartBadge.attributes[1].value;
const cart = document.querySelector(".cart");
const price = +document.querySelector(".price").textContent.replace("$", "");
const cartFull = document.querySelector(".cart-full");
const cartEmpty = document.querySelector(".cart-empty");
const cartBox = document.querySelector(".cart-box");

//hamburger manu
const menu_ = document.querySelector(".menu--");
const menu = document.querySelector(".menu");
const navMenu = document.querySelector(".nav-menu");

//slider
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".next");
const btnLeft = document.querySelector(".prev");

let isCartShown = false;

plus.addEventListener("click", function () {
  quantity = quantity + 1;
  quantityEl.textContent = quantity;
});
minus.addEventListener("click", function () {
  if (quantity <= 0) return;
  quantity = quantity - 1;
  quantityEl.textContent = quantity;
});
addToCart.addEventListener("click", function () {
  cartBadge.attributes[1].textContent = quantity;
  renderCart();
});

const renderCart = function () {
  cartBox.innerHTML = "";

  const markupEmpty = `
  <p class="cart-title">cart</p>
  <hr></hr>
  <p class="empty-msg">Your cart is empty</p>`;
  const markupFull = `

        <p class="cart-title">cart</p>
        <hr></hr>
        <div class="cart-full-container">
            <img class="cart-img" src="images/image-product-1.jpg">
            <div>
              <p class="full-msg">Fall Limited Edition Sneakers</p>

              <div class="price-container--full">
                  <ul>
                      <li class="light-gray-text">$${price}</li>
                      <li class="light-gray-text">x${quantity}</li>
                      <li class="text-bold--full">$${price * quantity}</li>
                  </ul>
              </div>
            </div>

            <img class="deleteImg" src="images/icon-delete.svg">
        </div>
        <div class="checkout">Checkout</div>
     `;
  if (quantity === 0) {
    cartBox.insertAdjacentHTML("beforeend", markupEmpty);
  } else if (quantity >= 1) {
    cartBox.insertAdjacentHTML("beforeend", markupFull);
  }
};
//cart clicked
cart.addEventListener("click", function () {
  renderCart();

  isCartShown = !isCartShown;

  if (isCartShown === true) {
    cartBox.style.opacity = 1;
  } else {
    cartBox.style.opacity = 0;
  }
});
const checkout = document.querySelector(".checkout");

cartBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkout")) {
    cartBox.innerHTML = "";

    const markup = `
    <p class="cart-title">cart</p>
    <hr></hr>
    <p class="msg">Order received!</p>`;
    cartBox.insertAdjacentHTML("beforeend", markup);
  }
});

// const deleteItem = document.querySelector(".deleteImg");
cartBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteImg")) {
    cartBox.innerHTML = "";

    const markup = `
    <p class="cart-title">cart</p>
    <hr></hr>
    <p class="empty-msg">Your shopping cart is empty</p>`;
    cartBox.insertAdjacentHTML("beforeend", markup);
    quantity = 0;
    cartBadge.attributes[1].textContent = 0;
    quantityEl.textContent = quantity;
  }
});

//slider
let currentSlide = 0;
const maxSlide = slides.length - 1;
const secondaryImages = document.querySelectorAll(".img-secondary");
const manageHovers = function () {
  secondaryImages.forEach((img, i) => {
    img.classList.remove("hover");
    if (i === currentSlide) {
      img.classList.add("hover");
    }
  });
};

const goToSlide = function (slide) {
  slides.forEach((sl, idx) => {
    sl.style.transform = `translateX(${100 * (idx - slide)}%)`;
    manageHovers();
  });
};

const nextSlide = function () {
  if (currentSlide === maxSlide) currentSlide = 0;
  else {
    currentSlide++;
  }
};

const prevSlide = function () {
  if (currentSlide === 0) currentSlide = maxSlide;
  else {
    currentSlide--;
  }
};

goToSlide(0);

btnRight.addEventListener("click", function () {
  nextSlide();
  goToSlide(currentSlide);
});

btnLeft.addEventListener("click", function () {
  prevSlide();
  goToSlide(currentSlide);
});

//keyboard sliding
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
    goToSlide(currentSlide);
  }
  if (e.key === "ArrowLeft") {
    prevSlide();
    goToSlide(currentSlide);
  }
});

// click on thumbnails to make them appear as primary:
secondaryImages.forEach((img, i) => {
  img.addEventListener("click", function () {
    currentSlide = i;
    goToSlide(i);
  });
});

// hamburger manu:
const navbar = document.querySelector(".navbar");
menu_.addEventListener("click", function () {
  navbar.style.left = "0";
  btnLeft.style.opacity = "0";
});
menu.addEventListener("click", () => {
  navbar.style.left = "-100%";
  btnLeft.style.opacity = "1";
});
