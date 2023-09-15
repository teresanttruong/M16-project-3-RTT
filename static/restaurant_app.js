//Establish reference to data
let url = "sqlite:///data/restaurants.sqlite"


//Create base map and layers to hold markers
function createMap(restaurants) {

    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let baseMaps = {
        "Street Map": streetmap
      };

    let overlayMaps = {
        "Restaurants in America": restaurants
      };

    let map = L.map("map", {
        center: [39.83, -98.58],
        zoom: 5,
        layers: [streetmap, restaurants]
      })

    let legend = L.control({position: 'bottomleft'});
    legend.onAdd = function () {
          let div = L.DomUtil.create("div", "info legend");
      
          let grades = [-10, 10, 30, 50, 70, 90];
          let colors = [
            "#33ff99",
            "#33ff33",
            "#99ff33",
            "#ffff33",
            "#ff9933",
            "#ff3333"];
      
          // Loop through our intervals and generate a label with a colored square for each interval.
          for (let i = 0; i < grades.length; i++) {
            div.innerHTML += "<i style='background: "
              + colors[i]
              + "'></i> "
              + grades[i]
              + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
          }
          return div;
        }
    legend.addTo(map)
      
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}


// Determine marker color
function chooseColor(depth) {
    switch (true) {
        case Number(depth) < 10: return '#33ff99'
        case Number(depth) < 30: return '#33ff33'
        case Number(depth) < 50: return '#99ff33'
        case Number(depth)< 70: return '#ffff33'
        case Number(depth) < 90: return '#ff9933'
        case Number(depth) >= 90: return '#ff3333'
        default: return 'gray'
    }
}

  //basemap

//layer for...

//layer for...

//layer for...



//Create markers
//color based on type of restaurant(?)

function createMarkers(response) {
    let recordedRestaurants = response.features;
    let restaurantMarkers = []

    for (let index = 0; index < recordedRestaurants.length; index++) {
        let restaurants = recordedRestaurants[index]

        let restaurantMarker = L.circle([restaurants.geometry.coordinates[1],restaurants.geometry.coordinates[0]], {
            fillOpacity: 0.25,
            //Color is based on type of restaurant  
            color: chooseColor(restaurants.geometry.coordinates[2]),
            fillColor: chooseColor(restaurants.geometry.coordinates[2]),
        })
        restaurantMarkers.push(restaurantMarker)
    }

    createMap(L.layerGroup(restaurantMarkers))
}


//Get data and call createMarkers
d3.json(url).then(createMarkers)
