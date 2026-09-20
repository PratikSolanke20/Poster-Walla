const WHATSAPP_NUMBER = "919665758443";
const PRICE = "₹199";

function buyNow(productName) {
    const message = `Hi Poster Walla! 👋\n\nI am interested in purchasing the *${productName}* poster for ${PRICE}.\n\nPlease guide me through the payment and delivery process.\n\nThank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Modal logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const modalBuyBtn = document.getElementById("modalBuyBtn");
let currentProduct = "";

window.openModal = function(imageSrc, productName) {
    modal.style.display = "block";
    
    // Slight delay for animation re-triggering
    modalImg.style.animation = 'none';
    modalImg.offsetHeight; // trigger reflow
    modalImg.style.animation = null; 

    modalImg.src = imageSrc;
    captionText.innerHTML = productName;
    currentProduct = productName;
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

window.closeModal = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

modalBuyBtn.onclick = function(event) {
    event.stopPropagation();
    buyNow(currentProduct);
}

// Close modal when clicking outside the image
modal.onclick = function(event) {
    if (event.target === modal || event.target.className === 'modal-content-container') {
        closeModal();
    }
}

// Close on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
        closeModal();
    }
});

// Intersection Observer for scroll animations (fade in)
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});
