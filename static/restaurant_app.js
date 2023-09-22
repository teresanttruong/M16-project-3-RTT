// Establish link to CSV Data
let url = 'http://127.0.0.1:5000/get_data' // or link csv file


// Create base map and layer to hold restaurant markers
function createMap(restaurants_layers) {

  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  });

  let baseMaps = {
      "Street Map": streetmap
    };

    let overlayMaps = {
        "RESTAURANT LAYER": restaurants_layers
      };

  let map = L.map("map", {
      center: [39.83, -98.58],
      zoom: 5,
      layers: [streetmap, restaurants_layers] 
    })

  let legend = L.control({position: 'bottomleft'});
  legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        
        div.innerHTML = '<strong>Legend</strong><br>';
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.4)';

        let types = ["Burger Joints",
                    "Hot Dogs",
                    "Ice Cream Shops",
                    "Sandwich Shops",
                    "Breakfast Spots",
                    "Chicken Joints",
                    "Pizza Shops",
                    "Mexican Restaurants"];

        let icons = ['map_icons/hamburger.png',
                    'map_icons/hotdog.png',
                    'map_icons/icecream.png',
                    'map_icons/sandwich.png',
                    'map_icons/breakfast.png',
                    'map_icons/chicken.png',
                    'map_icons/pizza.png',
                    'map_icons/mexican.png'];
    
        // Loop through our intervals and generate a label with a colored square for each interval.
        for (let i = 0; i < types.length; i++) {
          div.innerHTML +=  (" <img src="+ icons[i] +" height='20' width='20'>  " ) + types[i] +'<br>';
        }
        return div;
      };

  legend.addTo(map)
    
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
  }).addTo(map);

}

// Create Restaurant markers
function createMarkers(response) {
  let recordedRestaurants = response.Restaurant;

  let restaurantMarkers = []

  for (let index = 0; index < recordedRestaurants.length; index++) {
      let restaurant = recordedRestaurants[index]

      let restaurantMarker = L.circle([restaurant.latitude,restaurant.longitude], {
          fillOpacity: 0.25,
      
        })
      //Create popup that includes location, depth, and magnitude
      .bindPopup(`<h2>Name: ${restaurant.name}</h2> <hr> 
                  <h3>Category: ${restaurant.categories} <br>
                      Address: ${restaurant.address}</h3>`)

      restaurantMarkers.push(restaurantMarker)
  }

  createMap(L.layerGroup(restaurantMarkers))

}

d3.json(url).then(createMarkers)