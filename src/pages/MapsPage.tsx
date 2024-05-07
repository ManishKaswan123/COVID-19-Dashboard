import React, { useState, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CovidMap from './CovidMap';
import GlobalData from './GlobalData';
import CasesOverTime from './CasesOverTime';

interface Country {
  countryInfo: {
    _id: number;
    lat: number;
    long: number;
  };
  country: string;
  active: number;
  recovered: number;
  deaths: number;
}

const MapsPage = () => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [globalData, setGlobalData] = useState<{
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    affectedCountries: number;
  }>({
    cases: 0,
    todayCases: 0,
    deaths: 0,
    todayDeaths: 0,
    recovered: 0,
    todayRecovered: 0,
    active: 0,
    critical: 0,
    affectedCountries: 0,
  });
  const [historicalData, setHistoricalData] = useState<
    { date: string; cases: any; deaths: any; recovered: any }[]
  >([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const fetchData = () => {
    // Fetch country-specific data
    fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
      });

    // Fetch global data
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setGlobalData({
          cases: data.cases,
          todayCases: data.todayCases,
          deaths: data.deaths,
          todayDeaths: data.todayDeaths,
          recovered: data.recovered,
          todayRecovered: data.todayRecovered,
          active: data.active,
          critical: data.critical,
          affectedCountries: data.affectedCountries,
        });
      });

    // Fetch historical data for the line graph
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then((response) => response.json())
      .then((data) => {
        // Transform the data into the format expected by Recharts
        const chartData: { date: string; cases: any; deaths: any; recovered: any }[] = Object.keys(data.cases).map((date) => ({
          date,
          cases: data.cases[date],
          deaths: data.deaths[date],
          recovered: data.recovered[date],
        }));
        setHistoricalData(chartData);
      });
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CasesOverTime historicalData={historicalData} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlobalData globalData={globalData} />
          </div>
        </div>
          <CovidMap countriesData={countriesData} />
      </div>
    </div>
  );
};

export default MapsPage;



