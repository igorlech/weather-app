import './weatherPanel.scss';

export class weatherPanel {
    constructor() {
        const input = document.querySelector<HTMLInputElement>('.input');
        const form = document.querySelector<HTMLFormElement>('.form');
        const output = document.querySelector<HTMLDivElement>('.weather-output');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (input?.value == '' || input?.value == null) return;

            this.fetchWeatherData(input.value);
            output.innerHTML = `<p>Weather for ${input.value}</p>`;
        });
    }

    fetchWeatherData(city: string) {
        fetch(`https://goweather.herokuapp.com/weather/${city}`)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
}
