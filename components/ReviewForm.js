/**
 * ReviewForm Component
 * 
 * A form for submitting new reviews with:
 * - Name input
 * - Email input
 * - Rating selection
 * - Review text area
 * - Submit button
 * 
 * Usage:
 * <div class="review-form-container" 
 *      data-location-id="123"
 *      data-submit-url="/wp-admin/admin-ajax.php"
 *      data-action="submit_review"
 *      data-success-message="Thank you for your review!">
 * </div>
 */

// Create the global LRComponents object if it doesn't exist
window.LRComponents = window.LRComponents || {};

// Register this component
window.LRComponents.ReviewForm = function() {
    // Find all containers for this component
    const containers = document.querySelectorAll('.review-form-container');
    
    if (!containers.length) {
        return; // No containers found, exit early
    }
    
    // Initialize each container
    containers.forEach(function(container) {
        // Get data attributes
        const locationId = container.dataset.locationId || '';
        const submitUrl = container.dataset.submitUrl || '';
        const action = container.dataset.action || 'submit_review';
        const successMessage = container.dataset.successMessage || 'Thank you for your review!';
        
        // Create the form HTML
        const formHTML = createFormHTML(locationId, action);
        
        // Insert the HTML into the container
        container.innerHTML = formHTML;
        
        // Initialize the form functionality
        initializeForm(container, submitUrl, successMessage);
    });
    
    /**
     * Create the form HTML
     */
    function createFormHTML(locationId, action) {
        return `
            <div class="lr-review-form">
                <h3 class="lr-form-title">Write a Review</h3>
                <form id="lr-review-form">
                    <input type="hidden" name="action" value="${action}">
                    <input type="hidden" name="location_id" value="${locationId}">
                    
                    <div class="lr-form-group">
                        <label for="lr-reviewer-name">Your Name</label>
                        <input type="text" id="lr-reviewer-name" name="reviewer_name" required>
                    </div>
                    
                    <div class="lr-form-group">
                        <label for="lr-reviewer-email">Your Email</label>
                        <input type="email" id="lr-reviewer-email" name="reviewer_email" required>
                    </div>
                    
                    <div class="lr-form-group">
                        <label>Your Rating</label>
                        <div class="lr-rating-selector">
                            <div class="lr-rating-stars">
                                <span class="lr-rating-star" data-rating="1">★</span>
                                <span class="lr-rating-star" data-rating="2">★</span>
                                <span class="lr-rating-star" data-rating="3">★</span>
                                <span class="lr-rating-star" data-rating="4">★</span>
                                <span class="lr-rating-star" data-rating="5">★</span>
                            </div>
                            <input type="hidden" id="lr-rating" name="rating" value="5">
                        </div>
                    </div>
                    
                    <div class="lr-form-group">
                        <label for="lr-review-content">Your Review</label>
                        <textarea id="lr-review-content" name="review_content" rows="5" required></textarea>
                    </div>
                    
                    <div class="lr-form-group">
                        <button type="submit" class="lr-submit-button">Submit Review</button>
                    </div>
                </form>
                <div class="lr-form-message"></div>
            </div>
        `;
    }
    
    /**
     * Initialize form functionality
     */
    function initializeForm(container, submitUrl, successMessage) {
        const form = container.querySelector('#lr-review-form');
        const ratingStars = container.querySelectorAll('.lr-rating-star');
        const ratingInput = container.querySelector('#lr-rating');
        const messageContainer = container.querySelector('.lr-form-message');
        
        // Initialize rating stars
        ratingStars.forEach(star => {
            // Set initial state (5 stars selected by default)
            if (parseInt(star.dataset.rating, 10) <= 5) {
                star.classList.add('lr-selected');
            }
            
            // Add click event
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating, 10);
                ratingInput.value = rating;
                
                // Update star styling
                ratingStars.forEach(s => {
                    const starRating = parseInt(s.dataset.rating, 10);
                    s.classList.toggle('lr-selected', starRating <= rating);
                });
            });
            
            // Add hover effects
            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating, 10);
                
                ratingStars.forEach(s => {
                    const starRating = parseInt(s.dataset.rating, 10);
                    if (starRating <= rating) {
                        s.classList.add('lr-hover');
                    } else {
                        s.classList.remove('lr-hover');
                    }
                });
            });
        });
        
        // Add mouseleave event to rating container
        const ratingContainer = container.querySelector('.lr-rating-stars');
        ratingContainer.addEventListener('mouseleave', () => {
            ratingStars.forEach(s => {
                s.classList.remove('lr-hover');
            });
        });
        
        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitButton = form.querySelector('.lr-submit-button');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Clear previous messages
            messageContainer.innerHTML = '';
            messageContainer.className = 'lr-form-message';
            
            // Get form data
            const formData = new FormData(form);
            
            // If submitUrl is provided, submit the form
            if (submitUrl) {
                fetch(submitUrl, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show success message
                        messageContainer.innerHTML = successMessage;
                        messageContainer.classList.add('lr-success');
                        
                        // Reset form
                        form.reset();
                        
                        // Reset rating stars
                        ratingInput.value = 5;
                        ratingStars.forEach(s => {
                            const starRating = parseInt(s.dataset.rating, 10);
                            s.classList.toggle('lr-selected', starRating <= 5);
                        });
                    } else {
                        // Show error message
                        messageContainer.innerHTML = data.message || 'An error occurred. Please try again.';
                        messageContainer.classList.add('lr-error');
                    }
                })
                .catch(error => {
                    // Show error message
                    messageContainer.innerHTML = 'An error occurred. Please try again.';
                    messageContainer.classList.add('lr-error');
                    console.error('Error submitting review:', error);
                })
                .finally(() => {
                    // Reset button
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
            } else {
                // If no submitUrl, just show a demo success message
                setTimeout(() => {
                    messageContainer.innerHTML = 'Demo mode: ' + successMessage;
                    messageContainer.classList.add('lr-success');
                    
                    // Reset form
                    form.reset();
                    
                    // Reset rating stars
                    ratingInput.value = 5;
                    ratingStars.forEach(s => {
                        const starRating = parseInt(s.dataset.rating, 10);
                        s.classList.toggle('lr-selected', starRating <= 5);
                    });
                    
                    // Reset button
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 1000);
            }
        });
    }
};
