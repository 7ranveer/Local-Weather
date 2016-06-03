var units = 'imperial';
var getLocation = function(data) {
  var appid = '6cb1989010d1033eb5764eb965eadfa5';
  var lat = data.lat;
  var lon = data.lon;
  var city = data.city;
  var state = data.regionName;
  url = 'http://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + lon +
    '&appid=' + appid + '&units=';
  getWeather = function(data) {
    var temp = data.main.temp;
    var tempUnit = units === 'metric' ? 'C' : 'F';
    var windUnit = units === 'metric' ? ' meters/sec' : ' miles/hour';
    var description = data.weather[0].description;
    var code = data.weather[0].icon;
    var wspeed = data.wind.speed;
    var html = '<img src="http://openweathermap.org/img/w/' + code +
      '.png" alt="Weather Icon">' + '<p> ' +city+','+state+'</p><p>'+ Math.round(temp) + ' ' + tempUnit + ', ' +
      description + '<br> Wind Speed: ' + wspeed + windUnit + '</p>';
    $('#weatherinfo').html(html);
    switch (tempUnit) {
      case 'F':
        var temps = [86, 68, 32];
        break;
      case 'C':
        temps = [30, 20, 0];
        break;
    }
    var imgs = ['url("http://i.imgur.com/eI5KLUW.jpg")',
      'url("http://i.imgur.com/rG0P1ro.jpg")', 'url("http://i.imgur.com/voCuONs.jpg")',
      'url("http://i.imgur.com/5tFHSKa.jpg")',
    ];
    if (temp >= temps[0]) {
      $('body').css('background-image', imgs[0]);
    } else if (temp < temps[0] && temp >= temps[1]) {
      $('body').css('background-image', imgs[1]);
    } else if (temp < temps[1] && temp >= temps[2]) {
      $('body').css('background-image', imgs[2]);
    } else if (temp < temps[2]) {
      $('body').css('background-image', imgs[3]);
    }
  };
  $.getJSON(url + 'imperial', getWeather);
};
$(document).ready(function() {
  $.getJSON('http://ip-api.com/json', getLocation);
  $('input[type=radio][name=fc]').change(function() {
    if ($('#f').is(':checked')) {
      units = 'imperial';
    } else {
      units = 'metric';
    };
$.getJSON(url + units, getWeather);
  });
});
