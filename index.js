// https://www.weatherapi.com/docs/weather_conditions.json
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function checkIfDay(input){
    if(input == 1){
        return true;
    }
    return false;
}

function getWeatherIcon(code){
    const lowestCode = 1000;
    const lowestIcon = 113;
    
    var diff = code - lowestCode;
    var icon = lowestIcon + diff
    return icon
}

search.addEventListener("click", (event) => {

    const APIKey = '' //InsertAPIKey here
    const city = document.querySelector('.search-box input').value;

    fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`)
    .then(response => response.json())
    .then(json =>{

        console.log(json);
        if (city === "") return;

        if (json.error != null){
            console.log("location error");
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            container.style.height = '400px';
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        console.log(checkIfDay(json.current.is_day));
        const isDay = checkIfDay(json.current.is_day);
        const weatherIcon = getWeatherIcon(json.current.condition.code);
        console.log(weatherIcon);
        if (isDay == true){
            image.src = `images/weather/day/${weatherIcon}.png`;
        } else{
            image.src = `images/weather/night/${weatherIcon}.png`;
        }

        temperature.innerHTML = `${json.current.temp_c}°C`;
        description.innerHTML = `${json.current.condition.text}`;
        humidity.innerHTML = `${json.current.humidity} %`;
        wind.innerHTML = `${json.current.gust_kph} km/h`;

        error404.style.display = 'none';
        weatherBox.style.display = '';
        weatherDetails.style.display = 'flex';

        container.style.height = '500px'
        

        

    })

    
});

