
//click searchbutton with Enter
let inputField = document.getElementById("locationInput");
inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("searchButton").click();
    }
})

//execute all needed functions after one another
function userAction() {
    getLocation()
        .then((inputLocation) => apiGeoAction(inputLocation))
        .then((choords) => apiAction(choords), (err) => apiAction(err))
        .then((myJson) => displayData(myJson), (err) => { return; })

}

//get Input from User, default to LA
function getLocation() {
    return new Promise((resolve) => {
        let locationInput = document.getElementById("locationInput").value;
        if (locationInput) {
            resolve(locationInput);
        } else {
            resolve('LA');
        }
    });
}

//call api to get latitude and longitude of desired location if location exists
const apiGeoAction = async (inputLocation) => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputLocation}&limit=1&appid=934979b42195471b298821ab34f14fc8`);
        const myJson = await response.json();
        try {

            let locationLat = myJson[0].lat;
            console.log(locationLat);
            let locationLon = myJson[0].lon;
            console.log(locationLon);

            resolve([locationLat, locationLon]);
        }
        catch (ex) {
            console.log(`exception: ${ex}`);
            alert('Location not found');
            reject(null);
        }
    })

}

//call api to get location weather data
const apiAction = async (choords) => {
    return new Promise(async (resolve, reject) => {
        if (choords === null) {
            console.log('no choords');
            reject(null);
        }
        else {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${choords[0]}&lon=${choords[1]}&appid=934979b42195471b298821ab34f14fc8`);
            const myJson = await response.json();
            console.log(myJson);
            resolve(myJson);
        }

    })
}

//display the retrieved data
function displayData(myJson) {

    let givenLocation = myJson.name;
    let temp = Math.round(myJson.main.temp - 273.15);
    let visibility = myJson.visibility / 1000;
    let clouds = myJson.clouds.all;
    let windSpeed = myJson.wind.speed;
    let rain;
    try {
        rain = myJson["rain"]["1h"] + ' mm';
    } catch {
        rain = 'None';
    }
    document.getElementById('locationOut').textContent = givenLocation;
    document.getElementById('tempOut').textContent = temp + ' °C';
    document.getElementById('rainOut').textContent = rain;
    document.getElementById('visibilityOut').textContent = visibility + ' km';
    document.getElementById('cloudsOut').textContent = clouds + ' %';
    document.getElementById('windspeedOut').textContent = windSpeed + ' m/s';

}
