document.addEventListener('DOMContentLoaded', function () {
    const openCartBtn = document.getElementById('openCartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = cartModal.querySelector('.close');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
    // New: Add and subtract buttons
    const cartContent = document.querySelector('.modal-content');
    const cartItemList = document.getElementById('cartItemList');
  
    const cart = [];

    

  
    function updateCart() {
      cartItems.innerHTML = '';
      let total = 0;
  
      cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button class="decrement" data-product="${item.name}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increment" data-product="${item.name}">+</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
      });
  
      const discountThreshold = 1000;
      if (total > discountThreshold) {
        total *= 0.9;
      }
  
      cartTotal.textContent = total.toFixed(2);
  
      // Attach event listeners for increase and decrease buttons
      const decrementButtons = document.querySelectorAll('.decrement');
      const incrementButtons = document.querySelectorAll('.increment');
  
      decrementButtons.forEach(button => {
        button.addEventListener('click', function () {
          const productName = button.getAttribute('data-product');
          const cartItem = cart.find(item => item.name === productName);
  
          if (cartItem && cartItem.quantity > 1) {
            cartItem.quantity--;
            updateCart();
          }
        });
      });
  
      incrementButtons.forEach(button => {
        button.addEventListener('click', function () {
          const productName = button.getAttribute('data-product');
          const cartItem = cart.find(item => item.name === productName);
  
          if (cartItem) {
            cartItem.quantity++;
            updateCart();
          }
        });
      });
    }
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
        const product = button.getAttribute('data-product');
        const name = button.parentElement.parentElement.querySelector('.detail p:first-child').textContent;
        const price = parseFloat(button.parentElement.parentElement.querySelector('.detail p:last-child').textContent.slice(0,-4));
  
        // Check if the product is already in the cart
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push({ name, price, quantity: 1 });
        }
        updateCart();
      });
    });
  
    openCartBtn.addEventListener('click', function () {
      cartModal.style.display = 'block';
    });
  
    closeBtn.addEventListener('click', function () {
      cartModal.style.display = 'none';
    });
  
    window.addEventListener('click', function (event) {
      if (event.target === cartModal) {
        cartModal.style.display = 'none';
      }
    });
  });

const carousel = document.querySelector(".carousel");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");

let currentIndex = 0;

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + 3) % 3;
  updateCarousel();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % 3;
  updateCarousel();
}

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);

