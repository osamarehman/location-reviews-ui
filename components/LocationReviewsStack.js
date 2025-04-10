/**
 * LocationReviewsStack Component
 * 
 * A component that displays detailed review cards stacked vertically for a specific location.
 * The component fetches location and review data from a JSON file stored in the GitHub repository.
 * 
 * Usage:
 * <div class="location-reviews-stack-container" 
 *      data-location-id="nyc"
 *      data-show-location-info="true"
 *      data-max-reviews="5"
 *      data-data-url="https://raw.githubusercontent.com/osamarehman/location-reviews-ui/main/data/location-reviews.json">
 * </div>
 */

// Create the global LRComponents object if it doesn't exist
window.LRComponents = window.LRComponents || {};

// Register this component
window.LRComponents.LocationReviewsStack = function() {
    // Find all containers for this component
    const containers = document.querySelectorAll('.location-reviews-stack-container');
    
    if (!containers.length) {
        return; // No containers found, exit early
    }
    
    // Initialize each container
    containers.forEach(function(container) {
        // Get data attributes
        const locationId = container.dataset.locationId || '';
        const showLocationInfo = container.dataset.showLocationInfo === 'true';
        const maxReviews = parseInt(container.dataset.maxReviews || 0, 10);
        const dataUrl = container.dataset.dataUrl || 'https://raw.githubusercontent.com/osamarehman/location-reviews-ui/main/data/location-reviews.json';
        
        // Show loading state
        container.innerHTML = '<div class="lr-loading">Loading location reviews...</div>';
        
        // Fetch location data
        fetchLocationData(dataUrl, locationId)
            .then(locationData => {
                if (!locationData) {
                    container.innerHTML = `<div class="lr-error">Location with ID "${locationId}" not found.</div>`;
                    return;
                }
                
                // Render the component
                renderLocationReviews(container, locationData, showLocationInfo, maxReviews);
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                container.innerHTML = '<div class="lr-error">Error loading location reviews. Please try again later.</div>';
            });
    });
    
    /**
     * Fetch location data from the JSON file
     */
    async function fetchLocationData(dataUrl, locationId) {
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Find the location with the matching ID
            return data.locations.find(location => location.id === locationId);
        } catch (error) {
            console.error('Error fetching location data:', error);
            throw error;
        }
    }
    
    /**
     * Render the location reviews
     */
    function renderLocationReviews(container, locationData, showLocationInfo, maxReviews) {
        // Create the main container
        const stackContainer = document.createElement('div');
        stackContainer.className = 'lr-location-reviews-stack';
        
        // Add location info if requested
        if (showLocationInfo) {
            const locationInfo = createLocationInfo(locationData);
            stackContainer.appendChild(locationInfo);
        }
        
        // Add reviews section
        const reviewsSection = document.createElement('div');
        reviewsSection.className = 'lr-reviews-section';
        
        // Add reviews heading
        const reviewsHeading = document.createElement('h3');
        reviewsHeading.className = 'lr-reviews-heading';
        reviewsHeading.textContent = 'Customer Reviews';
        reviewsSection.appendChild(reviewsHeading);
        
        // Add reviews count and average
        const reviewsSummary = document.createElement('div');
        reviewsSummary.className = 'lr-reviews-summary-compact';
        
        // Generate stars HTML for average rating
        let starsHTML = '';
        const fullStars = Math.floor(locationData.rating);
        const halfStar = locationData.rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHTML += '<span class="lr-star-filled">★</span>';
            } else if (i === fullStars + 1 && halfStar) {
                starsHTML += '<span class="lr-star-half">★</span>';
            } else {
                starsHTML += '<span class="lr-star-empty">★</span>';
            }
        }
        
        reviewsSummary.innerHTML = `
            <div class="lr-average-stars">${starsHTML}</div>
            <div class="lr-average-text">
                <span class="lr-average-number">${locationData.rating.toFixed(1)}</span> out of 5
                <span class="lr-total-reviews">(${locationData.total_reviews} reviews)</span>
            </div>
        `;
        reviewsSection.appendChild(reviewsSummary);
        
        // Add reviews stack
        const reviewsStack = document.createElement('div');
        reviewsStack.className = 'lr-reviews-stack';
        
        // Get reviews to display
        let reviews = locationData.reviews;
        if (maxReviews > 0 && reviews.length > maxReviews) {
            reviews = reviews.slice(0, maxReviews);
        }
        
        // Add each review card
        reviews.forEach(review => {
            const reviewCard = createReviewCard(review);
            reviewsStack.appendChild(reviewCard);
        });
        
        // Add "See all reviews" link if there are more reviews
        if (maxReviews > 0 && locationData.reviews.length > maxReviews) {
            const seeAllLink = document.createElement('a');
            seeAllLink.className = 'lr-see-all-link';
            seeAllLink.href = locationData.website || '#';
            seeAllLink.textContent = `See all ${locationData.total_reviews} reviews`;
            reviewsStack.appendChild(seeAllLink);
        }
        
        reviewsSection.appendChild(reviewsStack);
        stackContainer.appendChild(reviewsSection);
        
        // Replace the container content
        container.innerHTML = '';
        container.appendChild(stackContainer);
    }
    
    /**
     * Create location info element
     */
    function createLocationInfo(locationData) {
        const locationInfo = document.createElement('div');
        locationInfo.className = 'lr-location-info';
        
        // Create location header with image
        const locationHeader = document.createElement('div');
        locationHeader.className = 'lr-location-header';
        
        if (locationData.image) {
            const locationImage = document.createElement('div');
            locationImage.className = 'lr-location-image';
            locationImage.style.backgroundImage = `url(${locationData.image})`;
            locationHeader.appendChild(locationImage);
        }
        
        const locationDetails = document.createElement('div');
        locationDetails.className = 'lr-location-details';
        
        const locationName = document.createElement('h2');
        locationName.className = 'lr-location-name';
        locationName.textContent = locationData.name;
        locationDetails.appendChild(locationName);
        
        if (locationData.address) {
            const locationAddress = document.createElement('div');
            locationAddress.className = 'lr-location-address';
            locationAddress.textContent = locationData.address;
            locationDetails.appendChild(locationAddress);
        }
        
        const locationContact = document.createElement('div');
        locationContact.className = 'lr-location-contact';
        
        if (locationData.phone) {
            const locationPhone = document.createElement('a');
            locationPhone.className = 'lr-location-phone';
            locationPhone.href = `tel:${locationData.phone.replace(/[^0-9+]/g, '')}`;
            locationPhone.textContent = locationData.phone;
            locationContact.appendChild(locationPhone);
        }
        
        if (locationData.website) {
            const locationWebsite = document.createElement('a');
            locationWebsite.className = 'lr-location-website';
            locationWebsite.href = locationData.website;
            locationWebsite.textContent = 'Visit Website';
            locationWebsite.target = '_blank';
            locationWebsite.rel = 'noopener noreferrer';
            locationContact.appendChild(locationWebsite);
        }
        
        locationDetails.appendChild(locationContact);
        locationHeader.appendChild(locationDetails);
        locationInfo.appendChild(locationHeader);
        
        // Add location description if available
        if (locationData.description) {
            const locationDescription = document.createElement('div');
            locationDescription.className = 'lr-location-description';
            locationDescription.textContent = locationData.description;
            locationInfo.appendChild(locationDescription);
        }
        
        return locationInfo;
    }
    
    /**
     * Create a review card element
     */
    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'lr-detailed-review-card';
        
        // Create card header
        const header = document.createElement('div');
        header.className = 'lr-review-card-header';
        
        // Add avatar
        const avatarElement = document.createElement('div');
        avatarElement.className = 'lr-review-avatar';
        
        // Generate initials for avatar fallback
        const initials = review.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
        
        if (review.avatar) {
            const img = document.createElement('img');
            img.src = review.avatar;
            img.alt = review.name;
            avatarElement.appendChild(img);
        } else {
            avatarElement.textContent = initials;
        }
        header.appendChild(avatarElement);
        
        // Add reviewer info
        const reviewerInfo = document.createElement('div');
        reviewerInfo.className = 'lr-reviewer-info';
        
        const reviewerName = document.createElement('div');
        reviewerName.className = 'lr-reviewer-name';
        reviewerName.textContent = review.name;
        
        if (review.verified) {
            const verifiedBadge = document.createElement('span');
            verifiedBadge.className = 'lr-verified-badge';
            verifiedBadge.textContent = 'Verified';
            reviewerName.appendChild(verifiedBadge);
        }
        
        reviewerInfo.appendChild(reviewerName);
        
        const reviewDate = document.createElement('div');
        reviewDate.className = 'lr-review-date';
        reviewDate.textContent = formatDate(review.date);
        reviewerInfo.appendChild(reviewDate);
        
        header.appendChild(reviewerInfo);
        
        // Add rating
        const ratingElement = document.createElement('div');
        ratingElement.className = 'lr-review-rating';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = i <= review.rating ? 'lr-star-filled' : 'lr-star-empty';
            star.innerHTML = '★';
            ratingElement.appendChild(star);
        }
        header.appendChild(ratingElement);
        
        card.appendChild(header);
        
        // Add review title if available
        if (review.title) {
            const titleElement = document.createElement('div');
            titleElement.className = 'lr-review-title';
            titleElement.textContent = review.title;
            card.appendChild(titleElement);
        }
        
        // Add content
        const contentElement = document.createElement('div');
        contentElement.className = 'lr-review-content';
        contentElement.textContent = review.content;
        card.appendChild(contentElement);
        
        return card;
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
