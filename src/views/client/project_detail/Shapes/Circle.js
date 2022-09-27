import React from 'react';
import { Circle } from 'react-konva';

function CircleShape(props) {
  const {
    // eslint-disable-next-line react/prop-types
    data, onSelectShape,
  } = props;

  const { // eslint-disable-next-line react/prop-types
    fill, x, y, stroke, id, radius,
  // eslint-disable-next-line react/prop-types
  } = data.data;
  return (
    <Circle
      key={id}
      radius={radius}
      fill={fill}
      x={x}
      y={y}
      stroke={stroke}
      onClick={(e) => {
        e.cancelBubble = true;
        onSelectShape(data);
      }}
    />
  );
}

export default CircleShape;
