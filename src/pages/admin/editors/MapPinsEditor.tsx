import React from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { KERALA_GEOJSON } from '../../../data/keralaGeojson';

const DefaultIcon = L.icon({
  iconUrl: '/node_modules/leaflet/dist/images/marker-icon.png',
  shadowUrl: '/node_modules/leaflet/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #facc15; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 15px #facc15;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

interface MapPinsEditorProps {
  pins: any[];
  activePinIdx: number | null;
  setActivePinIdx: (idx: number | null) => void;
  onChange: (newList: any[]) => void;
}

export default function MapPinsEditor({
  pins = [],
  activePinIdx,
  setActivePinIdx,
  onChange,
}: MapPinsEditorProps) {
  const list = pins;

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
          [-180, -90],
        ],
        ...KERALA_GEOJSON.geometry.coordinates.map((poly: any) => poly[0]),
      ],
    },
  };

  const MapEventsHandler = () => {
    useMapEvents({
      click(e) {
        if (activePinIdx !== null && activePinIdx >= 0 && activePinIdx < list.length) {
          const newList = [...list];
          newList[activePinIdx] = {
            ...newList[activePinIdx],
            lat: parseFloat(e.latlng.lat.toFixed(6)),
            lng: parseFloat(e.latlng.lng.toFixed(6)),
          };
          onChange(newList);
        }
      },
      dblclick(e) {
        const newPin = {
          id: Date.now(),
          lat: parseFloat(e.latlng.lat.toFixed(6)),
          lng: parseFloat(e.latlng.lng.toFixed(6)),
          title: 'New Center',
          desc: 'Details of new location...',
          gmapsLink: '',
        };
        const newList = [...list, newPin];
        onChange(newList);
        setActivePinIdx(newList.length - 1);
      },
    });
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Interactive Map */}
      <div className="lg:col-span-6 space-y-4">
        <div className="bg-zinc-950 p-5 border border-zinc-900 rounded-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Interactive Preview Map
            </span>
            <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider bg-yellow-400/5 px-2 py-0.5 rounded border border-yellow-400/10">
              {activePinIdx !== null && list[activePinIdx]
                ? `Active: ${list[activePinIdx].title || 'New Pin'}`
                : 'No active pin selected'}
            </span>
          </div>
          <div className="h-[450px] w-full rounded-2xl overflow-hidden border border-zinc-800 relative z-10">
            <MapContainer
              center={[10.55, 76.15]}
              zoom={7}
              maxBounds={[[7.0, 73.0], [14.0, 79.5]]}
              minZoom={6}
              maxBoundsViscosity={0.8}
              style={{ height: '100%', width: '100%', background: '#09090b' }}
              scrollWheelZoom={true}
              doubleClickZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              <GeoJSON
                data={keralaMaskGeojson as any}
                style={{
                  fillColor: '#000000',
                  fillOpacity: 0.5,
                  weight: 0,
                  color: 'transparent',
                }}
              />
              <GeoJSON
                data={KERALA_GEOJSON as any}
                style={{
                  color: '#facc15',
                  weight: 1.5,
                  fillColor: 'transparent',
                  fillOpacity: 0,
                }}
              />
              <MapEventsHandler />
              {list.map((pin: any, idx: number) => {
                const isActive = activePinIdx === idx;
                return (
                  <Marker
                    key={pin.id}
                    position={[pin.lat, pin.lng]}
                    draggable={true}
                    icon={isActive ? DefaultIcon : yellowIcon}
                    eventHandlers={{
                      dragend(e) {
                        const marker = e.target;
                        const position = marker.getLatLng();
                        const newList = [...list];
                        newList[idx] = {
                          ...newList[idx],
                          lat: parseFloat(position.lat.toFixed(6)),
                          lng: parseFloat(position.lng.toFixed(6)),
                        };
                        onChange(newList);
                      },
                      click() {
                        setActivePinIdx(idx);
                      },
                    }}
                  >
                    <Popup>
                      <div className="text-zinc-950 text-xs font-sans p-1">
                        <p className="font-black uppercase tracking-tight text-xs mb-0.5">{pin.title || 'Untitled'}</p>
                        <p className="text-[10px] text-zinc-650 leading-tight mb-1">{pin.desc}</p>
                        {isActive && <p className="text-[9px] text-yellow-600 font-black uppercase tracking-widest mt-1">Currently Active</p>}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
          <div className="mt-3 text-center space-y-1">
            <p className="text-[10px] text-zinc-500 font-medium">
              • Drag any marker pin on the map to adjust its coordinates.
            </p>
            <p className="text-[10px] text-zinc-500 font-medium">
              • Expand a location card, then click anywhere on the map to reposition it.
            </p>
            <p className="text-[10px] text-zinc-500 font-medium">
              • Double-click anywhere on the map to add a new location pin.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Collapsible Cards List */}
      <div className="lg:col-span-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Locations List ({list.length})</h4>
          <button
            type="button"
            onClick={() => {
              const newPin = { id: Date.now(), lat: 10.5, lng: 76.5, title: 'New Center', desc: 'Active Hub', gmapsLink: '' };
              const newList = [...list, newPin];
              onChange(newList);
              setActivePinIdx(newList.length - 1);
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-semibold text-xs py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow shadow-yellow-400/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Location</span>
          </button>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {list.map((item: any, idx: number) => {
            const isExpanded = activePinIdx === idx;
            return (
              <div
                key={item.id}
                className={`border transition-all duration-300 rounded-[1.5rem] overflow-hidden ${
                  isExpanded
                    ? 'bg-zinc-900/90 border-yellow-400/20 shadow-xl'
                    : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setActivePinIdx(isExpanded ? null : idx)}
                  className="w-full flex items-center justify-between p-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isExpanded ? 'bg-yellow-400 shadow-[0_0_8px_#facc15]' : 'bg-zinc-700'}`} />
                    <div>
                      <span className="font-bold text-sm text-white block">{item.title || 'New Center'}</span>
                      <span className="text-[10px] text-zinc-500 block mt-0.5">
                        Lat: {item.lat || '0'} | Lng: {item.lng || '0'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newList = [...list];
                        newList.splice(idx, 1);
                        onChange(newList);
                        if (activePinIdx === idx) {
                          setActivePinIdx(newList.length > 0 ? 0 : null);
                        } else if (activePinIdx !== null && activePinIdx > idx) {
                          setActivePinIdx(activePinIdx - 1);
                        }
                      }}
                      className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                      title="Delete pin"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-zinc-850 bg-zinc-900/40 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Latitude</label>
                        <input
                          type="number"
                          step="any"
                          value={item.lat || ''}
                          onChange={(e) => {
                            const newList = [...list];
                            newList[idx] = { ...newList[idx], lat: parseFloat(e.target.value) || 0 };
                            onChange(newList);
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2 px-3 text-xs outline-none"
                          placeholder="e.g. 10.52"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Longitude</label>
                        <input
                          type="number"
                          step="any"
                          value={item.lng || ''}
                          onChange={(e) => {
                            const newList = [...list];
                            newList[idx] = { ...newList[idx], lng: parseFloat(e.target.value) || 0 };
                            onChange(newList);
                          }}
                          className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2 px-3 text-xs outline-none"
                          placeholder="e.g. 76.21"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Pin Title</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => {
                          const newList = [...list];
                          newList[idx] = { ...newList[idx], title: e.target.value };
                          onChange(newList);
                        }}
                        className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30"
                        placeholder="e.g. Kozhikode Hub"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Hover Details</label>
                      <input
                        type="text"
                        value={item.desc || ''}
                        onChange={(e) => {
                          const newList = [...list];
                          newList[idx] = { ...newList[idx], desc: e.target.value };
                          onChange(newList);
                        }}
                        className="w-full bg-zinc-950 border border-zinc-880 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30"
                        placeholder="e.g. Service Center & 1200+ installations"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-450 font-bold uppercase tracking-wider block">Google Maps Link (Optional)</label>
                      <input
                        type="text"
                        value={item.gmapsLink || ''}
                        onChange={(e) => {
                          const newList = [...list];
                          newList[idx] = { ...newList[idx], gmapsLink: e.target.value };
                          onChange(newList);
                        }}
                        className="w-full bg-zinc-950 border border-zinc-880 text-white rounded-xl py-2 px-3 text-xs outline-none focus:border-yellow-400/30"
                        placeholder="e.g. https://maps.app.goo.gl/..."
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
