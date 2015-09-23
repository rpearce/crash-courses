/*
 *
 * This work is created entirely for educational
 * purposes by Robert Pearce and should be done
 * much better than this. So don't copy & paste.
 *
 */

;(function() {
  var currentLoaded = false;
  var forecastLoaded = false;
  var cityQuery = 'Charleston, SC';
  var cityDisplayed = '';

  fetchAll();

  var cityNode = document.querySelector('[data-js="cityNameInput"]');
  cityNode.addEventListener('change', function(e) {
    cityQuery = this.value;
    fetchAll();
  });

  function fetchAll() {
    fetchCurrent();
    fetchForecast();
  }

  function fetchCurrent() {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(cityQuery));
    req.onload = handleLoadCurrent;
    req.send();
  }

  function fetchForecast() {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + encodeURIComponent(cityQuery) + '&cnt=10');
    req.onload = handleLoadForecast;
    req.send();
  }

  function handleLoadCurrent(res) {
    var data = JSON.parse(res.target.response);
    var city = data.name;
    cityDisplayed = city;
    var cityWeatherCurrent = data.weather[0].description;
    var cityTempCurrent = kelvinToFahrenheit(data.main.temp);

    document.querySelector('[data-js="cityNameInput"]').value = city;
    document.querySelector('[data-js="cityWeatherCurrent"]').innerText = cityWeatherCurrent;
    document.querySelector('[data-js="cityTempCurrent"]').innerText = cityTempCurrent;

    currentLoaded = true;
    checkAllLoaded();
  }

  function handleLoadForecast(res) {
    console.log(JSON.parse(res.target.response));
    var data = JSON.parse(res.target.response);
    var markup = '';

    data.list.forEach(function(day) {
      console.log(day);
      var date = new Date(day.dt * 1000);
      var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var weekday = weekdays[date.getDay()];
      var high = kelvinToFahrenheit(day.temp.max);
      var low = kelvinToFahrenheit(day.temp.min);
      //'<td class="day__weather"><img src="http://openweathermap.org/img/w/'+day.weather[0].icon+'.png" /></td>' + // if you want to see the openweather icons
      markup += '<tr class="day">' +
        '<th class="day__name">' + weekday + '</th>' +
        '<td class="day__weather"><i data-icon="'+ getConditionsIcon(day.weather[0].id) +'"></i></td>' +
        '<td class="day__high">' + high + '</td>' +
        '<td class="day__low">' + low + '</td>';
    });

    document.querySelector('[data-js="daysInner"]').innerHTML = markup;

    forecastLoaded = true;
    checkAllLoaded();
  }

  function kelvinToFahrenheit(kelvin) {
    return Math.round(kelvin * (9/5) - 459.67);
  }

  function getConditionsIcon(code) {
    var codeStr = code.toString();
    var icon = 'H';
    switch (parseInt(codeStr[0])) {
      case 2:
        icon = 'P';
        break;
      case 3:
        icon = 'Q';
        break;
      case 5:
        icon = 'R';
        break;
      case 6:
        icon = 'W';
        break;
      case 7:
        icon = 'E';
        break;
      case 8:
        if (code === 800) {
          icon = 'B';
        } else {
          icon = 'Y';
        }
        break;
      case 9:
        console.log('9xx');
        break;
      default:
        console.log('foobar');
    }

    return icon;
  }

  function checkAllLoaded() {
    if (currentLoaded && forecastLoaded) {
      document.querySelector('[data-js="main"]').className = 'main';
    }
  }
})();
