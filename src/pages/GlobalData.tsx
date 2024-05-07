import React from 'react';

interface GlobalDataProps {
  globalData: {
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    affectedCountries: number;
  };
}

const GlobalData: React.FC<GlobalDataProps> = ({ globalData }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Global Data</h3>
      <p className="mb-2">Cases: {globalData.cases}</p>
      <p className="mb-2">Today Cases: {globalData.todayCases}</p>
      <p className="mb-2">Deaths: {globalData.deaths}</p>
      <p className="mb-2">Today Deaths: {globalData.todayDeaths}</p>
      <p className="mb-2">Recovered: {globalData.recovered}</p>
      <p className="mb-2">Today Recovered: {globalData.todayRecovered}</p>
      <p className="mb-2">Active: {globalData.active}</p>
      <p className="mb-2">Critical: {globalData.critical}</p>
      <p className="mb-2">Affected Countries: {globalData.affectedCountries}</p>
    </div>
  );
};

export default GlobalData;
