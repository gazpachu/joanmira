import React, { Component, Fragment } from "react";
import { Loop, Stage, World } from "react-game-kit";
import Matter from "matter-js";
import Box from "./Box";

class Boxes extends Component {
  constructor(props) {
    super(props);

    this.skills = [
      { name: "JavaScript", rating: 5 },
      { name: "HTML5", rating: 5 },
      { name: "CSS3", rating: 5 },
      { name: "Box2D", rating: 4 },
      { name: "Node.js", rating: 3 },
      { name: "Sails.js", rating: 3 },
      { name: "PHP", rating: 4 },
      { name: "C++", rating: 4 },
      { name: "MySQL", rating: 4 },
      { name: "SASS", rating: 4 },
      { name: "jQuery", rating: 4 },
      { name: "Bootstrap", rating: 4 },
      { name: "OpenFrameworks", rating: 5 },
      { name: "Angular.js", rating: 3 },
      { name: "LESS", rating: 4 },
      { name: "Ubuntu", rating: 4 },
      { name: "SVN & Git", rating: 4 },
      { name: "TweenMax", rating: 3 },
      { name: "Assemble.io", rating: 4 },
      { name: "Handlebars", rating: 4 },
      { name: "Grunt", rating: 3 },
      { name: "MongoDB", rating: 3 },
      { name: "Wordpress", rating: 5 },
      { name: "Phaser", rating: 1 },
      { name: "Flash", rating: 5 },
      { name: "React", rating: 2 }
    ];

    this.physicsInit = this.physicsInit.bind(this);
  }

  physicsInit(engine) {
    const ground = Matter.Bodies.rectangle(0, window.innerHeight, window.innerWidth * 2, 64, {
      isStatic: true
    });

    const leftWall = Matter.Bodies.rectangle(-64, 0, 64, window.innerHeight * 2, {
      isStatic: true
    });

    const rightWall = Matter.Bodies.rectangle(window.innerWidth, 0, 64, window.innerHeight * 2, {
      isStatic: true
    });

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  }

  render() {
    return (
      <Fragment>
        <div className="boxes">
          <Loop>
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <World
                onInit={this.physicsInit}
                gravity={{
                  x: 0,
                  y: 5,
                  scale: 0.001
                }}
              >
                {this.skills.map((skill, i) => (
                  <Box skill={skill} x={i * 30} y={i * 30} key={skill.name} />
                ))}
              </World>
            </Stage>
          </Loop>
        </div>

        <style jsx>{`
          .boxes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default Boxes;
