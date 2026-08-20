const pets = [
  {
    name: "Aquos",
    image: "pet_aquos.jpg",
    element: "💧 Water",
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
    rarity: "Legendary",
    hp: 100,
    attack: 88,
    defense: 70,
    speed: 110
  }
];

const petGrid = document.getElementById("petGrid");

pets.forEach((pet, index) => {

  const card = document.createElement("div");

  card.className = "pet-card";

  card.innerHTML = `
    <img src="${pet.image}" alt="${pet.name}">
    <h3>${pet.name}</h3>
    <p>${pet.element}</p>
    <p>${pet.rarity}</p>
  `;

  card.onclick = () => openPet(index);

  petGrid.appendChild(card);
});


let selectedPet = null;


function openPet(index) {

  selectedPet = pets[index];

  document.getElementById("petImage").src = selectedPet.image;
  document.getElementById("petName").textContent = selectedPet.name;

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

  document.getElementById("petModal").style.display = "block";
}


function closePet() {
  document.getElementById("petModal").style.display = "none";
}


function battlePet() {

  if (!selectedPet) return;

  let opponents = pets.filter(
    pet => pet.name !== selectedPet.name
  );

  let opponent =
    opponents[Math.floor(Math.random() * opponents.length)];

  let playerPower =
    selectedPet.attack +
    selectedPet.defense +
    selectedPet.speed;

  let opponentPower =
    opponent.attack +
    opponent.defense +
    opponent.speed;

  let winner;

  if (playerPower >= opponentPower) {
    winner = selectedPet.name;
  } else {
    winner = opponent.name;
  }

  alert(
    "⚔️ BATTLE RESULT\n\n" +
    selectedPet.name +
    " VS " +
    opponent.name +
    "\n\n" +
    "🏆 Winner: " +
    winner +
    "\n\n" +
    "📴 Opponent owner may be offline.\n" +
    "Battle recorded for the pet."
  );
}


function breedPet() {

  if (!selectedPet) return;

  alert(
    "🧬 BREEDING\n\n" +
    selectedPet.name +
    " is ready for breeding!\n\n" +
    "Breeding system will allow two compatible pets " +
    "to create a new pet with inherited traits."
  );
}


window.onclick = function(event) {

  const modal = document.getElementById("petModal");

  if (event.target === modal) {
    closePet();
  }

};