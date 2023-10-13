<?php 
function university_files(){
    // wp_enqueue_style('university_main_styles', get_stylesheet_uri());
    wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  
    wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=yourkeygoeshere', NULL, '1.0', true);
  
    wp_enqueue_script('main-university-js', get_theme_file_uri('build/index.js'), array('jquery'), '1.0', true);
    wp_enqueue_style('our-main-styles-vendor', get_theme_file_uri('build/index.css'));
    wp_enqueue_style('our-main-styles', get_theme_file_uri('build/style-index.css'));
    wp_localize_script('main-university-js', 'universityData', array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
      ));
}

add_action('wp_enqueue_scripts', 'university_files');

function university_features(){
    register_nav_menu( 'headerMenuLocation', 'Header Menu Location' );
    register_nav_menu( 'footerLocationOne', 'Footer Location One' );
    register_nav_menu( 'footerLocationTwo', 'Footer Location Two' );
    add_theme_support('title-tag');

}

add_action('after_setup_theme', 'university_features');

?>
