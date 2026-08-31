document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded', function(){
  safe(initLoader); safe(initCursor); safe(initNavbar); safe(initReveal);
  safe(initTypewriter); safe(initCounters); safe(initBars); safe(initTilt);
  safe(initParticles); safe(initLightbox); safe(initForm); safe(initWhatsAppFab); safe(initYear);
  safe(initCertLinks);
});
function safe(fn){ try { fn(); } catch(e){} }

/* ---------- Certificate PDF links ---------- */
function initCertLinks(){
  var links = document.querySelectorAll('.cert-thumb, .cert-link');
  links.forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var url = a.getAttribute('href');
      if(url) window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

/* ---------- Loader ---------- */
function initLoader(){
  var l = document.getElementById('loader');
  setTimeout(function(){ l.classList.add('hide'); }, 400);
}

/* ---------- Custom cursor ---------- */
function initCursor(){
  var fine = matchMedia('(hover:none)').matches;
  if (fine) return;
  var dot = document.createElement('div'); dot.className='cursor-dot';
  var ring = document.createElement('div'); ring.className='cursor-ring';
  document.body.appendChild(dot); document.body.appendChild(ring);
  var x=0,y=0,rx=0,ry=0;
  document.addEventListener('mousemove', function(e){
    x=e.clientX; y=e.clientY;
    dot.style.left=x+'px'; dot.style.top=y+'px';
  });
  (function loop(){
    rx+=(x-rx)*.18; ry+=(y-ry)*.18;
    ring.style.left=rx+'px'; ring.style.top=ry+'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.chip,.proj-card,.cert-card,.stat').forEach(function(el){
    el.addEventListener('mouseenter', function(){ ring.classList.add('big'); });
    el.addEventListener('mouseleave', function(){ ring.classList.remove('big'); });
  });
}

/* ---------- Navbar ---------- */
function initNavbar(){
  var nav = document.querySelector('.navbar');
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  function onScroll(){
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
    var seen = document.querySelector('.nav-links a:not(#navResume)');
    var scol = document.getElementById('scroll-section');
    if (window.scrollY > 300) document.getElementById('topBtn').classList.add('show');
    else document.getElementById('topBtn').classList.remove('show');
  }
  window.addEventListener('scroll', onScroll); onScroll();
  burger.addEventListener('click', function(){
    burger.classList.toggle('open'); links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ burger.classList.remove('open'); links.classList.remove('open'); });
  });
  document.getElementById('topBtn').addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
  var sections = document.querySelectorAll('section[id], .page-head[id], header[id]');
  var navAs = document.querySelectorAll('.nav-links a[data-nav]');
  if (document.body.hasAttribute('data-spy') && sections.length && navAs.length){
    window.addEventListener('scroll', function(){
      var pos = window.scrollY + 120;
      sections.forEach(function(s){
        if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight){
          navAs.forEach(function(a){
            a.classList.toggle('active', a.getAttribute('data-nav') === s.id);
          });
        }
      });
    });
  }
}

/* ---------- Scroll reveal ---------- */
function initReveal(){
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)){ els.forEach(function(el){ el.classList.add('visible'); }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, {threshold:.15});
  els.forEach(function(el){ io.observe(el); });
}

/* ---------- Skill bars ---------- */
function initBars(){
  var bars = document.querySelectorAll('.skill-bar .fill[data-w]');
  if (!('IntersectionObserver' in window)){ bars.forEach(function(b){ b.style.width = b.getAttribute('data-w') + '%'; }); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      en.target.style.width = en.target.getAttribute('data-w') + '%';
    });
  }, {threshold:.4});
  bars.forEach(function(b){ io.observe(b); });
}

/* ---------- Typewriter ---------- */
function initTypewriter(){
  var el = document.getElementById('typeTarget');
  if (!el) return;
  var roles = ['Web Developer & PHP Developer', 'Python & Tkinter Desktop Apps', 'Cloud Computing Student', 'Problem Solver'];
  var cur=0, word=0, del=false, out='';
  var cursor = document.createElement('span'); cursor.className='type-cursor'; cursor.textContent='|';
  el.appendChild(cursor);
  (function tick(){
    var full = roles[word];
    out = del ? full.substring(0, out.length-1) : full.substring(0, out.length+1);
    el.childNodes[0].nodeValue = out + ' ';
    var speed = del ? 30 : 80;
    if (!del && out === full){ speed = 2200; del = true; }
    else if (del && out === ''){ del = false; word = (word+1)%roles.length; speed = 400; }
    setTimeout(tick, speed);
  })();
}

/* ---------- Counters ---------- */
function initCounters(){
  var nums = document.querySelectorAll('.stat .num[data-count]');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      var target = +en.target.getAttribute('data-count');
      var done = false; var start = null; var dur = 1500;
      function step(ts){
        if (!start) start = ts;
        var p = Math.min((ts-start)/dur, 1);
        var ease = 1 - Math.pow(1-p, 3);
        var val = Math.round(target * ease);
        en.target.textContent = val;
        if (en.target.getAttribute('data-suffix')) en.target.textContent = val + en.target.getAttribute('data-suffix');
        if (p < 1) requestAnimationFrame(step); else en.target.textContent = target + (en.target.getAttribute('data-suffix')||'');
      }
      requestAnimationFrame(step);
    });
  }, {threshold:.4});
  nums.forEach(function(n){ io.observe(n); });
}

