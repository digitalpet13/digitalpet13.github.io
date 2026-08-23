/* =========================================================
   DIGITAL PET MARKETPLACE
   CLEAN PET MARKETPLACE SYSTEM
   PET DATA + SEARCH + CATEGORY + DETAILS
   PI TESTNET PURCHASE + BATTLE + BREED
   ========================================================= */

const RENDER_BACKEND =
  "https://digitalpet13-github-io.onrender.com";


/* =========================================================
   PET DATA
   ========================================================= */

const pets = [

  {
    name: "Aquos",
    image: "pet_aquos.jpg",
    element: "💧 Water",
    category: "Water",
    rarity: "Rare",
    price: 1,
    hp: 120,
    attack: 75,
    defense: 80,
    speed: 70,
    generation: "Gen 1",
    description:
      "A calm water creature with strong defensive abilities.",
    abilityName: "Tidal Shield",
    abilityDescription:
      "Creates a water shield that increases defense during battle."
  },

  {
    name: "Floris",
    image: "pet_floris.jpg",
    element: "🌿 Nature",
    category: "Nature",
    rarity: "Rare",
    price: 1,
    hp: 110,
    attack: 70,
    defense: 85,
    speed: 75,
    generation: "Gen 1",
    description:
      "A nature guardian with strong defensive power.",
    abilityName: "Nature Heal",
    abilityDescription:
      "Uses natural energy to restore a portion of its HP."
  },

  {
    name: "Lunara",
    image: "pet_lunara.jpg",
    element: "🌙 Moon",
    category: "Moon",
    rarity: "Epic",
    price: 1,
    hp: 115,
    attack: 90,
    defense: 70,
    speed: 88,
    generation: "Gen 1",
    description:
      "A mysterious moon creature with powerful magical energy.",
    abilityName: "Moon Strike",
    abilityDescription:
      "Channels moon energy into a powerful magical attack."
  },

  {
    name: "Pyron",
    image: "pet_pyron.jpg",
    element: "🔥 Fire",
    category: "Fire",
    rarity: "Epic",
    price: 1,
    hp: 125,
    attack: 95,
    defense: 65,
    speed: 78,
    generation: "Gen 1",
    description:
      "A powerful fire creature with devastating attack strength.",
    abilityName: "Flame Burst",
    abilityDescription:
      "Releases a burst of flames that deals heavy damage."
  },

  {
    name: "Shadow",
    image: "pet_shadow.jpg",
    element: "🌑 Shadow",
    category: "Shadow",
    rarity: "Legendary",
    price: 1,
    hp: 105,
    attack: 100,
    defense: 65,
    speed: 98,
    generation: "Gen 1",
    description:
      "A legendary shadow creature that moves with incredible speed.",
    abilityName: "Shadow Rush",
    abilityDescription:
      "Disappears into the shadows and launches a lightning-fast attack."
  },

  {
    name: "Terran",
    image: "pet_terran.jpg",
    element: "🪨 Earth",
    category: "Earth",
    rarity: "Rare",
    price: 1,
    hp: 145,
    attack: 72,
    defense: 100,
    speed: 55,
    generation: "Gen 1",
    description:
      "A massive earth creature with unmatched defensive strength.",
    abilityName: "Earth Wall",
    abilityDescription:
      "Raises a powerful stone barrier that greatly increases defense."
  },

  {
    name: "Voltik",
    image: "pet_voltik.jpg",
    element: "⚡ Electric",
    category: "Electric",
    rarity: "Epic",
    price: 1,
    hp: 108,
    attack: 92,
    defense: 68,
    speed: 105,
    generation: "Gen 1",
    description:
      "A fast electric creature capable of devastating lightning attacks.",
    abilityName: "Thunder Rush",
    abilityDescription:
      "Charges its body with electricity and strikes with extreme speed."
  },

  {
    name: "Zephy",
    image: "pet_zephy.jpg",
    element: "🌪️ Wind",
    category: "Wind",
    rarity: "Legendary",
    price: 1,
    hp: 100,
    attack: 88,
    defense: 70,
    speed: 110,
    generation: "Gen 1",
    description:
      "A legendary wind creature faster than almost any other pet.",
    abilityName: "Cyclone Dash",
    abilityDescription:
      "Creates a powerful cyclone while rapidly moving around the enemy."
  }

];


/* =========================================================
   MARKETPLACE VARIABLES
   ========================================================= */

const petGrid =
  document.getElementById("petGrid");

const searchInput =
  document.getElementById("petSearch");

