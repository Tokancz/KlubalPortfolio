/* Klubal 3D — portfolio site interactions */
(function(){
  'use strict';

  /* ---------- project data (for lightbox) ---------- */
  var PROJECTS = {
    railgun:{ idx:'001', title:'Railgun', kind:'Hard-Surface', year:'2025', accent:'var(--red)', img:'assets/railgun.png',
      tools:['Blender','Cycles','Substance'],
      blurb:['A four-legged siege drone built around a top-mounted railgun. The brief I set myself: read as a threat from silhouette alone, then reward a closer look with mechanical detail.',
        'Hard-surface modeling with emissive red accents driving the mood. Lit on a neutral studio grey so the glow does the work.'],
      specs:{Samples:'4096',Engine:'Cycles',Render:'14m 22s',Tris:'1.8M',Maps:'4K PBR',Year:'2025'} },
    hope:{ idx:'002', title:'Hope', kind:'Environment', year:'2025', accent:'var(--magenta)', img:'assets/hope.png',
      tools:['Blender','Eevee','Photoshop'],
      blurb:['The VISIONÄRE orbital station, parked above a rose-colored world inside an asteroid belt. An exercise in scale — tiny structural detail against a planet-sized backdrop.',
        'Chromatic aberration and bloom were pushed in comp to sell the cinematic, lens-captured feel.'],
      specs:{Samples:'2048',Engine:'Eevee',Render:'6m 10s',Tris:'3.2M',Comp:'Photoshop',Year:'2025'} },
    deluxo:{ idx:'003', title:'Deluxo', kind:'Vehicle', year:'2025', accent:'var(--cyan)', img:'assets/deluxo.png',
      tools:['Blender','Cycles'],
      blurb:['A retro-future hover coupe with neon underglow, caught mid-motion on a coastal overpass. Motion blur and a shallow depth of field keep the eye on the light.',
        'My study in animating a believable speed shot — the rig, the road, and the rim light all built to read at 24fps.'],
      specs:{Samples:'3072',Engine:'Cycles',Render:'9m 48s',Tris:'900K',Maps:'2K PBR',Year:'2025'} },
    steampunk:{ idx:'004', title:'Skyport', kind:'Environment', year:'2024', accent:'var(--brass)', img:'assets/steampunk.png',
      tools:['Blender','Cycles'],
      blurb:['A sky full of brass airships and balloon-craft over open cloud. A warm, busy scene to practice instancing and atmospheric depth.',
        'Gears, rivets and canvas — the most prop-heavy piece I have made, and the one that taught me to budget polygons.'],
      specs:{Samples:'1536',Engine:'Cycles',Render:'21m 03s',Tris:'5.6M',Craft:'12 unique',Year:'2024'} },
    ornithopter:{ idx:'005', title:'Ornithopter', kind:'Vehicle', year:'2024', accent:'var(--brass)', img:'assets/ornithopter.png',
      tools:['Blender'],
      blurb:['A desert dropship with long folding wings, modeled on a clean seamless to focus purely on form and worn-metal texture.',
        'An early piece — kept here because the panel work and the cockpit glass still hold up.'],
      specs:{Samples:'1024',Engine:'Cycles',Render:'4m 51s',Tris:'740K',Maps:'2K PBR',Year:'2024'} }
  };
  var ORDER = ['railgun','hope','deluxo','steampunk','ornithopter'];

  function $(s,c){return (c||document).querySelector(s);}
  function $all(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));}
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- segmented skill meters ---------- */
  $all('.meter .segs').forEach(function(seg){
    var fill=+seg.getAttribute('data-fill'), total=10;
    for(var i=0;i<total;i++){var b=document.createElement('i'); if(i<fill) b.dataset.on='1'; seg.appendChild(b);}
  });
  function fillMeters(){ $all('.meter .segs i').forEach(function(b,i){ if(b.dataset.on){ setTimeout(function(){b.classList.add('on');}, i*45); } }); }

  /* ---------- progress bar ---------- */
  var progress = $('#progress');
  function onScroll(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max>0 ? (h.scrollTop||document.body.scrollTop)/max : 0;
    progress.style.width = (p*100)+'%';
    var top = $('#totop');
    if(window.scrollY > window.innerHeight*0.6) top.classList.add('show'); else top.classList.remove('show');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  $('#totop').addEventListener('click', function(){ window.scrollTo({top:0,behavior: reduce?'auto':'smooth'}); });

  /* ---------- active section tracking ---------- */
  var navMap = {};
  $all('#navLinks a').forEach(function(a){ navMap[a.getAttribute('data-sec')] = a; });
  var secs = ['home','about','work','contact'].map(function(id){return document.getElementById(id);});
  if('IntersectionObserver' in window){
    var so = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          var id=e.target.id;
          $all('#navLinks a').forEach(function(a){a.classList.toggle('on', a.getAttribute('data-sec')===id);});
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px', threshold:0});
    secs.forEach(function(s){ if(s) so.observe(s); });
  }

  /* ---------- reveal on scroll + meters trigger ---------- */
  var revealEls = $all('.reveal');
  if(reduce){ revealEls.forEach(function(el){el.classList.add('in');}); fillMeters(); }
  else if('IntersectionObserver' in window){
    var ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in');
          if(e.target.id==='meters' || e.target.querySelector && e.target.querySelector('#meters')) fillMeters();
          ro.unobserve(e.target);
        }
      });
    }, {rootMargin:'0px 0px -10% 0px', threshold:0.12});
    revealEls.forEach(function(el){ ro.observe(el); });
    // meters live inside a reveal block — observe separately to fill bars
    var mObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ fillMeters(); mObs.disconnect(); } });
    }, {threshold:0.3});
    var m=$('#meters'); if(m) mObs.observe(m);
  } else { revealEls.forEach(function(el){el.classList.add('in');}); fillMeters(); }

  /* ---------- mobile menu ---------- */
  var sheet=$('#msheet');
  function openSheet(){ sheet.classList.add('open'); }
  function closeSheet(){ sheet.classList.remove('open'); }
  $('#hamb').addEventListener('click', openSheet);
  $('#msClose').addEventListener('click', closeSheet);
  $all('#msheet a').forEach(function(a){ a.addEventListener('click', closeSheet); });

  /* ---------- lightbox ---------- */
  var lb=$('#lb'), lbImg=$('#lbImg'), lbAccent=$('#lbAccent'), lbIdx=$('#lbIdx'),
      lbKind=$('#lbKind'), lbTitle=$('#lbTitle'), lbTools=$('#lbTools'), lbBlurb=$('#lbBlurb'),
      lbSpecs=$('#lbSpecs'), lbCounter=$('#lbCounter');
  var curIdx=0;

  function renderProject(key){
    var p=PROJECTS[key]; if(!p) return;
    curIdx=ORDER.indexOf(key);
    lbImg.src=p.img; lbImg.alt=p.title;
    lbAccent.style.background=p.accent;
    lbIdx.textContent=p.idx+' / '+key.toUpperCase();
    lbKind.textContent='// '+p.kind.toUpperCase()+' · '+p.year;
    lbKind.style.color=p.accent;
    lbTitle.textContent=p.title;
    lbTools.innerHTML='';
    p.tools.forEach(function(t){ var s=document.createElement('span'); s.className='tag'; s.textContent=t; lbTools.appendChild(s); });
    lbBlurb.innerHTML='';
    p.blurb.forEach(function(t){ var pr=document.createElement('p'); pr.textContent=t; lbBlurb.appendChild(pr); });
    lbSpecs.innerHTML='';
    Object.keys(p.specs).forEach(function(k){
      var d=document.createElement('div'); d.className='lb-spec';
      d.innerHTML='<div class="k">'+k+'</div><div class="v">'+p.specs[k]+'</div>';
      lbSpecs.appendChild(d);
    });
    lbCounter.textContent=String(curIdx+1).padStart(2,'0')+' / '+String(ORDER.length).padStart(2,'0');
    if(window.lucide) lucide.createIcons();
  }
  function openLB(key){ renderProject(key); lb.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeLB(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  function step(d){ var n=(curIdx+d+ORDER.length)%ORDER.length; renderProject(ORDER[n]); }

  $all('.pcard').forEach(function(card){
    card.addEventListener('click', function(){ openLB(card.getAttribute('data-project')); });
  });
  $('#lbClose').addEventListener('click', closeLB);
  $('#lbPrev').addEventListener('click', function(){ step(-1); });
  $('#lbNext').addEventListener('click', function(){ step(1); });
  $all('[data-close]').forEach(function(el){ el.addEventListener('click', closeLB); });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') closeLB();
    else if(e.key==='ArrowLeft') step(-1);
    else if(e.key==='ArrowRight') step(1);
  });

  /* ---------- HUD crosshair cursor ---------- */
  var cross=$('#cross'), cH=$('#crossH'), cV=$('#crossV'), cR=$('#crossR');
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(fine && !reduce){
    var mx=window.innerWidth/2, my=window.innerHeight/2, rx=mx, ry=my, raf;
    document.addEventListener('mousemove', function(e){
      mx=e.clientX; my=e.clientY;
      cH.style.top=my+'px'; cV.style.left=mx+'px';
      var t=e.target;
      var hot = t.closest && t.closest('a,button,.pcard,.scroll,[role=button]');
      cross.classList.toggle('hot', !!hot);
    });
    (function loop(){
      rx += (mx-rx)*0.35; ry += (my-ry)*0.35;
      cR.style.left=rx+'px'; cR.style.top=ry+'px';
      raf=requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseleave', function(){ cross.style.opacity='0'; });
    document.addEventListener('mouseenter', function(){ cross.style.opacity='1'; });
  } else {
    document.body.classList.remove('cross');
    if(cross) cross.classList.remove('on');
  }

  if(window.lucide) lucide.createIcons();
})();
