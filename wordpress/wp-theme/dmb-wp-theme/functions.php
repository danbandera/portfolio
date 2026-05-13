<?php

/**
 * Register custom post types for the headless Next.js frontend.
 * Both CPTs are exposed via the WP REST API.
 */
function dmb_register_cpts(): void {
    register_post_type( 'service', [
        'labels'       => [
            'name'          => __( 'Services', 'dmb-theme' ),
            'singular_name' => __( 'Service', 'dmb-theme' ),
            'add_new_item'  => __( 'Add New Service', 'dmb-theme' ),
            'edit_item'     => __( 'Edit Service', 'dmb-theme' ),
            'menu_name'     => __( 'Services', 'dmb-theme' ),
        ],
        'public'        => true,
        'show_in_rest'  => true,
        'rest_base'     => 'services',
        'supports'      => [ 'title', 'editor', 'custom-fields', 'excerpt' ],
        'menu_icon'     => 'dashicons-admin-generic',
        'has_archive'   => false,
        'rewrite'       => [ 'slug' => 'service' ],
    ] );

    register_post_type( 'work', [
        'labels'       => [
            'name'          => __( 'Work', 'dmb-theme' ),
            'singular_name' => __( 'Work', 'dmb-theme' ),
            'add_new_item'  => __( 'Add New Work', 'dmb-theme' ),
            'edit_item'     => __( 'Edit Work', 'dmb-theme' ),
            'menu_name'     => __( 'Work', 'dmb-theme' ),
        ],
        'public'        => true,
        'show_in_rest'  => true,
        'rest_base'     => 'works',
        'supports'      => [ 'title', 'editor', 'custom-fields', 'excerpt' ],
        'menu_icon'     => 'dashicons-portfolio',
        'has_archive'   => false,
        'rewrite'       => [ 'slug' => 'work' ],
    ] );
}
add_action( 'init', 'dmb_register_cpts' );

// Enable tags for custom post types
function dmb_enable_tags_for_cpts(): void {
    register_taxonomy_for_object_type( 'post_tag', 'service' );
    register_taxonomy_for_object_type( 'post_tag', 'work' );
}
add_action( 'init', 'dmb_enable_tags_for_cpts' );

/**
 * Register meta fields for both CPTs so they appear in the REST API response
 * under the `meta` key.
 *
 * service fields:
 *   dmb_icon  — unicode char used as visual icon (e.g. ⬡)
 *   dmb_tags  — array of technology tags
 *
 * work fields:
 *   dmb_year   — project year (e.g. "2024")
 *   dmb_type   — project type label (e.g. "Custom Theme")
 *   dmb_color  — card background hex (e.g. "#182A18")
 *   dmb_accent — card accent hex (e.g. "#7BC87A")
 */
function dmb_register_meta(): void {
    $string = [
        'type'          => 'string',
        'single'        => true,
        'show_in_rest'  => true,
        'auth_callback' => '__return_true',
        'default'       => '',
    ];

    register_post_meta( 'service', 'dmb_icon', $string );

    register_post_meta( 'service', 'dmb_tags', [
        'type'         => 'array',
        'single'       => true,
        'show_in_rest' => [
            'schema' => [
                'type'  => 'array',
                'items' => [ 'type' => 'string' ],
            ],
        ],
        'auth_callback' => '__return_true',
        'default'       => [],
    ] );

    foreach ( [ 'dmb_year', 'dmb_type', 'dmb_color', 'dmb_accent', 'dmb_url' ] as $key ) {
        register_post_meta( 'work', $key, $string );
    }
}
add_action( 'init', 'dmb_register_meta' );

