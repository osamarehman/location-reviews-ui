# Location Reviews UI Components

This repository contains UI components for the WordPress Location Reviews plugin. These components are automatically fetched by the plugin and integrated into your WordPress site.

## How It Works

1. The WordPress plugin fetches components from this repository
2. Components are saved locally in the plugin directory
3. Components are included in your pages and initialized automatically

## Component Structure

Each component should:

1. Register itself to the global `LRComponents` object
2. Find containers with the appropriate class
3. Initialize based on data attributes
4. Generate and insert HTML

## Example Component

```javascript
// MyComponent.js
window.LRComponents = window.LRComponents || {};

window.LRComponents.MyComponent = function() {
    // Find containers for this component
    const containers = document.querySelectorAll('.my-component-container');
    
    // Initialize each container
    containers.forEach(function(container) {
        // Get data attributes
        const data = container.dataset;
        
        // Create and insert HTML
        container.innerHTML = createComponentHTML(data);
    });
    
    function createComponentHTML(data) {
        // Return component HTML
        return `<div class="my-component">...</div>`;
    }
};
```

## Available Components

1. **SimpleReviewCard** - A simple review card with name, rating, date, and content
2. **TestimonialSlider** - A slider that displays multiple testimonials
3. **RatingsSummary** - A summary of ratings with a breakdown by star rating
4. **ReviewForm** - A form for submitting new reviews

## Usage in WordPress

To use these components in your WordPress site:

1. Install and activate the Location Reviews plugin
2. Configure the plugin to use this repository
3. Refresh components from the admin page
4. Add containers with the appropriate class and data attributes to your pages

Example:

```html
<div class="simple-review-card-container" 
     data-name="John Smith" 
     data-rating="5" 
     data-date="2023-05-15" 
     data-content="Great experience!">
</div>
```
