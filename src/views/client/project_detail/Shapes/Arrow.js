import React from 'react';
import { Arrow } from 'react-konva';

function ArrowShape(props) {
  const {
    // eslint-disable-next-line react/prop-types
    data, onSelectShape,
  } = props;

  const { // eslint-disable-next-line react/prop-types
    fill, stroke, id, points,
  } = data;

  return (
    <Arrow
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

export default ArrowShape;
