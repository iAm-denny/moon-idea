import React from 'react';
import { Line } from 'react-konva';

function LineShape(props) {
  const {
    // eslint-disable-next-line react/prop-types
    data, onSelectShape,
  } = props;

  const { // eslint-disable-next-line react/prop-types
    fill, stroke, id, points,
  // eslint-disable-next-line react/prop-types
  } = data.data;
  return (
    <Line
      points={points}
      fill={fill}
      stroke={stroke}
      key={id}
      onClick={(e) => {
        e.cancelBubble = true;
        onSelectShape(data);
      }}
    />
  );
}

export default LineShape;
