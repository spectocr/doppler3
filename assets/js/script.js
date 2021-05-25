//queryselectors
var userEnteredCity = document.querySelector("#userEnteredCity");
//console.log(userEnteredCity);
var searchBtn = document.querySelector(".searchBtn");
var cityNameDateEl = document.querySelector(".cityNameDate");
var currentWeatherIcon = document.getElementById('iconCD');
var currentTemp = document.getElementById('temp');
var currentLocation = document.getElementById('location');
var currentWind = document.getElementById('wind');
var currentHumidity = document.getElementById('humidity');


//build them varies
var apiKey = "1c631efa51faf50ecb47f29508debd1d";
var apiUrl1 = "";
var apiUrl2 = "";
//var userEnteredCity = "";
var lat = "";
var lon = "";

//build API Call
var getWeatherForcast = function () {
    //fetch 1
    cityName = "";
    
    cityName = userEnteredCity.value.trim();
    //.log(cityName);
    apiUrl1 = "";
    apiUrl2 = "";
    //lat = " ";
    //lon = " ";
    
    apiUrl1 = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    fetch(apiUrl1).then(function (response) {


        delete data;
        if (response.ok) {
            response.json().then(function (data) {
                //data = "";
                lat = data.coord.lat;
                lon = data.coord.lon;
                cityName = data.name;
                //console.log(data);
                //console.log(lat);
               // console.log(lon);
                for (var i = 0; i < data.length; i++) {
                    localStorage.setItem("cityName" + i, cityName);
                }
                apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + cityName + "&appid=" + apiKey;
                //console.log(apiUrl2)

                // fetch 2

                fetch(apiUrl2).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            //console.log(data);
                            
                            //console.log(data);
                            drawWeather(data);
                        });
                    } else {
                        alert('Error: City not found');
                    }
                });
            });
            //console.log(response);
        } else {
            alert('Error: City not found');
        }
    });
};


function drawWeather(data) {
    //var celcius = Math.round(parseFloat(data.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(data.current.temp) - 273.15) * 1.8) + 32);
    //var dateFromOW = moment().format("MMM Do, YYYY");

    currentTemp = "";
    currentLocation = "";
    currentWind = "";
    currentHumidity = "";


    for (var i = 1; i < 6; i++) {
        var date1 = data.current.dt;
        //var date2 = data.list[i].dt_txt//.split(' ');
        date1 = new Date(date1 * 1000);
        month = date1.getMonth() + 1;
        day = date1.getDate();
        year = date1.getFullYear();
        date1 = month + "/" + day + "/" + year;

        var datei = data.daily[i].dt;
        //var date2 = data.list[i].dt_txt//.split(' ');
        datei = new Date(datei * 1000);
        month = datei.getMonth() + 1;
        day = datei.getDate();
        year = datei.getFullYear();
        datei = month + "/" + day + "/" + year;
        fahrenheitForcasti = Math.round(((parseFloat(data.daily[i].temp.max) - 273.15) * 1.8) + 32);
        iconForcasti = data.daily[i].weather[0].icon;
        windForcasti = data.daily[i].wind_speed;
        humidityForcasti = data.daily[i].humidity;


        var weatherForcastDayi = "day" + [i];
        var weatherForcastIconi = "weatherIcon" + [i];
        var weatherForcastTempi = "temp" + [i];
        var weatherForcastWindi = "wind" + [i];
        var weatherForcastHumidityi = "humidity" + [i];
       var forcastWeatherIcon = document.getElementById(weatherForcastIconi);
       var icon2 = data.daily[i].weather[0].icon;
       var iconUrl2 = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";
       
        var forcastWeatherIconChild = document.createElement("IMG");
         forcastWeatherIconChild.setAttribute("src", iconUrl2);
          forcastWeatherIconChild.setAttribute("width", "30");
         forcastWeatherIconChild.setAttribute("height", "30");
         forcastWeatherIconChild.setAttribute("alt", "Weather Icon");
         forcastWeatherIcon.appendChild(forcastWeatherIconChild);

        

        
        document.getElementById(weatherForcastDayi).innerHTML = datei;
        document.getElementById(weatherForcastTempi).innerHTML = "Temp: " + fahrenheitForcasti + '&deg; F';
        document.getElementById(weatherForcastWindi).innerHTML = "Wind: " + windForcasti + " MPH";
        document.getElementById(weatherForcastHumidityi).innerHTML = "Humidity: " + humidityForcasti + "&percnt;";

        var icon = data.daily[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


        var temp1 = data.daily[i].temp.max;
        var wind1 = data.daily[i].wind_speed;
        var humidity1 = data.daily[i].humidity

        document.getElementById('temp').innerHTML = "Temp: " + fahrenheit + '&deg; F';
        document.getElementById('location').innerHTML = cityName + " (" + date1 + ")";
        document.getElementById('wind').innerHTML = "Wind: " + data.current.wind_speed + " MPH";
        document.getElementById('humidity').innerHTML = "Humidity: " + data.current.humidity + "&percnt;";
        userEnteredCity.value = "";
        cityName.value = "";
    };

    // current weather info and icon only.
    var icon = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    currentWeatherIcon.innerHTML = "";
    var currentWeatherIconChild = document.createElement("IMG");
    currentWeatherIconChild.setAttribute("src", iconUrl);
    currentWeatherIconChild.setAttribute("width", "30");
    currentWeatherIconChild.setAttribute("height", "30");
    currentWeatherIconChild.setAttribute("alt", "Weather Icon");
    currentWeatherIcon.appendChild(currentWeatherIconChild);

    document.getElementById('temp').innerHTML = "Temp: " + fahrenheit + '&deg; F';
    document.getElementById('location').innerHTML = cityName + " (" + date1 + ")";
    document.getElementById('wind').innerHTML = "Wind: " + data.current.wind_speed + " MPH";
    document.getElementById('humidity').innerHTML = "Humidity: " + data.current.humidity + "&percnt;";
    document.getElementById('uvIndex').innerHTML = data.current.uvi;
    //console.log(data.current.uvi);
    if (data.current.uvi <= 2) {
        document.getElementById('uvIndex').setAttribute("class", "green");
    } else if (data.current.uvi <= 3.00) {
        document.getElementById('uvIndex').setAttribute("class", "yellow");
    } else if (data.current.uvi <= 6) {
        document.getElementById('uvIndex').setAttribute("class", "orange");
    } else {
        document.getElementById('uvIndex').setAttribute("class", "red");
    }
};

searchBtn.addEventListener("click", getWeatherForcast);


