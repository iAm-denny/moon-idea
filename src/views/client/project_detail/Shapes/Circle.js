import { Circle } from 'react-konva';
import Arrow from './Arrow';

class CircleShape extends Arrow {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.x = props.x;
    this.y = props.y;
    this.id = new Date().getMilliseconds();
    this.fill = props.fill;
  }

  // constructor(name, startx, starty, width, height, fill) {
  //   super(name, startx, starty, fill);
  //   this.name = name;
  //   this.x = startx;
  //   this.y = starty;
  //   this.id = new Date().getMilliseconds();
  //   this.fill = fill;
  // }

  render() {
    const dx = this.x - this.endx;
    const dy = this.y - this.endy;
    const radius = Math.sqrt(dx * dx + dy * dy);
    return (
      <Circle radius={radius} fill={this.fill} x={this.x} y={this.y} stroke="black" key={this.id} />
    );
  }
}

export default CircleShape;
