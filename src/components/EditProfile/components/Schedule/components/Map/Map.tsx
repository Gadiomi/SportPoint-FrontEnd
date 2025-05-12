import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import L from 'leaflet';
import { MapContainer, MapWrapper, Title } from './Map.styled';

const Map = () => {
  useEffect(() => {
    if (L.DomUtil.get('map')?._leaflet_id != null) {
      L.DomUtil.get('map')._leaflet_id = null;
    }

    const map = L.map('map').setView([50.4501, 30.5234], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
    }).on('markgeocode', function (e) {
      const { lat, lng } = e.geocode.center;
      map.setView([lat, lng], 13);
    });

    geocoder.addTo(map);

    // Спостерігач DOM, щоб змінити placeholder, коли input з’явиться
    const observer = new MutationObserver(() => {
      const input = document.querySelector(
        '.leaflet-control-geocoder-form input',
      );
      if (input) {
        input.placeholder = 'Введіть адресу...';
        observer.disconnect(); // зупиняємо спостерігач
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Геолокація
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 13);
          L.marker([latitude, longitude]).addTo(map).openPopup();
        },
        error => {
          console.error('Геолокацію не дозволено або виникла помилка:', error);
        },
      );
    }
  }, []);

  return (
    <MapWrapper>
      <Title>Або виберіть місце на карті</Title>
      <MapContainer id="map" />
    </MapWrapper>
  );
};

export default Map;
