// ============================================================
// DIGITAL PET MARKETPLACE
// server.js
// Pi Testnet Backend
//
// IMPORTANT:
// - Separate ito sa AMT MINING.
// - Huwag gamitin sa AMT Mining repository.
// - Testnet implementation.
// ============================================================

import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;
const PI_API_KEY = process.env.PI_API_KEY;

const PI_API_BASE = "https://api.minepi.com/v2";


// ============================================================
// BASIC HEALTH CHECK
// ============================================================

app.get("/health", (req, res) => {

  res.json({
    ok: true,
    service: "Digital Pet Marketplace",
    network: "Pi Testnet",
    features: [
      "Pi Payments",
      "Breeding",
      "Incubator",
      "Pet Trade"
    ]
  });

});


// ============================================================
// TEMPORARY TESTNET STORAGE
//
// IMPORTANT:
// This is temporary for testing.
// Later we should move this to a real database
// so records survive Render restarts.
// ============================================================

const pets = new Map();
const breedingJobs = new Map();
const incubatorJobs = new Map();
const trades = new Map();


// ============================================================
// HELPERS
// ============================================================

function makeId(prefix) {

  return `${prefix}_${crypto.randomUUID()}`;

}


function now() {

  return new Date();

}


function addHours(date, hours) {

  return new Date(
    date.getTime() + hours * 60 * 60 * 1000
  );

}


function cleanUsername(value) {

  return String(value || "")
    .trim()
    .slice(0, 100);

}


function cleanPetId(value) {

  return String(value || "")
    .trim()
    .slice(0, 120);

}


// ============================================================
// REGISTER / CREATE PET
//
// Used by marketplace frontend when a Pioneer owns a pet.
// ============================================================

app.post("/api/pets/register", (req, res) => {

  try {

    const {
      petId,
      petName,
      rarity,
      category,
      generation,
      owner
    } = req.body;

    if (
      !petId ||
      !petName ||
      !owner
    ) {

      return res.status(400).json({
        success: false,
        error: "petId, petName and owner are required"
      });

    }

    const id = cleanPetId(petId);

    if (pets.has(id)) {

      return res.json({
        success: true,
        pet: pets.get(id),
        existing: true
      });

    }

    const pet = {

      id,

      name: String(petName).slice(0, 100),

      rarity: String(rarity || "Common"),

      category: String(category || "Unknown"),

      generation: String(generation || "Gen 1"),

      owner: cleanUsername(owner),

      locked: false,

      status: "AVAILABLE",

      createdAt: now().toISOString()

    };

    pets.set(id, pet);

    console.log(
      "Pet registered:",
      pet
    );

    res.json({
      success: true,
      pet
    });

  } catch (error) {

    console.error(
      "Pet register error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to register pet"
    });

  }

});


// ============================================================
// GET MY PETS
// ============================================================

app.post("/api/pets/my", (req, res) => {

  try {

    const owner =
      cleanUsername(req.body.owner);

    if (!owner) {

      return res.status(400).json({
        success: false,
        error: "owner is required"
      });

    }

    const result =
      [...pets.values()]
        .filter(
          pet => pet.owner === owner
        );

    res.json({
      success: true,
      pets: result
    });

  } catch (error) {

    console.error(
      "My pets error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to load pets"
    });

  }

});


// ============================================================
// BREEDING
//
// Two pets are locked while breeding.
// A new egg is created when the breeding job completes.
// ============================================================

app.post("/api/breeding/start", (req, res) => {

  try {

    const {
      parentA,
      parentB,
      owner,
      incubationHours
    } = req.body;

    const username =
      cleanUsername(owner);

    const petA =
      pets.get(cleanPetId(parentA));

    const petB =
      pets.get(cleanPetId(parentB));

    if (!username) {

      return res.status(400).json({
        success: false,
        error: "owner is required"
      });

    }

    if (!petA || !petB) {

      return res.status(404).json({
        success: false,
        error: "Both parent pets must exist"
      });

    }

    if (
      petA.owner !== username ||
      petB.owner !== username
    ) {

      return res.status(403).json({
        success: false,
        error: "You do not own both parent pets"
      });

    }

    if (petA.id === petB.id) {

      return res.status(400).json({
        success: false,
        error: "Two different pets are required"
      });

    }

    if (petA.locked || petB.locked) {

      return res.status(409).json({
        success: false,
        error: "One of the pets is already locked"
      });

    }

    const hours =
      Math.min(
        72,
        Math.max(
          1,
          Number(incubationHours || 24)
        )
      );

    const jobId =
      makeId("breed");

    const started =
      now();

    const ends =
      addHours(
        started,
        hours
      );

    petA.locked = true;
    petA.status = "BREEDING";

    petB.locked = true;
    petB.status = "BREEDING";

    const job = {

      id: jobId,

      owner: username,

      parentA: petA.id,

      parentB: petB.id,

      status: "BREEDING",

      startedAt:
        started.toISOString(),

      endsAt:
        ends.toISOString(),

      incubationHours: hours,

      eggId: null,

      createdAt:
        started.toISOString()

    };

    breedingJobs.set(
      jobId,
      job
    );

    console.log(
      "Breeding started:",
      job
    );

    res.json({
      success: true,
      breeding: job
    });

  } catch (error) {

    console.error(
      "Breeding start error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to start breeding"
    });

  }

});


