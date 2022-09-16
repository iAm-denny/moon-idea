import { Arrow } from 'react-konva';
import Shape from './Shape';

class ArrowShape extends Shape {
  constructor(props) {
    super(props);
    this.x = props.x;
    this.y = props.y;
    this.endx = props.endx;
    this.endy = props.endy;
    this.id = Math.random();
  }

  registerMovement(x, y) {
    this.endx = x;
    this.endy = y;
  }

  render() {
    const points = [this.x, this.y, this.endx, this.endy];
    return <Arrow points={points} fill="black" stroke="black" key={this.id} />;
  }
}

export default ArrowShape;