// Add meta boxes for custom fields
function dmb_add_meta_boxes(): void {
    add_meta_box(
        'service_meta_box',
        'Service Details',
        'dmb_service_meta_box_callback',
        'service',
        'normal',
        'high'
    );

    add_meta_box(
        'work_meta_box',
        'Work Details',
        'dmb_work_meta_box_callback',
        'work',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'dmb_add_meta_boxes' );

// Service meta box callback
function dmb_service_meta_box_callback( $post ): void {
    wp_nonce_field( 'dmb_save_meta', 'dmb_meta_nonce' );

    $icon = get_post_meta( $post->ID, 'dmb_icon', true );
    $tags = get_post_meta( $post->ID, 'dmb_tags', true );
    if ( ! is_array( $tags ) ) {
        $tags = [];
    }

    echo '<p><label for="dmb_icon">Icon:</label><br>';
    echo '<input type="text" id="dmb_icon" name="dmb_icon" value="' . esc_attr( $icon ) . '" style="width:100%;" /></p>';

    echo '<p><label for="dmb_tags">Tags (comma-separated):</label><br>';
    echo '<input type="text" id="dmb_tags" name="dmb_tags" value="' . esc_attr( implode( ', ', $tags ) ) . '" style="width:100%;" /></p>';
}

// Work meta box callback
function dmb_work_meta_box_callback( $post ): void {
    wp_nonce_field( 'dmb_save_meta', 'dmb_meta_nonce' );

    $year = get_post_meta( $post->ID, 'dmb_year', true );
    $type = get_post_meta( $post->ID, 'dmb_type', true );
    $color = get_post_meta( $post->ID, 'dmb_color', true );
    $accent = get_post_meta( $post->ID, 'dmb_accent', true );

    echo '<p><label for="dmb_year">Year:</label><br>';
    echo '<input type="text" id="dmb_year" name="dmb_year" value="' . esc_attr( $year ) . '" style="width:100%;" /></p>';

    echo '<p><label for="dmb_type">Type:</label><br>';
    echo '<input type="text" id="dmb_type" name="dmb_type" value="' . esc_attr( $type ) . '" style="width:100%;" /></p>';

    echo '<p><label for="dmb_color">Background Color:</label><br>';
    echo '<input type="color" id="dmb_color" name="dmb_color" value="' . esc_attr( $color ) . '" /></p>';

    echo '<p><label for="dmb_accent">Accent Color:</label><br>';
    echo '<input type="color" id="dmb_accent" name="dmb_accent" value="' . esc_attr( $accent ) . '" /></p>';

    $url = get_post_meta( $post->ID, 'dmb_url', true );
    echo '<p><label for="dmb_url">Page URL:</label><br>';
    echo '<input type="url" id="dmb_url" name="dmb_url" value="' . esc_attr( $url ) . '" style="width:100%;" placeholder="https://example.com/work/project" /></p>';
}

// Save meta data
function dmb_save_meta( $post_id ): void {
    if ( ! isset( $_POST['dmb_meta_nonce'] ) || ! wp_verify_nonce( $_POST['dmb_meta_nonce'], 'dmb_save_meta' ) ) {
        return;
    }

    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
        return;
    }

    $fields = [
        'dmb_icon' => 'sanitize_text_field',
        'dmb_year' => 'sanitize_text_field',
        'dmb_type' => 'sanitize_text_field',
        'dmb_color' => 'sanitize_hex_color',
        'dmb_accent' => 'sanitize_hex_color',
        'dmb_url' => 'esc_url_raw',
    ];

    foreach ( $fields as $field => $sanitize ) {
        if ( isset( $_POST[ $field ] ) ) {
            update_post_meta( $post_id, $field, $sanitize( $_POST[ $field ] ) );
        }
    }

    // Handle tags array
    if ( isset( $_POST['dmb_tags'] ) ) {
        $tags = array_map( 'trim', explode( ',', sanitize_text_field( $_POST['dmb_tags'] ) ) );
        $tags = array_filter( $tags ); // Remove empty values
        update_post_meta( $post_id, 'dmb_tags', $tags );
    }
}
add_action( 'save_post', 'dmb_save_meta' );

/**
 * Allow CORS on REST API responses so the Next.js dev server (localhost:3000)
 * can call the WP API directly from the browser during development.
 * In production, requests come server-side from Next.js, so this is a dev aid.
 */
function dmb_rest_cors(): void {
    $origin = get_http_origin();

    // Allow localhost dev ports and the production frontend domain.
    $allowed = [
        'http://localhost:3000',
        'http://localhost:3001',
        // Add your production domain here when deployed:
        // 'https://danmtzbandera.com',
    ];

    if ( in_array( $origin, $allowed, true ) ) {
        header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
        header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
        header( 'Access-Control-Allow-Credentials: true' );
    }
}
add_action( 'rest_api_init', 'dmb_rest_cors', 15 );
