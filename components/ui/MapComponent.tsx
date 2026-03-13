'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const projectLocations = [
  {
    name: 'Mojave Solar Complex',
    lat: 35.5,
    lng: -116.5,
    capacity: '250 MW',
    technology: 'Solar',
    region: 'Americas',
    status: 'OPERATIONAL',
  },
  {
    name: 'North Sea Wind Farm',
    lat: 56.0,
    lng: 2.5,
    capacity: '450 MW',
    technology: 'Wind',
    region: 'EMEA',
    status: 'CONSTRUCTION',
  },
  {
    name: 'Green Battery Storage',
    lat: 32.5,
    lng: -97.0,
    capacity: '200 MWh',
    technology: 'Storage',
    region: 'Americas',
    status: 'DEVELOPMENT',
  },
  {
    name: 'Hydrogen Hub MENA',
    lat: 31.5,
    lng: -8.0,
    capacity: '100 MW',
    technology: 'H2',
    region: 'EMEA',
    status: 'DEVELOPMENT',
  },
  {
    name: 'Tokyo Solar Park',
    lat: 35.6,
    lng: 139.7,
    capacity: '180 MW',
    technology: 'Solar',
    region: 'APAC',
    status: 'OPERATIONAL',
  },
  {
    name: 'Australian Wind Complex',
    lat: -37.5,
    lng: 145.0,
    capacity: '320 MW',
    technology: 'Wind',
    region: 'APAC',
    status: 'CONSTRUCTION',
  },
];

const statusColors = {
  OPERATIONAL: '#22C55E',
  CONSTRUCTION: '#F5A623',
  DEVELOPMENT: '#00C2FF',
};

export default function MapComponent({
  region,
  technology,
}: {
  region: string;
  technology: string;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([20, 0], 2);

      // Add dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.current);
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Filter projects
    const filteredProjects = projectLocations.filter((project) => {
      const regionMatch = region === 'All' || project.region === region;
      const techMatch = technology === 'All' || project.technology === technology;
      return regionMatch && techMatch;
    });

    // Add markers
    filteredProjects.forEach((project) => {
      const color = statusColors[project.status as keyof typeof statusColors];

      // Create custom icon
      const icon = L.divIcon({
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background-color: ${color};
            border: 3px solid #080C14;
            border-radius: 50%;
            box-shadow: 0 0 10px ${color}80;
          "></div>
        `,
        iconSize: [24, 24],
        className: 'custom-marker',
      });

      const marker = L.marker([project.lat, project.lng], { icon }).addTo(map.current!);

      // Popup content
      const popupContent = `
        <div style="color: #F0F4F8; font-family: system-ui;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #F5A623;">${project.name}</h3>
          <p style="margin: 4px 0; font-size: 12px;">${project.capacity}</p>
          <p style="margin: 4px 0; font-size: 12px;">${project.technology}</p>
          <p style="margin: 4px 0; font-size: 12px; color: ${color};">${project.status}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    // Fit bounds if markers exist
    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      map.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [region, technology]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-96 md:h-[500px] rounded-sm border border-white/[0.08] overflow-hidden"
      style={{ background: '#080C14' }}
    />
  );
}
