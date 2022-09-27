import React from 'react';
import { Rect as RectangleKonva } from 'react-konva';

function Rectangle(props) {
  const {
    // eslint-disable-next-line react/prop-types
    data, onSelectShape,
  } = props;
  const { // eslint-disable-next-line react/prop-types
    x, y, width, height, fill, stroke, id,
  // eslint-disable-next-line react/prop-types
  } = data.data;

  return (
    <RectangleKonva
      key={id}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      onClick={(e) => {
        e.cancelBubble = true;
        onSelectShape(data);
      }}
    />
  );
}

export default Rectangle;
