const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

/* Middleware */

app.use(cors());
app.use(bodyParser.json());

/* =====================================================
SAFE ROUTE API
===================================================== */

app.post("/safe-route", (req, res) => {

const { start, end } = req.body;

console.log("🗺 Route request:", start, end);

res.json({
status: "success",
message: "AI analyzed safest route",
risk: "LOW"
});

});

/* =====================================================
DATA LEAK CHECK API
===================================================== */

app.post("/check-leak", (req, res) => {

const { email } = req.body;

console.log("🔎 Checking leak for:", email);

let risk = Math.random();

if (risk > 0.6) {

res.json({
leak: true,
message: "Possible data leak detected"
});

} else {

res.json({
leak: false,
message: "No leaks found"
});

}

});

/* =====================================================
SOS EMERGENCY API
===================================================== */

app.post("/sos", (req, res) => {

const { lat, lon, time } = req.body;

console.log("🚨 SOS ALERT RECEIVED");
console.log("Latitude:", lat);
console.log("Longitude:", lon);
console.log("Time:", time);

/* Later this could be saved in database */

res.json({
status: "SOS alert received by server"
});

});

/* =====================================================
VOICE EMERGENCY API
===================================================== */

app.post("/voice-alert", (req, res) => {

const { keyword, time } = req.body;

console.log("🎤 VOICE EMERGENCY DETECTED");
console.log("Keyword:", keyword);
console.log("Time:", time);

res.json({
status: "Voice emergency alert received"
});

});

/* =====================================================
ROOT ROUTE
===================================================== */

app.get("/", (req, res) => {

res.send("🛡 Suraksha AI Backend Running");

});

/* =====================================================
START SERVER
===================================================== */

app.listen(3000, () => {

console.log("🚀 Server running on port 3000");

});
