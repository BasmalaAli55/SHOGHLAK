(function(){
  const d = document;
  const qs = (s,el=d)=>el.querySelector(s);
  const qsa = (s,el=d)=>Array.from(el.querySelectorAll(s));

  function showMessage(type, text){
    const box = qs('#authMessages');
    if(!box) return;
    box.innerHTML = '';
    if(!text) return;
    const cls = type === 'error' ? 'error' : 'success';
    box.innerHTML = `<div class="${cls}" role="alert">${escapeHtml(text)}</div>`;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'<','>':'>','"':'"',"'":'&#039;'}[m]));
  }

  function getModeFromQuery(){
    const sp = new URLSearchParams(location.search);
    const mode = (sp.get('mode') || '').toLowerCase();
    return mode === 'register' ? 'register' : 'signin';
  }

  function getRedirectFromQuery(){
    const sp = new URLSearchParams(location.search);
    return sp.get('redirect');
  }

  function setTab(tab){
    const signinForm = qs('#signinForm');
    const registerForm = qs('#registerForm');
    const tBtns = qsa('[data-auth-tab]');

    if(tab === 'signin'){
      signinForm.style.display = 'block';
      registerForm.style.display = 'none';
    } else {
      signinForm.style.display = 'none';
      registerForm.style.display = 'block';
    }

    tBtns.forEach(b =>{
      const isOn = b.getAttribute('data-auth-tab') === tab;
      b.classList.toggle('btn--primary', isOn);
      b.classList.toggle('btn', !isOn);
    });
  }

  function bootstrapLoggedInRedirect(){
    const user = window.ShoghlakStorage?.getCurrentUser?.();
    if(user){
      const redirect = getRedirectFromQuery();
      if(redirect) location.href = '/website-shoghlak/' + redirect + '.html';
      else location.href = '/website-shoghlak/index.html';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    bootstrapLoggedInRedirect();
    const year = qs('#year');
    if(year) year.textContent = String(new Date().getFullYear());

    const mode = getModeFromQuery();
    setTab(mode);
    showMessage(null, '');

    qsa('[data-auth-tab]').forEach(btn =>{
      btn.addEventListener('click', () =>{
        const tab = btn.getAttribute('data-auth-tab');
        setTab(tab);
        showMessage(null, '');
      });
    });

    qs('#signinForm')?.addEventListener('submit', (e) =>{
      e.preventDefault();
      showMessage(null,'');
      const email = qs('#signinEmail').value.trim();
      const password = qs('#signinPassword').value;

      if(!email || !password){
        showMessage('error','Please enter email and password.');
        return;
      }

      const res = window.ShoghlakStorage.validateUser({ email, password });
      if(!res.ok){
        showMessage('error', res.reason);
        return;
      }

      window.ShoghlakStorage.setCurrentUser(res.user);
      const redirect = getRedirectFromQuery();
      location.href = redirect ? '/website-shoghlak/' + redirect + '.html' : '/website-shoghlak/index.html';
    });

    qs('#registerForm')?.addEventListener('submit', (e) =>{
      e.preventDefault();
      showMessage(null,'');
      const name = qs('#registerName').value.trim();
      const email = qs('#registerEmail').value.trim();
      const password = qs('#registerPassword').value;

      if(name.length < 2){ showMessage('error','Please enter your full name.'); return; }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showMessage('error','Please enter a valid email.'); return; }
      if(password.length < 6){ showMessage('error','Password must be at least 6 characters.'); return; }

      if(window.ShoghlakStorage.emailExists(email)){
        showMessage('error','This email is already registered. Try signing in instead.');
        return;
      }

      const user = window.ShoghlakStorage.createUser({ name, email, password });
      window.ShoghlakStorage.setCurrentUser(user);
      const redirect = getRedirectFromQuery();
      location.href = redirect ? '/website-shoghlak/' + redirect + '.html' : '/website-shoghlak/index.html';
    });
  });
})();