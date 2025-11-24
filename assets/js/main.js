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

// Internationalization
const translations = {
  zh: {
    nav_work: '项目',
    nav_education: '教育',
    nav_skills: '工具集',
    nav_contact: '联系',
    hero_eyebrow: '我们至死都是学生',
    hero_heading: 'SunnyPea · 机器人运动控制工程师',
    hero_bullet1: '• 基于 IsaacLab 框架的基于学习的运动控制。',
    hero_bullet2: '• 基于 OCS2 或 CasADi 的基于模型的运动控制。',
    hero_bullet3: '• Python/C++、ROS1/ROS2、EtherCAT、Mujoco、Gazebo 工具链。',
    hero_cta_primary: '查看实践',
    hero_cta_secondary: '发送邮件',
    exp_heading: '重点实践',
    exp_desc: '悬停或点击左侧经历，右侧将同步播放对应的双视频 Demo。',
    exp_leju_desc: '负责 Parallel MPC 在四足机器人上的探索，构建从求解器到 RL 结合的完整 pipeline。',
    exp_leju_company: '乐聚机器人',
    exp_leju_role: '运动控制算法工程师',
    exp_leju_li1: '实现支持 WBD、FCD、SRBD 的 GPU 并行 MPC 求解器（统一 JAX 代码）。',
    exp_leju_li2: '以 MPC 高质量轨迹指导强化学习，加速收敛并降低 reward shaping 难度。',
    exp_leju_li3: '让 Kuavo 机器人在盲走实验中完成结构化地形穿越。',
    exp_qiling_desc: '负责人形机器人强化学习控制算法及其实体部署。',
    exp_qiling_company: '启灵机器人',
    exp_qiling_role: '运动控制算法工程师',
    exp_qiling_li1: '实现 26 自由度机器人 1.2 m/s 稳定行走并具备抗扰恢复能力。',
    exp_qiling_li2: '构建 ROS2 + 自研 SDK 接口，统一模拟、算法与实体控制面板。',
    exp_lingwen_desc: '为四足与人形机器人搭建实时通信基础设施。',
    exp_lingwen_company: '零稳机器人',
    exp_lingwen_role: 'EtherCAT 通信工程师',
    exp_lingwen_li1: '维护并拓展 EtherCAT 主站通信库与硬件接口，兼容 CSP / CSV / CST 模式。',
    exp_lingwen_li2: '完成 Elmo 驱动参数辨识与调参，分布式时钟同步至 4 kHz。',
    exp_lingwen_li3: '实现稳定踏步与 0–15° 坡度攀爬，平地速度 0.7 m/s。',
    edu_heading: '教育经历',
    edu_master_desc: '聚焦足式机器人运动控制、实时建模与快速 Demo 迭代。',
    edu_master_title: '华中科技大学',
    edu_master_school: '人工智能与自动化学院 · 硕士',
    edu_master_li1: 'CET-4/6 · IELTS 7.0',
    edu_master_li2: '华沙大学 & 帝国理工 AI 交流项目 · 组长',
    edu_master_li3: '剑桥微纳材料交流项目 · 组长',
    edu_bachelor_desc: '融合材料制造与机器人硬件，夯实样机验证能力。',
    edu_bachelor_title: '华中科技大学',
    edu_bachelor_school: '材料科学与工程学院 · 学士',
    edu_bachelor_li1: '国家奖学金（2022）· 国家励志奖学金（2021）',
    edu_bachelor_li2: '三维建模大赛 国一 & 省特等奖（2022）· 组长',
    edu_bachelor_li3: '永冠杯 国二 & 校特等奖（2022）· 组长',
    edu_bachelor_li4: '校三好学生（2019–2022）',
    oss_heading: '开源工具集',
    oss_desc: '欢迎到我的 B 站主页交流：<a class="oss-link" href="https://space.bilibili.com/438723840" target="_blank" rel="noreferrer">@晴糖豆</a>',
    oss_ros2_desc: 'ROS2 工作空间图形化管理：多包选择编译、symlink-install、智能清理、主题切换、依赖图与实时日志。',
    oss_mujoco_desc: 'MuJoCo PyQt5 查看器：记忆路径、基座/关节控制、信息面板、静态姿态调试与一键复位。',
    oss_easy_desc: 'easy HybriK 介绍稍后补充，敬请期待。',
    contact_heading: '联系',
    contact_desc: '欢迎就合作、问题或机器人想法联系我。',
    contact_email_label: '邮箱',
    contact_github_label: 'GitHub'
  }
};

const i18nNodes = Array.from(document.querySelectorAll('[data-i18n]'));
const i18nBase = {};
i18nNodes.forEach((node) => {
  const key = node.dataset.i18n;
  if (!key || key in i18nBase) return;
  i18nBase[key] = node.innerHTML;
});

const applyLanguage = (langCode) => {
  const isZh = langCode && langCode.startsWith('zh');
  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (!key) return;
    if (isZh && translations.zh[key]) {
      node.innerHTML = translations.zh[key];
    } else if (i18nBase[key] !== undefined) {
      node.innerHTML = i18nBase[key];
    }
  });
};

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

// Language toggle + application
const langToggle = document.querySelector('.lang-toggle');
const updateLangToggleLabel = () => {
  if (!langToggle) return;
  const current = document.documentElement.getAttribute('lang') || 'en';
  langToggle.textContent = current.startsWith('zh') ? 'EN' : '中文';
};

const setLanguage = (langCode) => {
  const normalized = langCode && langCode.startsWith('zh') ? 'zh-CN' : 'en';
  document.documentElement.setAttribute('lang', normalized);
  applyLanguage(normalized);
  updateLangToggleLabel();
};

applyLanguage(document.documentElement.getAttribute('lang') || 'en');
updateLangToggleLabel();

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') || 'en';
    const next = current.startsWith('zh') ? 'en' : 'zh-CN';
    setLanguage(next);
  });
}
