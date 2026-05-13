(function(){
  const d = document;
  const $ = (s,el=d)=>el.querySelector(s);
  const $$ = (s,el=d)=>Array.from(el.querySelectorAll(s));

  function normalizeJobText(job){
    const skills = (job.skills||[]).join(' ');
    const t = `${job.title} ${job.company} ${skills}`;
    return t.toLowerCase();
  }

  function renderJobCard(job){
    const skills = (job.skills||[]).slice(0,5);
    const remoteTag = job.remote ? `<span class="tag tag--remote">Remote</span>` : '';
    return `
      <article class="card" data-job-id="${job.id}" role="button" tabindex="0" aria-label="Open job ${job.title}">
        <div class="card__img">
          <img src="${job.image}" alt="${job.title}" loading="lazy" />
        </div>
        <div class="card__body">
          <div class="card__top">
            <span class="tag tag--status">${job.status}</span>
            ${remoteTag}
          </div>
          <div class="card__title">${job.title}</div>
          <div class="card__company">${job.company}</div>
          <div class="small" style="color:var(--muted); font-weight:800; line-height:1.6;">${job.description.slice(0,110)}${job.description.length>110?'…':''}</div>
          <div class="card__meta">
            <span class="metaItem">📍 ${job.location}</span>
            <span class="metaItem">💰 ${job.salary}</span>
          </div>
          <div class="card__actions">
            <span class="tag">${job.category}</span>
            ${skills.map(s=>`<span class="tag" style="padding:.28rem .55rem;">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'<','>':'>','"':'"',"'":'&#039;'}[m]));
  }

  function getFiltersFromChips(){
    const chips = $$('.chip[data-filter]');
    const on = chips.filter(c=>c.classList.contains('is-on'));
    return on.map(c=>c.getAttribute('data-filter'));
  }

  function matchesFilters(job, filters){
    // Each chip represents one condition; all active chips must match.
    for(const f of filters){
      if(f==='remote' && !job.remote) return false;
      if(f==='fullTime' && !job.fullTime) return false;
      if(f==='partTime' && !job.partTime) return false;
      if(f.startsWith('technologyTag:')){
        const tag = f.split(':')[1];
        if(String(job.category).toLowerCase() !== String(tag).toLowerCase()) return false;
      }
    }
    return true;
  }

  function getSearchQuery(){
    return ($('#jobSearch')?.value || '').trim().toLowerCase();
  }

  function showModal(job){
    const overlay = $('#jobModalOverlay');
    const close = $('#jobModalClose');
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden','false');

    $('#jobModalTitle').textContent = job.title;
    $('#jobModalCompany').textContent = job.company;
    $('#jobModalStatus').textContent = job.status;
    $('#jobModalSalary').textContent = job.salary;
    $('#jobModalLocation').textContent = job.location;
    $('#jobModalCategory').textContent = job.category;
    $('#jobModalDesc').textContent = job.description;
    $('#jobModalImage').src = job.image;

    const skillsWrap = $('#jobModalSkills');
    skillsWrap.innerHTML = (job.skills||[]).map(s=>`<span class="chip is-on" style="cursor:default;">${escapeHtml(s)}</span>`).join('');

    const form = $('#applyForm');
    form.dataset.jobId = job.id;
    $('#jobAppSuccess').style.display = 'none';
  }

  function hideModal(){
    const overlay = $('#jobModalOverlay');
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden','true');
  }

  function prefillApplyForm(){
    const user = window.ShoghlakStorage?.getCurrentUser?.();
    if(!user) return;
    $('#apName').value = user.name || '';
    $('#apEmail').value = user.email || '';
    const desired = $('#jobModalTitle')?.textContent || '';
    $('#apDesiredJob').value = desired;
  }

  function collectApplyFormData(jobId){
    return {
      fullName: $('#apName').value.trim(),
      email: $('#apEmail').value.trim(),
      phoneNumber: $('#apPhone').value.trim(),
      age: Number($('#apAge').value),
      country: $('#apCountry').value.trim(),
      education: $('#apEducation').value.trim(),
      skills: $('#apSkills').value.trim(),
      experience: $('#apExperience').value.trim(),
      desiredJob: $('#apDesiredJob').value.trim(),
      cvLink: $('#apCvLink').value.trim(),
      notes: $('#apNotes').value.trim()
    };
  }

  function init(){
    const chips = $$('.chip[data-filter]');
    chips.forEach(chip =>{
      chip.addEventListener('click', () => chip.classList.toggle('is-on'));
    });

    $('#jobSearch').addEventListener('input', render);
    $('[data-action="clearFilters"]')?.addEventListener('click', () =>{
      chips.forEach(c=>c.classList.remove('is-on'));
      $('#jobSearch').value = '';
      render();
    });

    // Modal wiring
    $('#jobModalClose')?.addEventListener('click', hideModal);
    $('#jobModalOverlay')?.addEventListener('click', (e)=>{ if(e.target.id==='jobModalOverlay') hideModal(); });
    $('[data-action="prefill"]')?.addEventListener('click', prefillApplyForm);

    $('#applyForm')?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const jobId = $('#applyForm').dataset.jobId;
      const user = window.ShoghlakStorage?.getCurrentUser?.();
      if(!user || !jobId){
        alert('Please sign in.');
        return;
      }

      const formData = collectApplyFormData(jobId);
      const job = window.ShoghlakStorage.getJobs().find(j=>j.id===jobId);
      if(!job){ alert('Job not found.'); return; }

      const app = window.ShoghlakStorage.addApplication({
        userId: user.id,
        jobId,
        formData
      });

      $('#jobAppSuccess').style.display = 'block';
      e.target.reset();
      $('#apName').value = user.name || '';
      $('#apEmail').value = user.email || '';
      $('#apDesiredJob').value = job.title;
    });

    // Cards click
    function onCardClick(e){
      const card = e.target.closest('[data-job-id]');
      if(!card) return;
      const id = card.getAttribute('data-job-id');
      const job = window.ShoghlakStorage.getJobs().find(j=>j.id===id);
      if(job) showModal(job);
    }

    $('#jobResults')?.addEventListener('click', onCardClick);
    $('#jobResults')?.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' '){
        const card = e.target.closest('[data-job-id]');
        if(card) onCardClick(e);
      }
    });

    function render(){
      const all = window.ShoghlakStorage.getJobs();
      const query = getSearchQuery();
      const filters = getFiltersFromChips();

      const filtered = all.filter(job => {
        const matchesFiltersOk = matchesFilters(job, filters);
        if(!matchesFiltersOk) return false;
        if(!query) return true;
        return normalizeJobText(job).includes(query);
      });

      const results = $('#jobResults');
      const empty = $('#jobEmpty');
      if(!results || !empty) return;

      results.innerHTML = filtered.map(renderJobCard).join('');
      empty.style.display = filtered.length ? 'none' : 'block';
      $('#jobCount').textContent = `${filtered.length} job${filtered.length===1?'':'s'} found`;
    }

    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();