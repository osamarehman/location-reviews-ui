# Location Reviews UI Components

## Overview

This repository contains a collection of UI components for displaying location reviews on websites. The components are built with vanilla JavaScript and CSS, making them easy to integrate into any website, including WordPress sites with Beaver Builder.

## Components

### 1. SimpleReviewCard
A simple card that displays a single review with rating, name, date, and content.

### 2. TestimonialSlider
A slider component that cycles through multiple testimonials with navigation controls.

### 3. RatingsSummary
A component that displays average ratings and a distribution of ratings.

### 4. ReviewForm
A form component that allows users to submit reviews.

### 5. LocationReviewsStack
A component that displays detailed review cards stacked vertically for a specific location, with an optional fixed doctor card beside the reviews.

## LocationReviewsStack Component

The `LocationReviewsStack` component is the most advanced component in the collection. It provides a rich, interactive way to display location reviews with the following features:

### Features

1. **Vertical Stacked Review Cards**: Displays detailed review cards in a vertical stack.
2. **Fixed Doctor Card**: Shows a doctor profile card that remains fixed while scrolling through reviews.
3. **GitHub-Hosted Data**: All location and review data is stored in a JSON file on GitHub, making it easy to update.
4. **Interactive Animations**: Includes fade, slide, and scale animations for review cards.
5. **Hover and Click Effects**: Cards have hover effects and can be clicked to open detailed reviews.
6. **Responsive Design**: Works well on all screen sizes, with appropriate layout adjustments for mobile.
7. **Customizable**: Offers many configuration options through data attributes.

### Usage

```html
<div class="location-reviews-stack-container" 
     data-location-id="nyc"
     data-show-location-info="true"
     data-max-reviews="3"
     data-doctor-id="dr-smith"
     data-show-doctor-card="true"
     data-animation="fade"
     data-data-url="https://raw.githubusercontent.com/osamarehman/location-reviews-ui/main/data/location-reviews.json">
</div>

<script src="components/LocationReviewsStack.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof window.LRComponents !== 'undefined' && 
            typeof window.LRComponents.LocationReviewsStack === 'function') {
            window.LRComponents.LocationReviewsStack();
        }
    });
</script>
```

### Configuration Options

| Parameter | Description | Default |
|-----------|-------------|---------|
| `data-location-id` | ID of the location to display | (required) |
| `data-show-location-info` | Whether to show location information | `true` |
| `data-max-reviews` | Maximum number of reviews to display (0 = show all) | `0` |
| `data-doctor-id` | ID of the doctor to display in the fixed card | (none) |
| `data-show-doctor-card` | Whether to show the doctor card | `false` |
| `data-animation` | Animation type for cards ("fade", "slide", "scale", "none") | `"fade"` |
| `data-data-url` | URL to the JSON data file | GitHub URL |

### Data Structure

The component uses a JSON file with the following structure:

```json
{
  "locations": [
    {
      "id": "location-id",
      "name": "Location Name",
      "address": "Location Address",
      "phone": "Phone Number",
      "website": "Website URL",
      "rating": 4.8,
      "total_reviews": 156,
      "image": "Location Image URL",
      "description": "Location Description",
      "doctors": [
        {
          "id": "doctor-id",
          "name": "Doctor Name",
          "title": "Doctor Title",
          "specialty": "Doctor Specialty",
          "experience": "Experience",
          "image": "Doctor Image URL",
          "bio": "Doctor Bio",
          "credentials": ["Credential 1", "Credential 2"],
          "link": "Doctor Profile URL"
        }
      ],
      "reviews": [
        {
          "id": 1,
          "name": "Reviewer Name",
          "rating": 5,
          "date": "2023-05-15",
          "title": "Review Title",
          "content": "Review Content",
          "avatar": "Avatar URL",
          "verified": true,
          "link": "Review Detail URL",
          "doctor": "doctor-id"
        }
      ]
    }
  ]
}
```

## Implementation Details

### CSS Variables

The components use CSS variables for consistent styling and easy customization:

