/* ═══════════════════════════════════════════════════
   SPLASH SCREEN — Globe Zoom Controller
   Duration: ~1 second total
   ═══════════════════════════════════════════════════ */

(function initSplashScreen() {
  'use strict';

  const SPLASH_DURATION = 1000;  // 1 second total
  const EXIT_DURATION = 400;     // fade-out transition

  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  // Add splash-active class to body
  document.body.classList.add('splash-active');

  // Generate random stars
  const starsContainer = splash.querySelector('.splash-stars');
  if (starsContainer) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 60; i++) {
      const star = document.createElement('div');
      star.className = 'splash-star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.width = (Math.random() * 2 + 1) + 'px';
      star.style.height = star.style.width;
      star.style.animationDelay = (Math.random() * 1) + 's';
      star.style.animationDuration = (0.6 + Math.random() * 0.8) + 's';
      fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);
  }

  // After the splash duration, begin exit sequence
  setTimeout(function exitSplash() {
    // Start exit animation
    splash.classList.add('splash-exit');

    // Remove splash-active from body to begin page reveal
    document.body.classList.remove('splash-active');

    // After exit animation completes, remove the splash entirely
    setTimeout(function removeSplash() {
      splash.classList.add('splash-gone');

      // Clean up DOM after a brief delay
      setTimeout(function cleanup() {
        if (splash.parentNode) {
          splash.parentNode.removeChild(splash);
        }
      }, 100);
    }, EXIT_DURATION);
  }, SPLASH_DURATION);
})();
