const state = Object.assign({
  isOpen: false,
  skinColor: '#f5cba7',
  hairStyle: 'spiky',
  hairColor: '#3b2f2f',
  eyeStyle: 'round',
  eyeColor: '#2563eb',
  shirtStyle: 'tshirt',
  shirtColor: '#6366f1',
  pantsStyle: 'jeans',
  pantsColor: '#1e293b'
}, window.initialCharacterState || {});

const drawer = document.getElementById('customization-drawer');
const toggleBtn = document.getElementById('toggle-customizer-btn');
const webpageCanvas = document.getElementById('webpage-canvas');

// Automatically save configuration changes to PHP session via fetch
function saveToPHPSession() {
  fetch('index.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ save_character: true, ...state })
  }).catch(err => console.error('Failed to sync session:', err));
}

function getHairSVG(style, color) {
  if (style === 'spiky') {
    return {
      back: '',
      front: `
        <path d="M74 64 C72 36, 92 22, 120 22 C148 22, 168 36, 166 64 C162 50, 152 46, 144 52 L136 38 L124 52 L114 36 L102 52 L92 42 C84 48, 78 52, 74 64 Z" fill="${color}" />
        <path d="M90 28 L98 14 L110 25 L122 11 L132 25 L145 15 L150 30 Z" fill="${color}" />
      `
    };
  } else if (style === 'long') {
    return {
      back: `
        <path d="M70 58 C66 95, 64 145, 72 178 C82 184, 94 176, 94 162 L94 90 L146 90 L146 162 C146 176, 158 184, 168 178 C176 145, 174 95, 170 58 Z" fill="${color}" />
      `,
      front: `
        <path d="M72 68 C70 34, 92 20, 120 20 C148 20, 170 34, 168 68 C164 48, 144 42, 120 48 C96 42, 76 48, 72 68 Z" fill="${color}" />
      `
    };
  } else {
    return {
      back: '',
      front: `
        <circle cx="120" cy="18" r="19" fill="${color}" />
        <path d="M104 31 Q120 36 136 31" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.45" fill="none" />
        <path d="M74 66 C74 36, 94 24, 120 24 C146 24, 166 36, 166 66 C158 48, 138 44, 120 44 C102 44, 82 48, 74 66 Z" fill="${color}" />
      `
    };
  }
}

function getEyesSVG(style, color) {
  if (style === 'round') {
    return `
      <path d="M92 61 Q101 57 109 61" stroke="#334155" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M131 61 Q139 57 148 61" stroke="#334155" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <circle cx="101" cy="73" r="8.5" fill="#ffffff" />
      <circle cx="101" cy="73" r="5.5" fill="${color}" />
      <circle cx="101" cy="73" r="2.6" fill="#0f172a" />
      <circle cx="99" cy="71" r="1.8" fill="#ffffff" />
      <circle cx="139" cy="73" r="8.5" fill="#ffffff" />
      <circle cx="139" cy="73" r="5.5" fill="${color}" />
      <circle cx="139" cy="73" r="2.6" fill="#0f172a" />
      <circle cx="137" cy="71" r="1.8" fill="#ffffff" />
    `;
  } else if (style === 'cool') {
    return `
      <path d="M90 63 L110 65" stroke="#334155" stroke-width="3" stroke-linecap="round" />
      <path d="M150 63 L130 65" stroke="#334155" stroke-width="3" stroke-linecap="round" />
      <path d="M90 73 Q101 66 111 73 Q101 79 90 73 Z" fill="#ffffff" />
      <circle cx="101" cy="73" r="4.2" fill="${color}" />
      <circle cx="101" cy="73" r="2" fill="#0f172a" />
      <path d="M129 73 Q139 66 150 73 Q139 79 129 73 Z" fill="#ffffff" />
      <circle cx="139" cy="73" r="4.2" fill="${color}" />
      <circle cx="139" cy="73" r="2" fill="#0f172a" />
    `;
  } else {
    return `
      <path d="M93 59 Q101 55 109 60" stroke="#334155" stroke-width="2.2" stroke-linecap="round" fill="none" />
      <path d="M131 60 Q139 55 147 59" stroke="#334155" stroke-width="2.2" stroke-linecap="round" fill="none" />
      <ellipse cx="101" cy="73" rx="8.5" ry="9.5" fill="#ffffff" />
      <ellipse cx="101" cy="73" rx="6" ry="7" fill="${color}" />
      <circle cx="98.5" cy="70" r="2.5" fill="#ffffff" />
      <circle cx="103.5" cy="76" r="1.3" fill="#ffffff" />
      <ellipse cx="139" cy="73" rx="8.5" ry="9.5" fill="#ffffff" />
      <ellipse cx="139" cy="73" rx="6" ry="7" fill="${color}" />
      <circle cx="136.5" cy="70" r="2.5" fill="#ffffff" />
      <circle cx="141.5" cy="76" r="1.3" fill="#ffffff" />
    `;
  }
}

