import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CasesOverTimeProps {
  historicalData: { date: string; cases: any; deaths: any; recovered: any }[];
}

const CasesOverTime: React.FC<CasesOverTimeProps> = ({ historicalData }) => {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-bold mb-4">COVID-19 Cases Over Time</h3>
      <LineChart width={400} height={300} data={historicalData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#8884d8" />
        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
        <Line type="monotone" dataKey="recovered" stroke="#ffc658" />
      </LineChart>
    </div>
  );
};

export default CasesOverTime;
