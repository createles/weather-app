const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#search");
const weatherIconElement = document.querySelector("#weather-icon-element");
const locationName = document.querySelector(".location-name");
const weatherConditionSimple = document.querySelector(".weather-condition-simple");
const tempNumber = document.querySelector(".temp-number");
let selectedLocation = null;

const visualCrossingIconMap = {
  'snow': 'ac_unit',
  'snow-showers-day': 'cloudy_snowing',
  'snow-showers-night': 'cloudy_snowing',
  'thunder-rain': 'thunderstorm',
  'thunder-showers-day': 'thunderstorm',
  'thunder-showers-night': 'thunderstorm',
  'rain': 'rainy',
  'showers-day': 'rainy',
  'showers-night': 'rainy',
  'fog': 'foggy',
  'wind': 'air',
  'cloudy': 'cloudy',
  'partly-cloudy-day': 'partly_cloudy_day',
  'partly-cloudy-night': 'partly_cloudy_night',
  'clear-day': 'sunny',
  'clear-night': 'dark_mode',
  'default': 'thermostat'
};

async function searchLocation(place) {
  try {
    const encodedUserLocation = encodeURIComponent(place);
    const locationQuery = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedUserLocation}?unitGroup=metric&&include=hours,current&key=7LWNL9SWFWLZP9ARRA5CXXUN7&contentType=json`
    );
    if (!locationQuery.ok) {
      throw new Error("Error fetching data from the server.");
    }
    const locationQueryParsed = await locationQuery.json();

    console.log(locationQueryParsed);
    selectedLocation = locationQueryParsed;
    return selectedLocation;
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener("click", async () => {
    const locationData = await searchLocation(searchBar.value);
    const iconName = locationData.currentConditions.icon;
    const googleIconName = visualCrossingIconMap[iconName] || visualCrossingIconMap["default"];
    weatherIconElement.textContent = googleIconName;
    locationName.textContent = `in ${locationData.resolvedAddress}`;
    weatherConditionSimple.textContent = `${locationData.currentConditions.conditions}`;
    tempNumber.textContent = `with a temperature of ${locationData.currentConditions.temp}`;
})

