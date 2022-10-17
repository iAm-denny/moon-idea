import {
  IconRectangle,
  IconCircle,
  IconPencil,
  IconArrowRight,
  IconLine,
  IconPointer,
} from '@tabler/icons';

const iconSize = 16;

const shapeIcons = [
  {
    name: 'Rectangle',
    icon: <IconRectangle size={iconSize} />,
    component: 'RectangleShape',
  },
  {
    name: 'Circle',
    icon: <IconCircle size={iconSize} />,
    component: 'CircleShape',
  },
  {
    name: 'Arrow',
    icon: <IconArrowRight size={iconSize} />,
    component: 'ArrowShape',
  },
  {
    name: 'Line',
    icon: <IconLine size={iconSize} />,
    component: 'LineShape',
  },
  {
    name: 'Pen',
    icon: <IconPencil size={iconSize} />,
    component: 'FreeDrawing',
  },
  {
    name: 'Pointer',
    icon: <IconPointer size={iconSize} />,
    component: 'Pointer',
  },
];

// eslint-disable-next-line import/prefer-default-export
export { shapeIcons };
