/* =========================================================
   DIGITAL PET MARKETPLACE
   PET DATA + PROFESSIONAL DIGITALPET LOGIN LOADER
   ========================================================= */


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
   DIGITALPET PROFESSIONAL LOGIN LOADER
   ========================================================= */

(function () {

  "use strict";

  let loaderCreated = false;
  let progressTimer = null;

  function createDigitalPetLoader() {

    if (loaderCreated) {
      return;
    }

    loaderCreated = true;

    const loader = document.createElement("div");

    loader.id = "digitalPetLoginLoader";

    loader.innerHTML = `
      <div class="dp-loader-stars"></div>

      <div class="dp-loader-content">

        <div class="dp-loader-logo">
          <div class="dp-loader-paw">🐾</div>

          <div class="dp-loader-title">
            <span class="dp-title-digital">
              DIGITAL
            </span>

            <span class="dp-title-pet">
              PET
            </span>
          </div>

          <div class="dp-loader-marketplace">
            MARKETPLACE
          </div>

          <div class="dp-loader-tagline">
            Collect • Battle • Breed • Trade
          </div>
        </div>


        <div class="dp-loader-creature">

          <div class="dp-loader-ring ring-one"></div>
          <div class="dp-loader-ring ring-two"></div>
          <div class="dp-loader-ring ring-three"></div>

          <div class="dp-loader-energy energy-one"></div>
          <div class="dp-loader-energy energy-two"></div>

          <div class="dp-loader-pet">
            🐾
          </div>

        </div>


        <div class="dp-loader-progress">

          <div class="dp-loader-progress-track">
            <div
              id="dpLoaderProgress"
              class="dp-loader-progress-fill"
            ></div>
          </div>

        </div>


        <h2 class="dp-loader-heading">
          Loading DigitalPet...
        </h2>

        <p class="dp-loader-message">
          Please wait a moment...
        </p>

      </div>
    `;


    const style = document.createElement("style");

    style.id = "digitalPetLoaderStyles";

    style.textContent = `

      /* =====================================================
         DIGITAL PET MARKETPLACE
         PROFESSIONAL LOGIN LOADING SCREEN
         ===================================================== */

      #digitalPetLoginLoader {

        position: fixed;

        inset: 0;

        width: 100%;
        height: 100%;

        z-index: 999999;

        display: none;

        align-items: center;
        justify-content: center;

        overflow: hidden;

        background:
          radial-gradient(
            circle at 50% 45%,
            rgba(116, 43, 255, 0.30),
            transparent 32%
          ),
          radial-gradient(
            circle at 15% 15%,
            rgba(0, 111, 255, 0.18),
            transparent 30%
          ),
          radial-gradient(
            circle at 85% 85%,
            rgba(190, 30, 255, 0.14),
            transparent 30%
          ),
          #05051b;

        font-family:
          Arial,
          Helvetica,
          sans-serif;

        opacity: 0;

        transition:
          opacity 0.35s ease;
      }


      #digitalPetLoginLoader.dp-loader-active {

        display: flex;

        opacity: 1;
      }


      .dp-loader-stars {

        position: absolute;

        inset: 0;

        pointer-events: none;

        background-image:
          radial-gradient(
            circle,
            rgba(255,255,255,0.75) 1px,
            transparent 1px
          );

        background-size:
          80px 80px;

        opacity: 0.18;

        animation:
          dpStarsMove 18s linear infinite;
      }


      .dp-loader-content {

        position: relative;

        z-index: 5;

        width: min(88%, 430px);

        text-align: center;
      }


      .dp-loader-logo {

        margin-bottom: 20px;

        animation:
          dpLogoAppear 0.8s ease both;
      }


      .dp-loader-paw {

        font-size: 38px;

        margin-bottom: -8px;

        filter:
          drop-shadow(
            0 0 10px #ffd23f
          )
          drop-shadow(
            0 0 22px #8c38ff
          );

        animation:
          dpPawPulse 1.5s ease-in-out infinite;
      }


      .dp-loader-title {

        display: flex;

        justify-content: center;

        align-items: center;

        gap: 8px;

        font-size: clamp(
          35px,
          10vw,
          58px
        );

        font-weight: 900;

        line-height: 0.95;

        letter-spacing: -2px;

        text-shadow:
          0 0 8px rgba(255,255,255,0.15),
          0 0 20px rgba(130,50,255,0.5);
      }


      .dp-title-digital {

        color: #ffd338;

        text-shadow:
          0 0 8px #ffb300,
          0 0 20px #ff7a00;
      }


      .dp-title-pet {

        color: #a85cff;

        text-shadow:
          0 0 8px #9b35ff,
          0 0 25px #6c32ff;
      }


      .dp-loader-marketplace {

        display: inline-block;

        margin-top: 7px;

        padding:
          5px 18px;

        border:
          1px solid rgba(
            164,
            90,
            255,
            0.75
          );

        border-radius: 8px;

        color: #eee8ff;

        font-size: 15px;

        font-weight: 800;

        letter-spacing: 5px;

        background:
          rgba(
            30,
            12,
            70,
            0.75
          );

        box-shadow:
          0 0 14px
          rgba(
            128,
            54,
            255,
            0.4
          );
      }


      .dp-loader-tagline {

        margin-top: 12px;

        color: #bcb7e8;

        font-size: 14px;

        letter-spacing: 1px;
      }


      .dp-loader-creature {

        position: relative;

        width: 230px;
        height: 230px;

        margin:
          8px auto 20px;

        display: flex;

        align-items: center;

        justify-content: center;
      }


      .dp-loader-pet {

        position: relative;

        z-index: 8;

        width: 105px;
        height: 105px;

        display: flex;

        align-items: center;

        justify-content: center;

        border-radius: 50%;

        font-size: 72px;

        background:
          radial-gradient(
            circle,
            rgba(
              107,
              231,
              255,
              0.24
            ),
            rgba(
              115,
              39,
              255,
              0.12
            ),
            transparent 70%
          );

        filter:
          drop-shadow(
            0 0 10px #00dcff
          )
          drop-shadow(
            0 0 25px #7c35ff
          )
          drop-shadow(
            0 0 45px #7c35ff
          );

        animation:
          dpPetWave 1.25s
          ease-in-out infinite;
      }


      .dp-loader-ring {

        position: absolute;

        border-radius: 50%;

        border:
          2px solid
          rgba(
            92,
            214,
            255,
            0.65
          );

        box-shadow:
          0 0 12px
          rgba(
            54,
            199,
            255,
            0.7
          ),
          inset 0 0 12px
          rgba(
            151,
            54,
            255,
            0.4
          );
      }


      .ring-one {

        width: 135px;
        height: 135px;

        animation:
          dpRingSpin 3s
          linear infinite;
      }


      .ring-two {

        width: 180px;
        height: 180px;

        border-color:
          rgba(
            173,
            61,
            255,
            0.55
          );

        animation:
          dpRingSpinReverse 4.5s
          linear infinite;
      }


      .ring-three {

        width: 220px;
        height: 220px;

        border-color:
          rgba(
            56,
            213,
            255,
            0.25
          );

        animation:
          dpRingSpin 7s
          linear infinite;
      }


      .dp-loader-energy {

        position: absolute;

        width: 210px;
        height: 34px;

        border-radius: 50%;

        border:
          2px solid
          rgba(
            69,
            215,
            255,
            0.55
          );

        filter:
          blur(0.2px);

        box-shadow:
          0 0 14px
          rgba(
            38,
            212,
            255,
            0.7
          );
      }


      .energy-one {

        transform:
          rotate(14deg);

        animation:
          dpEnergyOne 2s
          ease-in-out infinite;
      }


      .energy-two {

        transform:
          rotate(-14deg);

        border-color:
          rgba(
            170,
            49,
            255,
            0.6
          );

        box-shadow:
          0 0 14px
          rgba(
            165,
            47,
            255,
            0.65
          );

        animation:
          dpEnergyTwo 2.2s
          ease-in-out infinite;
      }


      .dp-loader-progress {

        width: 100%;

        margin-top: 8px;
      }


      .dp-loader-progress-track {

        width: 100%;

        height: 12px;

        overflow: hidden;

        border:
          2px solid
          rgba(
            86,
            112,
            255,
            0.8
          );

        border-radius: 20px;

        background:
          rgba(
            25,
            20,
            62,
            0.9
          );

        box-shadow:
          0 0 15px
          rgba(
            102,
            54,
            255,
            0.45
          );
      }


      .dp-loader-progress-fill {

        width: 0%;

        height: 100%;

        border-radius: inherit;

        background:
          linear-gradient(
            90deg,
            #8b20ff,
            #c735ff,
            #30dfff
          );

        box-shadow:
          0 0 10px #a52cff,
          0 0 24px #28dfff;

        transition:
          width 0.25s ease;
      }


      .dp-loader-heading {

        margin:
          20px 0 6px;

        color: #ffffff;

        font-size:
          clamp(
            23px,
            6vw,
            31px
          );

        font-weight: 900;

        text-shadow:
          0 0 8px #a52cff,
          0 0 20px #723cff;
      }


      .dp-loader-message {

        margin: 0;

        color: #bcb8e5;

        font-size: 16px;
      }


      @keyframes dpPetWave {

        0%, 100% {
          transform:
            translateY(0)
            rotate(-4deg);
        }

        25% {
          transform:
            translateY(-13px)
            rotate(5deg);
        }

        50% {
          transform:
            translateY(-5px)
            rotate(-2deg);
        }

        75% {
          transform:
            translateY(-16px)
            rotate(5deg);
        }
      }


      @keyframes dpRingSpin {

        from {
          transform:
            rotate(0deg);
        }

        to {
          transform:
            rotate(360deg);
        }
      }


      @keyframes dpRingSpinReverse {

        from {
          transform:
            rotate(360deg);
        }

        to {
          transform:
            rotate(0deg);
        }
      }


      @keyframes dpEnergyOne {

        0%, 100% {
          transform:
            rotate(14deg)
            scaleX(0.85);
        }

        50% {
          transform:
            rotate(14deg)
            scaleX(1.05);
        }
      }


      @keyframes dpEnergyTwo {

        0%, 100% {
          transform:
            rotate(-14deg)
            scaleX(0.85);
        }

        50% {
          transform:
            rotate(-14deg)
            scaleX(1.05);
        }
      }


      @keyframes dpPawPulse {

        0%, 100% {
          transform: scale(1);
        }

        50% {
          transform: scale(1.12);
        }
      }


      @keyframes dpLogoAppear {

        from {
          opacity: 0;
          transform:
            translateY(-15px);
        }

        to {
          opacity: 1;
          transform:
            translateY(0);
        }
      }


      @keyframes dpStarsMove {

        from {
          transform:
            translateY(0);
        }

        to {
          transform:
            translateY(-80px);
        }
      }


      @media (max-width: 480px) {

        .dp-loader-creature {

          width: 210px;
          height: 210px;
        }

        .dp-loader-title {

          font-size: 39px;
        }

        .dp-loader-marketplace {

          font-size: 12px;

          letter-spacing: 3px;
        }

        .dp-loader-tagline {

          font-size: 12px;
        }

        .dp-loader-pet {

          font-size: 65px;
        }

      }

    `;


    document.head.appendChild(style);
    document.body.appendChild(loader);
  }


  function showDigitalPetLoader() {

    createDigitalPetLoader();

    const loader =
      document.getElementById(
        "digitalPetLoginLoader"
      );

    const progress =
      document.getElementById(
        "dpLoaderProgress"
      );

    if (!loader) {
      return;
    }

    loader.classList.add(
      "dp-loader-active"
    );

    if (progress) {

      progress.style.width =
        "5%";

      setTimeout(function () {
        progress.style.width =
          "25%";
      }, 250);

      setTimeout(function () {
        progress.style.width =
          "45%";
      }, 700);

      setTimeout(function () {
        progress.style.width =
          "65%";
      }, 1200);

      setTimeout(function () {
        progress.style.width =
          "82%";
      }, 1800);

      setTimeout(function () {
        progress.style.width =
          "92%";
      }, 2400);
    }
  }


  function hideDigitalPetLoader() {

    const loader =
      document.getElementById(
        "digitalPetLoginLoader"
      );

    if (!loader) {
      return;
    }

    if (progressTimer) {

      clearTimeout(
        progressTimer
      );

      progressTimer = null;
    }

    const progress =
      document.getElementById(
        "dpLoaderProgress"
      );

    if (progress) {
      progress.style.width =
        "100%";
    }

    setTimeout(function () {

      loader.classList.remove(
        "dp-loader-active"
      );

      setTimeout(function () {

        if (
          !loader.classList.contains(
            "dp-loader-active"
          )
        ) {
          loader.style.display =
            "none";
        }

      }, 350);

    }, 300);
  }


  /* =======================================================
     CONNECT TO EXISTING PI LOGIN
     ======================================================= */

  function installLoginLoader() {

    createDigitalPetLoader();

    const originalLogin =
      window.signInWithPi;

    if (
      typeof originalLogin !==
      "function"
    ) {

      console.warn(
        "DigitalPet: signInWithPi was not found."
      );

      return;
    }


    if (
      originalLogin.__digitalPetWrapped
    ) {
      return;
    }


    async function digitalPetLoginWithLoader() {

      showDigitalPetLoader();

      try {

        await originalLogin();

      } catch (error) {

        hideDigitalPetLoader();

        throw error;
      }


      /*
       * Keep the professional loader visible
       * briefly after successful Pi authentication.
       */

      await new Promise(function (
        resolve
      ) {

        setTimeout(
          resolve,
          900
        );

      });


      hideDigitalPetLoader();

    }


    digitalPetLoginWithLoader
      .__digitalPetWrapped = true;


    window.signInWithPi =
      digitalPetLoginWithLoader;


    console.log(
      "DigitalPet professional login loader installed."
    );
  }


  /*
   * The pets.js file loads before the
   * Pi authentication functions in index.html.
   *
   * Therefore we install the wrapper
   * after the whole page has loaded.
   */

  window.addEventListener(
    "load",
    function () {

      setTimeout(
        installLoginLoader,
        0
      );

    }
  );


  /*
   * Make loader functions available globally
   * without replacing existing project functions.
   */

  window.showDigitalPetLoader =
    showDigitalPetLoader;

  window.hideDigitalPetLoader =
    hideDigitalPetLoader;

})();