```css
:root {
    /* Base colors */
    --lr-primary-color: #4f46e5;
    --lr-primary-dark: #4338ca;
    --lr-primary-light: #818cf8;
    --lr-text-dark: #1f2937;
    --lr-text-medium: #4b5563;
    --lr-text-light: #9ca3af;
    --lr-bg-white: #ffffff;
    --lr-border-light: #e5e7eb;
    --lr-border-medium: #d1d5db;
    --lr-star-filled: #fbbf24;
    --lr-star-empty: #d1d5db;
    
    /* Success and error colors */
    --lr-success-bg: #ecfdf5;
    --lr-success-text: #065f46;
    --lr-success-border: #10b981;
    --lr-error-bg: #fef2f2;
    --lr-error-text: #991b1b;
    --lr-error-border: #ef4444;
    
    /* Spacing */
    --lr-spacing-xs: 0.25rem;
    --lr-spacing-sm: 0.5rem;
    --lr-spacing-md: 0.75rem;
    --lr-spacing-lg: 1rem;
    --lr-spacing-xl: 1.5rem;
    --lr-spacing-2xl: 2rem;
    
    /* Typography */
    --lr-text-xs: 0.75rem;
    --lr-text-sm: 0.875rem;
    --lr-text-base: 1rem;
    --lr-text-lg: 1.125rem;
    --lr-text-xl: 1.25rem;
    --lr-text-2xl: 1.5rem;
    --lr-text-3xl: 1.875rem;
    
    /* Border radius */
    --lr-radius-sm: 0.125rem;
    --lr-radius-md: 0.375rem;
    --lr-radius-lg: 0.5rem;
    --lr-radius-full: 9999px;
    
    /* Shadows */
    --lr-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --lr-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --lr-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    
    /* Transitions */
    --lr-transition-fast: 0.2s ease-in-out;
    --lr-transition-normal: 0.3s ease-in-out;
    --lr-transition-slow: 0.5s ease-in-out;
    
    /* Avatar sizes */
    --lr-avatar-sm: 32px;
    --lr-avatar-md: 48px;
    --lr-avatar-lg: 60px;
}
```

### Animations

The component supports three types of animations:

1. **Fade**: Cards fade in while moving up slightly.
2. **Slide**: Cards slide in from the left.
3. **Scale**: Cards scale up from a slightly smaller size.

These animations are implemented using CSS transitions and transforms:

```css
.lr-detailed-review-card {
    /* ... other styles ... */
    transition: transform var(--lr-transition-normal), box-shadow var(--lr-transition-normal), opacity var(--lr-transition-normal);
    opacity: 0;
}

.lr-card-visible {
    opacity: 1;
}

.lr-animation-fade {
    transform: translateY(20px);
}

.lr-animation-fade.lr-card-visible {
    transform: translateY(0);
}

.lr-animation-scale {
    transform: scale(0.95);
}

.lr-animation-scale.lr-card-visible {
    transform: scale(1);
}

.lr-animation-slide {
    transform: translateX(-20px);
}

.lr-animation-slide.lr-card-visible {
    transform: translateX(0);
}
```

### Interactive Features

Review cards can be made clickable by providing a `link` property in the review data. When clicked, the card opens the link in a new tab. The cards also have hover effects:

```css
.lr-clickable {
    cursor: pointer;
}

.lr-card-hover {
    transform: translateY(-5px);
    box-shadow: var(--lr-shadow-lg);
}

.lr-review-link-indicator {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: var(--lr-spacing-sm);
    color: var(--lr-primary-color);
    font-size: var(--lr-text-sm);
    font-weight: 500;
}

.lr-review-link-indicator .lr-arrow {
    margin-left: var(--lr-spacing-xs);
    transition: transform var(--lr-transition-fast);
}

.lr-clickable:hover .lr-review-link-indicator .lr-arrow {
    transform: translateX(3px);
}
```

### Doctor Card

The doctor card is implemented as a fixed element that stays visible while scrolling through reviews:

```css
.lr-doctor-card {
    background-color: var(--lr-bg-white);
    border-radius: var(--lr-radius-lg);
    box-shadow: var(--lr-shadow-md);
    overflow: hidden;
    position: sticky;
    top: var(--lr-spacing-xl);
    max-height: calc(100vh - 2 * var(--lr-spacing-xl));
    overflow-y: auto;
    transition: transform var(--lr-transition-normal), box-shadow var(--lr-transition-normal);
}
```

On mobile devices, the layout changes to a single column with the doctor card above the reviews:

```css
@media (max-width: 768px) {
    .lr-layout-with-doctor {
        grid-template-columns: 1fr;
        gap: var(--lr-spacing-xl);
    }
    
    .lr-doctor-card {
        position: relative;
        top: 0;
        max-height: none;
        overflow-y: visible;
    }
}
```

## Extending the Component

### 1. Adding New Animation Types

To add a new animation type:

1. Add a new CSS class in `styles.css`:

