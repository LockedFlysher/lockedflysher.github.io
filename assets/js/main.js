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

// Experience video sync with dual-video layout
const experienceCards = document.querySelectorAll('.experience-card');
const videoDisplays = document.querySelectorAll('.video-display');
const videoLabel = document.getElementById('videoLabel');
const videoDesc = document.getElementById('videoDesc');

const createMediaMarkup = (src, titleText) => {
  const localMediaRegex = /\.(mp4|mov|webm)(\?|$)/i;
  if (localMediaRegex.test(src)) {
    return `
      <video
        src="${src}"
        title="${titleText || 'Experience demo'}"
        playsinline
        muted
        autoplay
        loop
        controls
      ></video>`;
  }

  return `
    <iframe
      src="${src}"
      title="${titleText || 'Experience demo'}"
      frameborder="0"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;
};

const setActiveVideo = (display, src, titleText) => {
  if (!display || !src) return;
  if (display.dataset.active === src) {
    return;
  }

  const activeLayer = display.querySelector('.video-layer.is-active');
  const layer = document.createElement('div');
  layer.className = 'video-layer entering';
  layer.innerHTML = createMediaMarkup(src, titleText);
  display.appendChild(layer);
  requestAnimationFrame(() => {
    layer.classList.add('is-active');
  });

  if (activeLayer) {
    activeLayer.classList.add('is-leaving');
    activeLayer.addEventListener(
      'transitionend',
      () => {
        activeLayer.remove();
      },
      { once: true }
    );
  }

  display.dataset.active = src;
};

const buildVideoData = (card) => {
  const rawList = card.dataset.videos || card.dataset.video || '';
  let videos = rawList
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);
  if (!videos.length) return null;

  const rawTitles = (card.dataset.videoTitles || '')
    .split('|')
    .map((item) => item.trim());
  const baseLabel = card.dataset.label || card.querySelector('h3')?.textContent || 'Demo';
  const desc = card.dataset.summary || card.querySelector('p')?.textContent || '';

  while (videos.length < 2) {
    videos.push(videos[videos.length - 1]);
  }
  videos = videos.slice(0, 2);

  const titles = videos.map((_, idx) => rawTitles[idx] || (idx === 0 ? baseLabel : `${baseLabel} · Alt ${idx + 1}`));

  return { videos, titles, label: baseLabel, desc };
};

const activateCard = (card) => {
  if (!card) return;
  const videoData = buildVideoData(card);
  if (!videoData) return;

  videoDisplays.forEach((display, index) => {
    const src = videoData.videos[index] || videoData.videos[videoData.videos.length - 1];
    const title = videoData.titles[index] || videoData.titles[0];
    setActiveVideo(display, src, title);
  });

  if (videoLabel) {
    videoLabel.textContent = videoData.label;
  }
  if (videoDesc) {
    videoDesc.textContent = videoData.desc;
  }

  experienceCards.forEach((item) => item.classList.remove('is-active'));
  card.classList.add('is-active');
};

experienceCards.forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('mouseenter', () => activateCard(card));
  card.addEventListener('focus', () => activateCard(card));
  card.addEventListener('click', () => activateCard(card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateCard(card);
    }
  });
});

const defaultCard = document.querySelector('.experience-card.is-active') || experienceCards[0];
if (defaultCard) {
  activateCard(defaultCard);
}
