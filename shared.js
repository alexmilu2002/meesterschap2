// Coin flip overlay
const overlay = document.createElement('div');
overlay.classList.add('fs-overlay');
overlay.innerHTML = `
  <div class="fs-coin">
    <div class="fs-coin-front"></div>
    <div class="fs-coin-back"></div>
  </div>
  <div class="fs-content">
    <div class="fs-content-inner"></div>
    <div class="fs-actions">
      <button class="fs-close">✕ <span class="fs-close-label">Sluiten</span></button>
    </div>
  </div>
`;
document.body.appendChild(overlay);

const fsCoin         = overlay.querySelector('.fs-coin');
const fsCoinFront    = overlay.querySelector('.fs-coin-front');
const fsCoinBack     = overlay.querySelector('.fs-coin-back');
const fsContent      = overlay.querySelector('.fs-content');
const fsContentInner = overlay.querySelector('.fs-content-inner');
const fsClose        = overlay.querySelector('.fs-close');
const fsActions      = overlay.querySelector('.fs-actions');

let isAnimating = false;

async function flipOpen(buttonEl, getHTML, extraLinks = []) {
  if (isAnimating) return;
  isAnimating = true;

  const rect     = buttonEl.getBoundingClientRect();
  const startSize = Math.max(rect.width, rect.height);
  const computed  = getComputedStyle(buttonEl);

  fsCoin.style.width  = rect.width  + 'px';
  fsCoin.style.height = rect.height + 'px';
  fsCoin.style.left   = rect.left   + 'px';
  fsCoin.style.top    = rect.top    + 'px';

  fsCoinFront.style.borderRadius       = computed.borderRadius;
  fsCoinFront.style.backgroundColor    = computed.backgroundColor;
  fsCoinFront.style.backgroundImage    = computed.backgroundImage;
  fsCoinFront.style.backgroundSize     = computed.backgroundSize;
  fsCoinFront.style.backgroundRepeat   = computed.backgroundRepeat;
  fsCoinFront.style.backgroundPosition = computed.backgroundPosition;
  fsCoinFront.style.border             = computed.border;
  fsCoinFront.style.boxShadow          = computed.boxShadow;

  fsCoinBack.style.borderRadius    = computed.borderRadius;
  fsCoinBack.style.backgroundColor = computed.backgroundColor;
  fsCoinBack.style.backgroundImage = 'none';
  fsCoinBack.style.border          = computed.border;
  fsCoinBack.style.boxShadow       = computed.boxShadow;

  fsContent.style.backgroundColor = computed.backgroundColor;

  fsContentInner.innerHTML = typeof getHTML === 'function' ? await getHTML() : getHTML;

  fsActions.querySelectorAll('.fs-action-link').forEach(el => el.remove());
  extraLinks.forEach(({ label, href }) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'fs-close fs-action-link';
    a.textContent = label;
    fsActions.insertBefore(a, fsClose);
  });

  overlay.style.display = 'block';

  const scale = (Math.max(window.innerWidth, window.innerHeight) * 2) / startSize;

  const anim = fsCoin.animate(
    [
      { transform: 'rotateY(0deg) scale(1)' },
      { transform: 'rotateY(1800deg) scale(3)', offset: 0.7 },
      { transform: `rotateY(2700deg) scale(${scale})` }
    ],
    { duration: 3000, easing: 'ease-in-out', fill: 'forwards' }
  );

  anim.onfinish = () => {
    fsCoin.style.opacity = '0';
    fsContent.classList.add('fs-content--visible');
    isAnimating = false;
  };
}

function flipClose() {
  fsContent.classList.remove('fs-content--visible');
  fsCoin.style.opacity = '0';

  setTimeout(() => {
    overlay.style.display = 'none';
    fsCoin.style.opacity  = '1';
    fsCoin.getAnimations().forEach(a => a.cancel());
  }, 400);
}

fsClose.addEventListener('click', flipClose);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay || e.target === fsContent) flipClose();
});

async function fetchJson(url, payload = {}) {
  return await fetch(url, payload).then(r => r.json()).catch(e => e);
}
