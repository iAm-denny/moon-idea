/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Line, Transformer } from 'react-konva';

function FreeDrawing(props) {
  const shapeRef = useRef();
  const trRef = useRef();
  const {
    data, onSelectShape, handleDragEnd, selectShapeType, selectShapeValue, handleTransformEnd,
  } = props;

  const {
    fill, stroke, id, points, x, y, scaleX, scaleY, rotation,
  } = data.data;

  useEffect(() => {
    if (selectShapeValue.id === id) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectShapeValue]);

  return (
    <>
      <Line
        ref={shapeRef}
        draggable={selectShapeType === 'Pointer'}
        key={id}
        points={points}
        fill={fill}
        x={x}
        y={y}
        stroke={stroke}
        onClick={(e) => {
          e.cancelBubble = true;
          onSelectShape(data);
        }}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        onTransformEnd={handleTransformEnd}
        onDragEnd={(e) => handleDragEnd(e, data)}
      />
      {selectShapeValue.id === id && <Transformer ref={trRef} />}
    </>
  );
}

export default FreeDrawing;
