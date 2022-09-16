import { Line } from 'react-konva';
import Shape from './Shape';

class FreeDrawing extends Shape {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.data = props;
    this.points = [props.x, props.y];
    this.fill = props.fill;
    this.stroke = props.stroke;
    this.onClick = props.onClick;
  }

  registerMovement(x, y) {
    this.points = [...this.points, x, y];
  }

  render() {
    return (
      <Line
        points={this.data?.isDone ? this.data.points : this.points}
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
export default FreeDrawing;
