/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Circle, Transformer } from 'react-konva';

function CircleShape(props) {
  const shapeRef = useRef();
  const trRef = useRef();
  const {
    data, onSelectShape, handleDragEnd, selectShapeType, selectShapeValue, handleTransformEnd,
  } = props;

  const { // eslint-disable-next-line react/prop-types
    fill, x, y, stroke, id, radius, scaleX, scaleY, rotation,
  } = data.data;

  useEffect(() => {
    if (selectShapeValue.id === id) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectShapeValue]);

  return (
    <>
      <Circle
        ref={shapeRef}
        draggable={selectShapeType === 'Pointer'}
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
        onTransformEnd={handleTransformEnd}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        onDragEnd={(e) => handleDragEnd(e, data)}
      />
      {selectShapeValue.id === id && <Transformer ref={trRef} />}
    </>
  );
}

export default CircleShape;
