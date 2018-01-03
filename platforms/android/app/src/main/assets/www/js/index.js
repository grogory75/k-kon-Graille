/*
 * GOOGLE PLACES : AIzaSyDdF-17_w3fGIWzE4rOvEFe334yhxsndMk 
 * GOOGLE MAP :  AIzaSyCPgLiTF0y8vh5-uegfvLoDwC1isHBNJnQ 
 *
 *
 *
 */
 var lati;
 var longi;
 var map;

$(document).ready(function() {

  var city = localStorage.getItem("city"); //on récupere la variable localStorage ayant pour clé city, puis on la met dans une variable
  var cardSelector = $("#card"); //on mets notre sélecteur dans une variable

  function getWeather() { // on crée une fonction qui récupere la météo avec les instructions suivantes
    if (city == null) { // on teste si la variable city est nulle
      cardSelector.append("<p>Vous n'avez pas encore renseign&eacute; de ville.</p>"); // on affiche un message dans la card
    } else { // sinon ...
      $("#card *:not(div)").remove();

      var myAPPID = "7e181b27cf94564bb5e54c5402ff9bb7"; //ici on déclare notre APPID pour OpenWeatherMap
	 
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?APPID=" + myAPPID + "&q=" + city, function(result) { // on mets le résultat dans une variable result qui vaut le code JSON qu'on voit dans le navigateur
        var cityName = result.name; // le nom de la ville est directement accesible donc pas de souci
        var weatherType = result.weather[0].main; // la description du temps est dans le tableau weather (un tableau est défini par des []), on vise le premier (0 = le premier en programmation), puis on prend la valeur de main
        var iconCode = result.weather[0].icon; // Meme chose qu'au dessus sauf qu'on prend la valeur de icon
        var temp = result.main.temp; // cette fois ci on va dans main qui n'est pas un tableau donc pas de '[]', on va de main a temp sans souci
        var tempInCelsius = (temp - 273.15).toFixed(1); // notre temperature est en Kelvin donc on effectue notre soustration pour l'avoir en Celsius, puis le toFixed permet d'arrondir une valeur, le 1 correspond à un chiffre apres la virgule

        // ici on rempli la card avec nos valeurs, premierement la liste d'information, puis ensuite on affiche l'image avec le code icone
        cardSelector.append("<ul><li>City : " + cityName + "</li><li>Weather type : " + weatherType + "</li><li> Temperature : " + tempInCelsius + " &deg;C</li></ul>");
        cardSelector.append("<img src='img/" + iconCode + ".png' alt='Weather Icon' width='80px' height='80px'>");

        // voila notre utilisateur voit les informations météo de sa ville
      });
    }
  }

  function submitForm() { // on crée une fonction qui récupere la valeur du formulaire
    var mycity = $('input').val(); // on récupere la valeur de notre input avec .val() et on la mets dans une variable
    if (mycity.length >= 3) { // si la variable donc la ville de l'utilisateur est plus grande ou egale que 3 caracteres alors ...
      localStorage.setItem("city", mycity); // on crée une variable localStorage, avec pour clé city et comme valeur la ville de l'utilisateur
      city = mycity; // on donne la ville à la variable city qui est utilisée dans la fonction getWeather
      getWeather(); // on appelle la fonction getWeather pour récuperer la météo de cette ville, ville qui est stockée dans la variable city
    } else { // si le champs fait 2 caracteres ou moins on ...
      alert('empty field'); // affiche une erreur
    }
  }

  $('#getWeather').on('click', function() { // quand on commence à toucher le bouton avec l'id getWeather, alors ...
    submitForm(); // ... on appelle la fonction submitForm qui va traiter ce qu'il y a dans le champ de la ville
  });

  $('form').submit(function(event) { // quand on soumet le formulaire, c'est à dire qu'on appuie sur la touche Entrée, alors ...
    event.preventDefault(); // ici on annule le comportement par défault qui est de recharger la page quand on soumet un formulaire
    submitForm(); // ... on appelle la fonction submitForm qui va traiter ce qu'il y a dans le champ de la ville
  });

  getWeather(); // ici on appelle à l'allumage de l'application la fonction getWeather
  getLocation();
  navigator.notification.beep(2);
  
    $('#getMiam').on('click', function() { 
		navigator.notification.prompt(
			'Please enter your name',  // message
			onPrompt,                  // callback to invoke
			'Registration',            // title
			['Ok','Exit'],             // buttonLabels
			'Jane Doe'                 // defaultText
		);		
	});
	
	function onPrompt(results) {
		alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
	}
  
	var x = document.getElementById("demo");
	function getLocation()
	{
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	function showPosition(position)
	{
		var latlon = position.coords.latitude + "," + position.coords.longitude;
		console.log(latlon);
		lati = position.coords.latitude; 
		longi = position.coords.longitude;
		
		//var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyCPgLiTF0y8vh5-uegfvLoDwC1isHBNJnQ";
		//document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
		getMap(position.coords.latitude, position.coords.longitude);
		
	}  
	function showError(error)
	{
		switch(error.code) {
			case error.PERMISSION_DENIED:
				x.innerHTML = "User denied the request for Geolocation."
				break;
			case error.POSITION_UNAVAILABLE:
				x.innerHTML = "Location information is unavailable."
				break;
			case error.TIMEOUT:
				x.innerHTML = "The request to get user location timed out."
				break;
			case error.UNKNOWN_ERROR:
				x.innerHTML = "An unknown error occurred."
				break;
		}
	}
	function getMap(latitude, longitude)
	{
		var mapOptions = {
			center: new google.maps.LatLng(0, 0),
			zoom: 1,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map
		(document.getElementById("mapholder"), mapOptions);


		var latLong = new google.maps.LatLng(latitude, longitude);

		var image = {
			url: '../img/giphy.gif',
			// This marker is 20 pixels wide by 32 pixels high.
			size: new google.maps.Size(40, 40),
			// The origin for this image is (0, 0).
			origin: new google.maps.Point(0, 0),
			// The anchor for this image is the base of the flagpole at (0, 32).
			anchor: new google.maps.Point(0, 40)
		};
		
		
		var marker = new google.maps.Marker({
			position: latLong,
			animation: google.maps.Animation.DROP,
			//icon: image
		});

		marker.setMap(map);
		map.setZoom(15);
		map.setCenter(marker.getPosition());
	}
	
	
	function getPlaces(latitude, longitude) {

		var latLong = new google.maps.LatLng(latitude, longitude);

		var mapOptions = {

			center: new google.maps.LatLng(latitude, longitude),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP

		};

		Map = new google.maps.Map(document.getElementById("mapholder"), mapOptions);

		Infowindow = new google.maps.InfoWindow();

		var service = new google.maps.places.PlacesService(Map);
		service.nearbySearch({
			location: latLong,
			radius: 500,
			type: ['restaurant']
		}, foundStoresCallback);

	}

	// Success callback for watching your changing position

	var onPlacesWatchSuccess = function (position) {

		var updatedLatitude = position.coords.latitude;
		var updatedLongitude = position.coords.longitude;

		if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

			Latitude = updatedLatitude;
			Longitude = updatedLongitude;

			getPlaces(updatedLatitude, updatedLongitude);
		}
	}

	// Success callback for locating stores in the area

	function foundStoresCallback(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}
		}
	}

	// Place a pin for each store on the map

	function createMarker(place) {

		var placeLoc = place.geometry.location;

		var marker = new google.maps.Marker({
			map: Map,
			position: place.geometry.location
		});

		google.maps.event.addListener(marker, 'click', function () {

			Infowindow.setContent(place.name);
			Infowindow.open(Map, this);

		});
	}

	// Error callback

	function onPlacesError(error) {
		console.log('code: ' + error.code + '\n' +
			'message: ' + error.message + '\n');
	}

	// Watch your changing position

	function watchPlacesPosition() {

		return navigator.geolocation.watchPosition
		(onPlacesWatchSuccess, onPlacesError, { enableHighAccuracy: true });
	}	
	
	$('#getRestau').on('click', function() {
		getPlaces(lati, longi);
	});
  
});