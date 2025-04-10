/**
 * LocationReviewsStack Component
 *
 * A component that displays detailed review cards stacked vertically for a specific location,
 * with an optional fixed doctor card beside the reviews.
 * The component fetches location and review data from a JSON file stored in the GitHub repository.
 *
 * Usage:
 * <div class="location-reviews-stack-container"
 *      data-location-id="nyc"
 *      data-show-location-info="true"
 *      data-max-reviews="5"
 *      data-doctor-id="dr-smith"
 *      data-show-doctor-card="true"
 *      data-animation="fade"
 *      data-data-url="https://raw.githubusercontent.com/osamarehman/location-reviews-ui/main/data/location-reviews.json">
 * </div>
 *
 * Parameters:
 * - data-location-id: ID of the location to display (required)
 * - data-show-location-info: Whether to show location information (default: true)
 * - data-max-reviews: Maximum number of reviews to display (0 = show all)
 * - data-doctor-id: ID of the doctor to display in the fixed card (optional)
 * - data-show-doctor-card: Whether to show the doctor card (default: false)
 * - data-animation: Animation type for cards ("fade", "slide", "scale", "none") (default: "fade")
 * - data-data-url: URL to the JSON data file (default: GitHub repository URL)
 */

// Create the global LRComponents object if it doesn't exist
window.LRComponents = window.LRComponents || {};

