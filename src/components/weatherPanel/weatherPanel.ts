import './weatherPanel.scss';

export class weatherPanel {
    constructor() {
        this.fetchWeatherData();
    }

    fetchWeatherData() {
        const city = 'London';
        fetch(`https://goweather.herokuapp.com/weather/${city}`)
            .then((response) => response.json())
            .then((data) => console.log(data));
    }
}
