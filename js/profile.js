(function(){
  const d = document;
  const $ = (s,el=d)=>el.querySelector(s);
  const $$ = (s,el=d)=>Array.from(el.querySelectorAll(s));

  function formatDate(iso){
    try{ return new Date(iso).toLocaleDateString(); } catch { return iso || ''; }
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'<','>':'>','"':'"',"'":'&#039;'}[m]));
  }

  function unique(arr){
    return Array.from(new Set(arr));
  }

  function statusChip(status){
    return `<span class="chip is-on" style="cursor:default;">${escapeHtml(status)}</span>`;
  }

  function renderApplication(app, job){
    return `
      <div class="kv">
        <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:1rem;">
          <div>
            <div style="font-weight:1000; font-size:1.05rem;">${escapeHtml(job.title)}</div>
            <div class="small" style="margin-top:.2rem;">${escapeHtml(job.company)} • ${escapeHtml(job.location)}</div>
          </div>
          <div class="chips">${statusChip(app.status)}</div>
        </div>
        <div class="hr"></div>
        <div class="small" style="font-weight:900; color: var(--muted);">Applied</div>
        <div class="kvRow" style="padding-top:.35rem;">
          <div class="kvKey">Created</div>
          <div class="kvVal">${escapeHtml(formatDate(app.createdAt))}</div>
        </div>
        <div class="kvRow">
          <div class="kvKey">Desired Job</div>
          <div class="kvVal">${escapeHtml(app.formData?.desiredJob || job.title)}</div>
        </div>
        <div class="small" style="margin-top:.55rem; color: var(--muted); font-weight:800; line-height:1.6;">
          <b>Notes:</b> ${escapeHtml(app.formData?.notes || '—')}
        </div>
      </div>
    `;
  }

  function renderRecommended(courses){
    const wrap = $('#pRecommended');
    if(!wrap) return;
    wrap.innerHTML = courses.map(c=>{
      return `
        <article class="card" style="cursor:default;">
          <div class="card__img"><img src="${c.thumbnail}" alt="${escapeHtml(c.title)}" loading="lazy" /></div>
          <div class="card__body">
            <div class="card__top"><span class="tag tag--status">${escapeHtml(c.category)}</span><span class="tag">${escapeHtml(c.difficulty)}</span></div>
            <div class="card__title">${escapeHtml(c.title)}</div>
            <div class="card__company">${escapeHtml(c.instructor)}</div>
            <div class="small" style="color:var(--muted); font-weight:800; line-height:1.6;">${escapeHtml(c.description).slice(0,95)}${c.description.length>95?'…':''}</div>
          </div>
        </article>
      `;
    }).join('');
  }

  function computeRecommendations({jobs, courses, applications}){
    const appliedJobIds = applications.map(a=>a.jobId);
    const appliedJobs = jobs.filter(j=>appliedJobIds.includes(j.id));
    const categoryWeights = {};
    const skillTokens = [];

    for(const j of appliedJobs){
      categoryWeights[j.category] = (categoryWeights[j.category]||0) + 2;
      for(const s of j.skills||[]){
        skillTokens.push(String(s).toLowerCase());
      }
    }

    // Score courses by category overlap and a light skill keyword match.
    const skillsStr = unique(skillTokens).join(' ');
    const scored = courses.map(c => {
      let score = categoryWeights[c.category] || 0;
      const cText = `${c.title} ${c.description} ${c.category}`.toLowerCase();
      // keyword-ish match
      if(skillsStr && cText){
        for(const k of ['javascript','css','ui','ux','api','security','ai','marketing','sql','figma','auth']){
          if(skillsStr.includes(k) && cText.includes(k)) score += 1.5;
        }
      }
      // slight preference for shorter easier courses
      if(c.difficulty === 'Beginner') score += 0.4;
      return { course: c, score };
    });

    scored.sort((a,b)=>b.score-a.score);
    return scored.slice(0,3).map(s=>s.course);
  }

  function init(){
    const user = window.ShoghlakStorage?.getCurrentUser?.();
    if(!user) return;
    const jobs = window.ShoghlakStorage.getJobs();
    const courses = window.ShoghlakStorage.getCourses();
    const apps = window.ShoghlakStorage.getApplications().filter(a=>a.userId===user.id);

    $('#pName').textContent = user.name;
    $('#pEmail').textContent = user.email;
    $('#pJoin').textContent = formatDate(user.createdAt);

    $('#pAppliedCount').textContent = String(apps.length);

    // status summary
    const byStatus = {};
    for(const a of apps){ byStatus[a.status] = (byStatus[a.status]||0) + 1; }
    const statuses = Object.keys(byStatus);
    $('#pStatusSummary').innerHTML = statuses.length ? statuses.map(s=>{
      const count = byStatus[s];
      return `<span class="chip is-on" style="cursor:default;">${escapeHtml(s)} • ${count}</span>`;
    }).join('') : '<span class="small">No applications yet.</span>';

    // applications list
    const wrap = $('#pApplications');
    $('#pAppsEmpty').style.display = apps.length ? 'none':'block';
    if(wrap){
      wrap.innerHTML = apps
        .slice()
        .sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)))
        .map(a=>{
          const job = jobs.find(j=>j.id===a.jobId) || {title:'Unknown', company:'', location:''};
          return renderApplication(a, job);
        }).join('');
    }

    // recommendations
    const recs = computeRecommendations({jobs, courses, applications: apps});
    renderRecommended(recs);

    // Edit profile
    const editBtn = $('[data-action="edit"]');
    const editPanel = $('#editPanel');
    const editMsg = $('#editMsg');

    function openEdit(){
      editMsg.innerHTML='';
      editPanel.style.display='block';
      $('#eName').value = user.name || '';
      $('#eEmail').value = user.email || '';
    }
    function closeEdit(){
      editPanel.style.display='none';
      editMsg.innerHTML='';
    }

    editBtn?.addEventListener('click', openEdit);
    $('[data-action="cancelEdit"]')?.addEventListener('click', closeEdit);

    $('#editForm')?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = $('#eName').value.trim();
      const email = $('#eEmail').value.trim();

      if(name.length < 2){ editMsg.innerHTML = '<div class="error">Please enter a valid name.</div>'; return; }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ editMsg.innerHTML = '<div class="error">Please enter a valid email.</div>'; return; }

      const users = window.ShoghlakStorage.getUsers();
      const emailLower = email.toLowerCase();
      const other = users.find(u => u.id !== user.id && String(u.email).toLowerCase() === emailLower);
      if(other){ editMsg.innerHTML = '<div class="error">This email is already used by another account.</div>'; return; }

      // Update in localStorage
      const idx = users.findIndex(u=>u.id===user.id);
      if(idx === -1){ editMsg.innerHTML = '<div class="error">User not found.</div>'; return; }

      users[idx] = { ...users[idx], name, email };
      window.ShoghlakStorage.saveUsers(users);

      // Update currentUser too
      window.ShoghlakStorage.setCurrentUser({ ...user, name, email });
      editMsg.innerHTML = '<div class="success">Profile updated successfully.</div>';
      setTimeout(()=>location.reload(), 650);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();