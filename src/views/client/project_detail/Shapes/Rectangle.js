/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Rect as RectangleKonva, Transformer } from 'react-konva';

function Rectangle(props) {
  const shapeRef = useRef();
  const trRef = useRef();
  const {
    data, onSelectShape, handleDragEnd, selectShapeType, selectShapeValue, handleTransformEnd,
  } = props;
  const {
    x, y, width, height, fill, stroke, id, scaleX, scaleY, rotation,
  } = data.data;

  useEffect(() => {
    if (selectShapeValue.id === id) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectShapeValue]);

  return (
    <>
      <RectangleKonva
        ref={shapeRef}
        draggable={selectShapeType === 'Pointer'}
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
        onTransformEnd={handleTransformEnd}
        onDragEnd={(e) => handleDragEnd(e, data)}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
      />
      {selectShapeValue.id === id && <Transformer ref={trRef} />}
    </>
  );
}

export default Rectangle;
