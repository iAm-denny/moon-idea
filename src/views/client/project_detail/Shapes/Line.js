import { Line as LineKnova } from 'react-konva';
import Shape from './Shape';

class Line extends Shape {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.points = [props.x, props.y];
    this.endx = props.endx;
    this.endy = props.endy;
    this.fill = props.fill;
    this.stroke = props.stroke;
    this.onClick = props.onClick;
  }

  registerMovement(x, y) {
    this.endx = x;
    this.endy = y;
  }

  render() {
    const points = [...this.points, this.endx, this.endy];
    return (
      <LineKnova
        points={points}
        fill={this.fill}
        stroke={this.stroke}
        key={this.id}
        onClick={(e) => {
          e.cancelBubble = true;
          this.onClick(this.data);
        }}
      />
    );
  }
}
export default Line;
