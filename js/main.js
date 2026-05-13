/* Shoghlak - global app logic for navbar/theme + seed */

(function(){
  const d = document;

  function $(sel){ return d.querySelector(sel); }
  function $all(sel){ return Array.from(d.querySelectorAll(sel)); }

  function navTemplate({ user }){
    const isLoggedIn = !!user;
    const name = user?.name || '';
    const avatar = (name || 'U').trim().slice(0,1).toUpperCase();

    const left = `
      <div class="navLeft">
        <a href="/index.html" class="brand" data-nav="home" aria-label="Shoghlak home">
          <div class="logo" aria-hidden="true">S</div>
          <div class="brandText">
            <b>Shoghlak</b>
            <span>Jobs & Learning</span>
          </div>
        </a>
        <nav class="navLinks" aria-label="Main navigation">
          <a href="/index.html" data-route="home">Home</a>
        <a href="jobs.html" data-route="jobs">Jobs</a>

          <a href="courses.html" data-route="courses">Courses</a>

          <a href="profile.html" data-route="profile">Profile</a>

        </nav>
      </div>
    `;

    const right = isLoggedIn ? `
      <div class="navRight">
        <div class="pill" title="Signed in">
          <div class="pillAvatar" aria-hidden="true">${escapeHtml(avatar)}</div>
          <div style="display:flex; flex-direction:column;">
            <span style="font-weight:950; line-height:1.1;">${escapeHtml(name)}</span>
            <span class="small" style="margin-top:2px;">Logged in</span>
          </div>
        </div>
        <button class="btn btn--danger" type="button" data-action="logout">Logout</button>
      </div>
    ` : `
      <div class="navRight">
        <button class="btn" type="button" data-nav="auth" data-action="signin">Sign In</button>
        <button class="btn btn--primary" type="button" data-nav="auth" data-action="register">Register</button>
      </div>
    `;

    return `<div class="container navbar">${left}${right}</div>`;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'<','>':'>','"':'"',"'":'&#039;'}[m]));
  }

  function currentRoute(){
    const p = (location.pathname || '/').toLowerCase();
    if (p.endsWith('jobs.html')) return 'jobs';
    if (p.endsWith('courses.html')) return 'courses';
    if (p.endsWith('profile.html')) return 'profile';
    return 'home';
  }

  function setActiveLink(route){
    const header = $('#site-header');
    if (!header) return;
    
    const links = header.querySelectorAll('[data-route]');
    links.forEach(a => {
      const r = a.getAttribute('data-route');
      a.classList.toggle('is-active', r === route);
    });
  }

  function applyTheme(theme){
    const root = d.documentElement;
    root.setAttribute('data-theme', theme);
    const icon = $('#themeIcon');
    const label = $('#themeLabel');
    if (icon && label){
      if (theme === 'light'){
        icon.textContent = '☀️';
        label.textContent = 'Light';
      } else {
        icon.textContent = '🌙';
        label.textContent = 'Dark';
      }
    }
  }

  function initThemeToggle(){
    const btn = $('#themeToggle');
    if (!btn) return;

    const stored = localStorage.getItem('shoghlak_theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = stored || (prefersLight ? 'light' : 'dark');
    applyTheme(theme);

    btn.addEventListener('click', () => {
      const current = d.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('shoghlak_theme', next);
      applyTheme(next);
    });
  }

  function initNavbar(){
    const header = $('#site-header');
    if (!header) return;

    const user = window.ShoghlakStorage?.getCurrentUser?.() || null;
    const html = navTemplate({ user });
    header.innerHTML = html;

    // active link
    setActiveLink(currentRoute());

    header.addEventListener('click', (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const logoutBtn = target.closest('[data-action="logout"]');
      if (logoutBtn){
        window.ShoghlakStorage.logout();
       btn.addEventListener('click', () => {
  const nav = btn.getAttribute('data-nav');

  if (nav === 'jobs') location.href = 'jobs.html';
  else if (nav === 'courses') location.href = 'courses.html';
  else if (nav === 'profile') location.href = 'profile.html';
  else if (nav === 'auth') location.href = 'auth.html';
  else location.href = 'index.html';
});
      }

      const auth = target.closest('[data-nav="auth"]');
      if (auth){
        const action = target.getAttribute('data-action');
        const mode = action === 'register' ? 'register' : 'signin';
        location.href = 'auth.html?mode=' + encodeURIComponent(mode);


      }

      const routeLink = target.closest('[data-route]');
      if (routeLink){
        // allow navigation normally
      }
    });
  }

  function wireLandingActions(){
    $all('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.getAttribute('data-nav');
        location.href = 'jobs.html';
        if (nav === 'courses') location.href = 'courses.html';
        if (nav === 'auth') location.href = 'auth.html';

      });
    });
  }

  function guardProtectedPages(){
    const isProtected = ['jobs.html','courses.html','profile.html'].includes(location.pathname.split('/').pop());
    if (!isProtected) return;
    const user = window.ShoghlakStorage?.getCurrentUser?.();
    if (!user && location.pathname.endsWith('profile.html')){
      location.href = 'auth.html?mode=signin&redirect=profile';

    }
  }

  function wireImageFallbacks(){
    // Fix broken external thumbnails without altering layout.
    const imgs = $all('img');

    const getFallbackFor = (src) => {

      // Use deterministic fallback per original URL to avoid randomness.
      const map = {
        'photo-1552662470-2aa5dcd1d6c3': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70',
        'photo-1551297487-3f7e3b8f2ef1': 'https://images.unsplash.com/photo-1523952578875-3b5c3f1c3e8a?auto=format&fit=crop&w=1200&q=70',
        'photo-1522202176988-66273c2fd55f': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70',
        'photo-1523952578875-3b5c3f1c3e8a': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=70',
        'photo-1550475335-0a0f8e9bd2b8': 'https://images.unsplash.com/photo-1555949963-ff9c284c8bcd?auto=format&fit=crop&w=1200&q=70',
        'photo-1556761175-4b46a572b786': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=70',
        'photo-1555949963-ff9c284c8bcd': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=70',
        'photo-1581091215367-59ad9b87a6d7': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=70',
        'photo-1555066931-4365d14bab8c': 'https://images.unsplash.com/photo-1551288049-bebda4e38ef1?auto=format&fit=crop&w=1200&q=70',
        'photo-1541888946425-d81bb19240f5': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70',
        'photo-1454165804606-c3d57bc86b40': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70',
        'photo-1521737604893-d14cc237f11d': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70',
        'photo-1518770660439-4636190af475': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70',
        'photo-1522071820081-009f0129c71c': 'https://images.unsplash.com/photo-1552662470-2aa5dcd1d6c3?auto=format&fit=crop&w=1200&q=70',
        'photo-1550751827-4bd374c3f58b': 'https://images.unsplash.com/photo-1555949963-ff9c284c8bcd?auto=format&fit=crop&w=1200&q=70',
        'photo-1551288049-bebda4e38ef1': 'https://images.unsplash.com/photo-1551033406-611cf9a28f66?auto=format&fit=crop&w=1200&q=70',
        'photo-1551033406-611cf9a28f66': 'https://images.unsplash.com/photo-1523952578875-3b5c3f1c3e8a?auto=format&fit=crop&w=1200&q=70',
      };
      try {
        const m = String(src || '').match(/photo-[0-9a-z-]+/i);
        const key = m ? m[0] : '';
        // Only replace if we have a mapping; otherwise use a safe general fallback.
        if (map[key]) return map[key];
      } catch {}
      return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70';
    };

    // Delegate via capture to handle dynamically injected images.
    d.addEventListener('error', (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement)) return;
      const src = img.getAttribute('src');
      if (!src) return;

      // Avoid infinite loops.
      if (img.dataset.fallbackApplied === 'true') return;

      img.dataset.fallbackApplied = 'true';
      img.src = getFallbackFor(src);
    }, true);
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    window.ShoghlakStorage?.ensureSeeded?.();
    initNavbar();
    initThemeToggle();
    wireLandingActions();
    guardProtectedPages();
    wireImageFallbacks();

    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  });
})();