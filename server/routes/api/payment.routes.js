const express = require("express");
const { Client, Environment } = require("square");
const router = express.Router();

const squareClient = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const { paymentsApi } = squareClient;

router.post("/process-payment", async (req, res) => {
  const { token, price } = req.body;

  try {
    const response = await paymentsApi.createPayment({
      sourceId: token,
      amountMoney: {
        amount: price * 100,
        currency: "USD",
      },
      idempotencyKey: new Date().getTime().toString(),
    });

    res.send(response.result);
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
