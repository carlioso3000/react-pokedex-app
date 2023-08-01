import React from 'react';


function Chart({ stats }) {
  return (
    <ul style={{ backgroundColor: "#a4a4a4", borderRadius: "10px", listStyle: 'none', padding: 0 }}>
      {Object.entries(stats).map(([statName, statValue]) => (
        <li key={statName} style={{ display: 'flex', alignItems: 'center', height: "40px" }}>
          <div style={{ width: 100, display: "flex", marginLeft: 10 }}>{statName}</div>
          <div style={{ height: 20, width: statValue * 3, backgroundColor: '#f8333c', borderRadius: 3 }} />
          <div style={{ marginLeft: 10 }}>{statValue}</div>
        </li>
      ))}
    </ul>
  );
}

export default Chart;