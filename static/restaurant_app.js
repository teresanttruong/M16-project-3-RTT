// Establish link to CSV Data
let url = 'http://127.0.0.1:5000/get_data' // or link csv file


// Create base map and layer to hold restaurant markers
function createMap(restaurants) {

  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  });

  let baseMaps = {
      "Street Map": streetmap
    };

  let overlayMaps = {
      "Burger Joints": burger,
      "Hot Dogs" : hotdogs,
      "Ice Cream Shops" : icecream,
      "Sandwich Shops" : sandwich,
      "Breakfast Spots" : breakfast,
      "Chicken Joints" : chicken,
      "Pizza Shops" : pizza,
      "Mexican Restaurants" : mex
    };

  let map = L.map("map", {
      center: [39.83, -98.58],
      zoom: 5,
      layers: [streetmap, burger, hotdogs, icecream, sandwich, breakfast, chicken, pizza, mex] 
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
    
  L.control.layers(baseMaps, {
      collapsed: false
  }).addTo(map);

}

// Determine marker icon
function chooseIcon(categories) {
    switch (true) {
        case /Hamburger/.test(categories):
            return 'map_icons/hamburger.png'
            console.log("• Matched 'Hamburger' test");
            break;

        case /Hot Dogs/.test(categories):
            return 'map_icons/hotdog.png'
            console.log("• Matched 'hotdog' test");
            break;

        case /Ice Cream/.test(categories):
            return 'map_icons/icecream.png'
            console.log("• Matched 'icecream' test");
            break;

        case /Sandwich/.test(categories):
            return 'map_icons/sandwich.png'
            console.log("• Matched 'sandwich' test");
            break;    
    
        case /Breakfast/.test(categories):
            return 'map_icons/breakfast.png'
            console.log("• Matched 'breakfast' test");
            break;

        case /Chicken/.test(categories):
            return 'map_icons/chicken.png'
            console.log("• Matched 'chicken' test");
            break;

        case /Pizza/.test(categories):
            return 'map_icons/pizza.png'
            console.log("• Matched 'pizza' test");
            break;

        case /Mexican/.test(categories):
            return 'map_icons/mexican.png'
            console.log("• Matched 'mexican' test");
            break;

        default: return 'gray'
    }
}

// Create Restaurant markers
function createMarkers(response) {
  let recordedRestaurants = response.features;
  let restaurantMarkers = []

  for (let index = 0; index < recordedRestaurants.length; index++) {
      let restaurant = recordedRestaurants[index]

      let restaurantMarker = L.circle([restaurant.geometry.coordinates[1],restaurant.geometry.coordinates[0]], {
          fillOpacity: 0.25,
          //Color is based on Type of Restaurant
          color: chooseColor(restaurant.geometry.coordinates[2]),
          fillColor: chooseColor(restaurant.geometry.coordinates[2]),
      })
      //Create popup that includes location, depth, and magnitude
      .bindPopup(`<h2>Location: ${restaurant.properties.place}</h2> <hr> 
                  <h3>Depth: ${restaurant.geometry.coordinates[2]} <br>
                      Magnitude: ${restaurant.properties.mag}</h3>`)

      restaurantMarkers.push(restaurantMarker)
  }

  createMap(L.layerGroup(restaurantMarkers))
}

d3.json(url).then(data => {console.log(data);}).then(createMap())

// // Get data from url and call createMarkers
// d3.csv(url).then(createMarkers)


// // Function to retrieve data from Flask API
// function fetchData() {
//   fetch('http://127.0.0.1:5000/data')
//       .then(response => response.json())
//       .then(data => {
//           data.forEach(item => {
//               const marker = L.marker([item.lat, item.lon]).addTo(map);
//               marker.bindPopup(item.name);
//           });
//       })
//       .catch(error => console.error('Error:', error));
// }

// // Call the fetchData function to load data and display markers
// fetchData();

// console.log(response.json())


// // Initialize the map
// const map = L.map('map').setView([39.449, -98.571], 5); 

// // Load and display the tile layer (e.g., OpenStreetMap)



// // Sample data (replace with data retrieved from SQLite)
// const data = [
//   { lat: 37.7749, lon: -122.4194, name: 'Marker 1' },
//   { lat: 34.0522, lon: -118.2437, name: 'Marker 2' },
//   // Add more data points as needed
// ];

// // Iterate through the data and create markers on the map
// data.forEach(item => {
//   const marker = L.marker([item.lat, item.lon]).addTo(map);
//   marker.bindPopup(item.name);
// });


// const express = require('express');
// const sqlite3 = require('sqlite3').verbose();

// const app = express();
// // const db = new sqlite3.Database('Module_16_Project_3_and_Data_Ethics\M16-project-3-RTT\data\restaurants.db');

// //**  Reference of SQLite DB
// app.get('/data', (req, res) => {
//   // Query the database and send the data as a response
//   db.all('SELECT * FROM restaurants', (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

// //**   Insert Base Map
// const map = L.map('map').setView([39.449, -98.571], 5);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; OpenStreetMap contributors'
// }).addTo(map);







// //**  Fetch Data from SQLite and Add Markers to Map
// fetch('http://127.0.0.1:5000/data')
//   .then(response => response.json())
//   .then(data => {
//     data.forEach(item => {
//       const marker = L.marker([item.lat, item.lng]).addTo(map);
//       marker.bindPopup(`<b>${item.name}</b><br>${item.description}`);
//     });
//   })
//   .catch(error => console.error('Error fetching data:', error));
