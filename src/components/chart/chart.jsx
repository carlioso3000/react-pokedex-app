import React from 'react';
import '../../styles/chart.css';


function Chart({ stats }) {

  // fomr some reason two words stat name like special attack were not
  // separated with a space btwn the two words
  function formatStatName(statName) {
    // split the statName into words based on capital letters
    const words = statName.split(/(?=[A-Z])/);
    // capitalize the first letter of each word
    const capitalizedWords = words.map(word => word[0].toUpperCase() + word.slice(1));
    // join the words with a space
    return capitalizedWords.join(' ');
  }
  
  return (
    <div className="chart-container">
      
      <div className="chart-bars">
        {Object.entries(stats).map(([statName, statValue]) => (
          <div key={statName} className="chart-bar">
            <div style={{ height: statValue * 1.2, backgroundColor: '#f8333c', borderRadius: 3 }} />
            <div className="chart-value">{statValue}</div>
          </div>
        ))}
      </div>
      <div className='chart-stat-title'>
        <div className="chart-names">
          {Object.keys(stats).map(statName => (
            <div key={statName}>{formatStatName(statName)}</div>

          ))}
        </div>
      </div>
    </div>
  
  );
}

export default Chart;