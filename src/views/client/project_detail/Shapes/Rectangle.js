import { Rect as RectangleKonva } from 'react-konva';
import Shape from './Shape';

class RectangleShape extends Shape {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.x = props.x;
    this.y = props.y;
    this.id = new Date().getMilliseconds();
    this.width = props.width;
    this.height = props.height;
    this.fill = props.fill;
    this.stroke = props.stroke;
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
        }}
      />
    );
  }
}

export default RectangleShape;
