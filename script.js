const tips={
 earthquake:{b:["Secure shelves and heavy objects","Keep an emergency kit ready","Know safe exits and meeting points"],d:["Drop, Cover and Hold On","Stay away from windows and heavy objects","Do not use elevators"],a:["Check yourself and others for injuries","Turn off gas/electricity if unsafe","Expect aftershocks and follow official instructions"]},
 flood:{b:["Move valuables and documents to higher places","Keep emergency food and drinking water","Know the nearest safe elevated area"],d:["Move to higher ground","Never walk or drive through flood water","Follow evacuation instructions"],a:["Drink safe/boiled water","Avoid contact with floodwater","Return home only when authorities say it is safe"]},
 cyclone:{b:["Stock food, water and medicines","Secure doors, windows and loose objects","Charge phones and power banks"],d:["Stay indoors away from windows","Keep listening to official warnings","Do not go outside during the eye of the storm"],a:["Avoid fallen wires and damaged structures","Check for injuries and help safely","Use clean water and report major damage"]},
 fire:{b:["Keep exits clear","Install/check smoke alarms","Store flammable materials safely"],d:["Raise the alarm and evacuate","Stay low if there is smoke","Never use elevators"],a:["Do not re-enter until cleared","Get medical help for burns or smoke exposure","Report hazards to emergency services"]},
 landslide:{b:["Learn local landslide warning signs","Avoid building near unstable slopes","Prepare an evacuation route"],d:["Move away from the slide path","Go to a stable higher area if possible","Avoid valleys and low-lying channels"],a:["Stay away from the affected slope","Watch for additional slides","Follow local authority instructions"]},
 heatwave:{b:["Drink water regularly","Avoid strenuous activity at peak heat","Keep rooms cool and ventilated"],d:["Move to a cool place","Drink water and oral rehydration fluids","Check on children and older people"],a:["Continue hydration","Seek medical help for confusion or fainting","Rest and avoid direct heat"]}}
;

const select=document.getElementById("disasterSelect");
function renderTips(){
  const t=tips[select.value];
  document.getElementById("beforeTips").innerHTML=t.b.map(x=>`<li>${x}</li>`).join("");
  document.getElementById("duringTips").innerHTML=t.d.map(x=>`<li>${x}</li>`).join("");
  document.getElementById("afterTips").innerHTML=t.a.map(x=>`<li>${x}</li>`).join("");
}
select.addEventListener("change",renderTips); renderTips();

function updateClock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString()}
setInterval(updateClock,1000); updateClock(); document.getElementById("year").textContent=new Date().getFullYear();

const modal=document.getElementById("modal");
function openModal(title,html){document.getElementById("modalTitle").textContent=title;document.getElementById("modalBody").innerHTML=html;modal.classList.add("show");modal.setAttribute("aria-hidden","false")}
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});

function showEmergency(){
 openModal("🚨 Emergency Help","<p><b>India emergency number: 112</b></p><p>For immediate danger, call the appropriate emergency service. Stay calm, give your location clearly, and follow instructions.</p><p><a class='btn primary' href='tel:112'>Call 112</a></p>");
}
function showChecklist(){
 openModal("🧰 Emergency Kit Checklist","<ul><li>Drinking water</li><li>Dry food</li><li>First-aid kit</li><li>Essential medicines</li><li>Flashlight and batteries</li><li>Power bank</li><li>Important documents</li><li>Whistle and basic tools</li></ul>");
}

let map=L.map("map").setView([22.5,88.3],5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
let marker=null;
function getLocation(){
 if(!navigator.geolocation){document.getElementById("mapMessage").textContent="Geolocation is not supported by this browser.";return}
 document.getElementById("locationStatus").textContent="Finding…";
 document.getElementById("mapMessage").textContent="Requesting your location…";
 navigator.geolocation.getCurrentPosition(pos=>{
   const {latitude,longitude}=pos.coords;
   map.setView([latitude,longitude],14);
   if(marker)marker.remove();
   marker=L.marker([latitude,longitude]).addTo(map).bindPopup("📍 Your current location").openPopup();
   document.getElementById("locationStatus").textContent="Available";
   document.getElementById("mapMessage").textContent=`Location: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
 },()=>{
   document.getElementById("locationStatus").textContent="Denied";
   document.getElementById("mapMessage").textContent="Location permission was denied or unavailable.";
 });
}

document.getElementById("themeBtn").addEventListener("click",()=>{
 document.body.classList.toggle("dark");
 document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀️":"🌙";
});
