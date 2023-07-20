// Create a JSON object that contains the latitude, longitude, and name of each city you want to mark.
const cities = [
  { name: "New York", lat: 40.712776, long: -74.005974 },
  { name: "London", lat: 51.507351, long: -0.127758 },
  { name: "Paris", lat: 48.856613, long: 2.352222 },
  { name: "India", lat: 22.390716, long: 72.964949 },
  { name: "China", lat: 35.861660, long: 104.195396 },
  { name: "Russia", lat: 61.524010, long: 105.318756 },
  { name: "Africa", lat: -8.783195, long: 34.508522 },
];
const forests = [
  { name1: "Amazon Rainforest", lat1: -3.4653, long1: -62.2159, area: "5.5 million sq km" },
  { name1: "Congo Basin", lat1: 0.7893, long1: 21.7820, area: "3 million sq km" },
  { name1: "Borneo Rainforest", lat1: 2.8877, long1: 114.8476, area: "743,330 sq km" },
  { name1: "Taiga Forest (Russia)", lat1: 62.0000, long1: 96.0000, area: "10 million sq km" },
  { name1: "Valdivian Rainforest (Chile)", lat1: -40.0000, long1: -73.0000, area: "248,100 sq km" },
  { name1: "Daintree Rainforest (Australia)", lat1: -16.2500, long1: 145.3862, area: "1,200 sq km" },
  { name1: "Tongass National Forest (Alaska)", lat1: 58.9667, long1: -135.0000, area: "68,062 sq km" },
  { name1: "Tropical Rainforest of Sumatra", lat1: -0.5897, long1: 101.3431, area: "2.5 million sq km" },
  { name1: "Black Forest (Germany)", lat1: 48.3705, long1: 8.0837, area: "6,009 sq km" },
  { name1: "Great Bear Rainforest (Canada)", lat1: 53.6423, long1: -128.6442, area: "6.4 million hectares" },
  { name1: "Yosemite National Park (USA)", lat1: 37.8651, long1: -119.5383, area: "3,079 sq km" },
  { name1: "Tarkine Rainforest (Australia)", lat1: -41.5500, long1: 145.8500, area: "3,800 sq km" },
  { name1: "Tumuc-Humac Mountains (French Guiana)", lat1: 3.0000, long1: -53.5000, area: "29,000 sq km" },
  { name1: "Cascadia Rainforest (USA/Canada)", lat1: 47.7590, long1: -123.6336, area: "50,000 sq km" },
  // Add more forests here...
];
// Create an empty object to hold the city markers
const cityMarkers = {};

// Add markers for each city
for (let i = 0; i < cities.length; i++) {
  const city = cities[i];
  

  // Create a sphere geometry with a small radius
  const markerGeometry = new THREE.SphereGeometry(6, 8, 8);

  // Add a mesh to the scene
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
  markerMesh.position.setFromSphericalCoords(
    600,
    Math.PI / 2 - city.lat * Math.PI / 180,
    city.long * Math.PI / 180
  );
  
  scene.add(markerMesh);

  // Add the marker mesh to the cityMarkers object
  cityMarkers[city.name] = markerMesh;

// Create a function to remove the tooltip box
function removeTooltipBox() {
  const tooltipBox = document.querySelector("div.tooltip");
  if (tooltipBox) {
    tooltipBox.parentElement.removeChild(tooltipBox);
  }
}

// Add a mouseenter event listener to the marker mesh
markerMesh.addEventListener("mouseenter", () => {
  // Create a tooltip box with the city name
  const tooltipBox = document.createElement("div");
  tooltipBox.classList.add("tooltip");
  tooltipBox.style.position = "absolute";
  tooltipBox.style.top = "10px";
  tooltipBox.style.left = "10px";
  // tooltipBox.style.top = "590px";
  // tooltipBox.style.left = "50px";
  tooltipBox.style.backgroundColor = "rgba(22, 22, 70, 0.8)";
  tooltipBox.style.padding = "5px";
  tooltipBox.style.color = "white";
  tooltipBox.innerText = city.name;

  // Append the tooltip box to the document body
  document.body.appendChild(tooltipBox);

  // Add a mouseleave event listener to remove the tooltip box
  markerMesh.addEventListener("mouseleave", () => {
    removeTooltipBox();
  });
});

// Function to remove the tooltip box when the mouse leaves the scene
function onMouseLeaveScene() {
  removeTooltipBox();
}

// Attach event listener to remove the tooltip box when the mouse leaves the scene
scene.addEventListener("mouseleave", onMouseLeaveScene);


// Function to fetch weather data for a given latitude and longitude
async function fetchWeatherData(lat, long) {
  const apiKey = "YOUR_WEATHER_API_KEY";
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}';

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Unable to fetch weather data");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


}

