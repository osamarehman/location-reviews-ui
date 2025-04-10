<?php
/**
 * MAXIM Hair Restoration - Doctor Card with Reviews Component
 * 
 * This file demonstrates how to integrate the doctor card component with WordPress
 * for SEO-friendly preloaded data rather than relying on GitHub for rendering.
 * 
 * Usage: Include this file in your WordPress template or create a shortcode
 */

// Function to get location and doctor data (replace with your actual data source)
function get_maxim_location_data() {
    // In a real implementation, this would come from your WordPress database
    // For example, from custom post types, ACF fields, or a custom database table
    
    // Sample data structure - in production, replace with data from your database
    $location_data = [
        "id" => "nyc",
        "name" => "New York City",
        "address" => "308 Fifth Avenue, Fifth Floor, New York, NY 10001, United States",
        "phone" => "(646) 503-1209",
        "website" => "https://www.maximhairrestoration.com/locations/new-york-city/",
        "rating" => 4.8,
        "total_reviews" => 156,
        "image" => "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        "description" => "Affordable, Turkish-style hair transplants upto 5,000 grafts and non-surgical hair restoration in New York, NY. Body to scalp, No Shave FUE, Beard and Eyebrow transplants. 0% easy payment plans.",
        "doctors" => [
            [
                "id" => "dr-barnard",
                "name" => "Dr. Lawrence Barnard",
                "title" => "Board-Certified Hair Transplant Specialist",
                "specialty" => "Hair Transplantation",
                "experience" => "Nearly a decade",
                "bio" => "Dr. Lawrence Barnard is a Board-Certified hair transplant specialist with nearly a decade of hair restoration experience in NYC and Long Island.",
                "image" => "https://www.maximhairrestoration.com/wp-content/uploads/2024/03/Mask-group20.jpg",
                "link" => "https://www.maximhairrestoration.com/our-doctors/dr-barnard/"
            ],
            [
                "id" => "dr-stoller",
                "name" => "Dr. Roy B. Stoller",
                "title" => "Hair Restoration Specialist",
                "specialty" => "Hair Transplantation",
                "experience" => "25+ years",
                "bio" => "Dr. Roy B. Stoller is a hair restoration specialist with over 25 years of experience in New York City and New Jersey.",
                "image" => "https://www.maximhairrestoration.com/wp-content/uploads/2024/03/Mask-group-1.jpg",
                "link" => "https://www.maximhairrestoration.com/our-doctors/dr-roy-b-stoller/"
            ],
            [
                "id" => "rhonda-daniels",
                "name" => "Rhonda Daniels, PA-C",
                "title" => "Physician Associate",
                "specialty" => "FUE Hair Transplant and Hybrid Hair Restoration",
                "experience" => "10+ years",
                "bio" => "Rhonda Daniels is a Physician Associate with over 10 years of experience in hair restoration procedures in NYC, Long Island, and Sarasota.",
                "image" => "https://www.maximhairrestoration.com/wp-content/uploads/2024/03/Mask-group-2.jpg",
                "link" => "https://www.maximhairrestoration.com/our-doctors/rhonda-daniels-pa-c/"
            ],
            [
                "id" => "marcelo-acosta",
                "name" => "Marcelo Acosta, PA-C",
                "title" => "Physician Associate",
                "specialty" => "Hair Transplantation",
                "experience" => "20+ years",
                "bio" => "Marcelo Acosta is a Physician Associate with over 20 years of experience in New York City and Long Island.",
                "image" => "https://www.maximhairrestoration.com/wp-content/uploads/2024/03/Mask-group-3.jpg",
                "link" => "https://www.maximhairrestoration.com/our-doctors/marcelo-acosta/"
            ],
            [
                "id" => "theresa-lu",
                "name" => "Theresa Lu, PA-C",
                "title" => "Physician Associate",
                "specialty" => "Hair Restoration",
                "experience" => "2+ years",
                "bio" => "Theresa Lu is a Physician Associate specializing in hair restoration procedures in Alexandria, VA.",
                "image" => "https://www.maximhairrestoration.com/wp-content/uploads/2024/03/Mask-group-4.jpg",
                "link" => "https://www.maximhairrestoration.com/our-doctors/theresa-lu/"
            ],
            [
                "id" => "ronald-jeganathan",
                "name" => "Ronald Jeganathan, PA-C",
                "title" => "Clinician",
                "specialty" => "Hair Restoration",
                "experience" => "5+ years",
                "bio" => "Ronald Jeganathan is a clinician specializing in hair restoration procedures in New York City, Long Island, and New Jersey.",
                "image" => "https://www.maximhairrestoration.com/wp-content/uploads/2024/03/Mask-group-5.jpg",
                "link" => "https://www.maximhairrestoration.com/our-doctors/clinician-ronald-jeganathan/"
            ]
        ],
        "reviews" => [
            [
                "id" => 1,
                "name" => "John Smith",
                "rating" => 5,
                "date" => "2023-05-15",
                "title" => "Exceptional Service",
                "content" => "I had an amazing experience at the NYC location. The staff was incredibly professional and made me feel comfortable throughout the entire process. The results exceeded my expectations, and I've already recommended them to several friends.",
                "verified" => true,
                "doctor" => "dr-barnard"
            ],
            [
                "id" => 2,
                "name" => "Sarah Johnson",
                "rating" => 4,
                "date" => "2023-04-20",
                "title" => "Great Results",
                "content" => "The procedure went smoothly, and I'm very happy with the results. The only reason I'm not giving 5 stars is because the wait time for my initial consultation was longer than expected. Otherwise, everything was excellent.",
                "verified" => true,
                "doctor" => "dr-stoller"
            ],
            [
                "id" => 3,
                "name" => "Michael Brown",
                "rating" => 5,
                "date" => "2023-03-10",
                "title" => "Highly Recommend",
                "content" => "I had a great experience at this location. The staff was friendly and the results were amazing. The consultation was thorough and they answered all my questions. The procedure itself was much less uncomfortable than I expected, and the recovery was smooth. I've already recommended them to several friends.",
                "verified" => true,
                "doctor" => "rhonda-daniels"
            ]
        ]
    ];
    
    // Generate additional reviews for demonstration purposes
    $existing_reviews = $location_data['reviews'];
    $extra_reviews = [];
    
    // Create 25 more reviews by cloning and modifying existing ones
    for ($i = 0; $i < 25; $i++) {
        $original_review = $existing_reviews[$i % count($existing_reviews)];
        $cloned_review = $original_review;
        
        // Modify the cloned review to make it unique
        $cloned_review['id'] = $original_review['id'] + 100 + $i;
        
        // Subtract days from the original date
        $original_date = new DateTime($original_review['date']);
        $original_date->modify("-{$i} days");
        $cloned_review['date'] = $original_date->format('Y-m-d');
        
        $cloned_review['title'] = $original_review['title'] . " - Example " . ($i + 1);
        
        // Assign to a random doctor
        $doctors = $location_data['doctors'];
        $random_doctor_index = array_rand($doctors);
        $cloned_review['doctor'] = $doctors[$random_doctor_index]['id'];
        
        $extra_reviews[] = $cloned_review;
    }
    
    // Add the extra reviews
    $location_data['reviews'] = array_merge($location_data['reviews'], $extra_reviews);
    
    return $location_data;
}