```css
.lr-animation-new-type {
    /* Initial state */
    transform: /* your initial transform */;
}

.lr-animation-new-type.lr-card-visible {
    /* Final state */
    transform: /* your final transform */;
}
```

2. Update the documentation to include the new animation type.

### 2. Adding Sorting Options

To add sorting options for reviews:

1. Modify the `renderLocationReviews` function in `LocationReviewsStack.js` to accept a sorting parameter:

```javascript
function renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting = 'date') {
    // ...existing code...
    
    // Sort reviews based on the sorting parameter
    if (sorting === 'rating-high') {
        reviews.sort((a, b) => b.rating - a.rating);
    } else if (sorting === 'rating-low') {
        reviews.sort((a, b) => a.rating - b.rating);
    } else if (sorting === 'date-new') {
        reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sorting === 'date-old') {
        reviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    // ...rest of the function...
}
```

2. Add a new data attribute to the component:

```html
<div class="location-reviews-stack-container" 
     data-location-id="nyc"
     data-sorting="rating-high"
     ...>
</div>
```

3. Update the component initialization to read the sorting parameter:

```javascript
const sorting = container.dataset.sorting || 'date-new';
// ...
renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting);
```

### 3. Adding Filtering Options

To add filtering options for reviews:

1. Modify the `renderLocationReviews` function to accept a filtering parameter:

```javascript
function renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting = 'date', minRating = 0) {
    // ...existing code...
    
    // Filter reviews based on the minRating parameter
    reviews = reviews.filter(review => review.rating >= minRating);
    
    // ...rest of the function...
}
```

2. Add a new data attribute to the component:

```html
<div class="location-reviews-stack-container" 
     data-location-id="nyc"
     data-min-rating="4"
     ...>
</div>
```

3. Update the component initialization to read the filtering parameter:

```javascript
const minRating = parseInt(container.dataset.minRating || '0', 10);
// ...
renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting, minRating);
```

### 4. Adding Search Functionality

To add search functionality:

1. Add a search input field above the reviews:

```javascript
function renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting = 'date', minRating = 0, showSearch = false) {
    // ...existing code...
    
    if (showSearch) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'lr-search-container';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'lr-search-input';
        searchInput.placeholder = 'Search reviews...';
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const reviewCards = reviewsStack.querySelectorAll('.lr-detailed-review-card');
            
            reviewCards.forEach(card => {
                const content = card.querySelector('.lr-review-content').textContent.toLowerCase();
                const title = card.querySelector('.lr-review-title')?.textContent.toLowerCase() || '';
                const name = card.querySelector('.lr-reviewer-name').textContent.toLowerCase();
                
                if (content.includes(searchTerm) || title.includes(searchTerm) || name.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        searchContainer.appendChild(searchInput);
        reviewsSection.insertBefore(searchContainer, reviewsStack);
    }
    
    // ...rest of the function...
}
```

2. Add a new data attribute to the component:

```html
<div class="location-reviews-stack-container" 
     data-location-id="nyc"
     data-show-search="true"
     ...>
</div>
```

3. Update the component initialization to read the search parameter:

```javascript
const showSearch = container.dataset.showSearch === 'true';
// ...
renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting, minRating, showSearch);
```

### 5. Adding Pagination

To add pagination for reviews:

1. Modify the `renderLocationReviews` function to include pagination:

```javascript
function renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting = 'date', minRating = 0, showSearch = false, pageSize = 5) {
    // ...existing code...
    
    // If pageSize is set, implement pagination
    if (pageSize > 0 && reviews.length > pageSize) {
        const totalPages = Math.ceil(reviews.length / pageSize);
        let currentPage = 1;
        
        // Function to display the current page
        function showPage(page) {
            const start = (page - 1) * pageSize;
            const end = start + pageSize;
            const pageReviews = reviews.slice(start, end);
            
            // Clear current reviews
            reviewsStack.innerHTML = '';
            
            // Add reviews for the current page
            pageReviews.forEach((review, index) => {
                const reviewCard = createReviewCard(review, animation, index);
                reviewsStack.appendChild(reviewCard);
            });
            
            // Apply animations
            setTimeout(() => {
                const cards = reviewsStack.querySelectorAll('.lr-detailed-review-card');
                cards.forEach(card => {
                    card.classList.add('lr-card-visible');
                });
            }, 100);
        }
        
        // Create pagination controls
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'lr-pagination';
        
        // Previous button
        const prevButton = document.createElement('button');
        prevButton.className = 'lr-pagination-prev';
        prevButton.textContent = 'Previous';
        prevButton.disabled = true;
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                updatePaginationControls();
            }
        });
        
        // Next button
        const nextButton = document.createElement('button');
        nextButton.className = 'lr-pagination-next';
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
                updatePaginationControls();
            }
        });
        
        // Page indicator
        const pageIndicator = document.createElement('div');
        pageIndicator.className = 'lr-pagination-indicator';
        
        function updatePaginationControls() {
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
            pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        }
        
        updatePaginationControls();
        
        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(pageIndicator);
        paginationContainer.appendChild(nextButton);
        
        // Show the first page
        showPage(1);
        
        // Add pagination controls after the reviews stack
        reviewsSection.appendChild(paginationContainer);
    } else {
        // No pagination, show all reviews
        reviews.forEach((review, index) => {
            const reviewCard = createReviewCard(review, animation, index);
            reviewsStack.appendChild(reviewCard);
        });
    }
    
    // ...rest of the function...
}
```

