(function(){
  const d = document;
  const $ = (s,el=d)=>el.querySelector(s);
  const $$ = (s,el=d)=>Array.from(el.querySelectorAll(s));

  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'<','>':'>','"':'"',"'":'&#039;'}[m]));
  }

  function renderCourseCard(course){
    return `
      <article class="card" data-course-id="${course.id}" role="button" tabindex="0" aria-label="Open course ${course.title}">
        <div class="card__img">
          <img src="${course.thumbnail}" alt="${course.title}" loading="lazy" />
        </div>
        <div class="card__body">
          <div class="card__top">
            <span class="tag tag--status">${escapeHtml(course.category)}</span>
            <span class="tag">${escapeHtml(course.difficulty)}</span>
          </div>
          <div class="card__title">${course.title}</div>
          <div class="card__company">${course.instructor}</div>
          <div class="small" style="color:var(--muted); font-weight:800; line-height:1.6;">${escapeHtml(course.description).slice(0,110)}${course.description.length>110?'…':''}</div>
          <div class="card__meta">
            <span class="metaItem">⏱️ ${escapeHtml(course.duration)}</span>
          </div>
          <div class="card__actions">
            <span class="tag">${course.category}</span>
          </div>
        </div>
      </article>
    `;
  }

  function matchesCourse(course, query, categoryFilter){
    if(categoryFilter && String(course.category).toLowerCase() !== String(categoryFilter).toLowerCase()) return false;
    if(!query) return true;
    const q = query.toLowerCase();
    return `${course.title} ${course.category}`.toLowerCase().includes(q);
  }

  function showCourse(course){
    $('#courseDetails').style.display = 'block';
    $('#courseDetailTitle').textContent = course.title;
    $('#courseDetailSubtitle').textContent = `${course.instructor} • ${course.duration}`;
    $('#courseDetailThumb').src = course.thumbnail;

    $('#courseDetailDifficulty').textContent = `Difficulty: ${course.difficulty}`;
    $('#courseDetailDuration').textContent = `Duration: ${course.duration}`;
    $('#courseDetailCategory').textContent = `Category: ${course.category}`;
    $('#courseDetailInstructor').textContent = `Instructor: ${course.instructor}`;

    $('#courseDetailLong').textContent = course.longDescription;

    $('#courseDetailTips').innerHTML = (course.tips||[]).map(t=>`<span class="chip is-on" style="cursor:default;">${escapeHtml(t)}</span>`).join('');
    $('#courseDetailOutcomes').innerHTML = (course.outcomes||[]).map(o=>`<span class="chip is-on" style="cursor:default;">${escapeHtml(o)}</span>`).join('');
    $('#courseDetailContent').innerHTML = (course.content||[]).map(c=>`<span class="tag">${escapeHtml(c)}</span>`).join('');

    const videos = $('#courseDetailVideos');
    videos.innerHTML = (course.videos||[]).map(v => `
      <div class="kv" style="padding:.8rem;">
        <div class="small" style="font-weight:950; margin-bottom:.4rem;">${escapeHtml(v.title)}</div>
        <div style="border-radius:14px; overflow:hidden; border:1px solid var(--border);">
          <iframe
            width="100%"
            height="220"
            src="https://www.youtube.com/embed/${encodeURIComponent(v.youtubeId)}"
            title="${escapeHtml(v.title)}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `).join('');
  }

  function init(){
    const categoryChips = $$('[data-category]');

    categoryChips.forEach(chip =>{
      chip.addEventListener('click', () => {
        // only one category at a time for clarity
        categoryChips.forEach(c=>c.classList.remove('is-on'));
        chip.classList.add('is-on');
        render();
      });
    });

    $('#courseSearch').addEventListener('input', render);
    $('[data-action="clearCategories"]')?.addEventListener('click', ()=>{
      categoryChips.forEach(c=>c.classList.remove('is-on'));
      $('#courseSearch').value='';
      render();
      $('#courseDetails').style.display='none';
    });

    $('[data-action="closeCourse"]')?.addEventListener('click', ()=>{
      $('#courseDetails').style.display='none';
    });

    $('#courseResults')?.addEventListener('click', (e)=>{
      const card = e.target.closest('[data-course-id]');
      if(!card) return;
      const id = card.getAttribute('data-course-id');
      const course = window.ShoghlakStorage.getCourses().find(c=>c.id===id);
      if(course) showCourse(course);
    });

    $('#courseResults')?.addEventListener('keydown', (e)=>{
      if(e.key==='Enter' || e.key===' '){
        const card = e.target.closest('[data-course-id]');
        if(card) {
          const id = card.getAttribute('data-course-id');
          const course = window.ShoghlakStorage.getCourses().find(c=>c.id===id);
          if(course) showCourse(course);
        }
      }
    });

    function render(){
      const all = window.ShoghlakStorage.getCourses();
      const query = ($('#courseSearch')?.value || '').trim();
      const on = categoryChips.find(c=>c.classList.contains('is-on'));
      const cat = on ? on.getAttribute('data-category') : null;

      const filtered = all.filter(c=>matchesCourse(c, query, cat));
      $('#courseResults').innerHTML = filtered.map(renderCourseCard).join('');
      $('#courseEmpty').style.display = filtered.length ? 'none':'block';
      $('#courseCount').textContent = `${filtered.length} course${filtered.length===1?'':'s'} found`;
    }

    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();