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

    // TODO: Make fetch async
    // TODO: Check if the new API is working

    fetchWeatherData(city: string, key: string) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
            .then((response) => response.json())
            .then((data) => this.renderWeatherData(data as WeatherData));
    }

    renderWeatherData(data: WeatherData) {
        const output = document.querySelector<HTMLDivElement>('.weather-output');

        output.innerHTML = '';

        output.innerHTML += `
        <div class="weather-data">
            <p>Temperature: ${data.main.temp}</p>
            <p>Wind: ${data.wind.speed}</p>
            <p>Humidity: ${data.main.humidity}</p>
            <p>Pressure: ${data.main.pressure}</p>
            <p>Clouds: ${data.clouds.all}</p>
            <p>Country: ${data.sys.country}</p>
            <p>Sunrise: ${data.sys.sunrise}</p>
            <p>Sunset: ${data.sys.sunset}</p>
            <p>Visibility: ${data.visibility}</p>
            <p>City: ${data.name}</p>

            <div class="weather-dat-main">
                <p>Weather:</p>
                <p>Id: ${data.weather[0].id}</p>
                <p>Main: ${data.weather[0].main}</p>
                <p>Description: ${data.weather[0].description}</p>
                <p>Icon: ${data.weather[0].icon}</p>
            </div>
        </div>`;
    }
}
