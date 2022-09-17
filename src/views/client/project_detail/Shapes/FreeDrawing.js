import React from 'react';
import { Line } from 'react-konva';

function FreeDrawing(props) {
  const {
    // eslint-disable-next-line react/prop-types
    data, onSelectShape,
  } = props;

  const { // eslint-disable-next-line react/prop-types
    fill, stroke, id, points,
  } = data;

  return (
    <Line
      key={id}
      points={points}
      fill={fill}
      stroke={stroke}
      onClick={(e) => {
        e.cancelBubble = true;
        onSelectShape(props);
      }}
    />
  );
}

export default FreeDrawing;
