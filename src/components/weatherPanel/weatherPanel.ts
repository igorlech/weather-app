import './weatherPanel.scss';

interface MyData {
    temperature: string;
    wind: string;
    description: string;
}
export class weatherPanel {
    constructor() {
        const input = document.querySelector<HTMLInputElement>('.input');
        const form = document.querySelector<HTMLFormElement>('.form');

        const API_KEY = 'testKey';

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (input?.value == '' || input?.value == null) return;

            this.fetchWeatherData(input.value, API_KEY);
        });
    }

    // TODO: Make fetch async
    // TODO: Check if the new API is working + secure the key

    fetchWeatherData(city: string, key: string) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
            .then((response) => response.json())
            .then((data) => this.renderWeatherData(data as MyData));
    }

    renderWeatherData(data: MyData) {
        const output = document.querySelector<HTMLDivElement>('.weather-output');
        if (data.temperature != null) {
            output.innerHTML = '';
            output.innerHTML += `
            <div class="weather-data">
                <p>Temperature: ${data.temperature}</p>
                <p>Wind: ${data.wind}</p>
                <p>Description: ${data.description}</p>
            </div>`;
        } else {
            output.innerHTML = '';
            output.innerHTML += `
            <div class="weather-data">
                <p>Sorry, your city is currently not on our list</p>
            </div>`;
        }
    }
}
