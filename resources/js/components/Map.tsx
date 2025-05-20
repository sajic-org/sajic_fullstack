import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { LatLngTuple } from 'leaflet'


const MapView = ({ center = [-31.770226, -52.338867] as LatLngTuple, zoom = 18 }: { center?: LatLngTuple; zoom?: number }) => {

    
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} zoomControl={false} className="h-[500px] w-full rounded-md z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        <Popup>
          Você está aqui!
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapView;