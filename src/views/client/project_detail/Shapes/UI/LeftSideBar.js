/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { createStyles, ScrollArea } from '@mantine/core';
import { ReactSortable } from 'react-sortablejs';
import { useSelector, useDispatch } from 'react-redux';
import {
  IconArrowRight, IconCircle, IconLine, IconPencil, IconRectangle,
} from '@tabler/icons';
import Text from '../../../../../components/Typography/Text';
import { selectShape } from '../../../../../redux/features/shapes/shapeSlice';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[5]
    }`,
    padding: 5,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
    cursor: 'pointer',
    svg: {
      marginRight: 8,
    },
  },
  active: {
    background: theme.fn.variant({ variant: 'light', color: theme.other.primaryColorCode }).background,
    color: theme.white,
    borderColor: theme.fn.variant({ variant: 'light', color: theme.other.primaryColorCode }).background,
    borderRadius: 5,
    padding: 5,
  },
}));

// eslint-disable-next-line react/prop-types
function LeftSideBar({ currentItems, setCurrentItems }) {
  const { selectShapeValue } = useSelector((state) => state.shape);
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setData(currentItems);
  }, [currentItems]);

  const nameShape = (name) => {
    const iconSize = 14;
    const property = {};
    switch (name) {
      case 'RectangleShape':
        property.icon = <IconRectangle size={iconSize} />;
        break;
      case 'CircleShape':
        property.icon = <IconCircle size={iconSize} />;
        break;
      case 'ArrowShape':
        property.icon = <IconArrowRight size={iconSize} />;
        break;
      case 'LineShape':
        property.icon = <IconLine size={iconSize} />;
        break;
      case 'FreeDrawing':
        property.icon = <IconPencil size={iconSize} />;
        break;
      default:
        break;
    }
    return property;
  };

  // eslint-disable-next-line no-shadow
  const items = data && data.map((item) => (
    <div
      key={item?.id || Math.random()}
      className={cx(classes.item, { [classes.active]: item?.id === selectShapeValue?.id })}
      onClick={() => {
        if (item.data && item.data?.id) dispatch(selectShape({ data: item }));
      }}
      aria-hidden="true"
    >
      {nameShape(item.data?.type).icon}

      <Text size="xs">{item.data?.name.name}</Text>
    </div>
  ));

  return (
    <ScrollArea style={{ height: '100%' }} scrollbarSize={6} scrollHideDelay={0}>
      <ReactSortable
        sort
        animation={0}
        delayOnTouchStart={false}
        delay={0}
        // eslint-disable-next-line react/prop-types
        list={currentItems.map((x) => ({ ...x, chosen: true }))}
        setList={setCurrentItems}
        dragoverBubble={false}
      >
        {items}
      </ReactSortable>
    </ScrollArea>
  );
}

export default LeftSideBar;
