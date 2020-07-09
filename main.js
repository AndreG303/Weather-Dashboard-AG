var APIKey = "2efbefc69bad42dadfabf9181ef2a469";


function weather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + APIKey;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
    $(".city").text(response.name);
    $(".wind").text(response.wind.speed);
    $(".humidity").text(response.main.humidity);
    $(".temp").text(response.main.temp);
    $(".forecast").text(response.main.temp);
});
}

$("#search").on("click", function(){
var city=$("#citySearch").val();
weather(city);
forecast(city);
})

function forecast(city) {
var queryURL="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+ APIKey;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
console.log(response)

// for (i=0)

});
}

// function for each api 
// weather 
// forecast loop dinamically create the bootstrap cards. pick time of the day, noon or three
// use append to create the card 
// uv index green yellow or red