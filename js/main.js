
$(document).ready(function() {
  // global variables
  var citySearchListStringified = localStorage.getItem("citySearchList");
  // function to create the list of cities
  function createCityList(citySearchList) {
    $("#city-list").empty();
    var keys = Object.keys(citySearchList);
    // for loop to add class to the list of cities and create them as a button
    for (var i = 0; i < keys.length; i++) {
      var cityListEntry = $("<button>");
      cityListEntry.addClass("list-group-item list-group-item-action");
      var splitStr = keys[i].toLowerCase().split(" ");
      // for loop to Upper Case first letter on city entry
      for (var j = 0; j < splitStr.length; j++) {
        splitStr[j] = splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
      }
      var titleCasedCity = splitStr.join(" ");
      cityListEntry.text(titleCasedCity);
      $("#city-list").append(cityListEntry);
    }
  }
  // function to store data and var query URL 
  function cityWeather(city, citySearchList) {
    createCityList(citySearchList);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=dc644253a490b31ad20affc0c135f009&q=" +
      city;
    var queryURL2 =
      "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=dc644253a490b31ad20affc0c135f009&q=" +
      city;
    var latitude;
    var longitude;
    // ajax request to get weather and function to store the weather data, using moment to add date
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (weather) {
      var nowMoment = moment();
      var displayMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
      );
      // displays the name of city and weather
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
      // ajax request to get uv index and function to store the uv index data
      $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function (uvIndex) {
        var uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("#current-uv");
        uvIndexDisplay.attr("class", "btn btn-primary");
        $("#current-uv").text("UV Index: ");
        $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
        // change the colors of uv index
        if ((uvIndex[0].value) < 3) {
          $(uvIndexDisplay).css("background-color", "green");
        }
        else if ((uvIndex[0].value) < 6) {
          $(uvIndexDisplay).css("background-color", "yellow");
        }
        else if ((uvIndex[0].value) < 8) {
          $(uvIndexDisplay).css("background-color", "orange");
        }
        else if ((uvIndex[0].value) < 11) {
          $(uvIndexDisplay).css("background-color", "red");
        }
        else {
          $(uvIndexDisplay).css("background-color", "purple");
        }
        // ajax request to get forecast and function to store the forecast data
        $.ajax({
          url: queryURL2,
          method: "GET"
        }).then(function (forecast) {
          // for loop to display a single forecast entry for each of the five days
          for (var i = 6; i < forecast.list.length; i += 8) {
            var forecastDate = $("<h5>");
            var forecastPosition = (i + 2) / 8;
            $("#forecast-date" + forecastPosition).empty();
            $("#forecast-date" + forecastPosition).append(
              forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
            );
            // displays the icons for each of the five days
            var forecastIcon = $("<img>");
            forecastIcon.attr(
              "src",
              "https://openweathermap.org/img/w/" +
              forecast.list[i].weather[0].icon +
              ".png"
            );
            $("#forecast-icon" + forecastPosition).empty();
            $("#forecast-icon" + forecastPosition).append(forecastIcon);
            // displays humidity and temperature also adds attibute to card and txt
            $("#forecast-temp" + forecastPosition).text(
              "Temp: " + forecast.list[i].main.temp + " °F"
            );
            $("#forecast-humidity" + forecastPosition).text(
              "Humidity: " + forecast.list[i].main.humidity + "%"
            );
            $(".forecast").attr(
              "style",
              "background-color:lightblue; color:black;font-size:18px"
            );
          }
        });
      });
    });
  }
  // store data in local storage 
  var citySearchList = JSON.parse(citySearchListStringified);
  if (citySearchList === null) {
    citySearchList = {};
  }
  createCityList(citySearchList);
  $("#current-weather").hide();
  $("#forecast-weather").hide();
  // click event for search button
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input")
      .val()
      .trim()
      .toLowerCase();
    if (city !== "") {
      citySearchList[city] = true;
      localStorage.setItem("citySearchList", JSON.stringify(citySearchList));
      cityWeather(city, citySearchList);
      $("#current-weather").show();
      $("#forecast-weather").show();
      $("#city-input").val("");
    }
  });
  // click event for stored city list
  $("#city-list").on("click", "button", function (event) {
    event.preventDefault();
    var city = $(this).text();
    cityWeather(city, citySearchList);
    $("#current-weather").show();
    $("#forecast-weather").show();
  });
  // click event to clear local storage
  $("#clear-button").on("click", function (event) {
    event.preventDefault();
    $("#city-list").empty();
    localStorage.clear("citySearchList");
    citySearchList = {};
  });
});