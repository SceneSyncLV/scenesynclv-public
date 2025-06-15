"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

const position: [number, number] = [36.17, -115.14]; // Las Vegas

interface Event {
  id: string | number;
  lat: number;
  lng: number;
  title: string;
  venue_name: string;
  date: string;
}

export default function Map({ events }: { events: Event[] }) {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer center={position} zoom={12} style={{ height: '350px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event) => (
        <Marker key={event.id} position={[event.lat, event.lng]}>
          <Popup>
            <div className="text-sm">
              <div className="font-bold">{event.title}</div>
              <div>{event.venue_name}</div>
              <div>{event.date}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
