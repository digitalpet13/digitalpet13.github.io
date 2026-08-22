import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;
const PI_API_KEY = process.env.PI_API_KEY;

const PI_API_BASE = "https://api.minepi.com/v2";

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "Digital Pet Pi Backend"
  });
});


/*
========================================
PI SERVER-SIDE APPROVAL
========================================
*/

app.post("/api/payments/approve", async (req, res) => {

  try {

    const { paymentId } = req.body;

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

    const response = await fetch(
      `${PI_API_BASE}/payments/${paymentId}/approve`,
      {
        method: "POST",
        headers: {
          "Authorization": `Key ${PI_API_KEY}`
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Pi approval error:", data);

      return res.status(response.status).json(data);
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
      error: "Server approval failed"
    });

  }

});


/*
========================================
PI SERVER-SIDE COMPLETION
========================================
*/

app.post("/api/payments/complete", async (req, res) => {

  try {

    const {
      paymentId,
      txid
    } = req.body;

    if (!paymentId || !txid) {

      return res.status(400).json({
        error: "paymentId and txid are required"
      });

    }

    if (!PI_API_KEY) {

      return res.status(500).json({
        error: "PI_API_KEY is not configured"
      });

    }

    const response = await fetch(
      `${PI_API_BASE}/payments/${paymentId}/complete`,
      {
        method: "POST",

        headers: {
          "Authorization": `Key ${PI_API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          txid
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {

      console.error(
        "Pi completion error:",
        data
      );

      return res.status(response.status).json(data);

    }

    console.log(
      "Payment completed:",
      paymentId,
      txid
    );

    /*
      IMPORTANT:
      Dito lang natin dapat ituring na
      successful ang purchase pagkatapos
      ng successful Pi completion.
    */

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
      error: "Server completion failed"
    });

  }

});


app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `Digital Pet backend running on port ${PORT}`
    );

  }
);