// ============================================================
// BREEDING STATUS
// ============================================================

app.post("/api/breeding/status", (req, res) => {

  try {

    const job =
      breedingJobs.get(
        String(req.body.jobId || "")
      );

    if (!job) {

      return res.status(404).json({
        success: false,
        error: "Breeding job not found"
      });

    }

    const finished =
      now().getTime() >=
      new Date(job.endsAt).getTime();

    if (
      finished &&
      job.status === "BREEDING"
    ) {

      const petA =
        pets.get(job.parentA);

      const petB =
        pets.get(job.parentB);

      if (petA) {

        petA.locked = false;
        petA.status = "AVAILABLE";

      }

      if (petB) {

        petB.locked = false;
        petB.status = "AVAILABLE";

      }

      const eggId =
        makeId("egg");

      const egg = {

        id: eggId,

        name: "Mystery Digital Pet Egg",

        type: "EGG",

        owner: job.owner,

        parentA: job.parentA,

        parentB: job.parentB,

        generation: "Next Gen",

        status: "INCUBATOR_READY",

        locked: false,

        createdAt:
          now().toISOString()

      };

      pets.set(
        eggId,
        egg
      );

      job.eggId =
        eggId;

      job.status =
        "COMPLETED";

      job.completedAt =
        now().toISOString();

    }

    res.json({
      success: true,
      breeding: job
    });

  } catch (error) {

    console.error(
      "Breeding status error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to load breeding status"
    });

  }

});


// ============================================================
// INCUBATOR START
// ============================================================

app.post("/api/incubator/start", (req, res) => {

  try {

    const {
      eggId,
      owner,
      hours
    } = req.body;

    const username =
      cleanUsername(owner);

    const egg =
      pets.get(
        cleanPetId(eggId)
      );

    if (!egg) {

      return res.status(404).json({
        success: false,
        error: "Egg not found"
      });

    }

    if (egg.owner !== username) {

      return res.status(403).json({
        success: false,
        error: "You do not own this egg"
      });

    }

    if (
      egg.status !==
      "INCUBATOR_READY"
    ) {

      return res.status(409).json({
        success: false,
        error: "Egg is not ready for incubation"
      });

    }

    const incubationHours =
      Math.min(
        72,
        Math.max(
          1,
          Number(hours || 24)
        )
      );

    const id =
      makeId("incubator");

    const started =
      now();

    const ends =
      addHours(
        started,
        incubationHours
      );

    egg.locked = true;
    egg.status = "INCUBATING";

    const job = {

      id,

      eggId: egg.id,

      owner: username,

      status: "INCUBATING",

      startedAt:
        started.toISOString(),

      endsAt:
        ends.toISOString(),

      hours: incubationHours,

      petId: null

    };

    incubatorJobs.set(
      id,
      job
    );

    res.json({
      success: true,
      incubator: job
    });

  } catch (error) {

    console.error(
      "Incubator start error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to start incubator"
    });

  }

});


// ============================================================
// INCUBATOR STATUS
// ============================================================

app.post("/api/incubator/status", (req, res) => {

  try {

    const job =
      incubatorJobs.get(
        String(req.body.jobId || "")
      );

    if (!job) {

      return res.status(404).json({
        success: false,
        error: "Incubator job not found"
      });

    }

    const finished =
      now().getTime() >=
      new Date(job.endsAt).getTime();

    if (
      finished &&
      job.status === "INCUBATING"
    ) {

      const egg =
        pets.get(job.eggId);

      if (egg) {

        egg.locked = false;

        egg.status =
          "HATCHED";

        const petId =
          makeId("pet");

        const hatchedPet = {

          id: petId,

          name: "Newborn Digital Pet",

          type: "PET",

          owner: job.owner,

          rarity: "Common",

          category: "Mystery",

          generation: "Next Gen",

          parentEgg: egg.id,

          locked: false,

          status: "AVAILABLE",

          createdAt:
            now().toISOString()

        };

        pets.set(
          petId,
          hatchedPet
        );

        job.petId =
          petId;

      }

      job.status =
        "COMPLETED";

      job.completedAt =
        now().toISOString();

    }

    res.json({
      success: true,
      incubator: job,
      pet: job.petId
        ? pets.get(job.petId)
        : null
    });

  } catch (error) {

    console.error(
      "Incubator status error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to load incubator status"
    });

  }

});


