// Inicializar el mapa en coordenadas específicas
var mapa = L.map('mapa').setView([41.67476, 2.79184], 15);

// Agregar capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);

// Agregar un marcador
L.marker([41.67476, 2.79184]).addTo(mapa)
    .bindPopup('<b>Coffe Lovers</b><br>Carrer Ample, 20, Blanes, Girona')
    .openPopup();

// Ahora haremos el calculo de ruta, primero conseguimos la ubicación del cliente
navigator.geolocation.getCurrentPosition(
    (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Agregamos el Routing Machine
        L.Routing.control({
            waypoints: [
                L.latLng(lat, lon),
                L.latLng(41.67476, 2.79184)
            ],
            routeWhileDragging: true
        }).addTo(mapa)
    },
    (error) => {
        console.error("Error obteniendo la ubicación del cliente", error);
    }
)