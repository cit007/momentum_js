const API_KEY = "aaeb45a6a63cb3a0beede5b0e15412a9"
const COORDS = "coords";

const temp = document.querySelector(".js-temp");
const loc = document.querySelector(".js-loc");

function getWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log("getWeather :", JSON.stringify(myJson));
        temp.innerHTML = myJson.main.temp_max
        loc.innerHTML = myJson.name
    })
}

function saveCoords(obj) {
    localStorage.setItem(COORDS, JSON.stringify(obj));
}

function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}

function handleGeoError(position){
    console.log("Can not access geo location");
}

function askForCoords() {
    console.log("request Geo");
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();