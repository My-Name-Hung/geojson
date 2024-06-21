import React from 'react';

const Legend = ({ title, colors, values, layer, selectedLayer, timestamp }) => {
  return (
    <div
      id={`legend-${layer}`}
      className={`legend absolute bottom-5 w-52 left-10 bg-white bg-opacity-80 rounded-md p-4 pb-0 shadow-md ${
        selectedLayer === layer ? 'block' : 'hidden'
      }`}
      data-layer={layer}
    >
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <div className="legend-scale h-4 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${colors.join(', ')})` }}></div>
      </div>
      <div className="legend-labels flex justify-between mt-2">
        {values.map((value) => (
          <span key={value} className="text-xs">{value}</span>
        ))}
      </div>
      {timestamp && 
        <p className="timestamp pt-2 text-xs font-semibold">Cập nhật lúc: {timestamp.toLocaleString()}</p>
      }
      
    </div>
  );
};

export default Legend;
