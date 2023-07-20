let camera, scene, renderer;
let globeMesh, satelliteMesh;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let satelliteOrbitRadius = 800;
let asteroids = [];
let asteroidOrbitRadius = 1000;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 1000;
	scene = new THREE.Scene();

	// Load the world map texture
	const textureLoader = new THREE.TextureLoader();
	const texture = textureLoader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');

	// Create a sphere with the world map texture
	const geometry = new THREE.SphereGeometry(600, 40, 40);
	const material = new THREE.MeshBasicMaterial({ map: texture });
	globeMesh = new THREE.Mesh(geometry, material);
	scene.add(globeMesh);

	// Add stars in the background
    const starGeometry = new THREE.SphereGeometry(3000, 64, 64);
    const starMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load('4k.png'),
        side: THREE.BackSide
    });
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starMesh);

	// Add satellites
	const satelliteGeometry = new THREE.SphereGeometry(10, 16, 16);
	const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
	satelliteMesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
	scene.add(satelliteMesh);

	// Create multiple asteroids
	const asteroidCount = 5; // Number of asteroids
	const asteroidGeometry = new THREE.SphereGeometry(5, 8, 8);
	const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

	for (let i = 0; i < asteroidCount; i++) {
		const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
		scene.add(asteroidMesh);
		asteroids.push(asteroidMesh);
	}

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
	mouseX = (event.clientX - windowHalfX) / 2;
	mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() {
	requestAnimationFrame(animate);
	update();
	render();
}

function update() {
	// Update satellite position
	satelliteMesh.position.x = Math.cos(Date.now() * 0.001) * satelliteOrbitRadius;
	satelliteMesh.position.z = Math.sin(Date.now() * 0.001) * satelliteOrbitRadius;

	// Update asteroids position
	const asteroidCount = asteroids.length;
	const time = Date.now() * 0.0005;

	for (let i = 0; i < asteroidCount; i++) {
		const asteroidMesh = asteroids[i];
		const orbitRadius = asteroidOrbitRadius + (i * 50); // Increase orbit radius for each asteroid

		// Specify different angles for each asteroid
		let angle;

		switch (i) {
			case 0:
				angle = time * 0.2; // Adjust the angular speed as desired
				break;
			case 1:
				angle = time * 0.3; // Adjust the angular speed as desired
				break;
			case 2:
				angle = time * 0.4; // Adjust the angular speed as desired
				break;
			case 3:
				angle = time * 0.5; // Adjust the angular speed as desired
				break;
			case 4:
				angle = time * 0.6; // Adjust the angular speed as desired
				break;
			case 5:
				angle = time * 0.1; // Adjust the angular speed as desired
				break;
			case 6:
				angle = time * 0.7; // Adjust the angular speed as desired
				break;
			case 7:
				angle = time * 0.6; // Adjust the angular speed as desired
				break;
	
			default:
				angle = 0;
		}

		const x = Math.cos(angle) * orbitRadius;
		const y = Math.sin(angle) * orbitRadius;
		const z = i * 50; // Adjust the distance from the globe along the z-axis

		asteroidMesh.position.set(x, y, z);
	}
}


function render() {
	globeMesh.rotation.y += 0.003; // rotate sphere around y-axis
	camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (-mouseY - camera.position.y) * 0.05;
	camera.lookAt(scene.position);
	renderer.render(scene, camera);
}


