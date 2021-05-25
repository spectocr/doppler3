//queryselectors
var userEnteredCity = document.querySelector("#userEnteredCity");
var searchBtn = document.querySelector(".searchBtn");
var cityNameDateEl = document.querySelector(".cityNameDate");
var currentWeatherIcon =document.getElementById('iconCD');


//build them varies
var apiKey = "1c631efa51faf50ecb47f29508debd1d";
var apiUrl1 = "";
var apiUrl2 = "";
var cityName = "Trenton"
var lat = "";
var lon = "";





//build API Call
var getWeatherForcast = function() {
    //fetch 1

console.log(cityName);
apiUrl1 = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

fetch(apiUrl1).then(function(response) {
    cityName = userEnteredCity.value.trim();

    if (response.ok) {
        response.json().then(function(data) {
            lat = data.coord.lat;
            lon = data.coord.lon;
            for (var i = 0; i <7; i++) {
                localStorage.setItem("cityName" + i, cityName);
            }
            //cityNameDateEl.textContent = cityName;
            console.log(cityName);  
             apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + cityName + "&appid=" + apiKey;
             console.log(apiUrl2)
            
             // fetch 2
            
             fetch(apiUrl2).then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        console.log(data);
                        drawWeather(data);
                    });
                    console.log(response);
                } else {
                    alert('Error: City not found');
                }
        
            }); 

            console.log(lat);
            console.log(lon);
            console.log(data);
        });
        console.log(response);
    } else {
        alert('Error: City not found');
    }

}); 
    
  
    
};


function drawWeather(data) {
	//var celcius = Math.round(parseFloat(data.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(data.current.temp)-273.15)*1.8)+32);
    var dateFromOW = moment().format("MMM Do, YYYY");
    
	for (var i = 0; i < data.daily.length; i++ ) {
        var date1 = data.current.dt;
        //var date2 = data.list[i].dt_txt//.split(' ');
        date1 = new Date(date1 * 1000);
        month = date1.getMonth()+1;
        day = date1.getDate();
        year = date1.getFullYear();
        date1 = month + "/" + day + "/" + year;
        var icon = data.daily[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        //var currentWeatherIconChild = document.createElement("IMG");
           //  currentWeatherIconChild.setAttribute("src", iconUrl);
          //   currentWeatherIconChild.setAttribute("width", "30");
           //  currentWeatherIconChild.setAttribute("height", "30");
           //  currentWeatherIconChild.setAttribute("alt", "Weather Icon");
        //currentWeatherIcon.appendChild(currentWeatherIconChild);
        
        //var wind1 = data.daily[i].wind.speed;
        

        //console.log(date2[0]);
        console.log(date1);
        console.log(wind1);
        console.log(iconUrl);
    };
    // current weather icon only.
    var icon = data.current.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        var currentWeatherIconChild = document.createElement("IMG");
        currentWeatherIconChild.setAttribute("src", iconUrl);
        currentWeatherIconChild.setAttribute("width", "30");
        currentWeatherIconChild.setAttribute("height", "30");
        currentWeatherIconChild.setAttribute("alt", "Weather Icon");
        currentWeatherIcon.appendChild(currentWeatherIconChild);

	document.getElementById('temp').innerHTML = "Temp: " +  fahrenheit + '&deg; F';
	document.getElementById('location').innerHTML = cityName + " (" + date1 + ")";
    //document.getElementById('iconCD').innerHTML = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
    document.getElementById('wind').innerHTML = "Wind: " + data.current.wind_speed + " MPH";
    document.getElementById('humidity').innerHTML = "Humidity: " + data.current.humidity + "&percnt;";
    document.getElementById('uvIndex').innerHTML = "UV Index: " + data.current.uvi;
};

searchBtn.addEventListener("click", getWeatherForcast);


