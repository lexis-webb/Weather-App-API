const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const cityRef = document.getElementById("city");

const getWeather = async () => {
  const cityValue = cityRef.value.trim();
  if (!cityValue) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
  cityRef.value = ""; // Clear input 

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const { name, weather, main } = data;
    const { main: weatherMain, description, icon } = weather[0];
    const { temp, temp_min, temp_max } = main;

    result.innerHTML = `
      <h2>${name}</h2>
      <h4 class="weather">${weatherMain}</h4>
      <h4 class="desc">${description}</h4>
      <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
      <h1>${temp} &#176;</h1>
      <div class="temp-container">
          <div>
              <h4 class="title">min</h4>
              <h4 class="temp">${temp_min}&#176;</h4>
          </div>
          <div>
              <h4 class="title">max</h4>
              <h4 class="temp">${temp_max}&#176;</h4>
          </div>
      </div>
    `;
  } catch {
    result.innerHTML = `<h3 class="msg">City not found</h3>`;
  }
};


searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);