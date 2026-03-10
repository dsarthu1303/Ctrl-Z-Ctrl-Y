/* ---------------- SAFE ROUTE FUNCTION ---------------- */

function findRoute(){

let start = document.getElementById("start").value;
let end = document.getElementById("end").value;

if(start === "" || end === ""){
alert("Please enter both locations");
return;
}

alert("Finding safest route from " + start + " to " + end);

/* For hackathon demo we simulate AI route check */

setTimeout(function(){

alert("AI Analysis Complete ✅\nThis route has good lighting and low crime risk.");

},2000);

}

/* ---------------- VOICE EMERGENCY DETECTION ---------------- */

function startListening(){

if(!('webkitSpeechRecognition' in window)){
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

/* Emergency keywords */

if(
speech.includes("help") ||
speech.includes("save me") ||
speech.includes("bachao") ||
speech.includes("emergency")
){

triggerEmergency();

}

};

recognition.start();

}

/* ---------------- SOS EMERGENCY BUTTON ---------------- */

function sendSOS(){

triggerEmergency();

}

/* ---------------- EMERGENCY FUNCTION ---------------- */

function triggerEmergency(){

alert("🚨 EMERGENCY DETECTED!\nSending alert and sharing location.");

/* Get user location */

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

console.log("Location:", lat, lon);

alert("Location shared:\nLatitude: " + lat + "\nLongitude: " + lon);

/* In real app this would send data to police or family */

});

}else{

alert("Location access not available");

}

}

/* ---------------- DATA LEAK SCANNER ---------------- */

function checkLeak(){

let email = document.getElementById("email").value;

if(email === ""){
alert("Please enter an email");
return;
}

alert("Scanning internet for leaked data...");

/* Simulated scan */

setTimeout(function(){

let risk = Math.random();

if(risk > 0.6){

alert("⚠️ Possible Data Leak Found!\nYour email may appear in public databases.");

}else{

alert("✅ No leaks found. Your data looks safe.");

}

},2000);

}
