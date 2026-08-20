const pets = [
  {
    name: "Aquos",
    image: "pet_aquos.jpg",
    element: "💧 Water",
    category: "Water",
    rarity: "Rare",
    hp: 120,
    attack: 75,
    defense: 80,
    speed: 70
  },
  {
    name: "Floris",
    image: "pet_floris.jpg",
    element: "🌿 Nature",
    category: "Nature",
    rarity: "Rare",
    hp: 110,
    attack: 70,
    defense: 85,
    speed: 75
  },
  {
    name: "Lunara",
    image: "pet_lunara.jpg",
    element: "🌙 Moon",
    category: "Moon",
    rarity: "Epic",
    hp: 115,
    attack: 90,
    defense: 70,
    speed: 88
  },
  {
    name: "Pyron",
    image: "pet_pyron.jpg",
    element: "🔥 Fire",
    category: "Fire",
    rarity: "Epic",
    hp: 125,
    attack: 95,
    defense: 65,
    speed: 78
  },
  {
    name: "Shadow",
    image: "pet_shadow.jpg",
    element: "🌑 Shadow",
    category: "Shadow",
    rarity: "Legendary",
    hp: 105,
    attack: 100,
    defense: 65,
    speed: 98
  },
  {
    name: "Terran",
    image: "pet_terran.jpg",
    element: "🪨 Earth",
    category: "Earth",
    rarity: "Rare",
    hp: 145,
    attack: 72,
    defense: 100,
    speed: 55
  },
  {
    name: "Voltik",
    image: "pet_voltik.jpg",
    element: "⚡ Electric",
    category: "Electric",
    rarity: "Epic",
    hp: 108,
    attack: 92,
    defense: 68,
    speed: 105
  },
  {
    name: "Zephy",
    image: "pet_zephy.jpg",
    element: "🌪️ Wind",
    category: "Wind",
    rarity: "Legendary",
    hp: 100,
    attack: 88,
    defense: 70,
    speed: 110
  }
];

const petGrid = document.getElementById("petGrid");
const searchInput = document.getElementById("petSearch");

let selectedPet = null;
let currentCategory = "All";


/* =========================
   DISPLAY PETS
========================= */

function displayPets() {

  petGrid.innerHTML = "";

  const searchText = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

  const filteredPets = pets.filter(pet => {

    const categoryMatch =
      currentCategory === "All" ||
      pet.category === currentCategory;

    const searchMatch =
      pet.name.toLowerCase().includes(searchText) ||
      pet.category.toLowerCase().includes(searchText) ||
      pet.rarity.toLowerCase().includes(searchText);

    return categoryMatch && searchMatch;
  });


  if (filteredPets.length === 0) {

    petGrid.innerHTML = `
      <div style="
        grid-column: 1 / -1;
        text-align: center;
        padding: 50px 20px;
        color: #9da7bd;
      ">
        <div style="font-size:45px;">🐾</div>
        <h3>No pets found</h3>
        <p>Try another category or search.</p>
      </div>
    `;

    return;
  }


  filteredPets.forEach(pet => {

    const originalIndex = pets.indexOf(pet);

    const card = document.createElement("div");

    card.className = "pet-card";

    card.innerHTML = `
      <img
        src="${pet.image}"
        alt="${pet.name}"
        onerror="this.style.display='none'"
      >

      <h3>${pet.name}</h3>

      <p>${pet.element}</p>

      <p>⭐ ${pet.rarity}</p>
    `;

    card.onclick = () => openPet(originalIndex);

    petGrid.appendChild(card);
  });
}


/* =========================
   CATEGORY BUTTONS
========================= */

const categoryButtons =
  document.querySelectorAll(".category");

categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    categoryButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentCategory =
      button.dataset.element || "All";

    displayPets();
  });

});


/* =========================
   SEARCH
========================= */

if (searchInput) {

  searchInput.addEventListener("input", () => {
    displayPets();
  });

}


/* =========================
   OPEN PET
========================= */

function openPet(index) {

  selectedPet = pets[index];

  document.getElementById("petImage").src =
    selectedPet.image;

  document.getElementById("petName").textContent =
    selectedPet.name;

  document.getElementById("petElement").textContent =
    "Element: " + selectedPet.element;

  document.getElementById("petRarity").textContent =
    "Rarity: " + selectedPet.rarity;

  document.getElementById("petHP").textContent =
    selectedPet.hp;

  document.getElementById("petAttack").textContent =
    selectedPet.attack;

  document.getElementById("petDefense").textContent =
    selectedPet.defense;

  document.getElementById("petSpeed").textContent =
    selectedPet.speed;

  document.getElementById("petModal").style.display =
    "block";
}


/* =========================
   CLOSE PET
========================= */

function closePet() {

  document.getElementById("petModal").style.display =
    "none";
}


/* =========================
   BATTLE
========================= */

function battlePet() {

  if (!selectedPet) return;


  const opponents = pets.filter(
    pet => pet.name !== selectedPet.name
  );


  if (opponents.length === 0) {
    alert("No opponent available.");
    return;
  }


  const opponent =
    opponents[
      Math.floor(Math.random() * opponents.length)
    ];


  const playerPower =
    selectedPet.attack +
    selectedPet.defense +
    selectedPet.speed;


  const opponentPower =
    opponent.attack +
    opponent.defense +
    opponent.speed;


  const winner =
    playerPower >= opponentPower
      ? selectedPet.name
      : opponent.name;


  alert(
    "⚔️ BATTLE RESULT\n\n" +
    selectedPet.name +
    " VS " +
    opponent.name +
    "\n\n" +
    "🏆 Winner: " +
    winner +
    "\n\n" +
    "📴 Opponent can be offline.\n" +
    "Battle result recorded."
  );
}


/* =========================
   BREED
========================= */

function breedPet() {

  if (!selectedPet) return;

  alert(
    "🧬 BREEDING\n\n" +
    selectedPet.name +
    " is selected.\n\n" +
    "Choose another compatible pet " +
    "to create a new generation."
  );
}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

window.addEventListener("click", function(event) {

  const modal =
    document.getElementById("petModal");

  if (event.target === modal) {
    closePet();
  }

});


/* =========================
   INITIAL LOAD
========================= */

displayPets();