// Function to render the doctor selector
function render_doctor_selector($doctors, $active_doctor_id = 'dr-barnard') {
    $html = '<div class="doctor-selector" id="doctor-selector">';
    
    foreach ($doctors as $doctor) {
        $active_class = ($doctor['id'] === $active_doctor_id) ? ' active' : '';
        $html .= '<button class="doctor-button' . $active_class . '" data-doctor-id="' . esc_attr($doctor['id']) . '">';
        
        if (!empty($doctor['image'])) {
            $html .= '<img src="' . esc_url($doctor['image']) . '" alt="' . esc_attr($doctor['name']) . '">';
        }
        
        $html .= '<span>' . esc_html($doctor['name']) . '</span>';
        $html .= '</button>';
    }
    
    $html .= '</div>';
    
    return $html;
}

// Function to render the doctor card
function render_doctor_card($doctor) {
    $html = '<div class="lr-doctor-card">';
    
    // Doctor image
    $html .= '<div class="lr-doctor-image-container">';
    if (!empty($doctor['image'])) {
        $html .= '<img class="lr-doctor-image" src="' . esc_url($doctor['image']) . '" alt="' . esc_attr($doctor['name']) . '">';
    }
    $html .= '</div>';
    
    // Doctor info
    $html .= '<div class="lr-doctor-info">';
    $html .= '<h3 class="lr-doctor-name">' . esc_html($doctor['name']) . '</h3>';
    
    if (!empty($doctor['title'])) {
        $html .= '<div class="lr-doctor-title">' . esc_html($doctor['title']) . '</div>';
    }
    
    if (!empty($doctor['specialty'])) {
        $html .= '<div class="lr-doctor-specialty">' . esc_html($doctor['specialty']) . '</div>';
    }
    
    if (!empty($doctor['experience'])) {
        $html .= '<div class="lr-doctor-experience">Experience: ' . esc_html($doctor['experience']) . '</div>';
    }
    
    if (!empty($doctor['bio'])) {
        $html .= '<div class="lr-doctor-bio">' . esc_html($doctor['bio']) . '</div>';
    }
    
    if (!empty($doctor['link'])) {
        $html .= '<div class="lr-doctor-link-container">';
        $html .= '<a href="' . esc_url($doctor['link']) . '" class="lr-doctor-link">View Profile</a>';
        $html .= '</div>';
    }
    
    $html .= '</div>'; // End doctor info
    $html .= '</div>'; // End doctor card
    
    return $html;
}

