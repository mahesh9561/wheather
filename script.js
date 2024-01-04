document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const cityInput = document.getElementById('cityInput');
    const addCityBtn = document.getElementById('addCityBtn');
    const weatherCardsContainer = document.getElementById('weatherCardsContainer');

    let cities = [];

    addCityBtn.addEventListener('click', () => {
        const cityName = cityInput.value.trim();

        if (cityName === '' || cities.includes(cityName)) {
            alert('Please enter a valid city name');
            return;
        }

        fetchWeatherData(cityName);
    });

    async function fetchWeatherData(cityName) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                createWeatherCard(data);
                cities.push(cityName);
                sortCitiesByTemperature();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function createWeatherCard(data) {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('weather-card');

        // Extract necessary data from the API response and update the card content

        weatherCardsContainer.appendChild(weatherCard);
    }

    function sortCitiesByTemperature() {
        cities.sort((city1, city2) => {
            // Compare temperatures and return the result
        });

        updateWeatherCardsOrder();
    }

    function updateWeatherCardsOrder() {
        // Clear existing weather cards
        weatherCardsContainer.innerHTML = '';

        // Re-generate weather cards based on the sorted order
        cities.forEach(city => fetchWeatherData(city));
    }
});
