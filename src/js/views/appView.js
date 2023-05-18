class AppView {
  #parentElement = document.querySelector('.weather__dashboard');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #alertMarkup() {
    if (Object.keys(this.#data.alert).length === 0) {
      return '';
    } else {
      return `<p class="alert">${this.#data.alert}</p>`;
    }
  }

  #currentMarkup() {
    return `
    <div class="current__display">
        <div>
          <p>Current</p>
          <h1>${Math.round(this.#data.currentConditions.temp)}°C</h1>
          <p class="description">${this.#data.currentConditions.conditions}</p>
        </div>
      <div>
      <img src="./src/icons/${this.#data.currentConditions.icon}.svg" />
      </div>
      </div>
      <div class="location">
        <i class='bx bx-map'></i>
        <p>${this.#data.location.place}</p>
        <span>/</span>
        <p>${this.#data.location.country}</p>
      </div>
      <div class="time">
        <i class="bx bx-calendar-alt"></i>
        <p>${this.#data.currentConditions.fullFormattedDate}</p>
      </div>
    `;
  }

  #forecastMarkup() {
    const markup = this.#data.weatherForecast
      .map(
        day => `
      <li>
        <span>${day.formattedDate}</span>
        <img src="./src/icons/${day.icon}.svg" alt="${day.icon}">
        <p>${Math.round(day.tempmax)}°C <span>/ ${Math.round(
          day.tempmin
        )}°C</span></p>
      </li>
      `
      )
      .join('');
    return markup;
  }

  #todayForecast() {
    const markup = this.#data.weatherCurrent.hours
      .map(
        hour => `
      <div class="item">
        <img src="./src/icons/${hour.icon}.svg" alt="${hour.icon}">
        <p>${Math.round(hour.temp)}°C</p>
        <span>${hour.formattedDate}</span>
      </div>
    `
      )
      .join('');
    return markup;
  }

  #todayHighlightsMarkup() {
    return `
    <div class="cards">
    <p class="cards__label">Feels like & UV index</p>
      <div class="cards__list">
      <div class="card">
        <div class="card__icon">
          <img src="./src/icons/dust-day.svg" alt="dust-day-icon">
        </div>
        <div class="card__info">
          <p class="card__info__label">Feels like</p>
          <p>${Math.round(this.#data.currentConditions.feelslike)}°C</p>
        </div>
      </div>
      <div class="card">
        <div class="card__icon">
          <img src="./src/icons/uv-index.svg" alt="uv-index-icon">
        </div>
        <div class="card__info">
          <p class="card__info__label">UV index</p>
          <p>${this.#data.currentConditions.uvindex}</p>
        </div>
      </div>
      </div>
    </div>
    <div class="cards">
    <p class="cards__label">Sunrise & Sunset</p>
      <div class="cards__list">
      <div class="card">
        <div class="card__icon">
          <img src="./src/icons/sunrise.svg" alt="sunrise-icon">
        </div>
        <div class="card__info">
          <p class="card__info__label">Sunrise</p>
          <p>${this.#data.currentConditions.sunriseFormatted}</p>
        </div>
      </div>
      <div class="card">
        <div class="card__icon">
          <img src="./src/icons/sunset.svg" alt="sunset-icon">
        </div>
        <div class="card__info">
          <p class="card__info__label">Sunset</p>
          <p>${this.#data.currentConditions.sunsetFormatted}</p>
        </div>
      </div>
      </div>
    </div>
    <div class="cards">
    <p class="cards__label">Humidity & Pressure</p>
      <div class="cards__list">
      <div class="card">
        <div class="card__icon">
          <img src="./src/icons/humidity.svg" alt="humidity-icon">
        </div>
        <div class="card__info">
          <p class="card__info__label">Humidity</p>
          <p>${Math.round(this.#data.currentConditions.humidity)}%</p>
        </div>
      </div>
      <div class="card">
        <div class="card__icon">
          <img src="./src/icons/pressure-low.svg" alt="pressure-icon">
        </div>
        <div class="card__info">
          <p class="card__info__label">Pressure</p>
          <p>${Math.round(this.#data.currentConditions.pressure)}hPa</p>
        </div>
      </div>
      </div>
    </div>
    <div class="cards">
    <p class="cards__label">Visibillity & Windspeed</p>
      <div class="cards__list">
      <div class="card">
        <div class="card__icon">
          <img src="./src/icons/horizon.svg" alt="horizon-icon">
        </div>
        <div class="card__info">
          <p class="card__info__label">Visibillity</p>
          <p>${Math.round(this.#data.currentConditions.visibility)}km</p>
        </div>
      </div>
      <div class="card">
        <div class="card__icon">
          <img src="./src/icons/wind.svg" alt="wind-icon">
        </div>
        <div class="card__info">
          <p class="card__info__label">Windspeed</p>
          <p>${Math.round(this.#data.currentConditions.windspeed)}km/h</p>
        </div>
      </div>
      </div>
    </div>        
    `;
  }

  #generateMarkup() {
    return `
    <div class="current__weather">
      ${this.#currentMarkup()}
    </div>
    <div class="main__dash">
      <div class="heading">
      <p class="label">Todays Forecast</p>
      ${this.#alertMarkup()}
      </div>
      <div class="today__highlights">
        ${this.#todayHighlightsMarkup()}
      </div>
      <div class="today__forecast">
      <p class="label">Today at</p>
      <div class="list">
        ${this.#todayForecast()}
      </div>
    </div>
    </div>
    <div class="weekly__forecast">
    <p class="label">7 Days Forecast</p>
      <ul class="forecast__list">
       ${this.#forecastMarkup()}
      </ul>
    </div>
      `;
  }
}

export default new AppView();
