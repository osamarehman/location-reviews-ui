/**
 * SimpleReviewCard Component
 * 
 * A simple, clean review card that displays:
 * - Reviewer name
 * - Rating (stars)
 * - Review date
 * - Review content
 * - Optional avatar
 * 
 * Usage:
 * <div class="simple-review-card-container" 
 *      data-name="John Smith" 
 *      data-rating="5" 
 *      data-date="2023-05-15" 
 *      data-content="Great experience!"
 *      data-avatar="">
 * </div>
 */

// Create the global LRComponents object if it doesn't exist
window.LRComponents = window.LRComponents || {};

// Register this component
window.LRComponents.SimpleReviewCard = function() {
    // Find all containers for this component
    const containers = document.querySelectorAll('.simple-review-card-container');
    
    if (!containers.length) {
        return; // No containers found, exit early
    }
    
    // Initialize each container
    containers.forEach(function(container) {
        // Get data attributes
        const name = container.dataset.name || 'Anonymous';
        const rating = parseInt(container.dataset.rating || 5, 10);
        const date = container.dataset.date || '';
        const content = container.dataset.content || 'No review content provided.';
        const avatar = container.dataset.avatar || '';
        
        // Create the review card HTML
        const cardHTML = createReviewCard(name, rating, date, content, avatar);
        
        // Insert the HTML into the container
        container.innerHTML = cardHTML;
    });
    
    /**
     * Create a review card HTML
     */
    function createReviewCard(name, rating, date, content, avatar) {
        // Generate initials for avatar fallback
        const initials = name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
        
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
        
        // Return the complete card HTML
        return `
            <div class="lr-review-card lr-simple-review-card">
                <div class="lr-review-card-header">
                    <div class="lr-review-avatar">
                        ${avatarHTML}
                    </div>
                    <div class="lr-reviewer-info">
                        <div class="lr-reviewer-name">${name}</div>
                        ${dateDisplay}
                    </div>
                    <div class="lr-review-rating">
                        ${starsHTML}
                    </div>
                </div>
                <div class="lr-review-content">
                    ${content}
                </div>
            </div>
        `;
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
