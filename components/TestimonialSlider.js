/**
 * TestimonialSlider Component
 * 
 * A slider that displays multiple testimonials with navigation controls.
 * 
 * Usage:
 * <div class="testimonial-slider-container" 
 *      data-testimonials='[
 *          {"name":"John Smith","rating":5,"date":"2023-05-15","content":"Great experience!","avatar":""},
 *          {"name":"Jane Doe","rating":4,"date":"2023-04-20","content":"Very good service.","avatar":""}
 *      ]'
 *      data-auto-play="true"
 *      data-interval="5000">
 * </div>
 * 
 * Note: The data-testimonials attribute should be a JSON string of an array of testimonial objects.
 */

// Create the global LRComponents object if it doesn't exist
window.LRComponents = window.LRComponents || {};

// Register this component
window.LRComponents.TestimonialSlider = function() {
    // Find all containers for this component
    const containers = document.querySelectorAll('.testimonial-slider-container');
    
    if (!containers.length) {
        return; // No containers found, exit early
    }
    
    // Initialize each container
    containers.forEach(function(container) {
        // Get data attributes
        let testimonials = [];
        try {
            testimonials = JSON.parse(container.dataset.testimonials || '[]');
        } catch (e) {
            console.error('Invalid testimonials JSON:', e);
            testimonials = [];
        }
        
        const autoPlay = container.dataset.autoPlay === 'true';
        const interval = parseInt(container.dataset.interval || 5000, 10);
        
        // If no testimonials, show a message
        if (!testimonials.length) {
            container.innerHTML = '<div class="lr-no-testimonials">No testimonials available.</div>';
            return;
        }
        
        // Create the slider HTML
        const sliderHTML = createSliderHTML(testimonials);
        
        // Insert the HTML into the container
        container.innerHTML = sliderHTML;
        
        // Initialize the slider functionality
        initializeSlider(container, testimonials.length, autoPlay, interval);
    });
    
    /**
     * Create the slider HTML
     */
    function createSliderHTML(testimonials) {
        // Create slides HTML
        let slidesHTML = '';
        testimonials.forEach((testimonial, index) => {
            const { name, rating, date, content, avatar } = testimonial;
            
            // Generate initials for avatar fallback
            const initials = name
                ? name.split(' ').map(n => n[0]).join('').toUpperCase()
                : '?';
            
            // Generate stars HTML
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                const starClass = i <= rating ? 'lr-star-filled' : 'lr-star-empty';
                starsHTML += `<span class="${starClass}">★</span>`;
            }
            
            // Generate avatar HTML
            let avatarHTML = '';
            if (avatar) {
                avatarHTML = `<img src="${avatar}" alt="${name}" class="lr-w-full lr-h-full lr-object-cover">`;
            } else {
                avatarHTML = initials;
            }
            
            // Format date if provided
            const dateDisplay = date ? `<div class="lr-review-date">${formatDate(date)}</div>` : '';
            
            // Create slide HTML
            slidesHTML += `
                <div class="lr-testimonial-slide ${index === 0 ? 'lr-active' : ''}" data-slide="${index}">
                    <div class="lr-testimonial-card">
                        <div class="lr-testimonial-content">
                            <div class="lr-testimonial-quote">"${content}"</div>
                        </div>
                        <div class="lr-testimonial-footer">
                            <div class="lr-testimonial-avatar">
                                ${avatarHTML}
                            </div>
                            <div class="lr-testimonial-info">
                                <div class="lr-testimonial-name">${name}</div>
                                ${dateDisplay}
                                <div class="lr-testimonial-rating">
                                    ${starsHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Create navigation dots HTML
        let dotsHTML = '<div class="lr-testimonial-dots">';
        testimonials.forEach((_, index) => {
            dotsHTML += `<span class="lr-testimonial-dot ${index === 0 ? 'lr-active' : ''}" data-slide="${index}"></span>`;
        });
        dotsHTML += '</div>';
        
        // Create navigation arrows HTML
        const arrowsHTML = `
            <button class="lr-testimonial-arrow lr-prev" aria-label="Previous testimonial">❮</button>
            <button class="lr-testimonial-arrow lr-next" aria-label="Next testimonial">❯</button>
        `;
        
        // Return the complete slider HTML
        return `
            <div class="lr-testimonial-slider">
                <div class="lr-testimonial-slides">
                    ${slidesHTML}
                </div>
                ${arrowsHTML}
                ${dotsHTML}
            </div>
        `;
    }
    
    /**
     * Initialize slider functionality
     */
    function initializeSlider(container, slideCount, autoPlay, interval) {
        if (slideCount <= 1) return; // No need for slider functionality with only one slide
        
        const slider = container.querySelector('.lr-testimonial-slider');
        const slides = container.querySelectorAll('.lr-testimonial-slide');
        const dots = container.querySelectorAll('.lr-testimonial-dot');
        const prevBtn = container.querySelector('.lr-prev');
        const nextBtn = container.querySelector('.lr-next');
        
        let currentSlide = 0;
        let autoPlayInterval;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Normalize index (loop around if out of bounds)
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;
            
            // Update current slide
            currentSlide = index;
            
            // Update slides
            slides.forEach((slide, i) => {
                slide.classList.toggle('lr-active', i === currentSlide);
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('lr-active', i === currentSlide);
            });
        }
        
        // Set up auto play
        function startAutoPlay() {
            if (autoPlay) {
                autoPlayInterval = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, interval);
            }
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Event listeners for navigation
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(currentSlide - 1);
            startAutoPlay();
        });
        
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(currentSlide + 1);
            startAutoPlay();
        });
        
        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopAutoPlay();
                showSlide(parseInt(dot.dataset.slide, 10));
                startAutoPlay();
            });
        });
        
        // Pause auto play on hover
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
        
        // Start auto play
        startAutoPlay();
    }
    
    /**
     * Format date to a more readable format
     */
    function formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    }
};
