import React, { Fragment } from "react";
import PropTypes from "prop-types";

const propTypes = {
  name: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

const Box = props => {
  const { name, x, y, r, width, height } = props;

  return (
    <Fragment>
      {y ? <div className="box">{name}</div> : null}

      <style jsx>{`
        .box {
          font-weight: lighter;
          font-size: 20px;
          transform-origin: center center;
          transform: ${`translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`};
          position: absolute;
          width: ${`${width}px`};
          height: ${`${height}px`};
          border: 1px solid white;
          border-color: rgba(255, 255, 255, 0.33);
          background-color: rgba(255, 255, 255, 0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          @below tablet {
            font-size: 14px;
          }

          &:hover {
            border-color: rgba(255, 255, 255, 0.67);
            background-color: rgba(255, 255, 255, 0.33);
          }
        }
      `}</style>
    </Fragment>
  );
};

Box.propTypes = propTypes;

export default Box;
