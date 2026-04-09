const loadWeatherBtn = document.getElementById("loadWeatherBtn");
const citySelect = document.getElementById("citySelect");
const statusMessage = document.getElementById("statusMessage");
const weatherResult = document.getElementById("weatherResult");

const tempSpan = document.getElementById("temp");
const windSpan = document.getElementById("wind");
const codeSpan = document.getElementById("code");
const timeSpan = document.getElementById("time");

loadWeatherBtn.addEventListener("click", async () => {
  const [latitude, longitude] = citySelect.value.split(",");

  statusMessage.textContent = "Loading weather...";
  weatherResult.hidden = true;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    tempSpan.textContent = data.current.temperature_2m;
    windSpan.textContent = data.current.wind_speed_10m;
    codeSpan.textContent = data.current.weather_code;
    timeSpan.textContent = data.current.time;

    statusMessage.textContent = "Weather loaded successfully.";
    weatherResult.hidden = false;

  } catch (error) {
    statusMessage.textContent = "Unable to load weather right now.";
    console.error("Weather fetch failed:", error);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("Service worker registered."))
      .catch(error => console.log("Service worker failed:", error));
  });
}