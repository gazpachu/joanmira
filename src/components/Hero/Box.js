import React, { Component } from "react";
import PropTypes from "prop-types";
import { Body } from "react-game-kit";
import Matter from "matter-js";

class Box extends Component {
  static propTypes = {
    skill: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      width: Math.floor(Math.random() * (this.props.skill.rating * 20) + window.innerWidth / 12),
      height: Math.floor(Math.random() * (this.props.skill.rating * 20) + window.innerHeight / 18)
    };

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, "afterUpdate", this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, "afterUpdate", this.update);
  }

  getWrapperStyles() {
    // const { body } = this.body;
    // const { scale } = this.context;
    // const { x, y } = characterPosition;
    // const targetX = x + stageX;

    return {
      transform: `translate(${this.state.x}px, ${this.state.y}px)`
    };
  }

  update() {
    const { body } = this.body;
    this.setState({ x: Math.floor(body.position.x), y: Math.floor(body.position.y) });

    // console.log(body.position);
    // if (body) {
    //
    //   Matter.Body.setVelocity(body, { x: body.position.x + 0.1, y: 0 });
    // }
  }

  render() {
    const { skill, x, y } = this.props;

    return (
      <div className="box" style={this.getWrapperStyles()}>
        <Body
          args={[0, 0, this.state.width, this.state.height]}
          density={1.0}
          friction={0.6}
          restitution={1.0}
          ref={b => {
            this.body = b;
          }}
        >
          {skill.name}
        </Body>

        <style jsx>{`
          .box {
            font-weight: "lighter";
            transform-origin: "left top";
            position: absolute;
            width: ${`${this.state.width}px`};
            height: ${`${this.state.height}px`};
            border: 1px solid white;
            border-color: rgba(255, 255, 255, 0.33);
            background-color: rgba(255, 255, 255, 0.15);
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

export default Box;
