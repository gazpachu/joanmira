import React, { Component } from "react";
import planck, { Vec2 } from "planck-js";

class Boxes extends Component {
  constructor(props) {
    super(props);

    const world = planck.World();
    const ground = world.createBody({
      type: "static",
      position: Vec2(2, 5)
    });

    console.log(ground);
  }

  render() {
    return <div>hi</div>;
  }
}

export default Boxes;