// ============================================================
// PET TRADE
//
// This is marketplace trade-state protection.
// It is NOT custodial Pi escrow.
// ============================================================

app.post("/api/trade/create", (req, res) => {

  try {

    const {
      petId,
      seller,
      price
    } = req.body;

    const username =
      cleanUsername(seller);

    const pet =
      pets.get(
        cleanPetId(petId)
      );

    if (!pet) {

      return res.status(404).json({
        success: false,
        error: "Pet not found"
      });

    }

    if (pet.owner !== username) {

      return res.status(403).json({
        success: false,
        error: "You do not own this pet"
      });

    }

    if (pet.locked) {

      return res.status(409).json({
        success: false,
        error: "Pet is currently locked"
      });

    }

    if (
      !Number.isFinite(Number(price)) ||
      Number(price) <= 0
    ) {

      return res.status(400).json({
        success: false,
        error: "Valid price is required"
      });

    }

    const tradeId =
      makeId("trade");

    pet.locked = true;
    pet.status = "LISTED";

    const trade = {

      id: tradeId,

      petId: pet.id,

      seller: username,

      buyer: null,

      price:
        Number(price),

      currency: "PI",

      network: "TESTNET",

      status: "LISTED",

      paymentId: null,

      txid: null,

      createdAt:
        now().toISOString(),

      updatedAt:
        now().toISOString()

    };

    trades.set(
      tradeId,
      trade
    );

    res.json({
      success: true,
      trade
    });

  } catch (error) {

    console.error(
      "Trade create error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to create trade"
    });

  }

});


// ============================================================
// BUY / RESERVE PET
// ============================================================

app.post("/api/trade/buy", (req, res) => {

  try {

    const {
      tradeId,
      buyer
    } = req.body;

    const trade =
      trades.get(
        String(tradeId || "")
      );

    const username =
      cleanUsername(buyer);

    if (!trade) {

      return res.status(404).json({
        success: false,
        error: "Trade not found"
      });

    }

    if (
      trade.status !==
      "LISTED"
    ) {

      return res.status(409).json({
        success: false,
        error: "Trade is no longer available"
      });

    }

    if (
      trade.seller === username
    ) {

      return res.status(400).json({
        success: false,
        error: "Seller cannot buy own pet"
      });

    }

    trade.buyer =
      username;

    trade.status =
      "PAYMENT_PENDING";

    trade.updatedAt =
      now().toISOString();

    res.json({
      success: true,
      trade
    });

  } catch (error) {

    console.error(
      "Trade buy error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to reserve trade"
    });

  }

});


// ============================================================
// LINK PI PAYMENT TO TRADE
// ============================================================

app.post("/api/trade/payment", (req, res) => {

  try {

    const {
      tradeId,
      paymentId
    } = req.body;

    const trade =
      trades.get(
        String(tradeId || "")
      );

    if (!trade) {

      return res.status(404).json({
        success: false,
        error: "Trade not found"
      });

    }

    if (
      trade.status !==
      "PAYMENT_PENDING"
    ) {

      return res.status(409).json({
        success: false,
        error: "Trade is not awaiting payment"
      });

    }

    if (!paymentId) {

      return res.status(400).json({
        success: false,
        error: "paymentId is required"
      });

    }

    trade.paymentId =
      paymentId;

    trade.status =
      "PAYMENT_CREATED";

    trade.updatedAt =
      now().toISOString();

    res.json({
      success: true,
      trade
    });

  } catch (error) {

    console.error(
      "Trade payment link error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to link payment"
    });

  }

});


// ============================================================
// COMPLETE TRADE AFTER PI PAYMENT
//
// This endpoint should only be called AFTER the Pi payment
// has successfully completed through /api/payments/complete.
// ============================================================

