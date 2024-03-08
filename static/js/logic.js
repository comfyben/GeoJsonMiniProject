// make your map
let myMap = L.map('map', {
    center: [38.627003,-90.199402], //somewhere in the midwest
    zoom: 5

})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap)


let link = 'https://data-usfs.hub.arcgis.com/datasets/usfs::fs-national-forests-dataset-us-forest-service-proclaimed-forests.geojson?where=1=1&outSR=%7B%22latestWkid%22%3A4269%2C%22wkid%22%3A4269%7D'

  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // Styling each feature 
      style: function(feature) {
        return {
          color: "green",
          fillColor:"yellow",
          fillOpacity: 0.74      
      };
    },
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        // Set the mouse events to change the map styling.
        layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h1>" + feature.properties.FORESTNAME + "</h1> <hr> <h2>" + feature.properties.FORESTNAME + "</h2>");
      }
    }).addTo(myMap);
  })