const categoryButtons =
  document.querySelectorAll(".category");

let selectedPet = null;

let currentCategory = "All";


/* =========================================================
   DISPLAY PETS
   ========================================================= */

function displayPets() {

  if (!petGrid) return;

  petGrid.innerHTML = "";

  const searchText =
    searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

  const filteredPets =
    pets.filter(function(pet) {

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
        grid-column:1/-1;
        text-align:center;
        padding:50px 20px;
        color:#9da7bd;
      ">
        <div style="font-size:45px;">🐾</div>
        <h3>No pets found</h3>
        <p>Try another category or search.</p>
      </div>
    `;

    return;
  }


  filteredPets.forEach(function(pet) {

    const originalIndex =
      pets.indexOf(pet);

    const card =
      document.createElement("div");

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

      <p>🟣 ${pet.price} π</p>
    `;


    card.addEventListener(
      "click",
      function() {
        openPet(originalIndex);
      }
    );


    petGrid.appendChild(card);

  });

}


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

categoryButtons.forEach(function(button) {

  button.addEventListener(
    "click",
    function() {

      categoryButtons.forEach(
        function(btn) {
          btn.classList.remove("active");
        }
      );

      button.classList.add("active");

      currentCategory =
        button.dataset.element || "All";

      displayPets();

    }
  );

});


/* =========================================================
   SEARCH
   ========================================================= */

if (searchInput) {

  searchInput.addEventListener(
    "input",
    function() {
      displayPets();
    }
  );

}


/* =========================================================
   OPEN PET DETAILS
   ========================================================= */

function openPet(index) {

  selectedPet = pets[index];

  if (!selectedPet) return;


  const modal =
    document.getElementById("petModal");

  const image =
    document.getElementById("detailPetImage");

  const name =
    document.getElementById("detailName");

  const description =
    document.getElementById("detailDescription");

  const rarity =
    document.getElementById("detailRarity");

  const rarityText =
    document.getElementById("detailRarityText");

  const element =
    document.getElementById("detailElement");

  const elementIcon =
    document.getElementById("detailElementIcon");

  const generation =
    document.getElementById("detailGeneration");

  const hpValue =
    document.getElementById("hpValue");

  const attackValue =
    document.getElementById("attackValue");

  const defenseValue =
    document.getElementById("defenseValue");

  const speedValue =
    document.getElementById("speedValue");

  const hpBar =
    document.getElementById("hpBar");

  const attackBar =
    document.getElementById("attackBar");

  const defenseBar =
    document.getElementById("defenseBar");

  const speedBar =
    document.getElementById("speedBar");

  const abilityName =
    document.getElementById("abilityName");

  const abilityDescription =
    document.getElementById("abilityDescription");

  const abilityBox =
    document.getElementById("abilityBox");


  /* =======================================================
     PET IMAGE
     ======================================================= */

  if (image) {

    image.src =
      selectedPet.image;

    image.alt =
      selectedPet.name;

  }


  /* =======================================================
     NAME
     ======================================================= */

  if (name) {

    name.textContent =
      selectedPet.name;

  }


  /* =======================================================
     DESCRIPTION
     ======================================================= */

  if (description) {

    description.textContent =
      selectedPet.description;

  }


  /* =======================================================
     RARITY
     ======================================================= */

  if (rarity) {

    rarity.textContent =
      selectedPet.rarity.toUpperCase();

  }

  if (rarityText) {

    rarityText.textContent =
      selectedPet.rarity;

  }


  /* =======================================================
     ELEMENT
     ======================================================= */

  const elementParts =
    selectedPet.element.split(" ");

  if (element) {

    element.textContent =
      elementParts.slice(1).join(" ");

  }

  if (elementIcon) {

    elementIcon.textContent =
      elementParts[0];

  }


  /* =======================================================
     GENERATION
     ======================================================= */

  if (generation) {

    generation.textContent =
      selectedPet.generation;

  }


  /* =======================================================
     STATS
     ======================================================= */

  if (hpValue) {

    hpValue.textContent =
      selectedPet.hp;

  }

  if (attackValue) {

    attackValue.textContent =
      selectedPet.attack;

  }

  if (defenseValue) {

    defenseValue.textContent =
      selectedPet.defense;

  }

  if (speedValue) {

    speedValue.textContent =
      selectedPet.speed;

  }


  /* =======================================================
     STAT BARS
     ======================================================= */

  if (hpBar) {

    hpBar.style.width =
      Math.min(selectedPet.hp, 150) / 150 * 100 + "%";

  }

  if (attackBar) {

    attackBar.style.width =
      Math.min(selectedPet.attack, 150) / 150 * 100 + "%";

  }

  if (defenseBar) {

    defenseBar.style.width =
      Math.min(selectedPet.defense, 150) / 150 * 100 + "%";

  }

  if (speedBar) {

    speedBar.style.width =
      Math.min(selectedPet.speed, 150) / 150 * 100 + "%";

  }


  /* =======================================================
     SPECIAL ABILITY
     ======================================================= */

  if (abilityName) {

    abilityName.textContent =
      selectedPet.abilityName;

  }

  if (abilityDescription) {

    abilityDescription.textContent =
      selectedPet.abilityDescription;

  }

  if (abilityBox) {

    abilityBox.classList.remove("show");

    abilityBox.style.display = "";

  }


  /* =======================================================
     BUY BUTTON
     ======================================================= */

  createBuyButton();


  /* =======================================================
     OPEN MODAL
     ======================================================= */

  if (modal) {

    modal.style.display =
      "flex";

    modal.classList.add("show");

    document.body.classList.add(
      "modal-open"
    );

  }

}


