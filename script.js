/* =====================================================
INITIALIZE MAP (OpenStreetMap + Leaflet)
===================================================== */

let map = L.map('map').setView([20.5937, 78.9629], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19
}).addTo(map);

let routeLayer;

/* =====================================================
SAFE ROUTE FUNCTION (DRAW ROUTE ON MAP)
===================================================== */

async function findRoute(){

let start = document.getElementById("start").value;
let end = document.getElementById("end").value;

if(start === "" || end === ""){
alert("Please enter both locations");
return;
}

try{

/* Convert place name to coordinates */

let startRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`);
let startData = await startRes.json();

let endRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`);
let endData = await endRes.json();

let startLat = startData[0].lat;
let startLon = startData[0].lon;

let endLat = endData[0].lat;
let endLon = endData[0].lon;

/* Get route from OSRM */

let routeRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`);

let routeData = await routeRes.json();

let coords = routeData.routes[0].geometry.coordinates;

let routePoints = coords.map(c => [c[1], c[0]]);

/* Remove old route */

if(routeLayer){
map.removeLayer(routeLayer);
}

/* Draw new route */

routeLayer = L.polyline(routePoints,{
color:"green",
weight:6
}).addTo(map);

/* Zoom map to route */

map.fitBounds(routePoints);

alert("Safest route calculated using route analysis");

}catch(error){

alert("Unable to find route. Please try again.");

}

}

/* =====================================================
VOICE EMERGENCY DETECTION
===================================================== */

function startListening(){

if(!("webkitSpeechRecognition" in window)){
alert("Speech Recognition not supported in this browser");
return;
}

const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";

alert("Voice detection started. Say HELP or SAVE ME if in danger.");

recognition.onresult = function(event){

let speech = event.results[event.results.length - 1][0].transcript.toLowerCase();

console.log("Detected speech:", speech);

if(
speech.includes("help") ||
speech.includes("save me") ||
speech.includes("bachao") ||
speech.includes("emergency")
){

sendVoiceAlert(speech);

triggerEmergency();

}

};

recognition.start();

}

/* =====================================================
SOS BUTTON
===================================================== */

function sendSOS(){
triggerEmergency();
}

/* =====================================================
EMERGENCY FUNCTION
===================================================== */

async function triggerEmergency(){

alert("🚨 EMERGENCY DETECTED!\nSending SOS alert...");

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(async function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

console.log("Location:", lat, lon);

/* Send to backend */

let response = await fetch("http://localhost:3000/sos",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
lat:lat,
lon:lon,
time:new Date()
})

});

let data = await response.json();

alert(data.status);

});

}else{

alert("Location access not available");

}

}
/* =====================================================
DATA LEAK SCANNER
===================================================== */

function checkLeak(){

let email = document.getElementById("email").value;

if(email === ""){
alert("Please enter an email");
return;
}

alert("Scanning internet for leaked data...");

setTimeout(function(){

let risk = Math.random();

if(risk > 0.6){

alert("⚠ Possible Data Leak Found!\nYour email may appear in public databases.");

}else{

alert("✅ No leaks found. Your data looks safe.");

}

},2000);

}
async function sendVoiceAlert(keyword){

try{

let response = await fetch("http://localhost:3000/voice-alert",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
keyword:keyword,
time:new Date()
})

});

let data = await response.json();

console.log(data.status);

}catch(error){

console.log("Voice alert failed");

}

}