/* ---------- Tilt cards ---------- */
function initTilt(){
  if (matchMedia('(hover:none)').matches) return;
  document.querySelectorAll('.proj-card').forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left)/r.width - .5;
      var py = (e.clientY - r.top)/r.height - .5;
      card.style.transform = 'perspective(900px) rotateY(' + (px*5) + 'deg) rotateX(' + (-py*5) + 'deg)';
    });
    card.addEventListener('mouseleave', function(){ card.style.transform = ''; });
  });
}

/* ---------- Particles ---------- */
function initParticles(){
  var c = document.getElementById('particles');
  if (!c) return;
  var ctx = c.getContext('2d');
  var w, h, pts = [];
  function resize(){ w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (var i=0;i<55;i++){ pts.push({ x:Math.random()*w, y:Math.random()*h, r:Math.random()*1.6+.4, s:Math.random()*.3+.08, a:Math.random()*.6+.2 }); }
  (function draw(){
    ctx.clearRect(0,0,w,h);
    pts.forEach(function(p){
      p.y -= p.s; if (p.y < -6){ p.y = h+6; p.x = Math.random()*w; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = 'rgba(212,175,55,' + p.a + ')'; ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

/* ---------- Lightbox ---------- */
function initLightbox(){
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  var img = document.getElementById('lbImg');
  var title = document.getElementById('lbTitle');
  var note = document.getElementById('lbNote');
  var dots = document.getElementById('lbDots');
  var groups = document.querySelectorAll('.proj-card');
  var cur={list:[],i:0};
  function open(list, i, t){
    cur.list=list; cur.i=i; cur.t=t;
    show();
    lb.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function show(){
    img.src = cur.list[cur.i];
    if (cur.t !== undefined && groups[cur.t] && groups[cur.t].dataset.title){
      title.innerHTML = groups[cur.t].dataset.title;
      note.textContent = groups[cur.t].dataset.note || '';
    }
    dots.innerHTML = '';
    cur.list.forEach(function(_,k){
      var d=document.createElement('span');
      if (k===cur.i) d.className='active';
      d.addEventListener('click', function(){ cur.i=k; show(); });
      dots.appendChild(d);
    });
  }
  document.querySelectorAll('[data-gallery]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var card = btn.closest('.proj-card');
      var list = Array.prototype.map.call(card.querySelectorAll('[data-gallery-src]'), function(s){ return s.dataset.gallerySrc; });
      var idx = +btn.getAttribute('data-gallery');
      open(list, idx, Array.prototype.indexOf.call(groups, card));
    });
  });
  function close(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function(){ cur.i=(cur.i+cur.list.length-1)%cur.list.length; show(); });
  document.getElementById('lbNext').addEventListener('click', function(){ cur.i=(cur.i+1)%cur.list.length; show(); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key==='Escape') close();
    if (e.key==='ArrowLeft') cur.i=(cur.i+cur.list.length-1)%cur.list.length, show();
    if (e.key==='ArrowRight') cur.i=(cur.i+1)%cur.list.length, show();
  });
}

/* ---------- WhatsApp floating button ---------- */
function initWhatsAppFab(){
  var a = document.createElement('a');
  a.className = 'wa-fab';
  a.href = 'https://wa.me/923216001281';
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'Chat on WhatsApp');
  a.innerHTML = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
  document.body.appendChild(a);
}

/* ---------- Contact form ---------- */
function initForm(){
  var f = document.getElementById('contactForm');
  if (!f) return;
  var FS_ID = 'xoeqvgbp';
  var ok = document.getElementById('formOk');
  function flash(msg, color){
    ok.textContent = msg;
    ok.style.color = color || '#8fcf7a';
    ok.classList.add('show');
    setTimeout(function(){ ok.classList.remove('show'); ok.style.color = ''; }, 6000);
  }
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('cfName').value;
    var subject = document.getElementById('cfSubject') ? document.getElementById('cfSubject').value : '';
    if (FS_ID && FS_ID !== 'REPLACE_ME'){
      var data = new FormData(f);
      if (subject) data.append('_subject', subject);
      fetch('https://formspree.io/f/' + FS_ID, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(res){
        if (res.ok){ flash('Thank you! Your message has been sent.'); f.reset(); }
        else { flash('Something went wrong — please try again, or use WhatsApp.', '#e28686'); }
      }).catch(function(){
        flash('Something went wrong — please try again, or use WhatsApp.', '#e28686');
      });
    } else {
      var mailto = 'munaam1948@gmail.com';
      var subj = encodeURIComponent(subject || ('Portfolio enquiry from ' + (name || 'visitor')));
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + document.getElementById('cfEmail').value + '\n\n' + document.getElementById('cfMsg').value);
      window.open('mailto:' + mailto + '?subject=' + subj + '&body=' + body);
      flash('Your email app has opened — thank you!');
      f.reset();
    }
  });
}

/* ---------- Footer year ---------- */
function initYear(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}