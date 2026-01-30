// ==========================================
// CRITICAL: INSTANT HERO IMAGE LOADING
// ==========================================
// This script runs BEFORE DOMContentLoaded to preload the hero image
// ensuring it appears instantly without any visible loading delay

(function () {
    'use strict';

    // Preload hero image immediately
    const heroImage = new Image();
    heroImage.src = './assets/hero.jpeg';

    // Log when image is loaded (for debugging)
    heroImage.onload = function () {
        console.log('✓ Hero image preloaded and cached');
        document.documentElement.classList.add('hero-image-loaded');
    };

    heroImage.onerror = function () {
        console.error('✗ Failed to preload hero image');
    };
})();
