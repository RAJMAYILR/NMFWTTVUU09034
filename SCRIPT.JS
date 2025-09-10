// Resume Presentation JavaScript

// Global variables
let currentSlide = 1;
const totalSlides = 9;

/**
 * Shows the specified slide and hides all others
 * @param {number} slideNumber - The slide number to display
 */
function showSlide(slideNumber) {
    // Hide all slides
    const allSlides = document.querySelectorAll('.slide');
    allSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    const targetSlide = document.getElementById(`slide-${slideNumber}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }
    
    // Update slide counter
    const currentSlideElement = document.getElementById('current-slide');
    if (currentSlideElement) {
        currentSlideElement.textContent = slideNumber;
    }
    
    // Update navigation buttons state
    updateNavigationButtons(slideNumber);
    
    // Update current slide variable
    currentSlide = slideNumber;
}

/**
 * Updates the state of navigation buttons based on current slide
 * @param {number} slideNumber - Current slide number
 */
function updateNavigationButtons(slideNumber) {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    
    if (prevButton) {
        prevButton.disabled = slideNumber === 1;
    }
    
    if (nextButton) {
        nextButton.disabled = slideNumber === totalSlides;
    }
}

/**
 * Advances to the next slide if possible
 */
function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

/**
 * Goes back to the previous slide if possible
 */
function previousSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

/**
 * Handles keyboard navigation
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyboardNavigation(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            previousSlide();
            break;
        case 'Home':
            event.preventDefault();
            showSlide(1);
            break;
        case 'End':
            event.preventDefault();
            showSlide(totalSlides);
            break;
        case 'Escape':
            // Optional: Add fullscreen toggle or other functionality
            break;
    }
}

/**
 * Initializes the presentation
 */
function initializePresentation() {
    // Set up initial slide
    showSlide(1);
    
    // Set total slides counter
    const totalSlidesElement = document.getElementById('total-slides');
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add touch/swipe support for mobile devices
    addTouchSupport();
    
    console.log('Resume presentation initialized successfully!');
}

/**
 * Adds touch/swipe support for mobile navigation
 */
function addTouchSupport() {
    let startX = null;
    let startY = null;
    const minSwipeDistance = 50;
    
    const presentationContainer = document.querySelector('.presentation-container');
    
    if (!presentationContainer) return;
    
    presentationContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    presentationContainer.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > minSwipeDistance) {
                if (diffX > 0) {
                    // Swiped left - go to next slide
                    nextSlide();
                } else {
                    // Swiped right - go to previous slide
                    previousSlide();
                }
            }
        }
        
        // Reset values
        startX = null;
        startY = null;
    }, { passive: true });
}

/**
 * Optional: Auto-advance slides (uncomment to enable)
 * @param {number} interval - Time in milliseconds between slides
 */
function enableAutoAdvance(interval = 10000) {
    setInterval(() => {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            showSlide(1); // Loop back to first slide
        }
    }, interval);
}

/**
 * Utility function to go to a specific slide
 * @param {number} slideNumber - Target slide number
 */
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        showSlide(slideNumber);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializePresentation);

// Expose functions globally for HTML onclick handlers
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;
window.showSlide = showSlide;

// Optional: Enable auto-advance by uncommenting the line below
// enableAutoAdvance(10000); // 10 seconds per slide