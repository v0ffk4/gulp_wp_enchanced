//declare style
var style = [
{
	"featureType": "landscape",
	"stylers": [
	{
		"saturation": -100
	},
	{
		"lightness": 65
	},
	{
		"visibility": "on"
	}
	]
},
{
	"featureType": "poi",
	"stylers": [
	{
		"saturation": -100
	},
	{
		"lightness": 51
	},
	{
		"visibility": "simplified"
	}
	]
},
{
	"featureType": "road.highway",
	"stylers": [
	{
		"saturation": -100
	},
	{
		"visibility": "simplified"
	}
	]
},
{
	"featureType": "road.arterial",
	"stylers": [
	{
		"saturation": -100
	},
	{
		"lightness": 30
	},
	{
		"visibility": "on"
	}
	]
},
{
	"featureType": "road.local",
	"stylers": [
	{
		"saturation": -100
	},
	{
		"lightness": 40
	},
	{
		"visibility": "on"
	}
	]
},
{
	"featureType": "transit",
	"stylers": [
	{
		"saturation": -100
	},
	{
		"visibility": "simplified"
	}
	]
},
{
	"featureType": "administrative.province",
	"stylers": [
	{
		"visibility": "off"
	}
	]
},
{
	"featureType": "water",
	"elementType": "labels",
	"stylers": [
	{
		"visibility": "on"
	},
	{
		"lightness": -25
	},
	{
		"saturation": -100
	}
	]
},
{
	"featureType": "water",
	"elementType": "geometry",
	"stylers": [
	{
		"hue": "#ffff00"
	},
	{
		"lightness": -25
	},
	{
		"saturation": -97
	}
	]
}
]


function load() {
	// coordinates to latLng
	var center = new google.maps.LatLng(lat, lng);
	//
	var isDraggable = $(document).width() > 600 ? true : false;
	// map Options
	var mapOptions = {
		draggable: isDraggable,
		zoom: 17,
		center: center,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		"scrollwheel":false,
		"disableDefaultUI": true
	};


	//draw a map
	var map = new google.maps.Map(document.getElementById("jsGmap"), mapOptions);

	//draw infowindow
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	//draw marker
	var marker = new google.maps.Marker({
		position: center,
		map: map,
		title: ''
	});

	//set style
	map.setOptions({styles: style});

	//add event listener to marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
	google.maps.event.trigger( map, "resize" );
	map.setZoom( map.getZoom() );
}

// call the function
google.maps.event.addDomListener(window, 'load', load);
