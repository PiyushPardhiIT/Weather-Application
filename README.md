# Weather App

A simple, modern weather web app that displays the current weather, temperature, weather icon, and a "Hot", "Cold", or "Mild" state for any city. The background color changes dynamically based on the weather condition (sunny, rainy, cold, thunderstorm, etc.).

---

## Features

- **Search by City:** Enter any city name to get real-time weather.
- **Weather Icon & Description:** See a relevant emoji and text for the current weather.
- **Temperature State:** Shows if it's "Hot", "Cold", or "Mild".
- **Dynamic Background:** The background color changes for sunny, rainy, cold, and thunderstorm conditions.
- **Responsive & Clean UI:** Works well on desktop and mobile.

---

## How It Works

- Uses the [Open-Meteo API](https://open-meteo.com/) for weather data.
- Uses the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to convert city names to coordinates.
- Weather codes are mapped to icons and descriptions in JavaScript.
- Background color is set by adding a CSS class to `<body>` based on the weather code.

---

## Setup & Usage

1. **Clone or Download the Project**
2. **Open `index.html` in your browser**  
   No build step or server is required.

---

## File Structure

```
Weather app/
│
├── index.html      # Main HTML file
├── style.css       # App styling and background themes
└── script.js       # All logic: fetches weather, updates UI, handles search
```

---

## Customization

- **Add More Weather States:**  
  Edit the `getWeatherIconAndText` and `setBackground` functions in `script.js` to add more icons or background themes.
- **Change Default City:**  
  Change the city in `fetchResults("Mumbai");` in `script.js` to your preferred default.

---

## Credits

- [Open-Meteo](https://open-meteo.com/) for free weather and geocoding APIs.
- Weather icons via Unicode emojis.

---

## License

This project is for educational and personal use.  
Feel free to modify and share!