// Additional code to handle tooltip visibility
function updateTooltipVisibility() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate intersections with marker meshes
    const intersects = raycaster.intersectObjects(Object.values(cityMarkers));

    // Show tooltip if there is an intersection, hide otherwise
    if (intersects.length > 0) {
      const markerMesh = intersects[0].object;
      markerMesh.dispatchEvent({ type: "mouseenter" });
    } else {
      const tooltipBox = document.querySelector("div.tooltip");
      if (tooltipBox) {
        tooltipBox.parentElement.removeChild(tooltipBox);
      }
    }
  }

  // Attach event listener to update tooltip visibility on mouse movement
  window.addEventListener("mousemove", onMouseMove, false);
}

// Call the updateTooltipVisibility function to start listening for mouse movement
updateTooltipVisibility();


  // Load all countries from a GeoJSON file
  fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
    .then(response => response.json())
    .then(data => {
      // // Create a group to hold all country meshes
      // const countryGroup = new THREE.Group();
      // countryGroup.name = "countries";
      // scene.add(countryGroup);
  
      // Loop over all countries and add a mesh for each one
      for (let i = 0; i < data.features.length; i++) {
        const country = data.features[i];
  
        // Create a shape geometry from the country's coordinates
        const shapeGeometry = new THREE.ShapeGeometry(
          new THREE.Shape(country.geometry.coordinates.flat().map(coord => new THREE.Vector2(coord[0], coord[1])))
        );
  
        // Create a mesh for the shape
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new THREE.Mesh(shapeGeometry, material);
        countryGroup.add(mesh);
  
        // Set the mesh position based on the centroid of the country's coordinates
        const centroid = country.geometry.coordinates.flat().reduce(
          (acc, coord) => ({ x: acc.x + coord[0], y: acc.y + coord[1] }),
          { x: 0, y: 0 }
        );
        centroid.x /= country.geometry.coordinates.flat().length;
        centroid .y /= country.geometry.coordinates.flat().length;
        mesh.position.setFromSphericalCoords(600, Math.PI / 2 - centroid.y * Math.PI / 180, centroid.x * Math.PI / 180);
      }
    });

    // Function to get the name of the country at a given latitude and longitude
    function getCountry(lat, long) {
    // Load country borders from a GeoJSON file
    return fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
    .then(response => response.json())
    .then(data => {
    // Loop over all countries and check if the given latitude and longitude is inside the country's borders
    for (let i = 0; i < data.features.length; i++) {
    const country = data.features[i];
        // Convert the country's coordinates to a THREE.js shape
        const shape = new THREE.Shape(country.geometry.coordinates.flat().map(coord => new THREE.Vector2(coord[0], coord[1])));

        // Check if the given latitude and longitude is inside the shape
        if (shape.containsPoint(new THREE.Vector2(long, lat))) {
          return country.properties.name;
        }
      }
    
      // If no country was found, return "unknown"
      return "unknown";
    })
    .catch(error => {
      console.error(error);
      return "unknown";
    });
}    
  