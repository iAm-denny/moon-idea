/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import React, { useEffect, useState } from 'react';
import {
  Stage, Layer,
} from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { addShape } from '../../../redux/features/shapes/shapeSlice';
import SideBars from './SideBars';
import FreeDrawing from './Shapes/FreeDrawing';
import ArrowShape from './Shapes/Arrow';
import CircleShape from './Shapes/Circle';
import RectangleShape from './Shapes/Rectangle';
import LineShape from './Shapes/Line';

const index = () => {
  const shapeState = useSelector((state) => state.shape);
  const dispatch = useDispatch();

  const [selectedShapeItem, setselectedShapeItem] = useState('RectangleShape');
  // previuos shapes
  const [drawables, setDrawables] = useState([]);
  // drawing a new shpae
  const [newDrawable, setNewDrawable] = useState([]);
  // combine new shape and previos shapes
  const [shapeItems, setShapeItems] = useState([]);

  const drawableClasses = {
    FreeDrawing,
    ArrowShape,
    CircleShape,
    RectangleShape,
    LineShape,
  };

  const defaultColor = '#D9D9D9';

  const getNewDrawableBasedOnType = (data) => new drawableClasses[data.type](data);

  const handleMouseDown = (e) => {
    if (newDrawable.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const width = 0; const height = 0;
      const name = `${selectedShapeItem} ${shapeItems.length}`;
      const newShape = getNewDrawableBasedOnType(
        {
          x,
          y,
          type: selectedShapeItem,
          width,
          height,
          name,
          fill: defaultColor,
        },
      );
      setNewDrawable([newShape]);
    }
  };

  const getSizeOfShape = (shape) => {
    const sx = shape.x;
    const sy = shape.y;
    return { sx, sy };
  };

  const handleMouseMove = (e) => {
    if (newDrawable.length === 1) {
      const shape = newDrawable[0];
      const { x, y } = e.target.getStage().getPointerPosition();
      if (selectedShapeItem === 'RectangleShape') {
        const { sx, sy } = getSizeOfShape(shape);
        const name = `${selectedShapeItem} ${shapeItems.length}`;
        const rectangle = new drawableClasses[selectedShapeItem]({
          name, x: sx, y: sy, width: x - sx, height: y - sy, fill: defaultColor,
        });
        setNewDrawable([rectangle]);
      } else {
        shape.registerMovement(x, y);
        setNewDrawable([shape]);
      }
    }
  };

  const handleMouseUp = (e) => {
    if (newDrawable.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const shape = newDrawable[0];
      if (selectedShapeItem === 'RectangleShape') {
        const { sx, sy } = getSizeOfShape(shape);
        const name = `${selectedShapeItem} ${shapeItems.length}`;
        const rectangle = {
          name, x: sx, y: sy, type: selectedShapeItem, width: x - sx, height: y - sy, fill: defaultColor, isDone: true,
        };
        setNewDrawable([]);
        dispatch(addShape(rectangle));
        setDrawables(drawables);
      } else {
        shape.registerMovement(x, y);
        const shapeVal = {
          ...shape.data,
          endx: shape.endx,
          endy: shape.endy,
          isDone: true,
          type: selectedShapeItem,
          points: shape.points,
        };
        dispatch(addShape(shapeVal));
        setNewDrawable([]);
        setDrawables(drawables);
      }
    }
  };

  useEffect(() => {
    setShapeItems([...shapeState.shapesItem, ...newDrawable]);
  }, [shapeState.shapesItem, newDrawable]);

  // console.log('> ', shapeItems);

  // console.log('shapeItems', shapeItems);

  return (
    <SideBars setselectedShapeItem={setselectedShapeItem} selectedShapeItem={selectedShapeItem} currentItems={shapeItems} setCurrentItems={setShapeItems}>
      <Stage
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {
            shapeItems.map((item) => {
              if (item?.isDone) {
                console.log(' dsff ', item);
                return getNewDrawableBasedOnType(item).render();
              }
              return item.render();
            })
          }
        </Layer>
      </Stage>
    </SideBars>
  );
};

export default index;
