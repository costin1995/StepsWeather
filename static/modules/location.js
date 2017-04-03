'use strict';

// Weather appid: fd15a5b66f337358eabe71273a37748a

class Location {
  /**
   * Class constructor
   */
  constructor(city = '') {

    this.city = city;
	this.baseWeatherUrl = 'http://api.openweathermap.org/data/2.5/';
	this.weatherApiKey = 'fd15a5b66f337358eabe71273a37748a';
    this.ready = this.ready.bind(this);
    this.loadPosition = this.loadPosition.bind(this);
    this.loadWeatherDataClickEvent = this.loadWeatherDataClickEvent.bind(this);
		// Added sidebar as a property so we can hide it when clicking the links
		this.sidebar = document.querySelector('steps-sidebar');
	this.spinnerTimeout = setTimeout(this.showSpinner, 200);


		this._initLinks();
    if ( !city && navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(this.loadPosition);
    }
  }
  
  showSpinner(){
	document.querySelector('steps-view.visible .wrapper').classList.add('pending');
  }
  
  hideSpinner(){
	document.querySelector('steps-view.visible .wrapper').classList.remove('pending');
  }

	/**
	 * Add a new event for links that have a js-weather attribute
	 *
	 * @private
   */
	_initLinks() {
		let links = document.querySelectorAll('a[js-weather]');

		for(let i=0;i<links.length;i++){
			links[i].addEventListener('click', this.loadWeatherDataClickEvent);
		}
	}

	/**
	 * When clicking on links that will show the weather, just set the current city and ask for the weather
	 * by calling ready()
	 * 
	 * @param evt
	 * @returns {*}
   */
	loadWeatherDataClickEvent(evt) {
		evt.stopPropagation();
		evt.preventDefault();

		let url_params = evt.target.getAttribute('href').split('/');
		let city = url_params[url_params.length - 1];
		this.city = city;
		this.sidebar.hideSidenav();
		return this.ready();
	}

