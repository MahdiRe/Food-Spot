// var geocoder, map;

let map, markers = [], html, address, lat1, lng1;

$(document).ready(function () {
    initMap();
});

function initMap() {
    const myLatlng = { lat: 6.9271, lng: 79.8612 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: myLatlng,
    });

    const geocoder = new google.maps.Geocoder();

    // geocoder = new google.maps.Geocoder();

    map.addListener("click", (event) => {
        addMarker(event.latLng);
        lat1 = event.latLng.lat();
        lng1 = event.latLng.lng();
        geocodeLatLng({lat: lat1, lng: lng1}, geocoder);
    });

    addMarker(myLatlng);
    geocodeLatLng(myLatlng, geocoder);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    clearMarkers();
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
    markers.push(marker);
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function geocodeLatLng(position, geocoder) {
    const latlng = {
        lat: parseFloat(position.lat),
        lng: parseFloat(position.lng),
    };
    geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                address = results[0].formatted_address;
                html = address;
                $("#address-input").val(results[0].formatted_address);
            }else{
                window.alert("No results found, Try again");
            }
        } else {
            window.alert("Geocoder failed due to: " + status + ". Try again");
        }
    });
}

