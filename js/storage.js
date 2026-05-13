/* Shoghlak localStorage storage helpers + seeding */

const LS_KEYS = {
  users: 'shoghlak_users',
  currentUser: 'shoghlak_currentUser',
  jobs: 'shoghlak_jobs',
  courses: 'shoghlak_courses',
  applications: 'shoghlak_applications'
};

function safeParse(json, fallback) {
  try {
    if (!json) return fallback;
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

function readLS(key, fallback) {
  return safeParse(localStorage.getItem(key), fallback);
}

function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Users ----------
function getUsers() {
  return readLS(LS_KEYS.users, []);
}

function saveUsers(users) {
  writeLS(LS_KEYS.users, users);
}

function getCurrentUser() {
  return readLS(LS_KEYS.currentUser, null);
}

function setCurrentUser(user) {
  writeLS(LS_KEYS.currentUser, user);
}

function logout() {
  localStorage.removeItem(LS_KEYS.currentUser);
}

function emailExists(email) {
  const users = getUsers();
  return users.some(u => String(u.email).toLowerCase() === String(email).toLowerCase());
}

function createUser({ name, email, password }) {
  const users = getUsers();
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + '_' + Math.random().toString(16).slice(2);
  const user = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  return user;
}

function validateUser({ email, password }) {
  const users = getUsers();
  const found = users.find(u => String(u.email).toLowerCase() === String(email).toLowerCase());
  if (!found) return { ok: false, reason: 'Email not found.' };
  if (found.password !== password) return { ok: false, reason: 'Incorrect password.' };
  return { ok: true, user: found };
}

// ---------- Seeded Jobs ----------
function getJobs() {
  return readLS(LS_KEYS.jobs, []);
}

function saveJobs(jobs) {
  writeLS(LS_KEYS.jobs, jobs);
}

function seedJobsIfNeeded() {
  const jobs = getJobs();
  if (jobs.length >= 12) return;

  const now = new Date();
  const seed = [
    {
      id: 'job_1',
      title: 'Frontend Engineer (React/Vanilla)',
      company: 'Nebula Systems',
      description: 'Build responsive, accessible interfaces with clean component architecture. Partner with design to ship polished experiences.',
      skills: ['HTML', 'CSS', 'JavaScript', 'Accessibility', 'Performance'],
      salary: '$90k - $120k',
      location: 'Remote (UTC±4)',
      status: 'Full Time',
      technologyTag: 'Technology',
      image: 'https://images.unsplash.com/photo-1552662470-2aa5dcd1d6c3?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_2',
      title: 'Backend Developer (JavaScript)',
      company: 'Atlas FinTech',
      description: 'Design scalable APIs and data models. Improve reliability, observability, and security across services.',
      skills: ['JavaScript', 'APIs', 'Authentication', 'Databases', 'Security'],
      salary: '$110k - $150k',
      location: 'Berlin, Germany',
      status: 'Full Time',
      technologyTag: 'Technology',
      image: 'https://images.unsplash.com/photo-1551297487-3f7e3b8f2ef1?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_3',
      title: 'UI/UX Designer',
      company: 'Aurora Studio',
      description: 'Create user-centered flows and high-fidelity designs. Produce design systems and prototype interactions.',
      skills: ['Figma', 'Design Systems', 'Typography', 'Prototyping', 'User Research'],
      salary: '$75k - $105k',
      location: 'Kyiv, Ukraine',
      status: 'Full Time',
      technologyTag: 'Design',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_4',
      title: 'Product Marketing Specialist',
      company: 'Pulse Growth',
      description: 'Develop messaging, launch plans, and content strategies. Collaborate with product teams to drive adoption.',
      skills: ['Positioning', 'Copywriting', 'Analytics', 'Go-to-market', 'Storytelling'],
      salary: '$70k - $95k',
      location: 'Remote (UTC±1)',
      status: 'Full Time',
      technologyTag: 'Marketing',
      image: 'https://images.unsplash.com/photo-1523952578875-3b5c3f1c3e8a?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_5',
      title: 'Data Analyst (Growth & Insights)',
      company: 'Saffron Labs',
      description: 'Analyze funnels and experiments. Build dashboards and provide actionable insights for product and marketing.',
      skills: ['SQL', 'Dashboards', 'Experimentation', 'Statistics', 'Visualization'],
      salary: '$85k - $115k',
      location: 'Amsterdam, Netherlands',
      status: 'Full Time',
      technologyTag: 'Marketing',
      image: 'https://images.unsplash.com/photo-1550475335-0a0f8e9bd2b8?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_6',
      title: 'Mobile Developer (Android/Kotlin)',
      company: 'RiverTech',
      description: 'Ship stable mobile features with a focus on UX and battery efficiency. Integrate APIs and monitoring.',
      skills: ['Kotlin', 'Android', 'REST', 'UI', 'Testing'],
      salary: '$105k - $140k',
      location: 'Lviv, Ukraine',
      status: 'Full Time',
      technologyTag: 'Technology',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_7',
      title: 'DevOps Engineer (Cloud & CI/CD)',
      company: 'Skyline Cloud',
      description: 'Maintain infrastructure and automate delivery pipelines. Improve deployment safety and system observability.',
      skills: ['CI/CD', 'Docker', 'Cloud', 'Monitoring', 'Automation'],
      salary: '$120k - $160k',
      location: 'Remote (UTC±0)',
      status: 'Full Time',
      technologyTag: 'Technology',
      image: 'https://images.unsplash.com/photo-1555949963-ff9c284c8bcd?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_8',
      title: 'AI/ML Engineer (Applied)',
      company: 'CortexWorks',
      description: 'Build and evaluate machine learning systems for recommendations and personalization. Focus on practical outcomes.',
      skills: ['Python', 'ML', 'Evaluation', 'Data Pipelines', 'Model Deployment'],
      salary: '$130k - $175k',
      location: 'Warsaw, Poland',
      status: 'Full Time',
      technologyTag: 'AI',
      image: 'https://images.unsplash.com/photo-1581091215367-59ad9b87a6d7?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_9',
      title: 'QA Engineer (Manual + Automation)',
      company: 'BrightShip',
      description: 'Create test plans and automate critical paths. Ensure quality for releases across web and services.',
      skills: ['Testing', 'Automation', 'Regression', 'Bug Reporting', 'Web Basics'],
      salary: '$70k - $100k',
      location: 'Remote (UTC±3)',
      status: 'Part Time',
      technologyTag: 'Technology',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_10',
      title: 'Cybersecurity Analyst',
      company: 'Fortress Digital',
      description: 'Monitor threats, review alerts, and contribute to incident response playbooks. Improve security posture.',
      skills: ['Threat Detection', 'SIEM', 'Incident Response', 'Risk', 'Security Basics'],
      salary: '$95k - $135k',
      location: 'London, UK',
      status: 'Full Time',
      technologyTag: 'Cybersecurity',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_11',
      title: 'Content Designer (Education)',
      company: 'LearnNest',
      description: 'Transform complex topics into clear learning experiences. Work with instructors to shape course narratives.',
      skills: ['Instructional Design', 'Writing', 'Editing', 'Learning Objectives', 'UX Writing'],
      salary: '$65k - $90k',
      location: 'Remote (UTC±2)',
      status: 'Part Time',
      technologyTag: 'Design',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'job_12',
      title: 'Marketing Growth Associate',
      company: 'Verve Commerce',
      description: 'Support campaigns, track performance, and help optimize conversion. Collaborate with creative and analytics.',
      skills: ['Campaigns', 'SEO Basics', 'Analytics', 'Email Marketing', 'Experimentation'],
      salary: '$60k - $80k',
      location: 'Istanbul, Turkey',
      status: 'Full Time',
      technologyTag: 'Marketing',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70'
    },
  ];

  // Add remote/full-time flags for filter convenience.
  const normalized = seed.map(j => {
    const isRemote = /remote/i.test(j.location);
    const parts = j.status;
    return {
      ...j,
      remote: isRemote,
      fullTime: parts === 'Full Time',
      partTime: parts === 'Part Time',
      category: j.technologyTag
    };
  });

  saveJobs(normalized);
}

// ---------- Seeded Courses ----------
function getCourses() {
  return readLS(LS_KEYS.courses, []);
}

function saveCourses(courses) {
  writeLS(LS_KEYS.courses, courses);
}

function seedCoursesIfNeeded() {
  const courses = getCourses();
  if (courses.length >= 12) return;

  const seed = [
    {
      id: 'course_1',
      title: 'Modern JavaScript from Scratch',
      description: 'Learn JavaScript fundamentals and advanced patterns with hands-on examples. Become confident with async/await and ES modules.',
      longDescription: 'This course is designed to take you from zero to building real front-end logic. You will learn the core language features, modern syntax, and how to structure code for maintainability. We also cover async programming, data transformations, and practical debugging.',
      category: 'Programming',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Mira S.',
      duration: '8h 20m',
      difficulty: 'Beginner',
      tips: ['Practice small examples daily', 'Use browser devtools for debugging', 'Read error messages carefully'],
      outcomes: ['Understand ES6+ syntax', 'Write clean functions', 'Handle async/await properly', 'Build small apps with local state'],
      content: [
        'JavaScript basics & values',
        'Functions, scope, and closures',
        'Arrays, objects, and transformations',
        'Async & promises',
        'ES modules & project structure'
      ],
      videos: [
        { title: 'JavaScript Basics', youtubeId: 'PkZNo7MFNFg' },
        { title: 'Async JS Explained', youtubeId: 'PoRJizF8xMEN' }
      ]
    },
    {
      id: 'course_2',
      title: 'CSS for Real Projects: Layout + Motion',
      description: 'Master Flexbox, Grid, responsive design, and tasteful animations. Learn how to design a professional UI.',
      longDescription: 'You will learn modern layout techniques with Flexbox and CSS Grid, then apply them to real components. The course includes hover interactions, accessible focus styles, and motion that enhances usability without being distracting.',
      category: 'UI/UX',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Arman K.',
      duration: '6h 45m',
      difficulty: 'Intermediate',
      tips: ['Start mobile-first', 'Use consistent spacing scale', 'Test contrast and focus states'],
      outcomes: ['Build responsive layouts', 'Create reusable UI components', 'Add smooth animations', 'Improve accessibility'],
      content: ['Flexbox essentials', 'Grid layouts', 'Responsive design patterns', 'Transitions & animations', 'Accessible UI focus'],
      videos: [
        { title: 'CSS Grid Tutorial', youtubeId: 'Jj3h8nQ0Qf8' },
        { title: 'Flexbox Crash Course', youtubeId: 'JJSoEo8JSnc' }
      ]
    },
    {
      id: 'course_3',
      title: 'Introduction to AI Concepts (Applied)',
      description: 'Understand AI terms, datasets, model evaluation, and practical workflows for applied ML.',
      longDescription: 'This course focuses on the AI landscape and practical considerations when building ML solutions. You will learn model evaluation basics, common pitfalls, and how to communicate results to non-technical stakeholders.',
      category: 'AI',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Elena R.',
      duration: '5h 10m',
      difficulty: 'Beginner',
      tips: ['Start with small datasets', 'Always define metrics', 'Keep a clear experiment log'],
      outcomes: ['Understand datasets and training', 'Evaluate models with metrics', 'Explain AI outcomes clearly', 'Recognize bias and limitations'],
      content: ['AI vs ML vs DL', 'Data preparation basics', 'Metrics & evaluation', 'Overfitting and regularization', 'Deployment overview'],
      videos: [
        { title: 'AI Explained', youtubeId: 'U5h7wq3sLqk' },
        { title: 'Machine Learning Basics', youtubeId: 'Gwern0Wm' }
      ]
    },
    {
      id: 'course_4',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn security basics: threats, risk, common attacks, and how to protect systems and users.',
      longDescription: 'You will build a foundation in cybersecurity with an emphasis on practical protection. Topics include common threat models, secure habits, and incident-response thinking.',
      category: 'Cybersecurity',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9c284c8bcd?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Sven T.',
      duration: '7h 05m',
      difficulty: 'Beginner',
      tips: ['Use password managers', 'Enable MFA everywhere', 'Keep systems updated'],
      outcomes: ['Understand threat models', 'Know common attack vectors', 'Follow basic security hygiene', 'Learn incident response basics'],
      content: ['Threats & risk', 'Phishing and social engineering', 'Secure authentication', 'Network basics', 'Incident response'],
      videos: [
        { title: 'Cybersecurity Overview', youtubeId: 'k3qQwJwXqkQ' },
        { title: 'Security Best Practices', youtubeId: '2fW7o2y8d7E' }
      ]
    },
    {
      id: 'course_5',
      title: 'UI/UX Writing that Converts',
      description: 'Write microcopy that guides users. Learn patterns for onboarding, errors, and calls-to-action.',
      longDescription: 'Microcopy affects trust and usability. This course helps you create clearer prompts, better error messages, and more confident user flows. You’ll practice rewriting common UI text and applying UX writing principles.',
      category: 'UI/UX',
      thumbnail: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Nadia L.',
      duration: '3h 40m',
      difficulty: 'Beginner',
      tips: ['Be specific and helpful', 'Use friendly tone with clarity', 'Avoid jargon in UI'],
      outcomes: ['Write clearer onboarding steps', 'Improve error messages', 'Design effective CTAs', 'Increase user confidence'],
      content: ['Tone & voice', 'Error message patterns', 'CTA microcopy', 'Onboarding prompts'],
      videos: [
        { title: 'UX Writing Tips', youtubeId: '2pKQ0JcHqQk' },
        { title: 'Microcopy Examples', youtubeId: 'oHg5SJYRHA0' }
      ]
    },
    {
      id: 'course_6',
      title: 'Backend APIs & Auth Patterns',
      description: 'Build secure API endpoints and understand authentication strategies for modern web apps.',
      longDescription: 'Learn the core patterns behind API design and authentication. We cover token flows, secure password handling concepts, and practical endpoint structuring. You’ll learn how to design stable interfaces for front-end developers.',
      category: 'Programming',
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Noah B.',
      duration: '9h 00m',
      difficulty: 'Intermediate',
      tips: ['Design endpoints first', 'Keep authentication simple', 'Validate inputs always'],
      outcomes: ['Design RESTful APIs', 'Understand auth flows', 'Structure secure middleware', 'Prevent common security mistakes'],
      content: ['API design basics', 'Auth concepts', 'Input validation', 'Error handling', 'Security checklists'],
      videos: [
        { title: 'REST API Tutorial', youtubeId: 's7wmiS2mSXY' },
        { title: 'Authentication Explained', youtubeId: '9QKcQ3Yw6jA' }
      ]
    },
    {
      id: 'course_7',
      title: 'Product Analytics: Funnels to Insights',
      description: 'Learn how to measure activation, retention, and conversion with practical analytics frameworks.',
      longDescription: 'This course teaches you to turn events into decisions. You’ll learn to define KPIs, instrument funnels, interpret results, and communicate insights to stakeholders.',
      category: 'Business',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38ef1?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Omar D.',
      duration: '6h 10m',
      difficulty: 'Intermediate',
      tips: ['Define success metrics early', 'Avoid vanity metrics', 'Run controlled experiments'],
      outcomes: ['Set KPIs and goals', 'Build funnel logic', 'Understand retention', 'Communicate results'],
      content: ['KPI basics', 'Funnel analysis', 'Cohorts', 'Dashboards', 'Experimentation overview'],
      videos: [
        { title: 'Funnel Analysis', youtubeId: 'f6M8zC8qXbY' },
        { title: 'Analytics Basics', youtubeId: 'pK4P1oZ9dGQ' }
      ]
    },
    {
      id: 'course_8',
      title: 'Marketing Strategy & Campaigns',
      description: 'Plan campaigns end-to-end: audience, positioning, content, and measurement.',
      longDescription: 'You’ll learn how to build a campaign strategy that ties messaging to measurable outcomes. Includes practical steps for audience research, channel selection, and iterative optimization.',
      category: 'Marketing',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Sara M.',
      duration: '4h 25m',
      difficulty: 'Beginner',
      tips: ['Start from user needs', 'Map message to channel', 'Measure and iterate'],
      outcomes: ['Create campaign plans', 'Define budgets and timelines', 'Pick measurable KPIs', 'Optimize based on results'],
      content: ['Audience and personas', 'Positioning', 'Campaign structure', 'Measurement & iteration'],
      videos: [
        { title: 'Marketing Strategy', youtubeId: '2g811Eo7K8k' },
        { title: 'Campaign Planning', youtubeId: 'V1bEEc6lVnE' }
      ]
    },
    {
      id: 'course_9',
      title: 'AI for Builders: Prompting & Evaluation',
      description: 'Learn practical prompting techniques and simple evaluation approaches for AI outputs.',
      longDescription: 'This course focuses on how to interact with AI models effectively. You will learn prompt patterns, hallucination awareness, and evaluation workflows you can use in real projects.',
      category: 'AI',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Priya W.',
      duration: '5h 55m',
      difficulty: 'Intermediate',
      tips: ['Test prompts with varied inputs', 'Define what “good” means', 'Keep a test set'],
      outcomes: ['Create robust prompts', 'Evaluate responses', 'Reduce ambiguity', 'Build reliable AI workflows'],
      content: ['Prompt patterns', 'Quality signals', 'Evaluation basics', 'Iterating prompts', 'Safety considerations'],
      videos: [
        { title: 'Prompt Engineering', youtubeId: 'mU2hWmB2y3A' },
        { title: 'AI Output Evaluation', youtubeId: 'eX0eF5bW7u4' }
      ]
    },
    {
      id: 'course_10',
      title: 'Cybersecurity for Everyday Users',
      description: 'Make safer choices online with practical guidance and threat awareness.',
      longDescription: 'You’ll learn how everyday security works: strong authentication, safe browsing, and how to recognize social engineering. This course emphasizes habit-building and practical checklists.',
      category: 'Cybersecurity',
      thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Hana Z.',
      duration: '2h 50m',
      difficulty: 'Beginner',
      tips: ['Turn on MFA', 'Watch for lookalikes', 'Verify sources'],
      outcomes: ['Recognize common scams', 'Apply safety checklists', 'Understand MFA benefits', 'Build secure routines'],
      content: ['MFA and passwords', 'Phishing recognition', 'Device safety', 'Data privacy basics'],
      videos: [
        { title: 'Online Safety', youtubeId: 'sVTQvL1m8kA' },
        { title: 'Phishing Awareness', youtubeId: '5eYVYb8K5yQ' }
      ]
    },
    {
      id: 'course_11',
      title: 'Business Foundations: From Idea to Launch',
      description: 'Understand business basics including validation, pricing, and go-to-market planning.',
      longDescription: 'Learn to validate ideas, create simple business models, and plan your launch. The course provides a clear structure you can reuse for new products and learning projects.',
      category: 'Business',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38ef1?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Leo P.',
      duration: '4h 55m',
      difficulty: 'Beginner',
      tips: ['Talk to users early', 'Keep assumptions visible', 'Start with a simple plan'],
      outcomes: ['Validate ideas', 'Choose pricing approaches', 'Plan a go-to-market', 'Avoid common launch pitfalls'],
      content: ['Validation', 'Business model basics', 'Pricing', 'Launch planning'],
      videos: [
        { title: 'Business Basics', youtubeId: 'qw8Qxw4f6sQ' },
        { title: 'Go-to-Market', youtubeId: 'VmlGkWQqS1w' }
      ]
    },
    {
      id: 'course_12',
      title: 'UI/UX Foundations: Design a Better Flow',
      description: 'Learn core UX principles: usability, hierarchy, and designing for accessibility and trust.',
      longDescription: 'This course teaches UX foundations and provides practical frameworks for designing flows that work well on real screens. You will learn about visual hierarchy, accessibility, and how to design for different user states.',
      category: 'UI/UX',
      thumbnail: 'https://images.unsplash.com/photo-1551033406-611cf9a28f66?auto=format&fit=crop&w=1200&q=70',
      instructor: 'Zoya N.',
      duration: '6h 05m',
      difficulty: 'Intermediate',
      tips: ['Map user journeys', 'Use consistent hierarchy', 'Design for empty/error states'],
      outcomes: ['Create accessible flows', 'Improve usability', 'Design with hierarchy', 'Build trust through UI'],
      content: ['UX principles', 'Usability heuristics', 'Accessibility basics', 'Visual hierarchy', 'States and error handling'],
      videos: [
        { title: 'UX Design Basics', youtubeId: '3GwjfUFyY6M' },
        { title: 'Accessibility Basics', youtubeId: '1h1r0kZqv3U' }
      ]
    }
  ];

  const normalized = seed.map(c => ({
    ...c,
    videos: c.videos.map(v => ({ title: v.title, youtubeId: v.youtubeId }))
  }));

  saveCourses(normalized);
}

// ---------- Applications ----------
function getApplications() {
  return readLS(LS_KEYS.applications, []);
}

function saveApplications(apps) {
  writeLS(LS_KEYS.applications, apps);
}

function addApplication({ userId, jobId, formData }) {
  const apps = getApplications();
  const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + '_' + Math.random().toString(16).slice(2);
  const application = {
    id,
    userId,
    jobId,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    formData
  };
  apps.push(application);
  saveApplications(apps);
  return application;
}

// ---------- Bootstrap ----------
function ensureSeeded() {
  seedJobsIfNeeded();
  seedCoursesIfNeeded();
  // Applications/users/currUser are created lazily.
  if (!localStorage.getItem(LS_KEYS.applications)) writeLS(LS_KEYS.applications, []);
  if (!localStorage.getItem(LS_KEYS.users)) writeLS(LS_KEYS.users, []);
}

// Expose globally for simple multi-file usage.
window.ShoghlakStorage = {
  ensureSeeded,
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
  logout,
  emailExists,
  createUser,
  validateUser,
  getJobs,
  saveJobs,
  getCourses,
  saveCourses,
  getApplications,
  saveApplications,
  addApplication
};