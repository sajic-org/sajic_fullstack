import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import type { LatLngTuple, Map as LeafletMap } from 'leaflet';
import { useEffect } from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from 'react-leaflet';

const ChangeView = ({ center, zoom }: { center: LatLngTuple; zoom: number }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);

    return null;
};

const customMarkerIcon = L.icon({
    iconUrl: '/assets/marker-icon-hN30_KVU.webp',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const MapView = ({
    center = [-31.770226, -52.338867] as LatLngTuple,
    zoom = 18,
}: {
    center?: LatLngTuple;
    zoom?: number;
}) => {

    return (
        <div className="h-[500px] w-full overflow-hidden rounded-md">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                zoomControl={false}
                className="z-0 h-full w-full"
                ref={(instance: LeafletMap | null) => {
                    if (instance) {
                        setTimeout(() => {
                            instance.invalidateSize();
                        }, 0);
                    }
                }}
            >
                <ChangeView center={center} zoom={zoom} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={center} icon={customMarkerIcon}>
                    <Popup>Você está aqui!</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapView;