2. Add a new data attribute to the component:

```html
<div class="location-reviews-stack-container" 
     data-location-id="nyc"
     data-page-size="5"
     ...>
</div>
```

3. Update the component initialization to read the pagination parameter:

```javascript
const pageSize = parseInt(container.dataset.pageSize || '0', 10);
// ...
renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting, minRating, showSearch, pageSize);
```

### 6. Adding Review Submission

To allow users to submit reviews directly from the component:

1. Create a new function to render a review form:

```javascript
function createReviewForm(locationId, doctorId) {
    const formContainer = document.createElement('div');
    formContainer.className = 'lr-review-form-container';
    
    // Create form elements
    const form = document.createElement('form');
    form.className = 'lr-review-form';
    
    // Form title
    const formTitle = document.createElement('h3');
    formTitle.className = 'lr-form-title';
    formTitle.textContent = 'Write a Review';
    form.appendChild(formTitle);
    
    // Name input
    const nameGroup = document.createElement('div');
    nameGroup.className = 'lr-form-group';
    
    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'lr-name';
    nameLabel.textContent = 'Your Name';
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'lr-name';
    nameInput.name = 'name';
    nameInput.required = true;
    
    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);
    form.appendChild(nameGroup);
    
    // Rating selector
    const ratingGroup = document.createElement('div');
    ratingGroup.className = 'lr-form-group';
    
    const ratingLabel = document.createElement('label');
    ratingLabel.textContent = 'Rating';
    
    const ratingSelector = document.createElement('div');
    ratingSelector.className = 'lr-rating-selector';
    
    const ratingStars = document.createElement('div');
    ratingStars.className = 'lr-rating-stars';
    
    let selectedRating = 0;
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'lr-rating-star';
        star.innerHTML = '★';
        star.dataset.value = i;
        
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.dataset.value, 10);
            updateStars(value, 'hover');
        });
        
        star.addEventListener('mouseout', function() {
            updateStars(selectedRating, 'selected');
        });
        
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.value, 10);
            updateStars(selectedRating, 'selected');
        });
        
        ratingStars.appendChild(star);
    }
    
    function updateStars(value, className) {
        const stars = ratingStars.querySelectorAll('.lr-rating-star');
        stars.forEach((star, index) => {
            star.classList.remove('lr-hover', 'lr-selected');
            if (index < value) {
                star.classList.add(`lr-${className}`);
            }
        });
    }
    
    ratingSelector.appendChild(ratingStars);
    ratingGroup.appendChild(ratingLabel);
    ratingGroup.appendChild(ratingSelector);
    form.appendChild(ratingGroup);
    
    // Review title
    const titleGroup = document.createElement('div');
    titleGroup.className = 'lr-form-group';
    
    const titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'lr-title';
    titleLabel.textContent = 'Review Title';
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'lr-title';
    titleInput.name = 'title';
    titleInput.required = true;
    
    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);
    form.appendChild(titleGroup);
    
    // Review content
    const contentGroup = document.createElement('div');
    contentGroup.className = 'lr-form-group';
    
    const contentLabel = document.createElement('label');
    contentLabel.htmlFor = 'lr-content';
    contentLabel.textContent = 'Your Review';
    
    const contentInput = document.createElement('textarea');
    contentInput.id = 'lr-content';
    contentInput.name = 'content';
    contentInput.rows = 5;
    contentInput.required = true;
    
    contentGroup.appendChild(contentLabel);
    contentGroup.appendChild(contentInput);
    form.appendChild(contentGroup);
    
    // Hidden fields
    const locationInput = document.createElement('input');
    locationInput.type = 'hidden';
    locationInput.name = 'location_id';
    locationInput.value = locationId;
    form.appendChild(locationInput);
    
    if (doctorId) {
        const doctorInput = document.createElement('input');
        doctorInput.type = 'hidden';
        doctorInput.name = 'doctor_id';
        doctorInput.value = doctorId;
        form.appendChild(doctorInput);
    }
    
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'lr-submit-button';
    submitButton.textContent = 'Submit Review';
    form.appendChild(submitButton);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }
        
        const formData = new FormData(form);
        formData.append('rating', selectedRating);
        
        // Here you would typically send the data to your server
        // For demonstration, we'll just show a success message
        
        const successMessage = document.createElement('div');
        successMessage.className = 'lr-form-message lr-success';
        successMessage.textContent = 'Thank you for your review! It will be published after moderation.';
        
        form.innerHTML = '';
        form.appendChild(successMessage);
    });
    
    formContainer.appendChild(form);
    return formContainer;
}
```

