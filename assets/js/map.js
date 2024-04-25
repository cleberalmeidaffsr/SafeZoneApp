window.onload = function () {
    var map = L.map('map');

    map.locate({ setView: true, maxZoom: 16});

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        
        L.marker(e.latlng, {
            icon: orangeIcon
        }).addTo(map).bindPopup("Você está aqui").openPopup();
    }

    map.on('locationfound', onLocationFound);

    var orangeIcon = L.icon({
        iconUrl: 'images/iconpin.png',
        iconSize: [25,25],
        iconAnchor: [12,41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    fetch('safezone.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (point) {
                L.marker([point.latitude, point.longitude]).addTo(map).bindPopup(point.regiao)
            }).catch(error => console.error('Erro ao carregar os pontos indicados:', error));
        })
}


