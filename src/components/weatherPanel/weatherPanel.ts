import './weatherPanel.scss';
import { WeatherData } from '../../utility/interfaces';
export class weatherPanel {
    constructor() {
        const input = document.querySelector<HTMLInputElement>('.input');
        const form = document.querySelector<HTMLFormElement>('.form');
        const favBtn = document.querySelector<HTMLButtonElement>('.fav-btn');

        const KEY = '7b14f8b6db935705d052151dbf729640';

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (input?.value == '' || input?.value == null) return;

            this.fetchWeatherData(input.value, KEY);
        });

        favBtn?.addEventListener('click', () => {
            this.showFavourites();
        });
    }

    async fetchWeatherData(city: string, key: string) {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
            .then((response) => response.json())
            .then((data) => this.renderWeatherData(data as WeatherData));
    }

    renderWeatherData(data: WeatherData) {
        const output = document.querySelector<HTMLDivElement>('.weather-output');
        output.style.display = 'block';

        output.innerHTML = '';

        if (data.name == undefined) {
            return (output.innerHTML = `<p class="error">City not found.</p>`);
        } else {
            output.innerHTML += `
            <div class="weather-data">
            <div class="weather-data-header">
            <p>${data.name}, ${data.sys.country}</p>
            <button class="fav-btn">ADD</button>
            </div>
                <div class="weather-data-main">
                    <div class="weather-data-icon">
                        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
                        </div>
                        <div class="weather-data-temp">
                        <p class="temperature">${Math.round(data.main.temp)}°C</p>
                        </div>
                        <div class="weather-data-desc">
                        <p class="weather-desc-1">${data.weather[0].main}</p>
                        <p class="weather-desc-2">${data.weather[0].description}</p>
                        </div>
                        <p>Wind: ${data.wind.speed} m/s</p>
                        <p>Humidity: ${data.main.humidity}</p>
                        <p>Pressure: ${data.main.pressure} hPa</p>
                        <p>Clouds: ${data.clouds.all}%</p>
                    </div>
            </div>`;
        }
    }

    saveFavourite(data: WeatherData) {
        // for future panel? decide how you want to present favourites
        const favPanel = document.querySelector<HTMLDivElement>('.fav-panel');
        // button to show favourites
        const favBtn = document.querySelector<HTMLButtonElement>('.fav-btn');
        // list of favourites
        const favList = document.querySelector<HTMLUListElement>('.fav-list');
        const favItem = document.createElement('li');
        favItem.classList.add('fav-item');
        favItem.innerHTML = `<p class="fav-item-name">${data.name}, ${data.sys.country}</p>`;
        favList?.appendChild(favItem);
        favBtn?.addEventListener('click', () => {
            favPanel?.classList.toggle('show-fav');
        });
    }

    showFavourites() {
        // const favPanel = document.querySelector<HTMLDivElement>('.fav-panel');
        // favPanel?.classList.toggle('show-fav');
    }
}
