const api = 'http://api.openweathermap.org/data/2.5/weather?'
const apikey = '&APPID=f814d0e4585b1589c7589c972e5e1cb7'
let intervalid
let tmp

window.onload = getLoc()

function sendRequest (url) {
  tmp = setInterval(function () {
    if (intervalid === undefined)
      intervalid = tmp
    else if (intervalid !== tmp) {
      clearInterval(intervalid)
      intervalid = tmp
    }
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        var data = JSON.parse(xhttp.responseText)
        update(data)
      }
    }
    xhttp.open('GET', url, true)
    xhttp.send()
  }, 3000)
}

function getLoc () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    alert('Enter pin code')
  }
}

function getPin () {
  let pin = prompt('Enter the pincode')
  if (pin !== null) {
    let url = api + 'q=' + pin + apikey
    sendRequest(url)
  }
}

function update (data) {
  var temp = document.getElementById('temperature')
  var name = document.getElementById('location')
  var humidity = document.getElementById('humidity')
  var wind = document.getElementById('windspeed')
  var icon = document.getElementById('icon')

  temp.innerHTML = (data.main.temp - 273.15).toFixed(1) + '\xB0'
  name.innerHTML = data.name
  humidity.innerHTML = data.main.humidity + '%'
  wind.innerHTML = data.wind.speed + 'mph'
  icon.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
}

function showPosition (position) {
  lat = position.coords.latitude
  lon = position.coords.longitude
  let url = api + 'lat=' + lat + '&lon=' + lon + apikey
  sendRequest(url)
}
