//queryselectors
var userEnteredCity = document.querySelector("#userEnteredCity");
var searchBtn = document.querySelector(".searchBtn");
var cityNameDateEl = document.querySelector(".cityNameDate");


//build them varies
var apiKey = "1c631efa51faf50ecb47f29508debd1d";
var apiUrl = ""




//build API Call
var getWeatherForcast = function() {
    var cityName = userEnteredCity.value.trim();
    cityNameDateEl.textContent = cityName;
    console.log(cityName);  
     apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
     console.log(apiUrl)
    
     // fetch 
    
     fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
            console.log(response);
        } else {
            alert('Error: City not found');
        }

    }); 
    
};
console.log(apiUrl)
getWeatherForcast();

searchBtn.addEventListener("click", getWeatherForcast);


