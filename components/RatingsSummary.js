/**
 * RatingsSummary Component
 * 
 * A component that displays a summary of ratings with:
 * - Average rating
 * - Total number of reviews
 * - Breakdown of ratings by star level (5-star, 4-star, etc.)
 * 
 * Usage:
 * <div class="ratings-summary-container" 
 *      data-average="4.5" 
 *      data-total="120"
 *      data-distribution='{"5":80,"4":20,"3":15,"2":3,"1":2}'>
 * </div>
 * 
 * Note: The data-distribution attribute should be a JSON string of an object with keys 1-5 and values representing the count.
 */

// Create the global LRComponents object if it doesn't exist
window.LRComponents = window.LRComponents || {};

// Register this component
window.LRComponents.RatingsSummary = function() {
    // Find all containers for this component
    const containers = document.querySelectorAll('.ratings-summary-container');
    
    if (!containers.length) {
        return; // No containers found, exit early
    }
    
    // Initialize each container
    containers.forEach(function(container) {
        // Get data attributes
        const average = parseFloat(container.dataset.average || 0).toFixed(1);
        const total = parseInt(container.dataset.total || 0, 10);
        
        let distribution = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0
        };
        
        try {
            const parsedDistribution = JSON.parse(container.dataset.distribution || '{}');
            distribution = { ...distribution, ...parsedDistribution };
        } catch (e) {
            console.error('Invalid distribution JSON:', e);
        }
        
        // Create the summary HTML
        const summaryHTML = createSummaryHTML(average, total, distribution);
        
        // Insert the HTML into the container
        container.innerHTML = summaryHTML;
    });
    
    /**
     * Create the summary HTML
     */
    function createSummaryHTML(average, total, distribution) {
        // Generate stars HTML for average rating
        let starsHTML = '';
        const fullStars = Math.floor(average);
        const halfStar = average % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<span class="lr-star-filled">★</span>';
            } else if (i === fullStars + 1 && halfStar) {
                starsHTML += '<span class="lr-star-half">★</span>';
            } else {
                starsHTML += '<span class="lr-star-empty">★</span>';
            }
        }
        
        // Generate distribution bars HTML
        let distributionHTML = '';
        for (let i = 5; i >= 1; i--) {
            const count = distribution[i] || 0;
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            
            distributionHTML += `
                <div class="lr-rating-bar-row">
                    <div class="lr-rating-bar-label">${i} stars</div>
                    <div class="lr-rating-bar-container">
                        <div class="lr-rating-bar" style="width: ${percentage}%"></div>
                    </div>
                    <div class="lr-rating-bar-count">${count}</div>
                    <div class="lr-rating-bar-percentage">${percentage}%</div>
                </div>
            `;
        }
        
        // Return the complete summary HTML
        return `
            <div class="lr-ratings-summary">
                <div class="lr-ratings-header">
                    <div class="lr-average-rating">
                        <div class="lr-average-number">${average}</div>
                        <div class="lr-average-stars">
                            ${starsHTML}
                        </div>
                        <div class="lr-total-reviews">${total} reviews</div>
                    </div>
                </div>
                <div class="lr-ratings-distribution">
                    ${distributionHTML}
                </div>
            </div>
        `;
    }
};