// Function to render a review card
function render_review_card($review) {
    $html = '<div class="lr-detailed-review-card lr-card-visible">';
    
    // Review header
    $html .= '<div class="lr-review-card-header">';
    
    // Avatar
    $initials = strtoupper(substr($review['name'], 0, 1));
    if (strpos($review['name'], ' ') !== false) {
        $name_parts = explode(' ', $review['name']);
        $initials = strtoupper(substr($name_parts[0], 0, 1) . substr(end($name_parts), 0, 1));
    }
    $html .= '<div class="lr-review-avatar">' . $initials . '</div>';
    
    // Reviewer info
    $html .= '<div class="lr-reviewer-info">';
    $html .= '<div class="lr-reviewer-name">' . esc_html($review['name']);
    if (!empty($review['verified']) && $review['verified']) {
        $html .= '<span class="lr-verified-badge">Verified</span>';
    }
    $html .= '</div>';
    
    if (!empty($review['date'])) {
        $date = new DateTime($review['date']);
        $html .= '<div class="lr-review-date">' . $date->format('F j, Y') . '</div>';
    }
    
    $html .= '</div>'; // End reviewer info
    
    // Rating
    $html .= '<div class="lr-review-rating">';
    for ($i = 1; $i <= 5; $i++) {
        $star_class = ($i <= $review['rating']) ? 'lr-star-filled' : 'lr-star-empty';
        $html .= '<span class="' . $star_class . '">★</span>';
    }
    $html .= '</div>'; // End rating
    
    $html .= '</div>'; // End review header
    
    // Review content
    if (!empty($review['title'])) {
        $html .= '<div class="lr-review-title">' . esc_html($review['title']) . '</div>';
    }
    
    if (!empty($review['content'])) {
        $html .= '<div class="lr-review-content">' . esc_html($review['content']) . '</div>';
    }
    
    $html .= '</div>'; // End review card
    
    return $html;
}

// Function to render reviews for a specific doctor
function render_doctor_reviews($reviews, $doctor_id) {
    $html = '<div class="lr-reviews-list">';
    
    $doctor_reviews = array_filter($reviews, function($review) use ($doctor_id) {
        return isset($review['doctor']) && $review['doctor'] === $doctor_id;
    });
    
    if (empty($doctor_reviews)) {
        $html .= '<div class="lr-no-reviews">No reviews found for this doctor.</div>';
    } else {
        foreach ($doctor_reviews as $review) {
            $html .= render_review_card($review);
        }
    }
    
    $html .= '</div>';
    
    return $html;
}

// Function to render the complete component
function render_doctor_reviews_component($location_id = 'nyc', $doctor_id = 'dr-barnard') {
    // Get location data
    $location_data = get_maxim_location_data();
    
    // Find the selected doctor
    $selected_doctor = null;
    foreach ($location_data['doctors'] as $doctor) {
        if ($doctor['id'] === $doctor_id) {
            $selected_doctor = $doctor;
            break;
        }
    }
    
    if (!$selected_doctor) {
        return '<div class="lr-error">Doctor not found.</div>';
    }
    
    // Start building the HTML
    $html = '<div class="lr-location-reviews-stack">';
    
    // Layout with doctor card
    $html .= '<div class="lr-layout-with-doctor">';
    
    // Doctor card (left side)
    $html .= render_doctor_card($selected_doctor);
    
    // Reviews (right side)
    $html .= '<div class="lr-layout-reviews-only">';
    $html .= render_doctor_reviews($location_data['reviews'], $doctor_id);
    $html .= '</div>'; // End reviews
    
    $html .= '</div>'; // End layout
    $html .= '</div>'; // End component
    
    return $html;
}

