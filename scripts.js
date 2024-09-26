// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

    document.querySelector('.dropbtn').addEventListener('click', function() {
        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Optional: Close dropdown if clicked outside
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName('dropdown-content');
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.style.display === 'block') {
                    openDropdown.style.display = 'none';
                }
            }
        }
    }

    document.querySelector('.hamburger-btn').addEventListener('click', function() {
        const hamburgerContent = document.querySelector('.hamburger-content');
        hamburgerContent.style.display = hamburgerContent.style.display === 'block' ? 'none' : 'block';
    });
    
    // Optional: Close hamburger menu if clicked outside
    window.onclick = function(event) {
        if (!event.target.matches('.hamburger-btn')) {
            var contents = document.getElementsByClassName('hamburger-content');
            for (var i = 0; i < contents.length; i++) {
                var openContent = contents[i];
                if (openContent.style.display === 'block') {
                    openContent.style.display = 'none';
                }
            }
        }
    }

    document.querySelector('.dashboard-btn').addEventListener('click', function() {
    const dashboardContent = document.querySelector('.dashboard-content');
    // Toggle the display of the dashboard content
    this.classList.toggle('active');
    dashboardContent.style.display = dashboardContent.style.display === 'block' ? 'none' : 'block';
});

// Optional: Close dashboard menu if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.dashboard-btn')) {
        var contents = document.getElementsByClassName('dashboard-content');
        for (var i = 0; i < contents.length; i++) {
            var openContent = contents[i];
            if (openContent.style.display === 'block') {
                openContent.style.display = 'none';
            }
        }
    }
}
  
// Contact form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;

    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // For testing purposes
        alert('Message sent successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// JavaScript for handling the modal

// Get the modal
var modal = document.getElementById("imageModal");

// Get the image and insert it inside the modal
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// Get all images in the gallery
var images = document.querySelectorAll('.gallery-item img');

// Loop through images and add click event to each
images.forEach(function(image) {
  image.onclick = function() {
    modal.style.display = "flex";
    modalImg.src = this.src;
    modalImg.style.width = "auto"; // Ensure original size
    modalImg.style.height = "auto"; // Ensure original size
    captionText.innerHTML = this.alt; // Display alt text as caption
  }
});

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// Close the modal when clicking outside of the image
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

 // Initialize Stripe with your public key
 var stripe = Stripe('YOUR_PUBLIC_STRIPE_KEY');
 var elements = stripe.elements();
 
 // Create an instance of the card element
 var card = elements.create('card');
 card.mount('#card-element');
 
 // Handle form submission
 var form = document.getElementById('payment-form');
 
 form.addEventListener('submit', function(event) {
     event.preventDefault();
     
     // Create a token when the form is submitted
     stripe.createToken(card).then(function(result) {
         if (result.error) {
             // Display errors in #card-errors
             document.getElementById('card-errors').textContent = result.error.message;
         } else {
             // Send the token to your server
             stripeTokenHandler(result.token);
         }
     });
 });

 // Submit the token and payment details to the server
 function stripeTokenHandler(token) {
     // Create a hidden input to store the Stripe token
     var hiddenInput = document.createElement('input');
     hiddenInput.setAttribute('type', 'hidden');
     hiddenInput.setAttribute('name', 'stripeToken');
     hiddenInput.setAttribute('value', token.id);
     form.appendChild(hiddenInput);
     
     // Submit the form with the token
     form.submit();
 }


window.addEventListener('load', () => {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    setTimeout(() => {
        welcomeOverlay.classList.add('fade-out');
    }, 3000); // Keep welcome message for 3 seconds
});
window.addEventListener('load', function() {
    const welcomePage = document.getElementById('welcomePage');
    const mainContent = document.getElementById('mainContent');

    // Delay the transition to the main content after the airplane animation completes
    setTimeout(() => {
        welcomePage.style.opacity = '0'; // Fade out the welcome page
        setTimeout(() => {
            welcomePage.style.display = 'none'; // Hide the welcome page
            mainContent.style.display = 'block'; // Show the main content
        }, 1000); // Match this timing with the fade out duration
    }, 3000); // Match this timing with the airplane animation duration
});
document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        {
            name: 'Electronics',
            items: [
                { img: 'mj.jpeg', title: 'JUMPER CABLES', price: '₹128' },
                { img: 't1.webp', title: 'TRANSISTOR', price: '₹29' }
            ]
        },
        {
            name: 'Clothing',
            items: [
                { img: 'hoo.jpeg', title: 'Jacket', price: '₹600' },
                { img: 'tshirt.webp', title: 'T-Shirt', price: '₹200' }
            ]
        },
      
    ];

    const container = document.getElementById('categories-container');

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.name;
        categoryDiv.appendChild(categoryTitle);

        const itemsDiv = document.createElement('div');
        itemsDiv.classList.add('items');

        category.items.forEach(item => {
            const itemBox = document.createElement('div');
            itemBox.classList.add('item-box');

            const itemImg = document.createElement('img');
            itemImg.src = item.img;
            itemImg.alt = item.title;
            itemBox.appendChild(itemImg);

            const itemTitle = document.createElement('h3');
            itemTitle.textContent = item.title;
            itemBox.appendChild(itemTitle);

            const itemPrice = document.createElement('p');
            itemPrice.textContent = item.price;
            itemBox.appendChild(itemPrice);

            itemsDiv.appendChild(itemBox);
        });

        categoryDiv.appendChild(itemsDiv);
        container.appendChild(categoryDiv);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe public key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('payment-form');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        errorMessage.textContent = '';

        const {token, error} = await stripe.createToken(cardElement);

        if (error) {
            errorMessage.textContent = error.message;
            submitButton.disabled = false;
        } else {
            // Handle the token (send it to your server to process the payment)
            console.log('Received Stripe Token:', token);
            // Example: Send the token to your server
            // await fetch('/charge', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ token: token.id })
            // });

            // For demo purposes, we'll just simulate a successful payment
            setTimeout(() => {
                alert('Payment successful!');
                submitButton.disabled = false;
                form.reset();
            }, 1000);
        }
    });
});
document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('input[placeholder="Your Name"]').value;
    const email = document.querySelector('input[placeholder="Your Email"]').value;
    const message = document.querySelector('textarea[placeholder="Your Message"]').value;
    
    const response = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
    });
    
    const result = await response.text();
    alert(result);
});