if (!localStorage.getItem("location")) {
  localStorage.setItem("location", JSON.stringify(["Okara"]));
}

weatherForecast(JSON.parse(localStorage.getItem("location"))[0]);
function getWeatherIcon(code) {
  if (code >= 200 && code < 300) return "⛈️";
  if (code >= 300 && code < 400) return "🌦️";
  if (code >= 500 && code < 600) return "🌧️";
  if (code >= 600 && code < 700) return "❄️";
  if (code >= 700 && code < 800) return "🌫️";
  if (code === 800) return "☀️";
  if (code === 801) return "🌤️";
  if (code === 802) return "⛅";
  if (code === 803 || code === 804) return "☁️";
  return "🌡️";
}

function getWeatherDescription(code) {
  if (code >= 200 && code < 300) return "Thunderstorm";
  if (code >= 300 && code < 400) return "Drizzle";
  if (code >= 500 && code < 600) {
    if (code === 500 || code === 501) return "Light Rain";
    if (code === 502 || code === 503) return "Heavy Rain";
    return "Rain";
  }
  if (code >= 600 && code < 700) {
    if (code === 600 || code === 601) return "Light Snow";
    if (code >= 602) return "Heavy Snow";
    return "Snow";
  }
  if (code >= 700 && code < 800) {
    const map = {
      701: "Mist",
      711: "Smoke",
      721: "Haze",
      731: "Dust",
      741: "Fog",
      751: "Sand",
      761: "Dust",
      762: "Ash",
      771: "Squall",
      781: "Tornado",
    };
    return map[code] || "Fog";
  }
  if (code === 800) return "Clear";
  if (code === 801) return "Few Clouds";
  if (code === 802) return "Cloudy";
  if (code === 803 || code === 804) return "Overcast";

  return "Unknown";
}

document.querySelector(".current-date").innerText = formattedDate =
  new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

document.querySelector(".search-input").addEventListener("input", function () {
  this.placeholder = "Enter city name";
});

async function weatherForecast(city, searched = false) {
  const API_KEY = "3b660c0e7f190c342e422f5d5535fea7";

  // 1️⃣ Get city coordinates
  let response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
  );
  let geo = await response.json();

  document.querySelector(".search-input").value = "";

  if (!geo || geo.length === 0) {
    document.querySelector(".search-input").placeholder =
      "City not found. Please enter a valid city.";
    return;
  }

  document.querySelector(".location").querySelector("span").innerText =
    city.charAt(0).toUpperCase() + city.slice(1);

  const lat = geo[0].lat;
  const lon = geo[0].lon;

  // 2️⃣ Get forecast
  response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`,
  );
  const data = await response.json();

  const nowHour = new Date().getHours();

  if (!data.list) {
    console.error("Weather data not found", data);
    return;
  }
  const hourlyForecast = await data.list.slice(0, 12).map((h) => {
    const date = new Date(h.dt * 1000);

    const hour = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });

    return {
      time: hour,
      temperature: Math.round(h.main.temp),
      weathercode: h.weather[0].id,
      description: getWeatherDescription(h.weather[0].id),
    };
  });

  const dailyForecastCards = hourlyForecast.map((hour) => {
    return `<div class="hour-card">
              <div class="hour-time">${hour.time}</div>
              <div class="weather-icon">
              ${getWeatherIcon(hour.weathercode)}
              </div>
              <div class="hour-temp">${Math.floor(hour.temperature)}°C</div>
            </div>`;
  });
  document.querySelector(".hourly-forecast").innerHTML =
    dailyForecastCards.join("");

  const days = {};

  data.list.forEach((item) => {
    const dateObj = new Date(item.dt * 1000);
    const dateKey = dateObj.toDateString();

    if (!days[dateKey]) {
      days[dateKey] = {
        temps: [],
        feels: [],
        humidity: [],
        wind: [],
        precipitation: [],
        weathercode: item.weather[0].id,
      };
    }

    days[dateKey].temps.push(item.main.temp);
    days[dateKey].feels.push(item.main.feels_like);
    days[dateKey].humidity.push(item.main.humidity);
    days[dateKey].wind.push(item.wind.speed);
    days[dateKey].precipitation.push(item.rain?.["3h"] || 0);
  });

  const dailyForecast = Object.keys(days)
    .slice(0, 8)
    .map((dateKey) => {
      const dateObj = new Date(dateKey);

      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
      const monthDate = dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      const d = days[dateKey];

      const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

      return {
        day: `${dayName}, ${monthDate}`,
        temperature: avg(d.temps),
        feels_like: avg(d.feels),
        weathercode: d.weathercode,
        description: getWeatherDescription(d.weathercode),
        wind: avg(d.wind),
        precipitation: avg(d.precipitation),
        humidity: avg(d.humidity),
      };
    });
  const dailyForecastCard = dailyForecast.map((day) => {
    return `<div class="day-card">
            <div class="day-header">
              <div class="day-name">${day.day.split(",")[0].slice(0, 3)}</div>
              <div class="day-date">${day.day.split(",")[1]}</div>
            </div>
            <div class="weather-icon">
            ${getWeatherIcon(day.weathercode)}

            </div>
            <div class="day-temp">
              ${Math.floor(day.temperature)}<span class="temp-range">/ ${Math.floor(day.feels_like)}°</span>
            </div>
            <div class="day-condition">${day.description}</div>
            <div class="day-wind">Wind: ${Math.floor(day.wind)} km/h</div>
            <div class="day-precip">Precipitation: ${day.precipitation}%</div>
            <div class="day-humidity">Humidity: ${Math.floor(day.humidity)}%</div>
          </div>`;
  });
  document.querySelector(".week-cards").innerHTML = dailyForecastCard.join("");
  document.querySelector(".feels-like").innerHTML =
    `Feels ${Math.floor(dailyForecast[0].feels_like)} °C`;

  document.querySelector(".temp-value").innerHTML =
    `${Math.floor(dailyForecast[0].temperature)}<span class="temp-unit">°C</span>`;

  let locations = JSON.parse(localStorage.getItem("location"));
  if ((searched, locations[0] !== city)) {
    locations.unshift(city);
    localStorage.setItem("location", JSON.stringify(locations));
  }
}
document
  .querySelector(".search-container")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const city = document.querySelector(".search-input").value;
    weatherForecast(city, true);
  });