// Create a WordPress shortcode
function maxim_doctor_reviews_shortcode($atts) {
    $atts = shortcode_atts(array(
        'location_id' => 'nyc',
        'doctor_id' => 'dr-barnard',
    ), $atts, 'maxim_doctor_reviews');
    
    // Get location data
    $location_data = get_maxim_location_data();
    
    // Build the HTML
    $html = '<div class="maxim-doctor-reviews-container">';
    
    // Doctor selector
    $html .= '<h2 class="maxim-section-title">Our Doctors</h2>';
    $html .= '<p class="maxim-section-description">Click on a doctor to see their profile and reviews.</p>';
    $html .= render_doctor_selector($location_data['doctors'], $atts['doctor_id']);
    
    // Component container
    $html .= '<div class="maxim-scroll-container">';
    $html .= '<div id="maxim-doctor-reviews" data-location-id="' . esc_attr($atts['location_id']) . '" data-doctor-id="' . esc_attr($atts['doctor_id']) . '">';
    $html .= render_doctor_reviews_component($atts['location_id'], $atts['doctor_id']);
    $html .= '</div>';
    $html .= '</div>';
    
    // Add JavaScript for interactivity
    $html .= '<script>
        document.addEventListener("DOMContentLoaded", function() {
            const doctorButtons = document.querySelectorAll(".doctor-button");
            const reviewsContainer = document.getElementById("maxim-doctor-reviews");
            
            doctorButtons.forEach(button => {
                button.addEventListener("click", function() {
                    // Update active button
                    doctorButtons.forEach(btn => {
                        btn.classList.remove("active");
                    });
                    this.classList.add("active");
                    
                    // Get doctor ID
                    const doctorId = this.dataset.doctorId;
                    
                    // Update the data attribute
                    reviewsContainer.dataset.doctorId = doctorId;
                    
                    // Show loading state
                    reviewsContainer.innerHTML = "<div class=\"lr-loading\">Loading doctor information...</div>";
                    
                    // Fetch the updated content via AJAX
                    fetch(ajaxurl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: "action=get_doctor_reviews&location_id=" + reviewsContainer.dataset.locationId + "&doctor_id=" + doctorId
                    })
                    .then(response => response.text())
                    .then(html => {
                        reviewsContainer.innerHTML = html;
                    })
                    .catch(error => {
                        reviewsContainer.innerHTML = "<div class=\"lr-error\">Error loading doctor information.</div>";
                        console.error("Error:", error);
                    });
                });
            });
        });
    </script>';
    
    $html .= '</div>'; // End container
    
    return $html;
}
add_shortcode('maxim_doctor_reviews', 'maxim_doctor_reviews_shortcode');

// AJAX handler for updating doctor reviews
function get_doctor_reviews_ajax() {
    if (!isset($_POST['location_id']) || !isset($_POST['doctor_id'])) {
        wp_send_json_error('Missing parameters');
        wp_die();
    }
    
    $location_id = sanitize_text_field($_POST['location_id']);
    $doctor_id = sanitize_text_field($_POST['doctor_id']);
    
    echo render_doctor_reviews_component($location_id, $doctor_id);
    wp_die();
}
add_action('wp_ajax_get_doctor_reviews', 'get_doctor_reviews_ajax');
add_action('wp_ajax_nopriv_get_doctor_reviews', 'get_doctor_reviews_ajax');

// Enqueue required styles
function maxim_doctor_reviews_styles() {
    // Enqueue your styles here
    wp_enqueue_style('maxim-doctor-reviews', plugin_dir_url(__FILE__) . 'assets/css/styles.css', array(), '1.0.0');
    wp_enqueue_style('maxim-theme', plugin_dir_url(__FILE__) . 'assets/css/maxim-theme.css', array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'maxim_doctor_reviews_styles');
