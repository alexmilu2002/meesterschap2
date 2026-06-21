const apiURL = "https://fdnd.directus.app/items/person/279";

const speakers = [
  { btn: '.speaker-killian',   name: 'Killian Valkhof',   image: './images/killian.jpg',             alt: 'Foto van Killian Valkhof',                  key: 'killian'   },
  { btn: '.speaker-peterpaul', name: 'Peter-Paul Koch',   image: './images/peterpaul.jpg',           alt: 'Foto van Peter-Paul Koch',                  key: 'peterpaul' },
  { btn: '.speaker-nils',      name: 'Nils Binder',       image: './images/nils.webp',               alt: 'Foto van Nils Binder',                      key: 'nils'      },
  { btn: '.speaker-robbert',   name: 'Robbert Boersma',   image: './images/robbert.png',             alt: 'Foto van Robbert Boersma',                  key: 'robbert'   },
  { btn: '.speaker-rosa',      name: 'Rosa Schuurman',    image: './images/rosa.png',                alt: 'Foto van Rosa Schuurman',                   key: 'rosa'      },
  { btn: '.speaker-johan',     name: 'Johan Huijkman',    image: './images/johan.jpeg',              alt: 'Foto van Johan Huijkman',                   key: 'johan'     },
  { btn: '.speaker-sanne',     name: "Sanne 't Hooft",    image: './images/sanne.png',               alt: "Foto van Sanne 't Hooft",                   key: 'sanne'     },
  { btn: '.speaker-q41',       name: 'Q42',               image: './images/Q42.png',                 alt: 'Foto van de logo van Q42',                  key: 'q42'       },
  { btn: '.speaker-voorhoedde',name: 'Voorhoede',         image: './images/voorhoede.png',           alt: 'Foto van de logo van Voorhoede',            key: 'voorhoede'},
];

fetchJson(apiURL).then(response => {
  const customField = JSON.parse(response.data.custom);

  speakers.forEach(({ btn, name, image, alt, key }) => {
    document.querySelector(btn).addEventListener('click', function () {
      const tekst = customField[key]?.[0] ?? '';
      flipOpen(this, `
        <div class="speaker-header">
          <img src="${image}" alt="${alt}" class="neon-img">
          <h2>${name}</h2>
        </div>
        <div class="speaker-tekst">
          <p>${tekst}</p>
        </div>
      `);
    });
  });
});
