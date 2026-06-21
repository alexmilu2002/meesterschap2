// Haal mijn eigen data op van de FDND API
const apiURL = "https://fdnd.directus.app/items/person/279"

// Handige hulpfunctie: als het een array is, zet er komma's tussen, anders gewoon de waarde teruggeven
const fmt = (val) => Array.isArray(val) ? val.join(', ') : (val ?? "Niet Beschikbaar!");

// Meteen ophalen zodra de pagina laadt
fetchJson(apiURL).then(function (response) {
  apiData = response.data;
  customField = JSON.parse(response.data.custom); // mijn extra veldjes zitten in een JSON string
});

// Knoppen die de coin flip openen

// Profiel knop, laat zien wie ik ben
document.querySelector('.buttonprofile').addEventListener('click', function () {
  if (!apiData) return; // nog niet geladen, even wachten
  flipOpen(this, `
    <img src="${apiData.avatar}" alt="Avatar van Alex" class="neon-img">
    <div class="profile-right">
      <h2>Wie ben ik?</h2>
      <ul class="profile-list">
        <li><span>Naam</span><span>${apiData.name ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Bijnaam</span><span>${apiData.nickname ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Geboortedatum</span><span>${apiData.birthdate ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Opleiding</span><span>${customField.opleiding ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Interesses</span><span>${fmt(customField.interesses)}</span></li>
        <li><span>Hobby's</span><span>${fmt(customField.hobbys)}</span></li>
        <li><span>Later</span><span>${fmt(customField.later)}</span></li>
      </ul>
    </div>
  `);
});

// Doelen knop, mijn drie leerdoelen
document.querySelector('.buttongoals').addEventListener('click', function () {
  if (!customField) return;
  flipOpen(this, `
    <h2>Mijn Leerdoelen</h2>
    <div class="goals-list">
      <div class="goal-item">
        <span class="goal-num">01</span>
        <p>${customField.leerdoel1 ?? "Niet Beschikbaar!"}</p>
      </div>
      <div class="goal-item">
        <span class="goal-num">02</span>
        <p>${customField.leerdoel2 ?? "Niet Beschikbaar!"}</p>
      </div>
      <div class="goal-item">
        <span class="goal-num">03</span>
        <p>${customField.leerdoel3 ?? "Niet Beschikbaar!"}</p>
      </div>
    </div>
  `);
});

// Alle vakken knop, reflectie op het hele minor jaar met linkjes naar mijn repos
document.querySelector('.buttonallevakken').addEventListener('click', function () {
  if (!customField) return;
  flipOpen(this, `
    <h2>Alle Vakken</h2>
    <div class="reflectie-content">
      <p>${fmt(customField.allevakkenreflectie)}</p>
    </div>
  `, [
    { label: 'BT',  href: 'https://github.com/alexmilu2002/browsertech1' },
    { label: 'CSS', href: 'https://github.com/alexmilu2002/csscockpit1' },
    { label: 'HCD', href: 'https://github.com/alexmilu2002/HCD-Podcast' },
    { label: 'API', href: 'https://github.com/alexmilu2002/FilmSeeker' }
  ]);
});

// Hackathon knop, ons Space Potatoes project
document.querySelector('.buttonhackathon').addEventListener('click', function () {
  if (!customField) return;
  flipOpen(this, `
    <h2>Hackathon Nebula Xplorer</h2>
    <div class="reflectie-content">
      <p>${fmt(customField.hackathonreflectie)}</p>
    </div>
  `, [
    { label: 'Website', href: 'https://jooosty.github.io/Space-Potatoes/' },
    { label: 'GitHub', href: 'https://github.com/jooosty/Space-Potatoes' }
  ]);
});

// Meesterproef knop, het grote eindproject voor INK
document.querySelector('.buttonmeesterproef').addEventListener('click', function () {
  if (!customField) return;
  flipOpen(this, `
    <h2>Meesterproef INK</h2>
    <div class="reflectie-content">
      <p>${fmt(customField.meesterproefreflectie)}</p>
    </div>
  `, [
    { label: 'Website', href: 'https://vlekkeloos-meesterproef.onrender.com/' },
    { label: 'GitHub', href: 'https://github.com/Haddoun1/vlekkeloos-meesterproef' }
  ]);
});
