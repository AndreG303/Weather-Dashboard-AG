# Weather-Dashboard-AG

A weather-dashboard application retrieving data from a third party API (openWeather API), using HTML, CSS and Jquery. I used localStorage to store any persistent data.


Link: https://andreg303.github.io/Weather-Dashboard-AG/index.html

![Screen Shot 2020-07-13 at 6 50 02 PM](https://user-images.githubusercontent.com/65183415/87361237-c5c43780-c539-11ea-9b57-25be063e313d.png)



## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```
## Features
```
UV Index color information based on the UV Index value.
Being exposed to strong ultraviolet rays for extended periods of time can be dangerous, 
causing sunburn and possibly skin cancer. The colors are depicted as follows:

Green - UVI under 3 (1-2), no protection advised.
Yellow - UVI under 6 (3-6), protection advised.
Orange - UVI under 8 (6-7), protection advised.
Red - UVI under 11 (8-10), protection strongly advised.
Purple - UVI 11+, protection strongly advised.
```
## Technology
```
HTML
CSS
JavaScript
JQuery
bootstrap
Moment.js
Open Weather Api
```
## Resources

OpenWeather API documentation,
Moments.js documentation, 
W3 Schools,
Stack Overflow.
