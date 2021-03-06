mapboxgl.accessToken = 'pk.eyJ1Ijoib3JraWVzdHJhIiwiYSI6ImNpanVyOGswZDBmeWV1N204amQycnkxc2QifQ.8P8vVgmXM58ophUOAYLWrg';

// Standard set up
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/orkiestra/cimew8n1g00mg9pm0ytnub6h5',
  center: [-79.399527,43.721970],
  zoom: 10.75
});

map.on('load', function(){
// Ad cemetery land to map
    map.addSource('CemeteryLand', {
        type: 'vector',
        url: 'mapbox://orkiestra.apdnm66q'
    });

    map.addLayer({
        "id": "cemeteryLandUse",
        "type": "fill",
        "source": "CemeteryLand",
        "paint": {
            "fill-color": "#7f3392",
            "fill-opacity": 0.4
        },
        "filter": ["==", "$type", "Polygon"],
        'source-layer': 'landuse_cemetery_toronto-585sna'
    });

// Add parkspace to map
    map.addSource('GreenSpace', {
        type: 'vector',
        url: 'mapbox://orkiestra.8nl0dxlq'
    });

    map.addLayer({
        "id": "parks",
        "type": "fill",
        "source": "GreenSpace",
        "paint": {
            "fill-color": "#009226",
            "fill-opacity": 0.4
        },
        "filter": ["==", "$type", "Polygon"],
        'source-layer': 'city_green_space_wgs84'
    });


// Add cemeteries to map 
    map.addSource('Cemeteries', {
        type: 'vector',
        url: 'mapbox://orkiestra.83c8sjzy'
    });
    map.addLayer({
        'id': 'cmtry',
        'type': 'symbol',
        'source': 'Cemeteries',
        'layout': {
            'visibility': 'visible',
            'icon-image': '12174',
            'icon-size': .05
        },
        'paint': {},
	
        'source-layer': 'List_of_cemeteries_in_Toronto'
    });


//     Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'cmtry', function(e) {
//         Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

//         Populate the popup and set its coordinates
//         based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML("<b>" + e.features[0].properties.Name + "</b>")
            .addTo(map);
    });

    map.on('mouseleave', 'cmtry', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });    

});
// add markers to map
// geojson.features.forEach(function(marker) {
// 
//   create a HTML element for each feature
//   var el = document.createElement('div');
//   el.className = 'marker';
// 
//   make a marker for each feature and add to the map
//   new mapboxgl.Marker(el)
//   .setLngLat(marker.geometry.coordinates)
//   .addTo(map);
// });