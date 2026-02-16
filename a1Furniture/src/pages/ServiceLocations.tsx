import React, { useState, useMemo } from 'react';
import { MapPin, Phone, MessageCircle, Search, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SEOHead from '../components/SEOHead';
import { getCanonicalURL } from '../utils/canonicalURL';

// Fix default marker icons for Leaflet + bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const orangeMarker = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationItem {
  name: string;
  zone: 'west' | 'central' | 'east' | 'south' | 'north';
  lat: number;
  lng: number;
}

const allLocations: LocationItem[] = [
  // Western Suburbs
  { name: 'Goregaon', zone: 'west', lat: 19.1663, lng: 72.8526 },
  { name: 'Andheri', zone: 'west', lat: 19.1197, lng: 72.8464 },
  { name: 'Jogeshwari', zone: 'west', lat: 19.1344, lng: 72.8497 },
  { name: 'Malad', zone: 'west', lat: 19.1874, lng: 72.8484 },
  { name: 'Borivali', zone: 'west', lat: 19.2307, lng: 72.8567 },
  { name: 'Kandivali', zone: 'west', lat: 19.2094, lng: 72.8525 },
  { name: 'Vile Parle', zone: 'west', lat: 19.0994, lng: 72.8436 },
  { name: 'Bandra', zone: 'west', lat: 19.0596, lng: 72.8295 },
  { name: 'Khar', zone: 'west', lat: 19.0726, lng: 72.8369 },
  { name: 'Santacruz', zone: 'west', lat: 19.0831, lng: 72.8415 },
  { name: 'Juhu', zone: 'west', lat: 19.1075, lng: 72.8263 },
  { name: 'Versova', zone: 'west', lat: 19.1320, lng: 72.8175 },
  { name: 'Lokhandwala', zone: 'west', lat: 19.1410, lng: 72.8300 },
  { name: 'Oshiwara', zone: 'west', lat: 19.1480, lng: 72.8360 },
  { name: 'Dahisar', zone: 'west', lat: 19.2504, lng: 72.8628 },
  { name: 'Mira Road', zone: 'west', lat: 19.2813, lng: 72.8685 },

  // Central Mumbai
  { name: 'Dadar', zone: 'central', lat: 19.0178, lng: 72.8478 },
  { name: 'Prabhadevi', zone: 'central', lat: 19.0121, lng: 72.8298 },
  { name: 'Worli', zone: 'central', lat: 19.0176, lng: 72.8152 },
  { name: 'Lower Parel', zone: 'central', lat: 18.9979, lng: 72.8316 },
  { name: 'Parel', zone: 'central', lat: 19.0055, lng: 72.8426 },
  { name: 'Sion', zone: 'central', lat: 19.0435, lng: 72.8619 },
  { name: 'Matunga', zone: 'central', lat: 19.0279, lng: 72.8541 },
  { name: 'Wadala', zone: 'central', lat: 19.0193, lng: 72.8656 },

  // Eastern Suburbs
  { name: 'Powai', zone: 'east', lat: 19.1176, lng: 72.9060 },
  { name: 'Ghatkopar', zone: 'east', lat: 19.0860, lng: 72.9081 },
  { name: 'Vikhroli', zone: 'east', lat: 19.1100, lng: 72.9270 },
  { name: 'Mulund', zone: 'east', lat: 19.1726, lng: 72.9566 },
  { name: 'Bhandup', zone: 'east', lat: 19.1483, lng: 72.9383 },
  { name: 'Kanjurmarg', zone: 'east', lat: 19.1309, lng: 72.9340 },
  { name: 'Chembur', zone: 'east', lat: 19.0522, lng: 72.8944 },
  { name: 'Kurla', zone: 'east', lat: 19.0726, lng: 72.8793 },

  // South Mumbai
  { name: 'Colaba', zone: 'south', lat: 18.9067, lng: 72.8147 },
  { name: 'Fort', zone: 'south', lat: 18.9348, lng: 72.8355 },
  { name: 'Marine Lines', zone: 'south', lat: 18.9432, lng: 72.8235 },
  { name: 'Churchgate', zone: 'south', lat: 18.9353, lng: 72.8274 },
  { name: 'Grant Road', zone: 'south', lat: 18.9629, lng: 72.8148 },

  // Thane & Navi Mumbai
  { name: 'Thane', zone: 'north', lat: 19.2183, lng: 72.9781 },
  { name: 'Navi Mumbai', zone: 'north', lat: 19.0330, lng: 73.0297 },
  { name: 'Vasai', zone: 'north', lat: 19.3607, lng: 72.8397 },
  { name: 'Virar', zone: 'north', lat: 19.4559, lng: 72.8111 },
  { name: 'Panvel', zone: 'north', lat: 18.9894, lng: 73.1175 },
  { name: 'Kharghar', zone: 'north', lat: 19.0474, lng: 73.0680 },
  { name: 'Vashi', zone: 'north', lat: 19.0771, lng: 72.9986 },
  { name: 'Airoli', zone: 'north', lat: 19.1550, lng: 72.9981 },
  { name: 'Nerul', zone: 'north', lat: 19.0330, lng: 73.0190 },
  { name: 'Belapur', zone: 'north', lat: 19.0234, lng: 73.0390 },
];