2. Modify the `renderLocationReviews` function to include the review form option:

```javascript
function renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting = 'date', minRating = 0, showSearch = false, pageSize = 0, showReviewForm = false) {
    // ...existing code...
    
    // Add review form if requested
    if (showReviewForm) {
        const reviewForm = createReviewForm(locationData.id, doctorData?.id);
        reviewsSection.appendChild(reviewForm);
    }
    
    // ...rest of the function...
}
```

3. Add a new data attribute to the component:

```html
<div class="location-reviews-stack-container" 
     data-location-id="nyc"
     data-show-review-form="true"
     ...>
</div>
```

4. Update the component initialization to read the review form parameter:

```javascript
const showReviewForm = container.dataset.showReviewForm === 'true';
// ...
renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting, minRating, showSearch, pageSize, showReviewForm);
```

### 7. Adding More Advanced Animations with Framer Motion

To integrate Framer Motion for more advanced animations:

1. Add Framer Motion to your project:

```html
<script src="https://unpkg.com/framer-motion/dist/framer-motion.js"></script>
```

2. Create a wrapper function to use Framer Motion:

```javascript
function animateWithFramerMotion(element, animation) {
    const { motion, animate } = window.FramerMotion;
    
    // Convert the element to a motion element
    const properties = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
    };
    
    if (animation === 'fade') {
        properties.initial.y = 20;
        properties.animate.y = 0;
    } else if (animation === 'slide') {
        properties.initial.x = -20;
        properties.animate.x = 0;
    } else if (animation === 'scale') {
        properties.initial.scale = 0.95;
        properties.animate.scale = 1;
    } else if (animation === 'rotate') {
        properties.initial.rotate = -5;
        properties.animate.rotate = 0;
    } else if (animation === 'flip') {
        properties.initial.rotateX = 90;
        properties.animate.rotateX = 0;
        properties.transition.type = 'spring';
        properties.transition.stiffness = 100;
    }
    
    // Apply the animation
    animate(element, properties.animate, properties.transition);
}
```

3. Modify the `renderLocationReviews` function to use Framer Motion:

```javascript
function renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting = 'date', minRating = 0, showSearch = false, pageSize = 0, showReviewForm = false, useFramerMotion = false) {
    // ...existing code...
    
    // Apply animations
    setTimeout(() => {
        const cards = container.querySelectorAll('.lr-detailed-review-card');
        cards.forEach((card, index) => {
            if (useFramerMotion && window.FramerMotion) {
                // Use staggered animation with Framer Motion
                animateWithFramerMotion(card, animation, index * 0.1);
            } else {
                // Use CSS animations
                card.classList.add('lr-card-visible');
            }
        });
    }, 100);
    
    // ...rest of the function...
}
```

4. Add a new data attribute to the component:

```html
<div class="location-reviews-stack-container" 
     data-location-id="nyc"
     data-use-framer-motion="true"
     ...>
</div>
```

5. Update the component initialization to read the Framer Motion parameter:

```javascript
const useFramerMotion = container.dataset.useFramerMotion === 'true';
// ...
renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation, sorting, minRating, showSearch, pageSize, showReviewForm, useFramerMotion);
```

## Conclusion

The LocationReviewsStack component provides a powerful and flexible way to display location reviews on your website. With its customizable options, interactive features, and responsive design, it can be adapted to fit a wide range of use cases.

By following the extension guidelines above, you can further enhance the component with additional features such as sorting, filtering, search, pagination, review submission, and advanced animations.

For any questions or issues, please open an issue on the GitHub repository.
