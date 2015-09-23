;(function() {
  var req = new XMLHttpRequest();
  req.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=Charleston,SC');
  req.onload = handleLoad;
  req.send();

  function handleLoad(res) {
    console.log(JSON.parse(res.target.response));
  }
})();
