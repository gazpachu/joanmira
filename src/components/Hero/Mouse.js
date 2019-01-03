import PropTypes from "prop-types";
import planck, { Vec2, AABB } from "planck-js";

class Mouse {
  static propTypes = {
    worldScale: PropTypes.number,
    world: PropTypes.object
  };

  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMouseDown = false;
    this.selectedBody = null;
    this.mouseJoint = null;
    this.clickedX = 0;
    this.clickedY = 0;
    this.clicked = false;
    this.canvasPosition = { x: 0, y: 0 };
    this.mousePVec = null;

    this.updateFromEvent = this.updateFromEvent.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.touchDownHandler = this.touchDownHandler.bind(this);
    this.touchUpHandler = this.touchUpHandler.bind(this);
    this.getBodyCB = this.getBodyCB.bind(this);
    this.update = this.update.bind(this);
  }

  init(world, worldScale) {
    this.world = world;
    this.worldScale = worldScale;
    document.addEventListener("mousedown", this.mouseDownHandler, true);
    document.addEventListener("touchstart", this.touchDownHandler, true);
  }

  destroy() {
    document.removeEventListener("mousedown", this.mouseMoveHandler);
    document.removeEventListener("touchstart", this.touchDownHandler);
  }

  downHandler(x, y) {
    this.isMouseDown = true;
    this.clickedX = x;
    this.clickedY = y;
    this.clicked = true;
    this.moveHandler(x, y);
  }

  upHandler(x, y) {
    this.isMouseDown = false;
    this.clickedX = null;
    this.clickedY = null;
  }

  moveHandler(x, y) {
    this.mouseX = (x - this.canvasPosition.x) / this.worldScale;
    this.mouseY = (y - this.canvasPosition.y) / this.worldScale;
  }

  getBodyAtMouse() {
    this.mousePVec = new Vec2(this.mouseX, this.mouseY);
    var aabb = new AABB();
    aabb.lowerBound = Vec2(this.mouseX - 0.001, this.mouseY - 0.001);
    aabb.upperBound = Vec2(this.mouseX + 0.001, this.mouseY + 0.001);

    // Query the world for overlapping shapes
    this.selectedBody = null;
    this.world.queryAABB(aabb, this.getBodyCB);

    return this.selectedBody;
  }

  getBodyCB(fixture) {
    if (fixture.getBody().isDynamic() && fixture.testPoint(this.mousePVec)) {
      this.selectedBody = fixture.getBody();
      return false;
    }
    return true;
  }

  update() {
    if (this.isMouseDown && !this.mouseJoint) {
      const body = this.getBodyAtMouse();

      if (body) {
        const md = planck.MouseJoint(
          {
            collideConnected: true,
            maxForce: 300.0 * body.getMass()
          },
          this.world.createBody(),
          body,
          Vec2(this.mouseX, this.mouseY)
        );

        this.mouseJoint = this.world.createJoint(md);
        body.setAwake(true);
      }
    }

    if (this.mouseJoint) {
      if (this.isMouseDown) {
        this.mouseJoint.setTarget(new Vec2(this.mouseX, this.mouseY));
      } else {
        this.world.destroyJoint(this.mouseJoint);
        this.mouseJoint = null;
      }
    }
  }

  mouseMoveHandler(e) {
    this.updateFromEvent(e);
    this.moveHandler(this.mouseX, this.mouseY);
    this.clicked = false;
  }

  updateFromEvent(e) {
    const touch = e.originalEvent || e;

    if (touch && touch.touches && touch.touches.length == 1) {
      this.mouseX = touch.touches[0].pageX;
      this.mouseY = touch.touches[0].pageY;
    } else {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }
  }

  mouseUpHandler(e) {
    document.addEventListener("mousedown", this.mouseDownHandler, true);
    document.removeEventListener("mousemove", this.mouseMoveHandler, true);
    this.isDown = false;
    this.updateFromEvent(e);
    this.upHandler(this.mouseX, this.mouseY);
  }

  touchUpHandler(e) {
    document.addEventListener("touchstart", this.touchDownHandler, true);
    document.removeEventListener("touchmove", this.mouseMoveHandler, true);
    this.isDown = false;
    this.updateFromEvent(e);
    this.upHandler(this.mouseX, this.mouseY);
  }

  mouseDownHandler(e) {
    document.removeEventListener("mousedown", this.mouseDownHandler, true);
    document.addEventListener("mouseup", this.mouseUpHandler, true);
    document.addEventListener("mousemove", this.mouseMoveHandler, true);
    this.isDown = true;
    this.updateFromEvent(e);
    this.downHandler(this.mouseX, this.mouseY);
  }

  touchDownHandler(e) {
    document.removeEventListener("touchstart", this.touchDownHandler, true);
    document.addEventListener("touchend", this.touchUpHandler, true);
    document.addEventListener("touchmove", this.mouseMoveHandler, true);
    this.isDown = true;
    this.updateFromEvent(e);
    this.downHandler(this.mouseX, this.mouseY);
  }
}

export default Mouse;