function getShirtSVG(style, color) {
  if (style === 'tshirt') {
    return `
      <path d="M88 126 L68 144 L80 156 L92 144 Z" fill="${color}" />
      <path d="M152 126 L172 144 L160 156 L148 144 Z" fill="${color}" />
      <path d="M88 124 L152 124 L150 198 L90 198 Z" rx="8" fill="${color}" />
      <path d="M106 124 Q120 136 134 124" stroke="#000000" stroke-opacity="0.2" stroke-width="3" fill="none" />
    `;
  } else {
    return `
      <path d="M86 125 L64 146 L65 190 L79 190 L89 148 Z" fill="${color}" />
      <path d="M154 125 L176 146 L175 190 L161 190 L151 148 Z" fill="${color}" />
      <rect x="86" y="123" width="68" height="78" rx="12" fill="${color}" />
      <path d="M100 123 Q120 140 140 123" stroke="#ffffff" stroke-opacity="0.35" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M100 172 L140 172 L144 194 L96 194 Z" fill="#000000" opacity="0.14" />
    `;
  }
}

function getPantsSVG(style, color) {
  if (style === 'jeans') {
    return `
      <rect x="90" y="194" width="60" height="18" rx="4" fill="${color}" />
      <rect x="90" y="204" width="24" height="82" rx="6" fill="${color}" />
      <rect x="126" y="204" width="24" height="82" rx="6" fill="${color}" />
    `;
  } else {
    return `
      <rect x="90" y="194" width="60" height="18" rx="4" fill="${color}" />
      <rect x="89" y="204" width="26" height="40" rx="6" fill="${color}" />
      <rect x="125" y="204" width="26" height="40" rx="6" fill="${color}" />
    `;
  }
}

function renderCharacter() {
  document.querySelectorAll('.skin-fill').forEach(el => el.setAttribute('fill', state.skinColor));
  
  const hairMarkup = getHairSVG(state.hairStyle, state.hairColor);
  document.getElementById('char-hair-back').innerHTML = hairMarkup.back;
  document.getElementById('char-hair-front').innerHTML = hairMarkup.front;

  document.getElementById('char-eyes').innerHTML = getEyesSVG(state.eyeStyle, state.eyeColor);
  document.getElementById('char-shirt').innerHTML = getShirtSVG(state.shirtStyle, state.shirtColor);
  document.getElementById('char-pants').innerHTML = getPantsSVG(state.pantsStyle, state.pantsColor);

  const labels = {
    hair: { spiky: 'Spiky', long: 'Long Wavy', bun: 'Top Bun' },
    eyes: { round: 'Round', cool: 'Almond', starry: 'Sparkle' },
    shirt: { tshirt: 'T-Shirt', hoodie: 'Hoodie' },
    pants: { jeans: 'Jeans', shorts: 'Shorts' }
  };

  document.getElementById('summary-pills').innerHTML = `
    <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">Hair: ${labels.hair[state.hairStyle]}</span>
    <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">Eyes: ${labels.eyes[state.eyeStyle]}</span>
    <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">Top: ${labels.shirt[state.shirtStyle]}</span>
    <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">Pants: ${labels.pants[state.pantsStyle]}</span>
  `;
}

function syncControlsUI() {
  document.getElementById('skin-color-picker').value = state.skinColor;
  document.getElementById('hair-color-picker').value = state.hairColor;
  document.getElementById('eye-color-picker').value = state.eyeColor;
  document.getElementById('shirt-color-picker').value = state.shirtColor;
  document.getElementById('pants-color-picker').value = state.pantsColor;

  const updateGroup = (selector, attr, activeVal) => {
    document.querySelectorAll(selector).forEach(btn => {
      const isMatch = btn.getAttribute(attr) === activeVal;
      btn.classList.toggle('border-indigo-600', isMatch);
      btn.classList.toggle('bg-indigo-50', isMatch);
      btn.classList.toggle('text-indigo-700', isMatch);
      btn.classList.toggle('border-slate-200', !isMatch);
      btn.classList.toggle('bg-white', !isMatch);
      btn.classList.toggle('text-slate-600', !isMatch);
    });
  };

  updateGroup('.hair-btn', 'data-hair', state.hairStyle);
  updateGroup('.eyes-btn', 'data-eyes', state.eyeStyle);
  updateGroup('.shirt-btn', 'data-shirt', state.shirtStyle);
  updateGroup('.pants-btn', 'data-pants', state.pantsStyle);
}

