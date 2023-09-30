//test
let weatherLocation = 'LA';
let locationLon;
let locationLat;

function getLocation() {
    let locationInput = document.getElementById("locationInput").value;
    locationInput ? weatherLocation = locationInput : weatherLocation = 'LA';
    apiGeoAction();
}

const apiGeoAction = async () => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${weatherLocation}&limit=1&appid=934979b42195471b298821ab34f14fc8`);
    const myJson = await response.json();
    try {

        locationLat = myJson[0].lat;
        console.log(locationLat);
        locationLon = myJson[0].lon;
        console.log(locationLon);
    }
    catch (ex) {
        console.log(`exception: ${ex}`);
        alert('Location not found');
        return;
    }

    apiAction();

}

const apiAction = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationLat}&lon=${locationLon}&appid=934979b42195471b298821ab34f14fc8`);
    const myJson = await response.json();
    //console.log(myJson);
    displayData(myJson.name, Math.round(myJson.main.temp - 273.15));
}

function displayData(givenLocation, temp) {
    document.getElementById('locationOut').textContent = givenLocation;
    document.getElementById('tempOut').textContent = temp + ' degrees Celsius';
}
