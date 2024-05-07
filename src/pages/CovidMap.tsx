import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface CovidMapProps {
  countriesData: {
    countryInfo: {
      _id: number;
      lat: number;
      long: number;
    };
    country: string;
    active: number;
    recovered: number;
    deaths: number;
  }[];
}

const CovidMap: React.FC<CovidMapProps> = ({ countriesData }) => {
  return (
    <div className="w-full p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <MapContainer center={[0, 0] as LatLngExpression} zoom={2} className="w-full h-96">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countriesData.map((country) => (
            <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long] as LatLngExpression}>
              <Popup>
                <div>
                  <h3 className="text-lg font-bold">{country.country}</h3>
                  <p>Active: {country.active}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CovidMap;
