import { Line } from 'react-konva';
import Shape from './Shape';

class FreeDrawing extends Shape {
  constructor(props) {
    super(props);
    this.data = props;
    this.points = [props.x, props.y];
    // this.endx = props.endx;
    // this.endy = props.endy;
    this.id = new Date().getMilliseconds();
  }

  registerMovement(x, y) {
    this.points = [...this.points, x, y];
    // this.endx = x;
    // this.endy = y;
  }

  render() {
    // const points = [...this.points, this.endx, this.endy];
    return <Line points={this.data?.isDone ? this.data.points : this.points} fill="black" stroke="black" key={this.id} />;
  }
}
export default FreeDrawing;
