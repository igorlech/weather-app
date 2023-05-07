import './weatherPanel.scss';
import { WeatherData } from './interfaces';
export class weatherPanel {
    constructor() {
        const input = document.querySelector<HTMLInputElement>('.input');
        const form = document.querySelector<HTMLFormElement>('.form');
        const KEY = '7b14f8b6db935705d052151dbf729640';

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (input?.value == '' || input?.value == null) return;

            this.fetchWeatherData(input.value, KEY);
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

        output.innerHTML += `
        <div class="weather-data">
            <div class="weather-data-header">
                <p>${data.name}, ${data.sys.country}</p>
            </div>
            <div class="weather-data-icon">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
            </div>
            <div class="weather-data-temp">
                <p>Temperature: ${Math.round(data.main.temp)} °C</p>
            </div>
            <div class="weather-data-desc">
                <p>Main: ${data.weather[0].main} - ${data.weather[0].description}</p>
            </div>
            <p>Wind: ${data.wind.speed} m/s</p>
            <p>Humidity: ${data.main.humidity}</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            <p>Clouds: ${data.clouds.all}%</p>
            <p>Visibility: ${data.visibility}</p>
        </div>`;
    }
}
