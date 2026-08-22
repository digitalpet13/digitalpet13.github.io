const pets = [

  {
    id: "aquos",
    name: "Aquos",
    image: "./pet_aquos.jpg",
    element: "Water",
    icon: "💧",
    rarity: "Rare",
    generation: "Gen 1",
    description: "A water guardian with strong defense and recovery abilities.",
    stats: {
      hp: 900,
      attack: 650,
      defense: 880,
      speed: 620
    },
    ability: {
      name: "Tidal Shield",
      description: "Aquos creates a powerful water barrier that reduces incoming damage."
    }
  },

  {
    id: "floris",
    name: "Floris",
    image: "./pet_floris.jpg",
    element: "Nature",
    icon: "🌸",
    rarity: "Rare",
    generation: "Gen 1",
    description: "A nature spirit with balanced abilities and regenerative power.",
    stats: {
      hp: 850,
      attack: 700,
      defense: 760,
      speed: 720
    },
    ability: {
      name: "Nature Bloom",
      description: "Floris releases natural energy that restores health and strengthens allies."
    }
  },

  {
    id: "lunara",
    name: "Lunara",
    image: "./pet_lunara.jpg",
    element: "Moon",
    icon: "🌙",
    rarity: "Epic",
    generation: "Gen 1",
    description: "A mysterious moon creature with incredible speed and mystical energy.",
    stats: {
      hp: 760,
      attack: 820,
      defense: 690,
      speed: 960
    },
    ability: {
      name: "Moonlight Veil",
      description: "Lunara surrounds herself with moonlight, increasing evasion and mystical power."
    }
  },

  {
    id: "pyron",
    name: "Pyron",
    image: "./pet_pyron.jpg",
    element: "Fire",
    icon: "🔥",
    rarity: "Epic",
    generation: "Gen 1",
    description: "A fierce fire creature built for powerful offensive attacks.",
    stats: {
      hp: 820,
      attack: 940,
      defense: 620,
      speed: 780
    },
    ability: {
      name: "Inferno Burst",
      description: "Pyron unleashes a massive wave of fire that deals devastating damage."
    }
  },

  {
    id: "shadow",
    name: "Shadow",
    image: "./pet_shadow.jpg",
    element: "Dark",
    icon: "🌑",
    rarity: "Epic",
    generation: "Gen 1",
    description: "A mysterious dark creature that excels in speed and surprise attacks.",
    stats: {
      hp: 720,
      attack: 900,
      defense: 640,
      speed: 950
    },
    ability: {
      name: "Shadow Strike",
      description: "Shadow disappears into darkness and launches a powerful surprise attack."
    }
  },

  {
    id: "terran",
    name: "Terran",
    image: "./pet_terran.jpg",
    element: "Earth",
    icon: "🌍",
    rarity: "Rare",
    generation: "Gen 1",
    description: "A powerful earth guardian with exceptional strength and defense.",
    stats: {
      hp: 980,
      attack: 780,
      defense: 960,
      speed: 500
    },
    ability: {
      name: "Earth Fortress",
      description: "Terran summons the power of the earth to greatly increase its defense."
    }
  },

  {
    id: "voltik",
    name: "Voltik",
    image: "./pet_voltik.jpg",
    element: "Electric",
    icon: "⚡",
    rarity: "Epic",
    generation: "Gen 1",
    description: "A lightning-powered pet with incredible speed and electrical attacks.",
    stats: {
      hp: 700,
      attack: 900,
      defense: 600,
      speed: 980
    },
    ability: {
      name: "Thunder Strike",
      description: "Voltik calls down a powerful lightning strike on its opponent."
    }
  },

  {
    id: "zephy",
    name: "Zephy",
    image: "./pet_zephy.jpg",
    element: "Wind",
    icon: "🌪️",
    rarity: "Epic",
    generation: "Gen 1",
    description: "A swift wind creature capable of overwhelming enemies with speed.",
    stats: {
      hp: 740,
      attack: 820,
      defense: 580,
      speed: 1000
    },
    ability: {
      name: "Cyclone Rush",
      description: "Zephy creates a powerful cyclone and strikes the enemy with incredible speed."
    }
  }

];


const petGrid = document.getElementById("petGrid");


function loadPets() {

  petGrid.innerHTML = "";

  pets.forEach(pet => {

    const card = document.createElement("div");

    card.className =
      "preview-card pet-card " +
      pet.rarity.toLowerCase();

    card.onclick = () => openPetDetails(pet.id);

    card.innerHTML = `

      <div class="pet-card-image">

        <img
          src="${pet.image}"
          alt="${pet.name}"
        >

        <span class="card-rarity">
          ${pet.rarity}
        </span>

      </div>

      <h3>
        ${pet.icon} ${pet.name}
      </h3>

      <p>
        ${pet.icon} ${pet.element} • ${pet.rarity}
      </p>

      <div class="click-hint">
        Tap to view abilities
      </div>

    `;

    petGrid.appendChild(card);

  });

}


function openPetDetails(petId) {

  const pet = pets.find(p => p.id === petId);

  if (!pet) return;


  document.getElementById("detailPetImage").src =
    pet.image;

  document.getElementById("detailPetImage").alt =
    pet.name;

  document.getElementById("detailName").textContent =
    pet.name;

  document.getElementById("detailElement").textContent =
    pet.element;

  document.getElementById("detailElementIcon").textContent =
    pet.icon;

  document.getElementById("detailRarity").textContent =
    pet.rarity;

  document.getElementById("detailRarityText").textContent =
    pet.rarity;

  document.getElementById("detailGeneration").textContent =
    pet.generation;

  document.getElementById("detailDescription").textContent =
    pet.description;


  updateStat("hp", pet.stats.hp);
  updateStat("attack", pet.stats.attack);
  updateStat("defense", pet.stats.defense);
  updateStat("speed", pet.stats.speed);


  document.getElementById("abilityName").textContent =
    pet.ability.name;

  document.getElementById("abilityDescription").textContent =
    pet.ability.description;


  document.getElementById("abilityBox").classList.remove("show");


  document.getElementById("petModal").classList.add("show");

  document.body.classList.add("modal-open");

}


function updateStat(statName, value) {

  const valueElement =
    document.getElementById(statName + "Value");

  const barElement =
    document.getElementById(statName + "Bar");


  valueElement.textContent = value;

  barElement.style.width = "0%";


  setTimeout(() => {

    const percentage =
      Math.min((value / 1000) * 100, 100);

    barElement.style.width =
      percentage + "%";

  }, 150);

}


function showAbility() {

  document
    .getElementById("abilityBox")
    .classList.add("show");

}


function closePetDetails() {

  document
    .getElementById("petModal")
    .classList.remove("show");

  document.body.classList.remove("modal-open");

}


document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {
    closePetDetails();
  }

});


loadPets();