/* =========================================================
   CREATE BUY BUTTON
   ========================================================= */

function createBuyButton() {

  if (!selectedPet) return;


  const rightSide =
    document.querySelector(".pet-details-right");

  if (!rightSide) return;


  let buyButton =
    document.getElementById("buyPetButton");


  if (!buyButton) {

    buyButton =
      document.createElement("button");

    buyButton.id =
      "buyPetButton";

    buyButton.className =
      "ability-button";

    buyButton.style.marginTop =
      "15px";

    rightSide.appendChild(
      buyButton
    );

  }


  buyButton.innerHTML =
    `🛒 Buy ${selectedPet.name} — ${selectedPet.price} π`;


  buyButton.onclick =
    function() {

      buyPet(selectedPet);

    };

}


/* =========================================================
   SHOW SPECIAL ABILITY
   ========================================================= */

function showAbility() {

  const abilityBox =
    document.getElementById("abilityBox");

  if (!abilityBox) return;


  abilityBox.classList.add("show");

  abilityBox.style.display =
    "flex";

}


/* =========================================================
   CLOSE PET DETAILS
   ========================================================= */

function closePetDetails() {

  const modal =
    document.getElementById("petModal");


  if (modal) {

    modal.classList.remove("show");

    modal.style.display =
      "none";

  }


  document.body.classList.remove(
    "modal-open"
  );


  selectedPet = null;

}


/* =========================================================
   OLD HTML COMPATIBILITY
   ========================================================= */

function closePet() {

  closePetDetails();

}


/* =========================================================
   PI TESTNET PURCHASE
   ========================================================= */

