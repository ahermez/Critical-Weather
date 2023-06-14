var rootUrl = "https://api.openweathermap.org";
var apiKey = "0df9efb79a7d906dfcba73a75ec8bd8a";

// different function syntax

// function (response) {
//     return response.json();
// }

// (response) => {
//     return response.json()
// }

// (response) => response.json();

function search(city) {
  console.log(city);
  fetch(`${rootUrl}/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $(".main-weather").empty()
      var iconNumber = data.weather[0].icon;
      var imgUrl = `${rootUrl}/img/w/${iconNumber}.png`;
      var todaysWeather = $(`
        <h2>City: ${data.name}</h2>
        <p>Temperature: ${data.main.temp}</p>
        <p>Humidity: ${data.main.humidity}</p>
        <p>Wind Speed: ${data.wind.speed}</p>
        <img src="${imgUrl}" alt="${data.weather[0].description}"/>
        <p>${data.weather[0].description}</p>
        `);

      $(".main-weather").append(todaysWeather);
    });
  // 5 day forecast
  fetch(`${rootUrl}/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("5 day", data);
      let currentDay = undefined;
      $(".five-day-forecast").empty()
      data.list.forEach((day, i) => {
        if (!currentDay) {
          currentDay = dayjs.unix(day.dt);
        }

        if (currentDay && i > 0) {
          if (dayjs.unix(day.dt).diff(currentDay, "hour") < 23) return;
        }

        currentDay = dayjs.unix(day.dt);

        var iconNumber = day.weather[0].icon;
        var imgUrl = `${rootUrl}/img/w/${iconNumber}.png`;
        var dayWeather = $(`
                <div class="" >
                <h2>Date: ${dayjs.unix(day.dt).format("MM/DD/YYYY")}</h2>
                <p>Temperature: ${day.main.temp}</p>
                <p>Humidity: ${day.main.humidity}</p>
                <p>Wind Speed: ${day.wind.speed}</p>
                <img src="${imgUrl}" alt="${day.weather[0].description}"/>
                <p>${day.weather[0].description}</p> </div>`);

        $(".five-day-forecast").append(dayWeather);
      });
    });
}

function saveSearch(cityName){
var storedResults=document.getElementById("input-box").value ;
localStorage.setItem(cityName, storedResults)
var historyButton=document.createElement("li");
historyButton.className += "history-button";
historyButton.textContent = storedResults;
$("#history-list").append(historyButton)
}

$(function () {
  $("#search").on("click", function (event) {
    console.log("click");
    event.preventDefault();
    let city = $("#input-box").val().trim(); 
    saveSearch("")
    search(city);
  });
});
$(document).on("click", "#history-list li", function(){
  var cityList=$(this).text();
  search(cityList)
})





