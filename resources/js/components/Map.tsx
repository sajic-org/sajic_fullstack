import { useEffect, useState } from 'react';
import type { LatLngTuple } from 'leaflet';

const MapView = ({ center = [-31.770226, -52.338867] as LatLngTuple, zoom = 18 }: { center?: LatLngTuple; zoom?: number }) => {
  const [LeafletMap, setLeafletMap] = useState<React.FC | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([
        import('leaflet'),
        import('react-leaflet'),
        import('leaflet/dist/leaflet.css')
      ]).then(([L, leaflet]) => {
        const { MapContainer, TileLayer, Marker, Popup } = leaflet;

        const marker = L.icon({
          iconUrl: '/assets/marker-icon-hN30_KVU.png',
          iconSize: [40, 40],
        });

        const MapComponent = () => (
          <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} zoomControl={false} className="h-[500px] w-full rounded-md z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} icon={marker}>
              <Popup>Você está aqui!</Popup>
            </Marker>
          </MapContainer>
        );

        setLeafletMap(() => MapComponent);
      });
    }
  }, [center, zoom]);

  return LeafletMap ? <LeafletMap /> : null;
};

export default MapView;
