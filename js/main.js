
$(document).ready(function() {
  // global variables
var citySearchListStringified = localStorage.getItem("citySearchList");
function createCityList(citySearchList) {
  $("#city-list").empty();
  var keys = Object.keys(citySearchList);
  for (var i = 0; i < keys.length; i++) {
    var cityListEntry = $("<button>");
    cityListEntry.addClass("list-group-item list-group-item-action");
    var splitStr = keys[i].toLowerCase().split(" ");
    for (var j = 0; j < splitStr.length; j++) {
      splitStr[j] =
        splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
    }
    var titleCasedCity = splitStr.join(" ");
    cityListEntry.text(titleCasedCity);
    $("#city-list").append(cityListEntry);
  }
}
function populateCityWeather(city, citySearchList) {
  createCityList(citySearchList);
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=dc644253a490b31ad20affc0c135f009&q=" +
    city;
  var queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=dc644253a490b31ad20affc0c135f009&q=" +
    city;
  var latitude;
  var longitude;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // Store all of the retrieved data inside of an object called "weather"
    .then(function(weather) {
      // Log the queryURL
      console.log(queryURL);
      // Log the resulting object
      console.log(weather);
      var nowMoment = moment();
      var displayMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
      );
      var cityName = $("<h3>").text(weather.name);
      $("#city-name").prepend(cityName);
      var weatherIcon = $("<img>");
      weatherIcon.attr(
        "src",
        "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
      );
      $("#current-icon").empty();
      $("#current-icon").append(weatherIcon);
      $("#current-temp").text("Temperature: " + weather.main.temp + " °F");
      $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
      $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");
      latitude = weather.coord.lat;
      longitude = weather.coord.lon;
      var queryURL3 =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=dc644253a490b31ad20affc0c135f009&q=" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;
      $.ajax({
        url: queryURL3,
        method: "GET"
        // Store all of the retrieved data inside of an object called "uvIndex"
      }).then(function(uvIndex) {
        var uvIndexDisplay = $("<button>");
          uvIndexDisplay.addClass("#current-uv");
          uvIndexDisplay.attr("class", "btn btn-primary")
          $("#current-uv").text("UV Index: ");
          $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
          console.log(uvIndex[0].value);
          if ((uvIndex[0].value) < 3) {
            $(uvIndexDisplay).css("background-color", "green");
          }
          else if  ((uvIndex[0].value) < 6) {
            $(uvIndexDisplay).css("background-color", "yellow");
          }
          else if  ((uvIndex[0].value) < 8) {
            $(uvIndexDisplay).css("background-color", "orange");
          }
          else if  ((uvIndex[0].value) < 11) {
            $(uvIndexDisplay).css("background-color", "red");
          }
          else{
            $(uvIndexDisplay).css("background-color", "purple");
          }
        $.ajax({
          url: queryURL2,
          method: "GET"
          // Store all of the retrieved data inside of an object called "forecast"
        }).then(function(forecast) {
          console.log(queryURL2);
          console.log(forecast);
          // Loop through the forecast list array and display a single forecast entry/time (5th entry of each day which is close to the highest temp/time of the day) from each of the 5 days
          for (var i = 6; i < forecast.list.length; i += 8) {
            // 6, 14, 22, 30, 38
            var forecastDate = $("<h5>");
            var forecastPosition = (i + 2) / 8;
            console.log("#forecast-date" + forecastPosition);
            $("#forecast-date" + forecastPosition).empty();
            $("#forecast-date" + forecastPosition).append(
              forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
            );
            var forecastIcon = $("<img>");
            forecastIcon.attr(
              "src",
              "https://openweathermap.org/img/w/" +
                forecast.list[i].weather[0].icon +
                ".png"
            );
            $("#forecast-icon" + forecastPosition).empty();
            $("#forecast-icon" + forecastPosition).append(forecastIcon);
            console.log(forecast.list[i].weather[0].icon);
            $("#forecast-temp" + forecastPosition).text(
              "Temp: " + forecast.list[i].main.temp + " °F"
            );
            $("#forecast-humidity" + forecastPosition).text(
              "Humidity: " + forecast.list[i].main.humidity + "%"
            );
            $(".forecast").attr(
              "style",
              "background-color:dodgerblue; color:white"
            );
          }
        });
      });
    });
}

  var citySearchList = JSON.parse(citySearchListStringified);
  if (citySearchList == null) {
    citySearchList = {};
  }
  createCityList(citySearchList);
  $("#current-weather").hide();
  $("#forecast-weather").hide();
  // click events 
  $("#search-button").on("click", function(event) {
    event.preventDefault();
    var city = $("#city-input")
      .val()
      .trim()
      .toLowerCase();
    if (city != "") {
      //Check to see if there is any text entered
    citySearchList[city] = true;
    localStorage.setItem("citySearchList", JSON.stringify(citySearchList));
    populateCityWeather(city, citySearchList);
    $("#current-weather").show();
    $("#forecast-weather").show();
    $("#city-input").val("");
    }
  });
  $("#city-list").on("click", "button", function(event) {
    event.preventDefault();
    var city = $(this).text();
    populateCityWeather(city, citySearchList);
    $("#current-weather").show();
    $("#forecast-weather").show();
  });  
  $("#clear-button").on("click", function(event) {
    $("#city-list").empty();
    localStorage.clear("citySearchList"); 
    citySearchList = {}; 

  });  
})