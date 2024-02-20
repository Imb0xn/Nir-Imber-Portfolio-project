// window.addEventListener('load', () => {
//     let temperatureDescription = document.querySelector('.temperature-description');
//     let temperatureDegree = document.querySelector('.temperature-degree');
//     let locationTimeZone = document.querySelector('.location-timezone');

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             const long = position.coords.longitude;
//             const lat = position.coords.latitude;

//             const proxy = 'https://cors-anywhere.herokuapp.com/';
//             const api = `${proxy}https://api.pirateweather.net/forecast/bhuJpNUzjNCCojqr4hIU6E0f80fGCXlD/${lat},${long}`;

//             fetch(api)
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data);
//                     const { temperature, summary, icon } = data.currently;

//                     // Convert temperature from Fahrenheit to Celsius
//                     const temperatureInCelsius = (temperature - 32) * (5/9);
//                     temperatureDegree.textContent = temperatureInCelsius.toFixed(2) + "°C"; // Display temperature in Celsius with 2 decimal points
//                     temperatureDescription.textContent = summary;
//                     locationTimeZone.textContent = data.timezone;

//                     // Set Icon
//                     setIcons(icon, document.querySelector(".icon"));
//                 });
//         });
//     }

//     function setIcons(icon, iconID) {
//         const skycons = new Skycons({ "color": "white" });
//         const currentIcon = icon.replace(/-/g, "_").toUpperCase();
//         skycons.play();
//         return skycons.set(iconID, Skycons[currentIcon]);
//     }
// });


window.addEventListener('load', () => {


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const long = position.coords.longitude;
            const lat = position.coords.latitude;

            getLocationName(lat, long); // Get the location name from coordinates
            getWeather(lat, long); // Get the weather using the same coordinates
        });
    }
});

function getLocationName(lat, long) {
    const apiKey = '4db79055bd684e19a36e7289d045b832';
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const components = data.results[0].components;
                let locationString = '';

                // Check and append the street and city to the location string
                if (components.road) {
                    locationString += components.road;
                }
                if (components.city) {
                    // Add a comma and space if there is already a road part in the string
                    if (locationString.length > 0) locationString += ', ';
                    locationString += components.city;
                } else if (components.town) { // Some locations might use 'town' instead of 'city'
                    if (locationString.length > 0) locationString += ', ';
                    locationString += components.town;
                }

                document.querySelector('.location-timezone').textContent = locationString;
            }
        })
        .catch(error => console.log('Error:', error));
}


function getWeather(lat, long) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.pirateweather.net/forecast/bhuJpNUzjNCCojqr4hIU6E0f80fGCXlD/${lat},${long}`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const { temperature, summary, icon } = data.currently;

            // Here I Convert Fahrenheit to Celsius
            const temperatureInCelsius = (temperature - 32) * (5 / 9);
            document.querySelector('.temperature-degree').textContent = temperatureInCelsius.toFixed(1) + ' °C';
            document.querySelector('.temperature-description').textContent = summary;
            setIcons(icon, document.querySelector(".icon"));
        })
        .catch(error => console.log('Error:', error));
}


function setIcons(icon, iconID) {
    const skycons = new Skycons({ "color": "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}