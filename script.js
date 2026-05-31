// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform   = 'translate(-50%,-50%) scale(1.5)';
    cursor.style.transform = 'translate(-50%,-50%) scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform   = 'translate(-50%,-50%) scale(1)';
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ── SCROLL FADE-IN ──
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── TYPING ANIMATION ──
const roleEl = document.getElementById('heroRole');
const roles  = [
  'Full Stack Developer',
  'Cybersecurity Learner',
  'Ethical Hacker (in training)',
  'Web App Builder'
];
let ri = 0, ci = 0, deleting = false;

function typeRole() {
  const current = roles[ri];
  const prefix  = '<span style="color:var(--muted)">// </span>';
  const cursor  = '<span style="color:var(--cyan)">_</span>';

  if (!deleting) {
    roleEl.innerHTML = prefix + current.slice(0, ci) + cursor;
    ci++;
    if (ci > current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    roleEl.innerHTML = prefix + current.slice(0, ci) + cursor;
    ci--;
    if (ci < 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
      ci = 0;
      setTimeout(typeRole, 400);
      return;
    }
  }
  setTimeout(typeRole, deleting ? 40 : 70);
}

setTimeout(typeRole, 600);

// ── ACTIVE NAV ON SCROLL ──
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--cyan)' : '';
  });
});