app.post("/api/trade/complete", (req, res) => {

  try {

    const {
      tradeId,
      paymentId,
      txid
    } = req.body;

    const trade =
      trades.get(
        String(tradeId || "")
      );

    if (!trade) {

      return res.status(404).json({
        success: false,
        error: "Trade not found"
      });

    }

    if (
      trade.status !==
      "PAYMENT_CREATED"
    ) {

      return res.status(409).json({
        success: false,
        error: "Trade is not ready for completion"
      });

    }

    if (
      trade.paymentId !==
      paymentId
    ) {

      return res.status(400).json({
        success: false,
        error: "Payment does not match trade"
      });

    }

    if (!txid) {

      return res.status(400).json({
        success: false,
        error: "txid is required"
      });

    }

    const pet =
      pets.get(
        trade.petId
      );

    if (!pet) {

      return res.status(404).json({
        success: false,
        error: "Pet not found"
      });

    }

    pet.owner =
      trade.buyer;

    pet.locked =
      false;

    pet.status =
      "AVAILABLE";

    trade.txid =
      txid;

    trade.status =
      "COMPLETED";

    trade.completedAt =
      now().toISOString();

    trade.updatedAt =
      now().toISOString();

    res.json({
      success: true,
      trade,
      pet
    });

  } catch (error) {

    console.error(
      "Trade completion error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to complete trade"
    });

  }

});


// ============================================================
// CANCEL TRADE
// ============================================================

app.post("/api/trade/cancel", (req, res) => {

  try {

    const {
      tradeId,
      seller
    } = req.body;

    const trade =
      trades.get(
        String(tradeId || "")
      );

    if (!trade) {

      return res.status(404).json({
        success: false,
        error: "Trade not found"
      });

    }

    if (
      trade.seller !==
      cleanUsername(seller)
    ) {

      return res.status(403).json({
        success: false,
        error: "Only the seller can cancel this trade"
      });

    }

    if (
      trade.status ===
      "COMPLETED"
    ) {

      return res.status(409).json({
        success: false,
        error: "Completed trade cannot be cancelled"
      });

    }

    const pet =
      pets.get(
        trade.petId
      );

    if (pet) {

      pet.locked =
        false;

      pet.status =
        "AVAILABLE";

    }

    trade.status =
      "CANCELLED";

    trade.updatedAt =
      now().toISOString();

    res.json({
      success: true,
      trade
    });

  } catch (error) {

    console.error(
      "Trade cancel error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Unable to cancel trade"
    });

  }

});


// ============================================================
// PI SERVER-SIDE APPROVAL
// EXISTING FUNCTION — PRESERVED
// ============================================================

app.post("/api/payments/approve", async (req, res) => {

  try {

    const {
      paymentId
    } = req.body;

    if (!paymentId) {

      return res.status(400).json({
        error: "paymentId is required"
      });

    }

    if (!PI_API_KEY) {

      return res.status(500).json({
        error: "PI_API_KEY is not configured"
      });

    }

    const response =
      await fetch(
        `${PI_API_BASE}/payments/${paymentId}/approve`,
        {
          method: "POST",

          headers: {
            "Authorization":
              `Key ${PI_API_KEY}`
          }
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      console.error(
        "Pi approval error:",
        data
      );

      return res
        .status(response.status)
        .json(data);

    }

    console.log(
      "Payment approved:",
      paymentId
    );

    res.json(data);

  } catch (error) {

    console.error(
      "Approval server error:",
      error
    );

    res.status(500).json({
      error:
        "Server approval failed"
    });

  }

});


// ============================================================
// PI SERVER-SIDE COMPLETION
// EXISTING FUNCTION — PRESERVED
// ============================================================

app.post("/api/payments/complete", async (req, res) => {

  try {

    const {
      paymentId,
      txid
    } = req.body;

    if (
      !paymentId ||
      !txid
    ) {

      return res.status(400).json({
        error:
          "paymentId and txid are required"
      });

    }

    if (!PI_API_KEY) {

      return res.status(500).json({
        error:
          "PI_API_KEY is not configured"
      });

    }

    const response =
      await fetch(
        `${PI_API_BASE}/payments/${paymentId}/complete`,
        {
          method: "POST",

          headers: {
            "Authorization":
              `Key ${PI_API_KEY}`,

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            txid
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      console.error(
        "Pi completion error:",
        data
      );

      return res
        .status(response.status)
        .json(data);

    }

    console.log(
      "Payment completed:",
      paymentId,
      txid
    );

    res.json({

      success: true,

      payment: data

    });

  } catch (error) {

    console.error(
      "Completion server error:",
      error
    );

    res.status(500).json({
      error:
        "Server completion failed"
    });

  }

});


// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Digital Pet backend running on port ${PORT}`
    );

  }
);