const weatherform = document.querySelector('.weatherform');
const cityInput = document.querySelector('.city-input');
const app = document.querySelector('.container');
const api = "Example: 12345";

weatherform.addEventListener("submit", async (event) =>
    {
        event.preventDefault();
        const city = cityInput.value;

        if(city)
        {
            try
            {
                const data = await getWeatherData(city);
                displayWeatherInfo(data);
            }
            catch(error)
            {
                console.error(error);
                displayError(error);
            }
        }
        else
        {
            displayError("Please enter a city.")
        }
    });

async function getWeatherData(city)
{
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    const response = await fetch(apiURL);
    if(!response.ok)
    {
        throw new Error("Couldn't find city");
    }
    else
    {
        return await response.json();
    }
}

function displayWeatherInfo(data)
{
    console.log(data);
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;

    app.textContent = "";
    app.style.display = "flex";
    
    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    cityDisplay.classList.add('city-display');
    app.appendChild(cityDisplay);

    tempDisplay.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(0)}°F`;
    tempDisplay.classList.add('temp-display');
    app.appendChild(tempDisplay);

    humidDisplay.textContent = `Humidity: ${humidity}%`;
    humidDisplay.classList.add('humidity-display');
    app.appendChild(humidDisplay);

    descDisplay.textContent = description.slice(0,1).toUpperCase() + description.slice(1, description.indexOf(" ")) + " " + description.slice(description.indexOf(" ") + 1, description.indexOf(" ") + 2).toUpperCase() + description.slice(description.indexOf(" ") + 2);
    descDisplay.classList.add('desc-display');
    app.appendChild(descDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    console.log(id);
    weatherEmoji.classList.add('emoji');
    app.appendChild(weatherEmoji);

}

function getWeatherEmoji(i)
{
    switch(true)
    {
        case (i >= 200 && i < 300):
            return "⛈️";
            
        case (i >= 300 && i < 400):
            return "🌦️";
            
        case (i >= 500 && i < 600):
            return "🌧️🌧️";
            
        case (i >= 600 && i < 400):
            return "❄️";
            
        case (i >= 700 && i < 775):
            return "🌫️";

        case (i >= 781 && i < 800):
            return "🌪️";
            
        case (i === 800):
            return "😎";
            
        case (i >= 801 && i < 810):
            return "☁️";
      default:
        return "🤷‍♂️";      

    }
}

function displayError(message)
{
    const error = document.createElement('p');
    error.textContent = message;
    console.log(message);
    error.classList.add('error-display');

    app.textContent = "";
    app.style.display = "flex";
    app.appendChild(error);

}