// Drawer Toggle Logic
function toggleDrawer() {
  state.isOpen = !state.isOpen;
  toggleBtn.setAttribute('aria-expanded', state.isOpen);
  drawer.setAttribute('aria-hidden', !state.isOpen);

  if (state.isOpen) {
    drawer.classList.remove('translate-x-full');
    webpageCanvas.classList.add('lg:pr-[33.333333%]');
  } else {
    drawer.classList.add('translate-x-full');
    webpageCanvas.classList.remove('lg:pr-[33.333333%]');
  }
}

toggleBtn.addEventListener('click', toggleDrawer);

// Event Listeners for inputs
document.getElementById('skin-color-picker').addEventListener('input', (e) => { state.skinColor = e.target.value; renderCharacter(); saveToPHPSession(); });
document.getElementById('hair-color-picker').addEventListener('input', (e) => { state.hairColor = e.target.value; renderCharacter(); saveToPHPSession(); });
document.getElementById('eye-color-picker').addEventListener('input', (e) => { state.eyeColor = e.target.value; renderCharacter(); saveToPHPSession(); });
document.getElementById('shirt-color-picker').addEventListener('input', (e) => { state.shirtColor = e.target.value; renderCharacter(); saveToPHPSession(); });
document.getElementById('pants-color-picker').addEventListener('input', (e) => { state.pantsColor = e.target.value; renderCharacter(); saveToPHPSession(); });

document.querySelectorAll('.skin-swatch').forEach(btn => {
  btn.addEventListener('click', () => { state.skinColor = btn.getAttribute('data-skin'); renderCharacter(); saveToPHPSession(); });
});
document.querySelectorAll('.hair-btn').forEach(btn => {
  btn.addEventListener('click', () => { state.hairStyle = btn.getAttribute('data-hair'); syncControlsUI(); renderCharacter(); saveToPHPSession(); });
});
document.querySelectorAll('.eyes-btn').forEach(btn => {
  btn.addEventListener('click', () => { state.eyeStyle = btn.getAttribute('data-eyes'); syncControlsUI(); renderCharacter(); saveToPHPSession(); });
});
document.querySelectorAll('.shirt-btn').forEach(btn => {
  btn.addEventListener('click', () => { state.shirtStyle = btn.getAttribute('data-shirt'); syncControlsUI(); renderCharacter(); saveToPHPSession(); });
});
document.querySelectorAll('.pants-btn').forEach(btn => {
  btn.addEventListener('click', () => { state.pantsStyle = btn.getAttribute('data-pants'); syncControlsUI(); renderCharacter(); saveToPHPSession(); });
});

// Randomize button
document.getElementById('randomize-btn').addEventListener('click', () => {
  const skins = ['#ffdbac', '#f5cba7', '#e0ac69', '#c68642', '#8d5524', '#523318'];
  const hairs = ['spiky', 'long', 'bun'];
  const eyes = ['round', 'cool', 'starry'];
  const shirts = ['tshirt', 'hoodie'];
  const pants = ['jeans', 'shorts'];
  const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  state.skinColor = skins[Math.floor(Math.random() * skins.length)];
  state.hairStyle = hairs[Math.floor(Math.random() * hairs.length)];
  state.hairColor = randomHex();
  state.eyeStyle = eyes[Math.floor(Math.random() * eyes.length)];
  state.eyeColor = randomHex();
  state.shirtStyle = shirts[Math.floor(Math.random() * shirts.length)];
  state.shirtColor = randomHex();
  state.pantsStyle = pants[Math.floor(Math.random() * pants.length)];
  state.pantsColor = randomHex();

  syncControlsUI();
  renderCharacter();
  saveToPHPSession();
});

// Init on load
window.addEventListener('DOMContentLoaded', () => {
  syncControlsUI();
  renderCharacter();
});