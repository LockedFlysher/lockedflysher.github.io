/**
 * App Entry - 主入口
 * 按顺序初始化所有模块
 */

(function() {
  'use strict';

  // Module registry
  const modules = {
    gridBackground: window.GridBackground,
    i18n: window.I18n,
    smoothScroll: window.SmoothScroll
  };

  // Initialize all modules
  const init = () => {
    // 1. Grid background first (visual foundation)
    if (modules.gridBackground) {
      modules.gridBackground.init();
    }

    // 2. I18n (language switching)
    if (modules.i18n) {
      modules.i18n.init();
    }

    // 3. Smooth scroll
    if (modules.smoothScroll) {
      modules.smoothScroll.init();
    }

    // Update copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
