const tempElem = document.querySelector(".temp p");
const cityElem = document.querySelector(".time_location p:first-child");
const timeElem = document.querySelector(".time_location p:last-child");
const conditionElem = document.getElementById("conditionText");
const weatherIconElem = document.getElementById("weatherIcon");
const tempStateElem = document.getElementById("tempState");
const form = document.querySelector("form");
const searchInput = document.querySelector(".search_area");

// Weather code to icon and description
function getWeatherIconAndText(code) {
    const map = {
        0:   ["☀️", "Clear sky"],
        1:   ["🌤️", "Mainly clear"],
        2:   ["⛅", "Partly cloudy"],
        3:   ["☁️", "Overcast"],
        45:  ["🌫️", "Fog"],
        48:  ["🌫️", "Depositing rime fog"],
        51:  ["🌦️", "Light drizzle"],
        53:  ["🌦️", "Moderate drizzle"],
        55:  ["🌦️", "Dense drizzle"],
        56:  ["🌧️", "Light freezing drizzle"],
        57:  ["🌧️", "Dense freezing drizzle"],
        61:  ["🌦️", "Slight rain"],
        63:  ["🌧️", "Moderate rain"],
        65:  ["🌧️", "Heavy rain"],
        66:  ["🌧️", "Light freezing rain"],
        67:  ["🌧️", "Heavy freezing rain"],
        71:  ["🌨️", "Slight snow fall"],
        73:  ["🌨️", "Moderate snow fall"],
        75:  ["🌨️", "Heavy snow fall"],
        77:  ["🌨️", "Snow grains"],
        80:  ["🌦️", "Slight rain showers"],
        81:  ["🌧️", "Moderate rain showers"],
        82:  ["🌧️", "Violent rain showers"],
        85:  ["🌨️", "Slight snow showers"],
        86:  ["🌨️", "Heavy snow showers"],
        95:  ["⛈️", "Thunderstorm"],
        96:  ["⛈️", "Thunderstorm with slight hail"],
        99:  ["⛈️", "Thunderstorm with heavy hail"]
    };
    return map[code] || ["❓", "Unknown"];
}

// Temperature state
function getTempState(temp) {
    if (temp >= 30) return "Hot";
    if (temp <= 15) return "Cold";
    return "Mild";
}

// Set background color based on weather
function setBackground(code, temp) {
    const body = document.body;
    body.classList.remove("sunny-bg", "rainy-bg", "cold-bg", "thunder-bg", "default-bg");

    // Thunderstorm
    if ([95, 96, 99].includes(code)) {
        body.classList.add("thunder-bg");
    }
    // Sunny/Clear
    else if (code === 0 || code === 1) {
        body.classList.add("sunny-bg");
    }
    // Rainy/Drizzle
    else if (
        [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)
    ) {
        body.classList.add("rainy-bg");
    }
    // Snow/Cold
    else if (
        [71, 73, 75, 77, 85, 86].includes(code) || temp <= 10
    ) {
        body.classList.add("cold-bg");
    }
    // Cloudy/Fog/Other
    else {
        body.classList.add("default-bg");
    }
}

// Helper to get coordinates from city name
async function getCoordinates(city) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const res = await fetch(geoUrl);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    if (!data.results || data.results.length === 0) throw new Error("City not found");
    return data.results[0];
}

// Fetch weather using Open-Meteo
const fetchResults = async (city) => {
    try {
        const location = await getCoordinates(city);
        const lat = location.latitude;
        const lon = location.longitude;
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
        const res = await fetch(weatherUrl);
        if (!res.ok) throw new Error("Weather not found");
        const data = await res.json();

        // Update UI
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        const [icon, desc] = getWeatherIconAndText(code);

        tempElem.textContent = temp;
        cityElem.textContent = location.name;
        timeElem.textContent = data.current_weather.time.replace("T", " ");
        weatherIconElem.textContent = icon;
        conditionElem.textContent = desc;
        tempStateElem.textContent = getTempState(temp);

        setBackground(code, temp);

    } catch (err) {
        alert("City not found or weather unavailable!");
        document.body.classList.remove("sunny-bg", "rainy-bg", "cold-bg", "thunder-bg");
        document.body.classList.add("default-bg");
        console.error("Error fetching weather:", err.message);
    }
}

// Initial load
fetchResults("Mumbai");

// Listen for form submit
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
        fetchResults(city);
        searchInput.value = "";
    }
});