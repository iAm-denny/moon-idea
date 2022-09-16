/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import React, { useEffect, useState } from 'react';
import {
  Stage, Layer,
} from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addShape, selectShape } from '../../../redux/features/shapes/shapeSlice';
import SideBars from './SideBars';
import FreeDrawing from './Shapes/FreeDrawing';
import ArrowShape from './Shapes/Arrow';
import CircleShape from './Shapes/Circle';
import RectangleShape from './Shapes/Rectangle';
import LineShape from './Shapes/Line';
import { colors } from '../../../utils/colors';
import useResponsive from '../../../utils/responsive';

const index = () => {
  const shapeState = useSelector((state) => state.shape);
  const dispatch = useDispatch();
  const { fill: defaultColor, stroke: defaultStrokeColor } = colors.shape;
  const { isSmall } = useResponsive();
  const [id, setId] = useState(null);
  const [selectShapeType, setSelectShapeType] = useState('RectangleShape');
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

  useEffect(() => {
    if (isSmall) {
      setSelectShapeType('');
    } else {
      setSelectShapeType('RectangleShape');
    }
  }, [isSmall]);

  const getNewDrawableBasedOnType = (data) => new drawableClasses[data.type](data);

  const handleMouseDown = (e) => {
    if (newDrawable.length === 0 && selectShapeType !== 'Pointer') {
      const tempId = uuid();
      setId(tempId);
      const { x, y } = e.target.getStage().getPointerPosition();
      const width = 0; const height = 0;
      const name = `${selectShapeType} ${shapeItems.length}`;
      const newShape = getNewDrawableBasedOnType(
        {
          id: tempId,
          x,
          y,
          type: selectShapeType,
          width,
          height,
          name,
          fill: defaultColor,
          stroke: defaultStrokeColor,
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
      if (selectShapeType === 'RectangleShape') {
        const { sx, sy } = getSizeOfShape(shape);
        const name = `${selectShapeType} ${shapeItems.length}`;
        const rectangle = new drawableClasses[selectShapeType]({
          id, name, x: sx, y: sy, width: x - sx, height: y - sy, fill: defaultColor, stroke: defaultStrokeColor,
        });
        setNewDrawable([rectangle]);
      } else {
        shape.registerMovement(x, y);
        setNewDrawable([shape]);
      }
    }
  };

  const clickShape = (data) => {
    dispatch(selectShape(data));
  };

  const handleMouseUp = (e) => {
    if (newDrawable.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const shape = newDrawable[0];
      if (selectShapeType === 'RectangleShape') {
        const { sx, sy } = getSizeOfShape(shape);
        const name = `${selectShapeType} ${shapeItems.length}`;
        const rectangle = {
          id, name, x: sx, y: sy, type: selectShapeType, width: x - sx, height: y - sy, fill: defaultColor, isDone: true, stroke: defaultStrokeColor, onClick: (data, isClicked) => clickShape(data, isClicked),
        };
        setNewDrawable([]);
        dispatch(addShape(rectangle));
        setDrawables(drawables);
      } else {
        shape.registerMovement(x, y);
        const shapeVal = {
          ...shape.data,
          id: shape.id,
          endx: shape.endx,
          endy: shape.endy,
          isDone: true,
          type: selectShapeType,
          points: shape.points,
          onClick: (data, isClicked) => clickShape(data, isClicked),
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

  const changeSelectShapeTypehandle = (value) => {
    dispatch(selectShape(null));
    setSelectShapeType(value);
  };

  return (
    <SideBars changeSelectShapeTypehandle={changeSelectShapeTypehandle} selectShapeType={selectShapeType} currentItems={shapeItems} setCurrentItems={setShapeItems}>
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
                const updateItem = { ...item, newType: selectShapeType };
                return getNewDrawableBasedOnType(updateItem).render();
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