// Sample data for local testing
const sampleLocationData = {
    "locations": [
        {
            "id": "nyc",
            "name": "New York City",
            "address": "123 Broadway, New York, NY 10001",
            "phone": "(212) 555-1234",
            "website": "https://example.com/nyc",
            "rating": 4.8,
            "total_reviews": 156,
            "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "description": "Our New York City location offers state-of-the-art facilities and a team of experienced professionals dedicated to providing exceptional service.",
            "reviews": [
                {
                    "id": 1,
                    "name": "John Smith",
                    "rating": 5,
                    "date": "2023-05-15",
                    "title": "Exceptional Service and Results",
                    "content": "I had an amazing experience at the New York location. The staff was incredibly professional and made me feel comfortable throughout the entire process. The results exceeded my expectations, and I couldn't be happier with my decision to choose this clinic. The facility was clean and modern, and the follow-up care was excellent.",
                    "avatar": "",
                    "verified": true
                },
                {
                    "id": 2,
                    "name": "Sarah Johnson",
                    "rating": 4,
                    "date": "2023-04-22",
                    "title": "Great Experience Overall",
                    "content": "Very satisfied with my experience at the NYC location. The procedure was quick and the results were better than expected. The only reason I'm not giving 5 stars is because the waiting time was a bit longer than I anticipated. However, the staff was friendly and professional, and they made sure I was comfortable throughout the process.",
                    "avatar": "",
                    "verified": true
                },
                {
                    "id": 3,
                    "name": "Michael Brown",
                    "rating": 5,
                    "date": "2023-03-10",
                    "title": "Highly Recommend",
                    "content": "I had a great experience at this location. The staff was friendly and the results were amazing. The consultation was thorough and they answered all my questions. The procedure itself was much less uncomfortable than I expected, and the recovery was smooth. I've already recommended them to several friends.",
                    "avatar": "",
                    "verified": true
                }
            ]
        },
        {
            "id": "la",
            "name": "Los Angeles",
            "address": "456 Hollywood Blvd, Los Angeles, CA 90028",
            "phone": "(323) 555-6789",
            "website": "https://example.com/la",
            "rating": 4.6,
            "total_reviews": 124,
            "image": "https://images.unsplash.com/photo-1580655653885-65763b2597d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            "description": "Our Los Angeles location combines luxury with cutting-edge technology to provide you with the best possible experience and results.",
            "reviews": [
                {
                    "id": 1,
                    "name": "Emily Davis",
                    "rating": 5,
                    "date": "2023-06-05",
                    "title": "Worth Every Penny",
                    "content": "The LA location exceeded all my expectations. From the moment I walked in, I was treated like a VIP. The staff was knowledgeable and attentive, and the facility was absolutely beautiful. The procedure was explained in detail, and there were no surprises. The results are fantastic, and I've received so many compliments. Definitely worth the investment!",
                    "avatar": "",
                    "verified": true
                },
                {
                    "id": 2,
                    "name": "Robert Wilson",
                    "rating": 4,
                    "date": "2023-05-18",
                    "title": "Professional and Caring Staff",
                    "content": "I was nervous about my procedure, but the team at the Los Angeles location put me at ease. They were patient with all my questions and concerns. The facility is modern and clean, and the procedure went smoothly. The only reason for 4 stars instead of 5 is that parking can be a bit challenging in the area.",
                    "avatar": "",
                    "verified": true
                },
                {
                    "id": 3,
                    "name": "Jennifer Lee",
                    "rating": 5,
                    "date": "2023-04-30",
                    "title": "Amazing Results",
                    "content": "I couldn't be happier with my experience at the LA location. The consultation was thorough, and they created a personalized plan for me. The procedure was much more comfortable than I expected, and the results are even better than I hoped for. The follow-up care has been excellent as well. I highly recommend this location to anyone considering the procedure.",
                    "avatar": "",
                    "verified": false
                },
                {
                    "id": 4,
                    "name": "David Miller",
                    "rating": 5,
                    "date": "2023-03-22",
                    "title": "Top-Notch Experience",
                    "content": "From start to finish, my experience at the Los Angeles location was exceptional. The staff was friendly and professional, and the facility was impressive. The procedure itself was quick and relatively painless, and the results have been life-changing. I appreciate the attention to detail and the personalized care I received.",
                    "avatar": "",
                    "verified": true
                }
            ]
        },
        {
            "id": "chicago",
            "name": "Chicago",
            "address": "789 Michigan Ave, Chicago, IL 60611",
            "phone": "(312) 555-9012",
            "website": "https://example.com/chicago",
            "rating": 4.7,
            "total_reviews": 98,
            "image": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
            "description": "Our Chicago location features a team of award-winning specialists and a comfortable, welcoming environment for all our clients.",
            "reviews": [
                {
                    "id": 1,
                    "name": "Lisa Anderson",
                    "rating": 5,
                    "date": "2023-05-28",
                    "title": "Exceeded My Expectations",
                    "content": "I had my procedure done at the Chicago location, and I couldn't be happier with the results. The staff was incredibly knowledgeable and made me feel comfortable from the consultation through the follow-up appointments. The facility is beautiful and immaculate. I've already recommended them to several friends and family members.",
                    "avatar": "",
                    "verified": true
                },
                {
                    "id": 2,
                    "name": "James Thompson",
                    "rating": 4,
                    "date": "2023-04-15",
                    "title": "Great Experience, Minor Issues",
                    "content": "Overall, I had a positive experience at the Chicago location. The staff was professional and the results are good. The only issues I had were with scheduling - there was some confusion about my appointment times, and I had to reschedule once due to a miscommunication. Despite that, I would still recommend this location.",
                    "avatar": "",
                    "verified": true
                },
                {
                    "id": 3,
                    "name": "Patricia Garcia",
                    "rating": 5,
                    "date": "2023-03-02",
                    "title": "Life-Changing Results",
                    "content": "I cannot say enough good things about my experience at the Chicago location. From my initial consultation to my final follow-up, every interaction was positive and reassuring. The procedure itself was much easier than I anticipated, and the results have truly been life-changing. The staff genuinely cares about their patients, and it shows in everything they do.",
                    "avatar": "",
                    "verified": true
                }
            ]
        }
    ]
};

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
        const showLocationInfo = container.dataset.showLocationInfo !== 'false'; // Default to true
        const maxReviews = parseInt(container.dataset.maxReviews || 0, 10);
        const doctorId = container.dataset.doctorId || '';
        const showDoctorCard = container.dataset.showDoctorCard === 'true';
        const animation = container.dataset.animation || 'fade';
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

                // Find doctor if specified
                let doctorData = null;
                if (showDoctorCard && doctorId) {
                    doctorData = locationData.doctors?.find(doctor => doctor.id === doctorId);
                    if (!doctorData && locationData.doctors?.length > 0) {
                        // If specified doctor not found, use the first one
                        doctorData = locationData.doctors[0];
                    }
                }

                // Render the component
                renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation);
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                container.innerHTML = '<div class="lr-error">Error loading location reviews. Please try again later.</div>';
            });
    });

    /**
     * Fetch location data from the JSON file or use embedded data for local testing
     */
    async function fetchLocationData(dataUrl, locationId) {
        // For local testing with file:// protocol, use the embedded data
        if (window.location.protocol === 'file:' || dataUrl.startsWith('file://')) {
            console.log('Using embedded data for local testing');
            return sampleLocationData.locations.find(location => location.id === locationId);
        }

        // For remote testing, fetch from the URL
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
            // Fallback to embedded data if fetch fails
            console.log('Falling back to embedded data');
            return sampleLocationData.locations.find(location => location.id === locationId);
        }
    }

    /**
     * Render the location reviews
     */
    function renderLocationReviews(container, locationData, showLocationInfo, maxReviews, doctorData, animation) {
        // Create the main container
        const stackContainer = document.createElement('div');
        stackContainer.className = 'lr-location-reviews-stack';

        // Add location info if requested
        if (showLocationInfo) {
            const locationInfo = createLocationInfo(locationData);
            stackContainer.appendChild(locationInfo);
        }

        // Create the layout container for doctor card and reviews
        const layoutContainer = document.createElement('div');
        layoutContainer.className = doctorData ? 'lr-layout-with-doctor' : 'lr-layout-reviews-only';
        stackContainer.appendChild(layoutContainer);

        // Add doctor card if provided
        if (doctorData) {
            const doctorCard = createDoctorCard(doctorData);
            layoutContainer.appendChild(doctorCard);
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

        // Filter by doctor if doctor card is shown
        if (doctorData) {
            reviews = reviews.filter(review => review.doctor === doctorData.id);
        }

        // Apply max reviews limit
        if (maxReviews > 0 && reviews.length > maxReviews) {
            reviews = reviews.slice(0, maxReviews);
        }

        // Add each review card
        reviews.forEach((review, index) => {
            const reviewCard = createReviewCard(review, animation, index);
            reviewsStack.appendChild(reviewCard);
        });

        // Add "See all reviews" link if there are more reviews
        if (maxReviews > 0 && locationData.reviews.length > maxReviews) {
            const seeAllLink = document.createElement('a');
            seeAllLink.className = 'lr-see-all-link';
            seeAllLink.href = locationData.website || '#';
            seeAllLink.textContent = `See all ${locationData.total_reviews} reviews`;
            seeAllLink.target = '_blank';
            seeAllLink.rel = 'noopener noreferrer';
            reviewsStack.appendChild(seeAllLink);
        }

        reviewsSection.appendChild(reviewsStack);
        layoutContainer.appendChild(reviewsSection);

        // Replace the container content
        container.innerHTML = '';
        container.appendChild(stackContainer);

        // Apply animations after a short delay to ensure DOM is ready
        setTimeout(() => {
            const cards = container.querySelectorAll('.lr-detailed-review-card');
            cards.forEach(card => {
                card.classList.add('lr-card-visible');
            });
        }, 100);
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
     * Create a doctor card element
     */
    function createDoctorCard(doctor) {
        const card = document.createElement('div');
        card.className = 'lr-doctor-card';

        // Create doctor image
        if (doctor.image) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'lr-doctor-image-container';

            const image = document.createElement('img');
            image.className = 'lr-doctor-image';
            image.src = doctor.image;
            image.alt = doctor.name;
            imageContainer.appendChild(image);

            card.appendChild(imageContainer);
        }

        // Create doctor info
        const infoContainer = document.createElement('div');
        infoContainer.className = 'lr-doctor-info';

        // Doctor name
        const nameElement = document.createElement('h3');
        nameElement.className = 'lr-doctor-name';
        nameElement.textContent = doctor.name;
        infoContainer.appendChild(nameElement);

        // Doctor title
        if (doctor.title) {
            const titleElement = document.createElement('div');
            titleElement.className = 'lr-doctor-title';
            titleElement.textContent = doctor.title;
            infoContainer.appendChild(titleElement);
        }

        // Doctor specialty
        if (doctor.specialty) {
            const specialtyElement = document.createElement('div');
            specialtyElement.className = 'lr-doctor-specialty';
            specialtyElement.textContent = doctor.specialty;
            infoContainer.appendChild(specialtyElement);
        }

        // Doctor experience
        if (doctor.experience) {
            const experienceElement = document.createElement('div');
            experienceElement.className = 'lr-doctor-experience';
            experienceElement.textContent = `Experience: ${doctor.experience}`;
            infoContainer.appendChild(experienceElement);
        }

        // Doctor bio
        if (doctor.bio) {
            const bioElement = document.createElement('div');
            bioElement.className = 'lr-doctor-bio';
            bioElement.textContent = doctor.bio;
            infoContainer.appendChild(bioElement);
        }

        // Doctor credentials
        if (doctor.credentials && doctor.credentials.length > 0) {
            const credentialsContainer = document.createElement('div');
            credentialsContainer.className = 'lr-doctor-credentials';

            const credentialsTitle = document.createElement('div');
            credentialsTitle.className = 'lr-credentials-title';
            credentialsTitle.textContent = 'Credentials:';
            credentialsContainer.appendChild(credentialsTitle);

            const credentialsList = document.createElement('ul');
            credentialsList.className = 'lr-credentials-list';

            doctor.credentials.forEach(credential => {
                const item = document.createElement('li');
                item.textContent = credential;
                credentialsList.appendChild(item);
            });

            credentialsContainer.appendChild(credentialsList);
            infoContainer.appendChild(credentialsContainer);
        }

        // Doctor link
        if (doctor.link) {
            const linkContainer = document.createElement('div');
            linkContainer.className = 'lr-doctor-link-container';

            const link = document.createElement('a');
            link.className = 'lr-doctor-link';
            link.href = doctor.link;
            link.textContent = 'View Profile';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            linkContainer.appendChild(link);
            infoContainer.appendChild(linkContainer);
        }

        card.appendChild(infoContainer);

        return card;
    }

    /**
     * Create a review card element
     */
    function createReviewCard(review, animation, index) {
        const card = document.createElement('div');
        card.className = 'lr-detailed-review-card';

        // Add animation class based on animation type
        if (animation && animation !== 'none') {
            card.classList.add(`lr-animation-${animation}`);
            // Add delay based on index
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.transitionDelay = `${index * 0.1}s`;
        }

        // Make the entire card clickable if there's a link
        if (review.link) {
            card.classList.add('lr-clickable');
            card.addEventListener('click', function() {
                window.open(review.link, '_blank', 'noopener,noreferrer');
            });

            // Add hover effect for clickable cards
            card.addEventListener('mouseenter', function() {
                this.classList.add('lr-card-hover');
            });

            card.addEventListener('mouseleave', function() {
                this.classList.remove('lr-card-hover');
            });

            // Add keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'link');
            card.setAttribute('aria-label', `Review by ${review.name}. Click to read more.`);

            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(review.link, '_blank', 'noopener,noreferrer');
                }
            });
        }

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

        // Add link indicator if there's a link
        if (review.link) {
            const linkIndicator = document.createElement('div');
            linkIndicator.className = 'lr-review-link-indicator';
            linkIndicator.innerHTML = '<span>Read more</span> <span class="lr-arrow">→</span>';
            card.appendChild(linkIndicator);
        }

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
