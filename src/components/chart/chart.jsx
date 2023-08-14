import React from 'react';
import '../../styles/chart.css';


function Chart({ stats }) {
  return (
    <div className="chart-container">
      <div className="chart-names">
        {Object.keys(stats).map(statName => (
          <div key={statName}>{statName}</div>
        ))}
      </div>
      <div className="chart-bars">
        {Object.entries(stats).map(([statName, statValue]) => (
          <div key={statName} className="chart-bar">
            <div style={{ width: 20, height: statValue * 3, backgroundColor: '#f8333c', borderRadius: 3 }} />
            <div className="chart-value">{statValue}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chart;