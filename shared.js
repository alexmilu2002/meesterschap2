// Maak de overlay aan en plak hem in de body, dit is het scherm dat opengaat als je op een knop klikt
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

// Handige verwijzingen naar de onderdelen van de overlay
const fsCoin         = overlay.querySelector('.fs-coin');
const fsCoinFront    = overlay.querySelector('.fs-coin-front');
const fsCoinBack     = overlay.querySelector('.fs-coin-back');
const fsContent      = overlay.querySelector('.fs-content');
const fsContentInner = overlay.querySelector('.fs-content-inner');
const fsClose        = overlay.querySelector('.fs-close');
const fsActions      = overlay.querySelector('.fs-actions');

// Voorkomt dat je twee animaties tegelijk triggert
let isAnimating = false;
// Onthoudt welke knop je hebt aangeklikt, zodat de focus er na sluiten naartoe gaat
let lastFocused = null;

// Opent de overlay met een coin flip animatie vanuit de aangeklikte knop
async function flipOpen(buttonEl, getHTML, extraLinks = []) {
  if (isAnimating) return;
  isAnimating = true;
  lastFocused = buttonEl;

  // Positie en stijl van de knop kopiëren zodat de coin precies eroverheen valt
  const rect     = buttonEl.getBoundingClientRect();
  const startSize = Math.max(rect.width, rect.height);
  const computed  = getComputedStyle(buttonEl);

  fsCoin.style.width  = rect.width  + 'px';
  fsCoin.style.height = rect.height + 'px';
  fsCoin.style.left   = rect.left   + 'px';
  fsCoin.style.top    = rect.top    + 'px';

  // Voorkant van de coin ziet eruit als de knop zelf
  fsCoinFront.style.borderRadius       = computed.borderRadius;
  fsCoinFront.style.backgroundColor    = computed.backgroundColor;
  fsCoinFront.style.backgroundImage    = computed.backgroundImage;
  fsCoinFront.style.backgroundSize     = computed.backgroundSize;
  fsCoinFront.style.backgroundRepeat   = computed.backgroundRepeat;
  fsCoinFront.style.backgroundPosition = computed.backgroundPosition;
  fsCoinFront.style.border             = computed.border;
  fsCoinFront.style.boxShadow          = computed.boxShadow;

  // Achterkant is blanco (dezelfde kleur, maar geen plaatje)
  fsCoinBack.style.borderRadius    = computed.borderRadius;
  fsCoinBack.style.backgroundColor = computed.backgroundColor;
  fsCoinBack.style.backgroundImage = 'none';
  fsCoinBack.style.border          = computed.border;
  fsCoinBack.style.boxShadow       = computed.boxShadow;

  // Achtergrond van het content-scherm matcht de knopkleur
  fsContent.style.backgroundColor = computed.backgroundColor;

  // Vul de inhoud in (kan ook een async functie zijn die data ophaalt)
  fsContentInner.innerHTML = typeof getHTML === 'function' ? await getHTML() : getHTML;

  // Ruim eventuele oude links op en voeg de nieuwe linkjes toe (bijv. GitHub, Website)
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

  // Bereken hoeveel de coin moet groeien om het hele scherm te vullen
  const scale = (Math.max(window.innerWidth, window.innerHeight) * 2) / startSize;

  // De eigenlijke coin flip animatie, draait 7,5 rondes en schaalt daarna uit
  const anim = fsCoin.animate(
    [
      { transform: 'rotateY(0deg) scale(1)' },
      { transform: 'rotateY(1800deg) scale(3)', offset: 0.7 },
      { transform: `rotateY(2700deg) scale(${scale})` }
    ],
    { duration: 3000, easing: 'ease-in-out', fill: 'forwards' }
  );

  // Als de animatie klaar is, verdwijnt de coin en komt de inhoud tevoorschijn
  anim.onfinish = () => {
    fsCoin.style.opacity = '0';
    fsContent.classList.add('fs-content--visible');
    isAnimating = false;
    fsClose.focus(); // zet focus op de sluitknop (goed voor toetsenbordgebruikers)
  };
}

// Sluit de overlay en geeft de focus terug aan de knop die je had aangeklikt
function flipClose() {
  fsContent.classList.remove('fs-content--visible');
  fsCoin.style.opacity = '0';

  setTimeout(() => {
    overlay.style.display = 'none';
    fsCoin.style.opacity  = '1';
    fsCoin.getAnimations().forEach(a => a.cancel());
    if (lastFocused) lastFocused.focus();
  }, 400);
}

// Sluitknop
fsClose.addEventListener('click', flipClose);

// Klik buiten de inhoud om te sluiten
overlay.addEventListener('click', (e) => {
  if (e.target === overlay || e.target === fsContent) flipClose();
});

// Escape toets sluit de overlay ook
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.style.display === 'block') flipClose();
});

// Focus trap, als de overlay open is blijft Tab binnen de overlay
overlay.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab' || overlay.style.display !== 'block') return;
  const focusable = [...overlay.querySelectorAll('button, a[href]')];
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
});

// Fetch hulpfunctie, haalt JSON op en geeft het terug of de fout als het misgaat
async function fetchJson(url, payload = {}) {
  return await fetch(url, payload).then(r => r.json()).catch(e => e);
}
