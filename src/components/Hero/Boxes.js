import React, { Component } from "react";
import { Loop, Stage, World, Body } from 'react-game-kit';

class Boxes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Loop>
        <Stage>
          <World>
            <Body args={[0,0,75,75]} ref={ (b) => this.body = b.body }>
              // Sprites go here
            </Body>
          </World>
        </Stage>
      </Loop>
    )
  }
}

export default Boxes;
