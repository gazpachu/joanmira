import React, { PureComponent } from "react";
import planck, { Vec2 } from "planck-js";
import Box from "./Box";
import Mouse from "./Mouse";

const R2D = 180 / Math.PI; // Multiply to convert radians to degrees
const PI2 = Math.PI * 2; // 360 degrees in radians
const worldScale = 40;

class Boxes extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      skills: [
        { name: "HTML5", rating: 5 },
        { name: "CSS3", rating: 5 },
        { name: "JavaScript", rating: 5 },
        { name: "ReactJS", rating: 5 },
        { name: "CSSinJS", rating: 4 },
        { name: "Redux", rating: 4 },
        { name: "Storybook", rating: 4 },
        { name: "xState", rating: 2 },
        { name: "Webpack", rating: 4 },
        { name: "OpenSource", rating: 4 },
        { name: "Jest", rating: 3 },
        { name: "PWA", rating: 3 },
        { name: "Webstorm", rating: 3 },
        { name: "C++", rating: 3 },
        { name: "Firebase", rating: 4 },
        { name: "Github", rating: 3 },
        { name: "GhostJS", rating: 3 },
        { name: "AWS", rating: 3 },
        { name: "Cypress", rating: 5 },
        { name: "Typescript", rating: 5 },
        { name: "ESlint", rating: 3 },
        { name: "Prettier", rating: 4 },
        { name: "Node.js", rating: 3 },
        { name: "Slack", rating: 4 },
        { name: "Git", rating: 4 },
        { name: "Netlify", rating: 3 },
        { name: "REST", rating: 3 },
        { name: "Next.js", rating: 4 },
        { name: "Styleguidist", rating: 4 },
        { name: "GraphQL", rating: 2 }
      ]
    };

    this.totalBoxes = 0;
    this.generator = null;
    this.canvasWidth = null;
    this.canvasHeight = null;

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;

    this.world = planck.World(Vec2(0, 20));
    this.world.createBody().createFixture(planck.Edge(Vec2(-this.canvasWidth / worldScale, this.canvasHeight / worldScale), Vec2(this.canvasWidth / worldScale, this.canvasHeight / worldScale)), 0.0);
    this.world.createBody().createFixture(planck.Edge(Vec2(0, -10), Vec2(0, this.canvasHeight / worldScale)), 0.0);
    this.world.createBody().createFixture(planck.Edge(Vec2(this.canvasWidth / worldScale, -10), Vec2(this.canvasWidth / worldScale, this.canvasHeight / worldScale)), 0.0);
    this.world.createBody().createFixture(planck.Edge(Vec2(0, -10), Vec2(this.canvasWidth / worldScale, -10)), 0.0);

    this.mouse = new Mouse();

    this.animationFrame = requestAnimationFrame(this.update);
    this.mouse.init(this.world, worldScale);

    this.generator = setInterval(() => {
      if (this.totalBoxes < this.state.skills.length) {
        let multiplier = 20;
        if (this.canvasWidth < 767) multiplier = 15;

        const x = Math.floor(Math.random() * this.canvasWidth) - 100;
        const w = Math.floor((Math.random() * (this.state.skills[this.totalBoxes].rating * multiplier)) + this.canvasWidth / 12);
        const h = Math.floor((Math.random() * (this.state.skills[this.totalBoxes].rating * multiplier)) + this.canvasHeight / 18);
        const body = this.world.createDynamicBody(Vec2(x / worldScale, -5));
        body.createFixture(planck.Box(w / 2 / worldScale, h / 2 / worldScale), {
          density: 2.0,
          friction: 0.2,
          restitution: 0.6
        });
        body.m_userData = { i: this.totalBoxes, w: w / 2, h: h / 2 };

        const skills = this.state.skills.splice(0);
        skills[this.totalBoxes].w = w;
        skills[this.totalBoxes].h = h;
        this.setState({ skills });

        this.totalBoxes += 1;
      } else {
        clearInterval(this.generator);
        this.generator = null;
      }
    }, 300);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame);
    this.mouse.destroy();
  }

  update() {
    // in each frame call world.step(timeStep) with fixed timeStep
    this.world.step(1 / 60, 10, 10);

    const skills = this.state.skills.slice(0);

    // iterate over bodies and fixtures
    for (let body = this.world.getBodyList(); body; body = body.getNext()) {
      if (body.m_userData) {
        const transform = body.getTransform();

        skills[body.m_userData.i].x = Math.floor(transform.p.x * worldScale) - body.m_userData.w;
        skills[body.m_userData.i].y = Math.floor(transform.p.y * worldScale) - body.m_userData.h;
        skills[body.m_userData.i].r = Math.round(((body.getAngle() + PI2) % PI2) * R2D * 100) / 100;
      }
    }

    this.setState({ skills });

    this.mouse.update();

    this.animationFrame = requestAnimationFrame(this.update);
  }

  render() {
    const { skills } = this.state;

    return (
      <div className="boxes">
        {skills.map((skill, i) => (
          <Box
            name={skill.name}
            x={skill.x}
            y={skill.y}
            r={skill.r}
            width={skill.w}
            height={skill.h}
            key={skill.name}
          />
        ))}

        <style jsx>{`
          .boxes {
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            user-select: none;
          }
        `}</style>
      </div>
    );
  }
}

export default Boxes;
