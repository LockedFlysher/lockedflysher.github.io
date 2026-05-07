/**
 * I18n Module - 国际化管理
 * 统一处理所有多语言内容切换
 */

const I18n = (() => {
  const config = {
    defaultLang: 'en',
    supportedLangs: ['en', 'zh'],
    storageKey: 'lang'
  };

  const translations = {
    en: {
      // Navigation
      nav_work: 'Work',
      nav_education: 'Education',
      nav_skills: 'Skills',
      nav_contact: 'Contact',

      // Hero
      hero_role: 'Robotics Motion Control Engineer',
      hero_tagline: 'M.Eng in AI & Automation · HUST',
      hero_cta_work: 'View Experience',
      hero_cta_contact: 'Get in Touch',

      // Section Headers
      section_experience: 'Experience',
      section_education: 'Education',
      section_skills: 'Technical Skills',
      section_honors: 'Honors & Awards',
      section_contact: 'Contact',

      // Experience
      exp_leju_role: 'Motion Control Algorithm Engineer',
      exp_leju_period: 'Jun 2025 – Nov 2025',
      exp_leju_desc: 'Led Parallel MPC research on quadruped robots, built end-to-end pipeline from solver to RL deployment.',
      exp_leju_ach1: 'GPU-parallel MPC solver supporting WBD/FCD/SRBD models with unified JAX codebase',
      exp_leju_ach2: 'MPC-guided RL training accelerating convergence and improving robustness',
      exp_leju_ach3: 'Kuavo blind locomotion on structured terrain',

      exp_qiling_role: 'Humanoid RL Control Engineer',
      exp_qiling_period: 'Apr 2024 – May 2025',
      exp_qiling_desc: 'Designed and deployed reinforcement learning control for humanoid robots.',
      exp_qiling_ach1: '26-DoF robot stable walking at 1.2 m/s with push recovery',
      exp_qiling_ach2: 'Standardized ROS2 + SDK framework unifying sim, algorithm, and hardware',

      exp_lingwen_role: 'EtherCAT Communication Engineer',
      exp_lingwen_period: 'Oct 2023 – Apr 2024',
      exp_lingwen_desc: 'Built real-time communication backbone for legged robots.',
      exp_lingwen_ach1: 'Extended EtherCAT master library supporting CSP/CSV/CST modes',
      exp_lingwen_ach2: 'Elmo drive tuning achieving 4 kHz distributed clock sync',
      exp_lingwen_ach3: 'Quadruped 0.7 m/s walking with 0-15° slope climbing',

      // Education
      edu_master_school: 'Huazhong University of Science and Technology',
      edu_master_dept: 'School of AI & Automation · M.Eng',
      edu_master_period: 'Sep 2023 – Present',
      edu_master_focus: 'Focus: Legged robot MPC & learning-based control',

      edu_bachelor_school: 'Huazhong University of Science and Technology',
      edu_bachelor_dept: 'School of Materials Science · B.Eng',
      edu_bachelor_period: 'Sep 2019 – Jun 2023',
      edu_bachelor_focus: 'Robotics hardware prototyping & manufacturing',

      // Skills categories
      skill_control: 'Control & Learning',
      skill_simulation: 'Simulation',
      skill_communication: 'Communication',
      skill_programming: 'Programming',

      // Honors
      honor_national_scholarship: 'National Scholarship (Top 0.2%)',
      honor_modeling: 'National 3D Modeling Competition · 1st Prize',
      honor_ielts: 'IELTS 7.0 / CET-6',

      // Contact
      contact_email: 'Email',
      contact_github: 'GitHub',
      contact_bilibili: 'Bilibili',
      contact_location: 'Location',
      contact_location_value: 'Wuhan, China',

      // Footer
      footer_built: 'Built with',
      footer_hosted: 'Hosted on GitHub Pages'
    },

    zh: {
      // Navigation
      nav_work: '工作经历',
      nav_education: '教育背景',
      nav_skills: '技术栈',
      nav_contact: '联系方式',

      // Hero
      hero_role: '机器人运动控制工程师',
      hero_tagline: '华中科技大学 · 人工智能与自动化学院 · 硕士在读',
      hero_cta_work: '查看经历',
      hero_cta_contact: '联系我',

      // Section Headers
      section_experience: '工作经历',
      section_education: '教育背景',
      section_skills: '技术能力',
      section_honors: '荣誉奖项',
      section_contact: '联系方式',

      // Experience
      exp_leju_role: '运动控制算法工程师',
      exp_leju_period: '2025.06 – 2025.11',
      exp_leju_desc: '主导 Parallel MPC 在四足机器人上的应用，构建从求解器到 RL 部署的完整 pipeline。',
      exp_leju_ach1: '实现支持 WBD/FCD/SRBD 的 GPU 并行 MPC 求解器，统一 JAX 代码库',
      exp_leju_ach2: '以 MPC 高质量轨迹指导强化学习，加速收敛并提升鲁棒性',
      exp_leju_ach3: '完成 Kuavo 机器人在结构化地形下的盲走实验',

      exp_qiling_role: '人形机器人 RL 控制工程师',
      exp_qiling_period: '2024.04 – 2025.05',
      exp_qiling_desc: '负责人形机器人强化学习控制算法设计与实体部署。',
      exp_qiling_ach1: '实现 26 自由度机器人 1.2 m/s 稳定行走及抗扰恢复',
      exp_qiling_ach2: '构建 ROS2 + 自研 SDK 框架，统一仿真、算法与实体接口',

      exp_lingwen_role: 'EtherCAT 通信工程师',
      exp_lingwen_period: '2023.10 – 2024.04',
      exp_lingwen_desc: '为足式机器人搭建实时通信基础设施。',
      exp_lingwen_ach1: '扩展 EtherCAT 主站库，支持 CSP/CSV/CST 模式',
      exp_lingwen_ach2: '完成 Elmo 驱动调参，实现 4 kHz 分布式时钟同步',
      exp_lingwen_ach3: '四足平台平地速度 0.7 m/s，通过 0-15° 坡面测试',

      // Education
      edu_master_school: '华中科技大学',
      edu_master_dept: '人工智能与自动化学院 · 硕士',
      edu_master_period: '2023.09 – 至今',
      edu_master_focus: '研究方向：足式机器人 MPC 与基于学习的控制',

      edu_bachelor_school: '华中科技大学',
      edu_bachelor_dept: '材料科学与工程学院 · 学士',
      edu_bachelor_period: '2019.09 – 2023.06',
      edu_bachelor_focus: '机器人硬件设计与制造基础',

      // Skills categories
      skill_control: '控制与学习',
      skill_simulation: '仿真平台',
      skill_communication: '通信协议',
      skill_programming: '编程语言',

      // Honors
      honor_national_scholarship: '国家奖学金（Top 0.2%）',
      honor_modeling: '全国三维建模大赛 · 一等奖',
      honor_ielts: '雅思 7.0 / 英语六级',

      // Contact
      contact_email: '邮箱',
      contact_github: 'GitHub',
      contact_bilibili: 'Bilibili',
      contact_location: '所在地',
      contact_location_value: '中国 · 武汉',

      // Footer
      footer_built: '使用',
      footer_hosted: '托管于 GitHub Pages'
    }
  };

  // Get current language from storage or default
  const getCurrentLang = () => {
    const stored = localStorage.getItem(config.storageKey);
    return stored && config.supportedLangs.includes(stored)
      ? stored
      : config.defaultLang;
  };

  // Set language
  const setLang = (lang) => {
    if (!config.supportedLangs.includes(lang)) return;
    localStorage.setItem(config.storageKey, lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    applyTranslations(lang);
    updateToggleButton(lang);
  };

  // Apply translations to all elements with data-i18n
  const applyTranslations = (lang) => {
    const texts = translations[lang];
    if (!texts) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (texts[key]) {
        if (el.dataset.i18nHtml === 'true') {
          el.innerHTML = texts[key];
        } else {
          el.textContent = texts[key];
        }
      }
    });
  };

  // Update toggle button text
  const updateToggleButton = (lang) => {
    const btn = document.querySelector('[data-lang-toggle]');
    if (btn) {
      btn.textContent = lang === 'zh' ? 'EN' : '中文';
    }
  };

  // Toggle between languages
  const toggle = () => {
    const current = getCurrentLang();
    const next = current === 'zh' ? 'en' : 'zh';
    setLang(next);
  };

  // Initialize
  const init = () => {
    const lang = getCurrentLang();
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    applyTranslations(lang);
    updateToggleButton(lang);

    // Bind toggle button
    document.querySelector('[data-lang-toggle]')?.addEventListener('click', toggle);
  };

  return {
    init,
    setLang,
    toggle,
    getCurrentLang,
    translations
  };
})();

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', I18n.init);
} else {
  I18n.init();
}
