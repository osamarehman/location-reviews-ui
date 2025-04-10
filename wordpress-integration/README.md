# MAXIM Hair Restoration - WordPress Integration

This directory contains files for integrating the doctor card and reviews components into WordPress with preloaded data for SEO purposes.

## Overview

Instead of relying on GitHub for rendering the components, this integration:

1. Preloads all data server-side in PHP
2. Renders the HTML directly in WordPress
3. Uses minimal JavaScript only for interactivity
4. Provides a shortcode for easy integration
5. Includes all necessary CSS styles

## Benefits for SEO

- All content is rendered server-side and available to search engines
- No reliance on client-side JavaScript for content rendering
- Proper semantic HTML structure
- Fast loading times
- All data is included in the initial page load

## Files Included

- `doctor-card-wordpress.php` - Main PHP file with all functions and shortcode
- `assets/css/styles.css` - Base styles for the components
- `assets/css/maxim-theme.css` - MAXIM brand theme colors and variables

## Installation Instructions

1. Create a new plugin directory in your WordPress installation:
   ```
   wp-content/plugins/maxim-doctor-reviews/
   ```

2. Copy all files from this directory to your plugin directory:
   ```
   wp-content/plugins/maxim-doctor-reviews/doctor-card-wordpress.php
   wp-content/plugins/maxim-doctor-reviews/assets/css/styles.css
   wp-content/plugins/maxim-doctor-reviews/assets/css/maxim-theme.css
   ```

3. Activate the plugin in the WordPress admin panel

## Usage

### Basic Shortcode

Add the doctor reviews component to any page or post using the shortcode:

```
[maxim_doctor_reviews]
```

### Shortcode with Parameters

You can customize the shortcode with parameters:

```
[maxim_doctor_reviews location_id="nyc" doctor_id="dr-barnard"]
```

Parameters:
- `location_id` - ID of the location (default: "nyc")
- `doctor_id` - ID of the doctor to display initially (default: "dr-barnard")

## Customizing the Data

In a production environment, you should replace the sample data in the `get_maxim_location_data()` function with data from your WordPress database. This could come from:

1. Custom post types for doctors and reviews
2. Advanced Custom Fields (ACF) data
3. A custom database table
4. An external API or data source

Example with custom post types:

```php
function get_maxim_location_data() {
    $location_data = [
        "id" => "nyc",
        "name" => "New York City",
        // Other location data...
        "doctors" => [],
        "reviews" => []
    ];
    
    // Get doctors from custom post type
    $doctor_args = [
        'post_type' => 'doctor',
        'posts_per_page' => -1,
        'meta_query' => [
            [
                'key' => 'location',
                'value' => 'nyc',
                'compare' => '='
            ]
        ]
    ];
    
    $doctor_query = new WP_Query($doctor_args);
    
    if ($doctor_query->have_posts()) {
        while ($doctor_query->have_posts()) {
            $doctor_query->the_post();
            $doctor_id = get_post_field('post_name');
            
            $location_data['doctors'][] = [
                'id' => $doctor_id,
                'name' => get_the_title(),
                'title' => get_field('title'),
                'specialty' => get_field('specialty'),
                'experience' => get_field('experience'),
                'bio' => get_the_excerpt(),
                'image' => get_the_post_thumbnail_url(get_the_ID(), 'medium'),
                'link' => get_permalink()
            ];
        }
    }
    wp_reset_postdata();
    
    // Get reviews from custom post type
    $review_args = [
        'post_type' => 'review',
        'posts_per_page' => -1,
        'meta_query' => [
            [
                'key' => 'location',
                'value' => 'nyc',
                'compare' => '='
            ]
        ]
    ];
    
    $review_query = new WP_Query($review_args);
    
    if ($review_query->have_posts()) {
        while ($review_query->have_posts()) {
            $review_query->the_post();
            
            $location_data['reviews'][] = [
                'id' => get_the_ID(),
                'name' => get_field('reviewer_name'),
                'rating' => get_field('rating'),
                'date' => get_the_date('Y-m-d'),
                'title' => get_the_title(),
                'content' => get_the_content(),
                'verified' => get_field('verified'),
                'doctor' => get_field('doctor')
            ];
        }
    }
    wp_reset_postdata();
    
    return $location_data;
}
```

## Styling Customization

The component uses CSS variables for all styling, making it easy to customize. You can override these variables in your theme's CSS:

```css
:root {
    --lr-primary-color: #973030;  /* Change to your brand color */
    --lr-primary-dark: #7a2626;
    --lr-primary-light: #b44040;
}
```

## Beaver Builder Integration

To use this component with Beaver Builder, you can:

1. Use the shortcode in a Beaver Builder text module
2. Create a custom Beaver Builder module that uses the rendering functions

Example of a custom Beaver Builder module:

```php
// In your theme's functions.php or a custom plugin
function maxim_doctor_reviews_bb_module() {
    if (class_exists('FLBuilder')) {
        require_once 'path/to/doctor-card-wordpress.php';
        
        class MaximDoctorReviewsModule extends FLBuilderModule {
            public function __construct() {
                parent::__construct(array(
                    'name'            => __('Doctor Reviews', 'fl-builder'),
                    'description'     => __('Display doctor cards with reviews', 'fl-builder'),
                    'category'        => __('MAXIM Modules', 'fl-builder'),
                    'dir'             => FL_THEME_DIR . '/modules/doctor-reviews/',
                    'url'             => FL_THEME_URL . '/modules/doctor-reviews/',
                    'editor_export'   => true,
                    'enabled'         => true,
                ));
            }
        }
        
        FLBuilder::register_module('MaximDoctorReviewsModule', array(
            'general' => array(
                'title' => __('General', 'fl-builder'),
                'sections' => array(
                    'general' => array(
                        'title' => '',
                        'fields' => array(
                            'location_id' => array(
                                'type' => 'text',
                                'label' => __('Location ID', 'fl-builder'),
                                'default' => 'nyc'
                            ),
                            'doctor_id' => array(
                                'type' => 'text',
                                'label' => __('Doctor ID', 'fl-builder'),
                                'default' => 'dr-barnard'
                            )
                        )
                    )
                )
            )
        ));
    }
}
add_action('init', 'maxim_doctor_reviews_bb_module');
```

## Support

For questions or support, please contact your developer.