const zoneLabels: Record<string, string> = {
  all: 'All Areas',
  west: 'Western Suburbs',
  central: 'Central Mumbai',
  east: 'Eastern Suburbs',
  south: 'South Mumbai',
  north: 'Thane & Navi Mumbai',
};

const ServiceLocations: React.FC = () => {
  const [activeZone, setActiveZone] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = useMemo(() => {
    let locs = activeZone === 'all'
      ? allLocations
      : allLocations.filter((l) => l.zone === activeZone);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      locs = locs.filter((l) => l.name.toLowerCase().includes(q));
    }

    return locs;
  }, [activeZone, searchQuery]);

  // Mumbai center
  const mapCenter: [number, number] = [19.0760, 72.8777];

  return (
    <>
      <SEOHead
        title="Service Locations — Furniture Polishing Services Across Mumbai | A1 Furniture Polish"
        description="A1 Furniture Polish serves 46+ locations across Mumbai including Andheri, Bandra, Goregaon, Powai, Thane, Navi Mumbai and more. Find professional furniture polishing near you."
        keywords="furniture polishing near me, furniture polishing Mumbai locations, wood polishing service areas Mumbai, A1 furniture polish locations"
        canonical={getCanonicalURL('/service-areas-mumbai')}
      />

      <section className="py-8 md:py-12 bg-white min-h-screen">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Our Service Locations
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto">
              Professional furniture polishing services at your doorstep across Mumbai, Thane & Navi Mumbai
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              Serving {allLocations.length}+ Locations
            </div>
          </div>

          {/* Main Grid: Left Cards + Right Map */}
          <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-4 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
            {/* Left Panel — Location Cards */}
            <div className="flex flex-col bg-white max-h-[700px]">
              {/* Help Banner */}
              <div className="px-5 py-4 border-b border-gray-100 bg-white">
                <p className="text-sm text-gray-500">
                  Need Help:{' '}
                  <a href="tel:+918828709945" className="text-amber-600 font-semibold hover:text-amber-700">
                    +91-8828709945
                  </a>
                </p>
              </div>

              {/* Search */}
              <div className="px-5 py-3 border-b border-gray-100">
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter Area Name, Pin Code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
                  />
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Zone Filter */}
              <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap gap-1.5">
                {Object.entries(zoneLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveZone(key)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      activeZone === key
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Location List */}
              <div className="flex-1 overflow-y-auto px-5 py-3">
                <div className="grid grid-cols-2 gap-2">
                  {filteredLocations.map((loc) => (
                    <a
                      key={loc.name}
                      href={`/services?location=${loc.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-amber-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="w-10 h-10 flex-shrink-0 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                        <MapPin className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-amber-700 truncate">
                          {loc.name}
                        </p>
                        <p className="text-[10px] text-gray-400 capitalize">{zoneLabels[loc.zone]}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-500 flex-shrink-0" />
                    </a>
                  ))}
                </div>

                {filteredLocations.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No locations found for "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Bottom CTA */}
              <div className="px-5 py-3 border-t border-gray-100 flex gap-2">
                <a
                  href="tel:+918828709945"
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/918828709945"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right Panel — Map */}
            <div className="min-h-[400px] lg:min-h-[700px] relative">
              <MapContainer
                center={mapCenter}
                zoom={11}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', minHeight: '400px' }}
                className="rounded-none lg:rounded-r-2xl z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredLocations.map((loc) => (
                  <Marker key={loc.name} position={[loc.lat, loc.lng]} icon={orangeMarker}>
                    <Popup>
                      <div className="text-center">
                        <p className="font-bold text-gray-900">{loc.name}</p>
                        <p className="text-xs text-gray-500 mb-2">Furniture polishing available</p>
                        <a
                          href={`tel:+918828709945`}
                          className="text-xs text-amber-600 font-semibold hover:text-amber-700"
                        >
                          Book Now: +91-8828709945
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceLocations;