async function buyPet(pet) {

  if (!pet) return;


  /* =======================================================
     CHECK PI USER
     ======================================================= */

  if (
    typeof piUser === "undefined" ||
    !piUser
  ) {

    alert(
      "🟣 Please sign in with Pi first."
    );

    return;

  }


  /* =======================================================
     CHECK PI SDK
     ======================================================= */

  if (
    typeof piInitialized === "undefined" ||
    !piInitialized
  ) {

    alert(
      "🟣 Pi SDK is not ready yet.\n\n" +
      "Please wait a moment and try again."
    );

    return;

  }


  if (
    typeof Pi === "undefined"
  ) {

    alert(
      "Pi SDK is not available."
    );

    return;

  }


  /* =======================================================
     CONFIRM PURCHASE
     ======================================================= */

  const confirmed =
    confirm(
      `🛒 BUY PET\n\n` +
      `${pet.name}\n` +
      `⭐ ${pet.rarity}\n` +
      `💰 Price: ${pet.price} π\n\n` +
      `Continue with Pi Testnet payment?`
    );


  if (!confirmed) return;


  const buyButton =
    document.getElementById(
      "buyPetButton"
    );


  if (buyButton) {

    buyButton.disabled =
      true;

    buyButton.textContent =
      "⏳ Opening Pi payment...";

  }


  /* =======================================================
     PAYMENT DATA
     ======================================================= */

  const paymentData = {

    amount:
      Number(pet.price),

    memo:
      `Purchase Digital Pet: ${pet.name}`,

    metadata: {

      petName:
        pet.name,

      rarity:
        pet.rarity,

      category:
        pet.category,

      generation:
        pet.generation

    }

  };


  /* =======================================================
     PI PAYMENT CALLBACKS
     ======================================================= */

  const callbacks = {

    /* -----------------------------------------------------
       SERVER APPROVAL
       ----------------------------------------------------- */

    onReadyForServerApproval:
      async function(paymentId) {

        console.log(
          "Pi payment ready for approval:",
          paymentId
        );


        const response =
          await fetch(
            `${RENDER_BACKEND}/api/payments/approve`,
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                paymentId:
                  paymentId
              })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          console.error(
            "Approval failed:",
            data
          );

          throw new Error(
            data.error ||
            "Server approval failed"
          );

        }


        console.log(
          "Pi payment approved:",
          data
        );

      },


    /* -----------------------------------------------------
       SERVER COMPLETION
       ----------------------------------------------------- */

    onReadyForServerCompletion:
      async function(
        paymentId,
        txid
      ) {

        console.log(
          "Pi payment ready for completion:",
          paymentId,
          txid
        );


        const response =
          await fetch(
            `${RENDER_BACKEND}/api/payments/complete`,
            {

              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                paymentId:
                  paymentId,

                txid:
                  txid

              })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          console.error(
            "Completion failed:",
            data
          );

          throw new Error(
            data.error ||
            "Server completion failed"
          );

        }


        console.log(
          "Pi payment completed:",
          data
        );


        alert(
          `✅ PURCHASE SUCCESSFUL!\n\n` +
          `${pet.name} is now purchased.\n\n` +
          `Paid: ${pet.price} π\n` +
          `Transaction: ${txid}`
        );


        if (buyButton) {

          buyButton.disabled =
            false;

          buyButton.textContent =
            `✅ ${pet.name} Purchased`;

        }

      },


    /* -----------------------------------------------------
       CANCEL
       ----------------------------------------------------- */

    onCancel:
      function(paymentId) {

        console.log(
          "Payment cancelled:",
          paymentId
        );


        if (buyButton) {

          buyButton.disabled =
            false;

          buyButton.textContent =
            `🛒 Buy ${pet.name} — ${pet.price} π`;

        }


        alert(
          "❌ Payment cancelled."
        );

      },


    /* -----------------------------------------------------
       ERROR
       ----------------------------------------------------- */

    onError:
      function(error, payment) {

        console.error(
          "Pi payment error:",
          error,
          payment
        );


        if (buyButton) {

          buyButton.disabled =
            false;

          buyButton.textContent =
            `🛒 Buy ${pet.name} — ${pet.price} π`;

        }


        alert(
          "❌ Pi payment could not be completed.\n\n" +
          "Please try again."
        );

      }

  };


  /* =======================================================
     START PI PAYMENT
     ======================================================= */

  try {

    await Pi.createPayment(
      paymentData,
      callbacks
    );

  } catch (error) {

    console.error(
      "Pi createPayment error:",
      error
    );


    if (buyButton) {

      buyButton.disabled =
        false;

      buyButton.textContent =
        `🛒 Buy ${pet.name} — ${pet.price} π`;

    }


    alert(
      "❌ Unable to start the Pi payment.\n\n" +
      error.message
    );

  }

}


/* =========================================================
   BATTLE
   ========================================================= */

function battlePet() {

  if (!selectedPet) {

    alert(
      "Please select a pet first."
    );

    return;

  }


  const opponents =
    pets.filter(
      function(pet) {
        return pet.name !==
          selectedPet.name;
      }
    );


  if (opponents.length === 0) {

    alert(
      "No opponent available."
    );

    return;

  }


  const opponent =
    opponents[
      Math.floor(
        Math.random() *
        opponents.length
      )
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


/* =========================================================
   BREED
   ========================================================= */

function breedPet() {

  if (!selectedPet) {

    alert(
      "Please select a pet first."
    );

    return;

  }


  alert(

    "🧬 BREEDING\n\n" +

    selectedPet.name +

    " is selected.\n\n" +

    "Choose another compatible pet " +
    "to create a new generation."

  );

}


/* =========================================================
   CLOSE MODAL BY BACKDROP
   ========================================================= */

window.addEventListener(
  "click",
  function(event) {

    const modal =
      document.getElementById(
        "petModal"
      );


    if (!modal) return;


    if (
      event.target === modal ||
      event.target.classList.contains(
        "pet-modal-backdrop"
      )
    ) {

      closePetDetails();

    }

  }
);


/* =========================================================
   ESC KEY
   ========================================================= */

window.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closePetDetails();

    }

  }
);


/* =========================================================
   INITIAL LOAD
   ========================================================= */

displayPets();