process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE:", err);
});

const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.get("/", (req, res) => {
  res.send("Razorpay server running");
});

app.post("/create-order", async (req, res) => {
  console.log("Fake payment order created");

  const fakeOrder = {
    id: "order_" + Math.random().toString(36).substring(2, 15),
    currency: "INR",
    amount: req.body.amount * 100,
  };

  res.json(fakeOrder);
});


app.listen(5000, () => console.log("Server running on port 5000"));
