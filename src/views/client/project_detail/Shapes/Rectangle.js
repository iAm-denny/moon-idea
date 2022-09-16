import { Rect as RectangleKonva } from 'react-konva';
import Shape from './Shape';

class RectangleShape extends Shape {
  constructor(props) {
    super(props);
    this.data = props;
    this.id = props.id;
    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
    this.fill = props.fill;
    this.stroke = props.stroke;
    this.onClick = props.onClick;
  }

  render() {
    return (
      <RectangleKonva
        x={this.x}
        y={this.y}
        width={this.width}
        height={this.height}
        fill={this.fill}
        stroke={this.stroke}
        key={this.id}
        onClick={(e) => {
          e.cancelBubble = true;
          if (this.data.newType === 'Pointer') {
            this.onClick(this.data);
          }
        }}
      />
    );
  }
}

export default RectangleShape;