  async ready () {
	  
    let weather = await this.getWeather(this.city);
	
	//add info
	
	//card.innerHTML = input.value;
	var container = document.querySelector('steps-view.visible .wrapper');
		container.innerHTML = '';
	
	var city = document.createElement('h1');
	city.className = 'weather-city';
	city.innerHTML = this.city;
	
	for(let i=0; i< weather.data.weather.length; i++){
		let weather_components = weather.data.weather[i];
		var desc = weather_components.description;
		var icon = weather_components.icon;
	}
	
	var header = document.createElement('div');
	header.className = 'weather-description';
	
	var weather_title = document.createElement('h2');
	var icon_class;
	
	switch(icon){
		case '11d':
			icon_class = 'wi wi-thunderstorm';
			break;
		case '09d':
			icon_class = 'wi wi-sprinkle';
			break;
		case '10d':
			icon_class = 'wi wi-rain';
			break;
		case '13d':
			icon_class = 'wi wi-snow';
			break;
		case '50d':
			icon_class = 'wi wi-fog';
			break;
		case '01d':
			icon_class = 'wi wi-day-sunny';
			break;
		case '01n':
			icon_class = 'wi wi-night-clear';
			break;
		case '02d':
			icon_class = 'wi wi-day-sunny-overcast';
			break;
		case '02n':
			icon_class = 'wi wi-night-partly-cloudy';
			break;
		case '03d':
			icon_class = 'wi wi-day-cloudy';
			break;
		case '03n':
			icon_class = 'wi wi-night-alt-cloudy';
			break;
		case '04d':
			icon_class = 'wi wi-cloudy';
			break;
		case '04n':
			icon_class = 'wi wi-cloudy';
			break;
		default:
			icon_class = 'wi wi-na';
	}
	weather_title.className = 'weather-title';
	weather_title.innerHTML = desc;
	
	var img = document.createElement('i');	
	img.className = icon_class + ' weather-icon';
	
	header.appendChild(city);
	header.appendChild(img);
	header.appendChild(weather_title);
	
	container.appendChild(header);
	
	/*var info = document.createElement('ul');
	info.className = 'basic-weather-info';
	info.innerHTML = '<li><i class="wi wi-thermometer weather-symbols"></i>' + weather.data.main.temp
						+ '</li><li><i class="wi wi-humidity weather-symbols"></i>' + weather.data.main.humidity 
						+ '</li><li><i class="wi wi-barometer weather-symbols"></i>' + weather.data.main.pressure
						+ '</li><li><i class="wi wi-strong-wind weather-symbols"></i>' + weather.data.wind.speed
						+ '</li><li><i class="wi wi-cloud weather-symbols"></i>' + weather.data.clouds.all + '</li>';
	container.appendChild(info);*/
	
	var info = document.createElement('div');
	info.className = 'basic-weather-info';
	
	var temp_line = document.createElement('div');
	temp_line.className = 'temp-line'; // ----
	temp_line.innerHTML = '<ul class="temp-list"><li><i class="wi wi-thermometer weather-symbols"></i></li>'
						+ '<li id="current-temp">' + weather.data.main.temp +  '&#8451</li>'
						+ '<li>MAX<br>' + weather.data.main.temp_max + '&#8451</li>'
						+ '<li>MIN<br>' + weather.data.main.temp_min + '&#8451</li></ul>';
	
	var humidity = document.createElement('div');
	humidity.className = 'info';
	humidity.innerHTML = '<i class="wi wi-humidity weather-symbols"></i><p>' + weather.data.main.humidity  + ' %</p>';
	
	var pressure = document.createElement('div');
	pressure.className = 'info';
	pressure.innerHTML = '<i class="wi wi-barometer weather-symbols"></i><p>' + weather.data.main.pressure  + ' mb</p>';
	
	var wind_speed = document.createElement('div');
	wind_speed.className = 'info';
	wind_speed.innerHTML = '<i class="wi wi-strong-wind weather-symbols"></i><p>' + weather.data.wind.speed  + ' m/s</p>';
	
	var clouds = document.createElement('div');
	clouds.className = 'info';
	clouds.innerHTML = '<i class="wi wi-cloud weather-symbols"></i><p>' + weather.data.clouds.all  + ' %</p>';
	
	info.appendChild(temp_line);
	info.appendChild(humidity);
	info.appendChild(pressure);
	info.appendChild(wind_speed);
	info.appendChild(clouds);
	container.appendChild(info);
	
	if(icon.slice(-1) == 'n')
	{
		document.querySelector('body').className='night-background';
		document.querySelector('html').className='night-background';
	}
	else
	{	
		document.querySelector('html').classList.remove('night-background');
		document.querySelector('body').classList.remove('night-background');
		document.querySelector('.temp-list').style.background = 'linear-gradient(135deg, #4be6f4 0%,#4bbaf2 21%,#4797d3 50%,#4797d3 55%,#4bbaf2 80%,#4be6f4 100%)';
	}

	clearTimeout(this.spinnerTimeout);
	this.hideSpinner();
  }

  /**
   * Get city from google response
   * @param data
   */
  getCity(data) {
    for ( let i = 0; i < data.data.results.length; i++ ) {
      let address_components = data.data.results[i]['address_components'];
      for ( let ac_index = 0; ac_index < address_components.length; ac_index++ ) {
        if ( !address_components[ac_index] ) break;
        for ( let types_index = 0; types_index <  address_components[ac_index].types.length; types_index++ ) {
          let address_type = address_components[ac_index].types[types_index];
          if ( address_type === 'locality' || address_type == 'administrative_area_level_2' ) {
            return address_components[ac_index].long_name;
          }
        }
      }
    }
  }

  /**
   * Async function to reverse geocode current position
   * @param position
   */
  async loadPosition(position) {
    let googleUrl = '//maps.googleapis.com/maps/api/geocode/json?latlng=';
    googleUrl += position.coords.latitude + ',' + position.coords.longitude;
    googleUrl += '&sensor=false';
    let google_response = await axios.get(googleUrl);
	var url = document.location.toString();
	var city = url.substring(22, url.length);
	if(city != ""){
	    this.city = city;
	}
	else
	{
    this.city = this.getCity(google_response);
	}
	//this.city = "Sibiu";

    this.ready();
  }
  
  async getWeather(city){
	  let url = this.baseWeatherUrl + 'weather?q=' + city + ',RO&units=metric&appid=' + this.weatherApiKey;
	  return await axios.get(url);
  }
}

new Location();