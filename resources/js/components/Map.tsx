// SIM EU FIZ TUDO ISSO USANDO O GEMINI 2.5 PRO, EU ODEIO SSR E IMPORTS DINAMICOS

import { useEffect, useState, useRef } from 'react';
import type { LatLngTuple, Map as LeafletMap } from 'leaflet'; // LeafletMap is an alias for leaflet's Map type

// These will be populated after the dynamic imports complete on the client.
let LModule: typeof import('leaflet') | null = null;
let ReactLeafletModule: typeof import('react-leaflet') | null = null;

const MapView = ({
  center = [-31.770226, -52.338867] as LatLngTuple,
  zoom = 18,
}: {
  center?: LatLngTuple;
  zoom?: number;
}) => {
  // --- Hooks (must be called in the same order every render) ---
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // The ref to store the Leaflet map instance. Typed as LeafletMap.
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  // Effect 1: Set isClient to true once component mounts on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect 2: Dynamically import Leaflet modules on the client
  useEffect(() => {
    if (isClient && !isLoaded && !LModule && !ReactLeafletModule) {
      // Simple flag to avoid multiple import attempts if this effect were to somehow re-trigger
      // before isLoaded is set.
      let importInProgress = true;
      if (!importInProgress) return; // Should not happen with current deps, but as a safeguard.

      Promise.all([
        import('leaflet'),
        import('react-leaflet'),
        import('leaflet/dist/leaflet.css'),
      ])
        .then(([L, RL]) => {
          LModule = L;
          ReactLeafletModule = RL;
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error('Failed to load map modules:', err);
          setError('Could not load map components. Please try again later.');
        })
        .finally(() => {
          importInProgress = false;
        });
    }
  }, [isClient, isLoaded]); // Dependencies ensure this runs when client status is known and if not already loaded.

  // Effect 3: Invalidate map size when loaded, or when center/zoom props change.
  // This effect now also depends on mapInstanceRef.current being set.
  useEffect(() => {
    if (isClient && isLoaded && mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      // A small delay can sometimes help ensure the DOM is fully settled before invalidating.
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 100);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isClient, isLoaded, center, zoom, mapInstanceRef.current]); // Added mapInstanceRef.current as a dependency

  // --- Conditional Rendering Logic (after all hooks) ---

  if (!isClient) {
    return (
      <div
        style={{ height: '500px', width: '100%' }}
        className="flex items-center justify-center rounded-md bg-gray-200 text-gray-500"
        aria-label="Map loading placeholder"
      >
        Map will load on the client.
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ height: '500px', width: '100%' }}
        className="flex items-center justify-center rounded-md border border-red-300 bg-red-50 p-4 text-red-700"
        role="alert"
      >
        <p>{error}</p>
      </div>
    );
  }

  if (!isLoaded || !LModule || !ReactLeafletModule) {
    return (
      <div
        style={{ height: '500px', width: '100%' }}
        className="flex items-center justify-center rounded-md bg-gray-100 text-gray-500 animate-pulse"
        aria-label="Map loading"
      >
        Loading Map...
      </div>
    );
  }

  // Modules are loaded.
  const L = LModule;
  const RL = ReactLeafletModule;

  const customMarkerIcon = L.icon({
    iconUrl: '/assets/marker-icon-hN30_KVU.webp',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <div className="h-[500px] w-full rounded-md overflow-hidden">
      <RL.MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full z-0"
        // Use the ref prop to get the map instance
        ref={(instance: LeafletMap | null) => {
          // The 'instance' is the Leaflet Map object or null if unmounting
          if (instance) {
            mapInstanceRef.current = instance;
          }
          // If you need to do something immediately when the ref is set,
          // you could, but the useEffect for invalidateSize is often more robust
          // as it runs after render.
        }}
      >
        <RL.TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RL.Marker position={center} icon={customMarkerIcon}>
          <RL.Popup>Você está aqui!</RL.Popup>
        </RL.Marker>
      </RL.MapContainer>
    </div>
  );
};

export default MapView;
