const apiURL = "https://fdnd.directus.app/items/person/279"

const fmt = (val) => Array.isArray(val) ? val.join(', ') : (val ?? "Niet Beschikbaar!");

let apiData = null;
let customField = null;

fetchJson(apiURL).then(function (response) {
  apiData = response.data;
  customField = JSON.parse(response.data.custom);
});

// Random student
const apiURL2 = "https://fdnd.directus.app/items/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526";

async function haalRandomMinormensOp() {
  let response = await fetch(apiURL2);
  let responseJSON = await response.json();
  let responseData = responseJSON.data;

  const student = responseData[Math.floor(Math.random() * responseData.length)];

  return `
    <img src="${student.avatar || './images/picturenotavailable.jpg'}" alt="Avatar van willekeurige student" class="neon-img">
    <div class="profile-right">
      <h2>${student.name ?? 'Willekeurige Student'}</h2>
      <ul class="profile-list">
        <li><span>Naam</span><span>${student.name ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Bijnaam</span><span>${student.nickname ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Geboortedatum</span><span>${student.birthdate ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Favoriete kleur</span><span>${student.fav_color ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Favoriete seizoen</span><span>${student.fav_season ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Favoriete dier</span><span>${student.fav_animal ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Favoriete hobby</span><span>${student.fav_hobby ?? "Niet Beschikbaar!"}</span></li>
        <li><span>Favoriete fruit</span><span>${student.fav_fruit ?? "Niet Beschikbaar!"}</span></li>
      </ul>
    </div>
  `;
}

// Click handlers
document.querySelector('.buttonsprint0').addEventListener('click', function () {
  flipOpen(this, haalRandomMinormensOp);
});

document.querySelector('.buttonprofile').addEventListener('click', function () {
  if (!apiData) return;
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
