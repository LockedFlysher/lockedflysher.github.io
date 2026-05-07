/**
 * GridBackground Module - 科技感网格背景
 * 像工程图纸一样的结构化背景
 */

const GridBackground = (() => {
  const config = {
    dotSize: 1,
    dotColor: 'rgba(59, 130, 246, 0.15)',
    gridSize: 40,
    accentLines: true
  };

  let canvas, ctx, animationId;
  let mouseX = 0, mouseY = 0;
  let time = 0;

  const init = (containerSelector = 'body') => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Create canvas
    canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.6;
    `;
    container.prepend(canvas);

    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    animate();
  };

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  const drawGrid = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const gs = config.gridSize;

    ctx.clearRect(0, 0, w, h);

    // Draw dot grid
    ctx.fillStyle = config.dotColor;
    for (let x = 0; x < w; x += gs) {
      for (let y = 0; y < h; y += gs) {
        // Distance from mouse for ripple effect
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        let opacity = 1;
        if (dist < maxDist) {
          opacity = 0.3 + (dist / maxDist) * 0.7;
        }

        ctx.globalAlpha = opacity * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, config.dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;

    // Draw accent lines (like engineering blueprints)
    if (config.accentLines) {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 1;

      // Horizontal accent lines every 4 grid units
      for (let y = 0; y < h; y += gs * 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Vertical accent lines every 4 grid units
      for (let x = 0; x < w; x += gs * 4) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
    }

    // Draw data flow lines (animated)
    const flowOffset = (time * 0.5) % gs;
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
    ctx.lineWidth = 2;

    // Animated horizontal line
    const flowY = Math.floor(h / 3 / gs) * gs + flowOffset;
    ctx.beginPath();
    ctx.moveTo(0, flowY);
    for (let x = 0; x < w; x += 10) {
      const wave = Math.sin((x + time * 2) * 0.02) * 3;
      ctx.lineTo(x, flowY + wave);
    }
    ctx.stroke();
  };

  const animate = () => {
    time += 1;
    drawGrid();
    animationId = requestAnimationFrame(animate);
  };

  const destroy = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMouseMove);
    canvas?.remove();
  };

  return { init, destroy };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => GridBackground.init());
} else {
  GridBackground.init();
}
