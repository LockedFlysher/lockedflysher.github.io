/**
 * SmoothScroll Module - 平滑滚动
 */

const SmoothScroll = (() => {
  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  return { init };
})();

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', SmoothScroll.init);
} else {
  SmoothScroll.init();
}
