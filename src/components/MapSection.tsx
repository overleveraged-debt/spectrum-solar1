import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
}

const pins: Pin[] = [
  { id: 1, lat: 11.8745, lng: 75.3704, title: 'Kannur Hub', desc: 'DSC Centre (100KW) & 1,200+ Installations' },
  { id: 2, lat: 9.9312, lng: 76.2673, title: 'Kochi HQ', desc: 'Central Operations & 2,500+ Residential Projects' },
  { id: 3, lat: 10.5276, lng: 76.2144, title: 'Thrissur Regional', desc: 'Commercial Complex (25KW) & Service Center' },
  { id: 4, lat: 8.5241, lng: 76.9366, title: 'Trivandrum South', desc: 'Large-Scale Solar Farm (500KW)' },
  { id: 5, lat: 11.2588, lng: 75.7804, title: 'Calicut Center', desc: 'Healthcare Specialist Hub (Koyili Hospital)' },
  { id: 6, lat: 9.1894, lng: 76.7188, title: 'Pathanamthitta', desc: 'Ranni Taluk Hospital (50KW)' },
  { id: 7, lat: 10.7867, lng: 76.6547, title: 'Palakkad Center', desc: 'Renewable Power Hub' },
  { id: 8, lat: 8.8932, lng: 76.6141, title: 'Kollam Hub', desc: 'Industrial Solar Plant (150KW)' },
];

const MapSection: React.FC<{ height?: string; theme?: 'light' | 'dark' }> = ({ height = '500px', theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
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
          center={[10.5, 76.5]} 
          zoom={7} 
          style={{ height: '100%', width: '100%', background: isDark ? '#09090b' : '#f8fafc' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={isDark 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            }
          />
          {pins.map((pin) => (
            <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={yellowIcon}>
              <Popup className="premium-popup">
                <div className="p-1">
                  <h4 className="font-black text-xs uppercase tracking-tighter text-black mb-1">{pin.title}</h4>
                  <p className="text-[10px] text-zinc-600 leading-tight">{pin.desc}</p>
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
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest leading-none">Mapping 40,000+ Success Stories</p>
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
