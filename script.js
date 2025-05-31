 // JavaScript for handling the size selection, hold-to-click functionality, and color options
 let selectedSize = null; // Track the selected size
 let isHolding = false; // Track if the button is being held down

 document.querySelectorAll('.size-btn').forEach(button => {
     button.addEventListener('mousedown', function () {
         // Highlight the button when pressed
         button.classList.add('selected');
         isHolding = true;
         selectedSize = button.getAttribute('data-size');

         // Show color options only after a size has been selected
         if (selectedSize && isHolding) {
             displayColorsForSize(selectedSize);
         }
     });

     button.addEventListener('mouseup', function () {
         // Remove highlight when the mouse is released
         button.classList.remove('selected');
         isHolding = false;
     });

     button.addEventListener('click', function () {
         // Prevent click action if it's already being held
         if (isHolding) {
             return;
         }

         // Toggle size selection and reset color options if needed
         if (selectedSize === button.getAttribute('data-size')) {
             button.classList.remove('selected');
             selectedSize = null;
             hideColorSelection();
         } else {
             button.classList.add('selected');
             selectedSize = button.getAttribute('data-size');
             displayColorsForSize(selectedSize);
         }
     });
 });

 function displayColorsForSize(size) {
     const colorSelection = document.getElementById('color-selection');
     const colorButtons = document.getElementById('color-buttons');

     // Clear previous color options
     colorButtons.innerHTML = '';

     // Show color options based on selected size
     colorSelection.style.display = 'block';

     // Example color options per size (this can be expanded or dynamically fetched)
     let availableColors = [];
     if (size == 1 || size == 4 || size == 6) {
         availableColors = ['Red', 'Blue', 'Green'];
     } else if (size == 9 || size == 12) {
         availableColors = ['Black', 'White'];
     } else {
         availableColors = ['Grey', 'Orange'];
     }

     // Add color options to the page
     availableColors.forEach(color => {
         const colorButton = document.createElement('button');
         colorButton.classList.add('color-btn');
         colorButton.innerText = color;
         colorButton.setAttribute('data-color', color);
         colorButton.addEventListener('click', function () {
             document.getElementById('productImage').src = `images/${color.toLowerCase()}-image.png`; // Change image based on selected color
         });
         colorButtons.appendChild(colorButton);
     });
 }

 function hideColorSelection() {
     const colorSelection = document.getElementById('color-selection');
     colorSelection.style.display = 'none';
 }

 // Function to simulate adding to cart
 function addToCart() {
     if (selectedSize) {
         alert("Added to Cart!");
     } else {
         alert("Please select a size first.");
     }
 }
 