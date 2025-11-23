const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Pointer-driven glow
const root = document.documentElement;
const handlePointerMove = (event) => {
  root.style.setProperty('--pointer-x', `${event.clientX}px`);
  root.style.setProperty('--pointer-y', `${event.clientY}px`);
};

window.addEventListener('pointermove', handlePointerMove);

// Click pulse effect
window.addEventListener('click', (event) => {
  const pulse = document.createElement('span');
  pulse.className = 'click-pulse';
  pulse.style.left = `${event.clientX}px`;
  pulse.style.top = `${event.clientY}px`;
  document.body.appendChild(pulse);
  setTimeout(() => {
    pulse.remove();
  }, 600);
});
