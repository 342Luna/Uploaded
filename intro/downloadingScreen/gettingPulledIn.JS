const canvas = document.getElementById('warpCanvas');
const ctx = canvas.getContext('2d');
const fadeOverlay = document.getElementById('fade-overlay');

let width, height, centerX, centerY;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  centerX = width / 2;
  centerY = height / 2;
}

window.addEventListener('resize', resize);
resize();

const PARTICLE_COUNT = 700;
const GRAVITY_STRENGTH = 4.0;
const particles = [];

class Particle {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    const angle = Math.random() * Math.PI * 2;
    
    if (initial) {
      const maxDist = Math.max(width, height) * 0.8;
      const distance = Math.random() * maxDist;
      this.x = centerX + Math.cos(angle) * distance;
      this.y = centerY + Math.sin(angle) * distance;
    } else {
      const distance = Math.max(width, height) * (0.75 + Math.random() * 0.25);
      this.x = centerX + Math.cos(angle) * distance;
      this.y = centerY + Math.sin(angle) * distance;
    }

    this.px = this.x;
    this.py = this.y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.size = Math.random() * 2.5 + 1;
    this.speedFactor = 0.8 + Math.random() * 0.4;
    
    const colors = ['#00f3ff', '#ff0055', '#b000ff', '#ffffff'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.px = this.x;
    this.py = this.y;

    const dx = centerX - this.x;
    const dy = centerY - this.y;
    const distSq = dx * dx + dy * dy;
    const dist = Math.sqrt(distSq);

    if (dist > 5) {
      const force = (GRAVITY_STRENGTH * 800) / (dist + 40);
      this.vx += (dx / dist) * force * 0.04 * this.speedFactor;
      this.vy += (dy / dist) * force * 0.04 * this.speedFactor;
    }

    this.vx *= 0.97;
    this.vy *= 0.97;

    this.x += this.vx;
    this.y += this.vy;

    if (dist < 12) {
      this.reset(false);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.px, this.py);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.stroke();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animate() {
  // Clears canvas while retaining background gradient visibility
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();

// 7.5s transition trigger
setTimeout(() => {
  fadeOverlay.classList.add('active');
}, 3000);

//random spawn
function handleWakeUp() {
  const randomspawn = Math.floor(Math.random() * 3)+1;
  window.location.href = `../../firstLevel/startground/startground${randomspawn}/browser.html`;
}