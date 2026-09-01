import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { sanityReadClient } from '../lib/sanityClient';
import { defaultPagesData } from '../data/pageDefaults';
import { KERALA_GEOJSON } from '../data/keralaGeojson';

// Fix for default marker icons in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Yellow Icon for Spectrum Pins
const yellowIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #facc15; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 15px #facc15;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

interface Pin {
  id: number;
  lat: number;
  lng: number;
  title: string;
  desc: string;
  gmapsLink?: string;
}

const DEFAULT_PINS: Pin[] = defaultPagesData['map-locations'].pins;

const MapSection: React.FC<{ height?: string; theme?: 'light' | 'dark' }> = ({ height = '500px', theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [pins, setPins] = useState<Pin[]>(DEFAULT_PINS);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "pageContent" && pageId == "map-locations"][0]')
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            if (Array.isArray(parsed.pins)) {
              setPins(parsed.pins);
            }
          } catch (e) {
            console.error("Failed to parse map locations from Sanity", e);
          }
        }
      })
      .catch(err => console.error("Error fetching map locations:", err));
    return () => {
      isMounted = false;
    };
  }, []);
  
  const keralaMaskGeojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-180, -90],
          [-180, 90],
          [180, 90],
          [180, -90],
          [-180, -90]
        ],
        ...KERALA_GEOJSON.geometry.coordinates.map((poly: any) => poly[0])
      ]
    }
  };

  return (
    <div 
      className={`relative rounded-[2.5rem] p-2 md:p-4 transition-all duration-500 hover:scale-[1.01] ${
        isDark 
          ? 'bg-zinc-900 border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)]' 
          : 'bg-white border border-zinc-200 shadow-[0_40px_100px_rgba(0,0,0,0.1)]'
      }`}
    >
      <div className="relative w-full rounded-[2rem] overflow-hidden" style={{ height }}>
        <MapContainer 
          center={[10.55, 76.15]} 
          zoom={7} 
          maxBounds={[[7.0, 73.0], [14.0, 79.5]]}
          minZoom={6}
          maxBoundsViscosity={0.8}
          style={{ height: '100%', width: '100%', background: isDark ? '#09090b' : '#f8fafc' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={
              (() => {
                const apiKey = import.meta.env.VITE_CARTO_API_KEY;
                const keyParam = apiKey ? `?api_key=${apiKey}` : '';
                return isDark 
                  ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png${keyParam}`
                  : `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png${keyParam}`;
              })()
            }
          />
          <GeoJSON
            data={keralaMaskGeojson as any}
            style={{
              fillColor: '#000000',
              fillOpacity: isDark ? 0.5 : 0.25,
              weight: 0,
              color: 'transparent'
            }}
          />
          <GeoJSON
            data={KERALA_GEOJSON as any}
            style={{
              color: '#facc15',
              weight: 1.5,
              fillColor: 'transparent',
              fillOpacity: 0
            }}
          />
          {pins.map((pin) => (
            <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={yellowIcon}>
              <Popup className="premium-popup">
                <div className="p-2 min-w-[160px] text-left">
                  <h4 className="font-black text-xs uppercase tracking-tight text-zinc-950 mb-1">{pin.title}</h4>
                  <p className="text-[10px] text-zinc-600 leading-tight mb-2.5">{pin.desc}</p>
                  {pin.gmapsLink ? (
                    <a
                      href={pin.gmapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-yellow-600 hover:text-yellow-500 transition-colors"
                    >
                      Get Directions ↗
                    </a>
                  ) : null}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Legend / Overlay */}
        <div className={`absolute bottom-6 left-6 z-[1000] backdrop-blur-md border p-4 rounded-2xl pointer-events-none ${
          isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-zinc-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"></div>
             <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>Landmark Projects</span>
          </div>
          <p className="text-zinc-500 text-[9px] font-medium uppercase tracking-widest leading-none">Mapping 40,000+ Success Stories</p>
        </div>
      </div>

      <style>{`
        .leaflet-container {
          background: ${isDark ? '#09090b' : '#f8fafc'} !important;
        }
        .premium-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 12px;
          padding: 0;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .premium-popup .leaflet-popup-tip {
          background: white;
        }
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default MapSection;
