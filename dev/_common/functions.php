<?php

	// Clean up the <head>
	function removeHeadLinks() {
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wlwmanifest_link');
	}
	add_action('init', 'removeHeadLinks');
	remove_action('wp_head', 'wp_generator');

	// Enabling Support for Post Thumbnails
	add_theme_support( 'post-thumbnails' );

	//allowing SVG
	function cc_mime_types($mimes) {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
	add_filter('upload_mimes', 'cc_mime_types');

	//change compression settings
	add_filter('jpeg_quality', function($arg){return 100;});


	//allow redirection, even if my theme starts to send output to the browser
	add_action('init', 'do_output_buffer');
	function do_output_buffer() {
			ob_start();
	}

	//TinyMCE
	// Callback function to insert 'styleselect' into the $buttons array
	function my_mce_buttons_2( $buttons ) {
		array_unshift( $buttons, 'styleselect' );
		return $buttons;
	}
	// Register our callback to the appropriate filter
	add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );

	// Callback function to filter the MCE settings
	function my_mce_before_init_insert_formats( $init_array ) {
		// Define the style_formats array
		$style_formats = array(
			// Each array child is a format with it's own settings
			array(
				'title' => '2 колонки',
				'classes' => 'full-text',
				'wrapper' => false,
				'selector' => 'p',
				),
			);
		// Insert the array, JSON ENCODED, into 'style_formats'
		$init_array['style_formats'] = json_encode( $style_formats );

		return $init_array;

	}
	// Attach callback to 'tiny_mce_before_init'
	add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );

?>
