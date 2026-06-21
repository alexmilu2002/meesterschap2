// Haal mijn data op van de FDND API
const apiURL = "https://fdnd.directus.app/items/person/279"
const dialogDestinationPersonal = document.querySelector('.content-destination-personal')
const dialogDestinationGoals = document.querySelector('.content-destination-goals')

// Zodra de data binnenkomt, vul je de dialogs in met de juiste HTML
fetchJson(apiURL).then(function (response) {

  // Profiel dialog — wie ben ik?
  if (dialogDestinationPersonal) {
    let customField = JSON.parse(response.data.custom);

    dialogDestinationPersonal.innerHTML =
      `
        <h2>Wie ben ik?</h2>
        <img src="${response.data.avatar}" alt="Avatar van Alex in Zwart-Wit gegenereerd door AI.">
        <div>
          <p><strong>Naam:</strong> ${response.data.name ?? "Niet Beschikbaar!"}</p>
          <p><strong>Bijnaam:</strong> ${response.data.nickname ?? "Niet Beschikbaar!"}</p>
          <p><strong>Geboortedatum:</strong> ${response.data.birthdate ?? "Niet Beschikbaar!"}</p>
          <p><strong>Opleiding:</strong> ${customField.opleiding ?? "Niet Beschikbaar!"}</p>
          <p><strong>Interesses:</strong> ${customField.interesses ?? "Niet Beschikbaar!"}</p>
          <p><strong>Hobby's:</strong> ${customField.hobbys ?? "Niet Beschikbaar!"}</p>
          <p><strong>Later:</strong> ${customField.later ?? "Niet Beschikbaar!"}</p>
        </div>
        <button>Terug</button>
      `
  }

  // Doelen dialog — mijn drie leerdoelen
  if (dialogDestinationGoals) {
    let customField = JSON.parse(response.data.custom);

    dialogDestinationGoals.innerHTML =
      `
        <h2>Mijn Leerdoelen</h2>
        <img src="./images/doelensvg.svg" alt="Foto van een trofee">
        <div>
         <p><strong>Leerdoel 1:</strong> ${customField.leerdoel1 ?? "Niet Beschikbaar!"}</p>
          <p><strong>Leerdoel 2:</strong> ${customField.leerdoel2 ?? "Niet Beschikbaar!"}</p>
          <p><strong>Leerdoel 3:</strong> ${customField.leerdoel3 ?? "Niet Beschikbaar!"}</p>
        </div>
        <button>Terug</button>
      `
  }
})

// Fetch wrapper — zelfde als in shared.js maar oudeversie laadt geen shared.js
async function fetchJson(url, payload = {}) {
  return await fetch(url, payload)
    .then((response) => response.json())
    .catch((error) => error)
}

// Haal een willekeurige minor-student op en zet die in de randomize dialog
const apiURL2 ="https://fdnd.directus.app/items/person?filter[squads][squad_id][tribe][name]=CMD%20Minor%20Web%20Dev&filter[squads][squad_id][cohort]=2526";
const dialogDestinationRandomize = document.querySelector(".content-destination-randomize");

async function haalRandomMinormensOp() {
  let response = await fetch(apiURL2);
  let responseJSON = await response.json();
  let responseData = responseJSON.data;

  // Elk veld krijgt een andere willekeurige persoon — zo is de "student" echt gerandomized
  let randomNumber = Math.floor(Math.random() * responseData.length);
  let randomAvatar = responseData[randomNumber].avatar;

  randomNumber = Math.floor(Math.random() * responseData.length);
  let randomName = responseData[randomNumber].name;

  randomNumber = Math.floor(Math.random() * responseData.length);
  let randomNickname = responseData[randomNumber].nickname;

  randomNumber = Math.floor(Math.random() * responseData.length);
  let randomBirthdate = responseData[randomNumber].birthdate;

  randomNumber = Math.floor(Math.random() * responseData.length);
  let randomFavColor = responseData[randomNumber].fav_color;

  randomNumber = Math.floor(Math.random() * responseData.length);
  let randomFavSeason = responseData[randomNumber].fav_season;

  randomNumber = Math.floor(Math.random() * responseData.length);
  let randomFavAnimal = responseData[randomNumber].fav_animal;

  randomNumber = Math.floor(Math.random() * responseData.length);
  let randomFavHobby = responseData[randomNumber].fav_hobby;

  randomNumber = Math.floor(Math.random() * responseData.length);
  let randomFavFruit = responseData[randomNumber].fav_fruit;

  // Alles in de dialog stoppen en daarna openen
  if (dialogDestinationRandomize) {
    dialogDestinationRandomize.innerHTML = `
      <h2>Randomized Student</h2>
      <img src="${randomAvatar ? randomAvatar : './images/picturenotavailable.jpg' }" alt="Avatar foto van Random gegenereerde Student.">
      <div>
        <p><strong>Naam:</strong> ${randomName ?? "Niet Beschikbaar!"}</p>
        <p><strong>Bijnaam:</strong> ${randomNickname ?? "Niet Beschikbaar!"}</p>
        <p><strong>Geboortedatum:</strong> ${randomBirthdate ?? "Niet Beschikbaar!"}</p>
        <p><strong>Favoriete Kleur:</strong> ${randomFavColor ?? "Niet Beschikbaar!"}</p>
        <p><strong>Favoriete Seizoen:</strong> ${randomFavSeason ?? "Niet Beschikbaar!"}</p>
        <p><strong>Favoriete Dier:</strong> ${randomFavAnimal ?? "Niet Beschikbaar!"}</p>
        <p><strong>Favoriete Hobby:</strong> ${randomFavHobby ?? "Niet Beschikbaar!"}</p>
        <p><strong>Favoriete Fruit:</strong> ${randomFavFruit ?? "Niet Beschikbaar!"}</p>
      </div>
      <button>Terug</button>
    `;
  }
  randomizeDialog.showModal();
}

// Light en Dark Mode
const themeToggle = document.querySelector('.themetoggle');

// Zet het thema en sla het op in localStorage zodat het onthouden wordt
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Wissel tussen light en dark als je op de lampknop drukt
themeToggle.addEventListener('click', () => {
  const activeTheme = document.documentElement.getAttribute('data-theme');

  if (activeTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});

// Dialog knoppen koppelen aan hun bijbehorende dialogs
const showRandomizeDialogBtn = document.querySelector(".randomstudent")
const randomizeDialog = document.getElementById("randomizeDialog");

const showProfileDialogBtn = document.querySelector(".buttonprofile");
const profileDialog = document.getElementById("profileDialog");

const showGoalsDialogBtn = document.querySelector(".buttongoals");
const goalsDialog = document.getElementById("goalsDialog");

showRandomizeDialogBtn.addEventListener("click", function() {haalRandomMinormensOp();});
showProfileDialogBtn.addEventListener("click", () => profileDialog.showModal());
showGoalsDialogBtn.addEventListener("click", () => goalsDialog.showModal());
