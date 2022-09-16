/* eslint-disable max-len */
import { Circle } from 'react-konva';
import Arrow from './Arrow';

class CircleShape extends Arrow {
  constructor(props) {
    super(props);
    this.data = props;
    this.id = props.id;
    this.x = props.x;
    this.y = props.y;
    this.fill = props.fill;
    this.stroke = props.stroke;
    this.onClick = props.onClick;
  }

  render() {
    const dx = this.x - this.endx;
    const dy = this.y - this.endy;
    const radius = Math.sqrt(dx * dx + dy * dy);
    return (
      <Circle
        radius={radius}
        fill={this.fill}
        x={this.x}
        y={this.y}
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

export default CircleShape;
