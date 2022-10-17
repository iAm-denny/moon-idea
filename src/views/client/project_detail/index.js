/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import {
  addShape,
  makeChangesShape,
  selectShape,
  fetchProjectDetail,
  updateSelectShapeValue,
} from '../../../redux/features/shapes/shapeSlice';
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
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();

  const { fill: defaultColor, stroke: defaultStrokeColor } = colors.shape;
  const { isSmall } = useResponsive();
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const [id, setId] = useState(null);
  const [selectShapeType, setSelectShapeType] = useState('RectangleShape');
  // previuos shapes
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [points, setPoints] = useState([]);
  // drawing a new shpae
  const [newDrawable, setNewDrawable] = useState([]);
  // combine new shape and previos shapes
  const [shapeItems, setShapeItems] = useState([]);

  useEffect(() => {
    if (isSmall) {
      setSelectShapeType('');
    } else {
      setSelectShapeType('RectangleShape');
    }
  }, [isSmall]);

  const onSelectShape = (propsData) => {
    if (selectShapeType === 'Pointer') {
      dispatch(selectShape({ data: propsData }));
    }
  };

  const handleDragEnd = (e, data) => {
    onSelectShape(data);
    const position = {
      x: e.target.x(),
      y: e.target.y(),
    };
    dispatch(updateSelectShapeValue(position));
    dispatch(makeChangesShape({ isNew: false }));
  };

  const handleTransformEnd = (e) => {
    const data = {
      x: e.target.x(),
      y: e.target.y(),
      scaleX: e.target.scaleX(),
      scaleY: e.target.scaleY(),
      rotation: e.target.rotation(),
    };
    dispatch(updateSelectShapeValue(data));
    dispatch(makeChangesShape({ isNew: false }));
  };

  const passProps = {
    selectShapeValue: shapeState.selectShapeValue,
    onSelectShape,
    handleDragEnd,
    selectShapeType,
    handleTransformEnd,
  };

  // eslint-disable-next-line consistent-return
  const renderShape = (data) => {
    switch (data?.data?.type) {
      case 'RectangleShape':
        return <RectangleShape data={data} {...passProps} key={data.id} />;
      case 'CircleShape':
        return <CircleShape data={data} {...passProps} key={data.id} />;
      case 'ArrowShape':
        return <ArrowShape data={data} {...passProps} key={data.id} />;
      case 'LineShape':
        return <LineShape data={data} {...passProps} key={data.id} />;
      case 'FreeDrawing':
        return <FreeDrawing data={data} {...passProps} key={data.id} />;
      default:
        break;
    }
  };

  const responseShapeValue = (value) => {
    const {
      sx,
      sy,
      x,
      y,
      color,
      stroke,
      tempPoints,
      isDone = false,
      name,
    } = value;
    let data = {
      id,
      type: selectShapeType,
      fill: color,
      stroke,
      isDone,
      name,
    };
    switch (selectShapeType) {
      case 'RectangleShape':
        data.x = sx;
        data.y = sy;
        data.width = x - sx;
        data.height = y - sy;
        break;
      case 'CircleShape': {
        const dx = sx - x;
        const dy = sy - y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        data.radius = radius;
        data.x = x;
        data.y = y;
        break;
      }
      case 'ArrowShape':
      case 'LineShape':
        data.points = [sx, sy, x, y];
        break;
      case 'FreeDrawing':
        data.points = tempPoints;
        break;
      default:
        data = {};
    }
    const shapeData = {
      id,
      data,
      // eslint-disable-next-line no-underscore-dangle
      created_by: userState.user.user._id,
      project_id: params.id,
      createdAt: moment().utc().format(),
      updatedAt: moment().utc().format(),
    };
    return shapeData;
  };

  const nameShape = (name) => {
    const property = {};
    switch (name) {
      case 'RectangleShape':
        property.name = `Rectangle ${shapeItems.length}`;
        break;
      case 'CircleShape':
        property.name = `Circle ${shapeItems.length}`;
        break;
      case 'ArrowShape':
        property.name = `Arrow ${shapeItems.length}`;
        break;
      case 'LineShape':
        property.name = `Line ${shapeItems.length}`;
        break;
      case 'FreeDrawing':
        property.name = `Pen ${shapeItems.length}`;
        break;
      default:
        break;
    }
    return property;
  };

  const handleMouseDown = (e) => {
    if (newDrawable.length === 0 && selectShapeType !== 'Pointer') {
      const tempId = uuid();
      setId(tempId);
      const { x, y } = e.target.getStage().getRelativePointerPosition();
      setStartX(x);
      setStartY(y);
      const width = 0;
      const height = 0;
      const name = nameShape(selectShapeType);
      const tempData = {
        id: tempId,
        x,
        y,
        type: selectShapeType,
        width,
        height,
        name,
        fill: defaultColor,
        stroke: defaultStrokeColor,
      };
      const data = responseShapeValue(tempData);
      setNewDrawable([data]);
    }
  };

  const handleMouseMove = (e) => {
    if (newDrawable.length === 1) {
      const { x, y } = e.target.getStage().getRelativePointerPosition();
      // const points = [startX, startY, x, y];
      const name = nameShape(selectShapeType);
      const tempPoints = [...points];
      tempPoints.push(x);
      tempPoints.push(y);
      setPoints(tempPoints);

      const tempData = {
        sx: startX,
        sy: startY,
        x,
        y,
        color: defaultColor,
        stroke: defaultStrokeColor,
        tempPoints,
        name,
      };
      const data = responseShapeValue(tempData);
      setNewDrawable([data]);
    }
  };

  const handleMouseUp = (e) => {
    if (newDrawable.length === 1) {
      const { x, y } = e.target.getStage().getRelativePointerPosition();
      const tempPoints = [...points];
      tempPoints.push(x);
      tempPoints.push(y);
      setPoints(tempPoints);
      const name = nameShape(selectShapeType);
      const tempData = {
        sx: startX,
        sy: startY,
        x,
        y,
        color: defaultColor,
        stroke: defaultStrokeColor,
        tempPoints,
        isDone: true,
        name,
      };
      const data = responseShapeValue(tempData);

      if (data?.data?.width !== 0 && data?.data?.height !== 0) {
        dispatch(addShape(data));
        onSelectShape(data);
        dispatch(selectShape(data));
        dispatch(makeChangesShape({ isNew: true, data }));
      }

      setNewDrawable([]);
      setPoints([]);
    }
  };

  useEffect(() => {
    setShapeItems([...shapeState.shapesItem, ...newDrawable]);
  }, [shapeState.shapesItem, newDrawable]);

  const changeSelectShapeTypehandle = (value) => {
    dispatch(selectShape(null));
    setSelectShapeType(value);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    if (e.evt.ctrlKey) {
      const scaleBy = 1.1;
      const temStage = e.target.getStage();
      const oldScale = temStage.scaleX();
      const mousePointTo = {
        x:
          temStage.getRelativePointerPosition().x / oldScale -
          temStage.x() / oldScale,
        y:
          temStage.getRelativePointerPosition().y / oldScale -
          temStage.y() / oldScale,
      };

      const newScale =
        e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      setStage({
        scale: newScale,
        x:
          -(
            mousePointTo.x -
            temStage.getRelativePointerPosition().x / newScale
          ) * newScale,
        y:
          -(
            mousePointTo.y -
            temStage.getRelativePointerPosition().y / newScale
          ) * newScale,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProjectDetail(params.id));
  }, []);

  return (
    <SideBars
      changeSelectShapeTypehandle={changeSelectShapeTypehandle}
      selectShapeType={selectShapeType}
      currentItems={shapeItems}
      setCurrentItems={setShapeItems}
    >
      <Stage
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        width={window.innerWidth * 3}
        height={window.innerHeight * 3}
      >
        <Layer>{shapeItems.map((item) => renderShape(item))}</Layer>
      </Stage>
    </SideBars>
  );
};

export default index;
