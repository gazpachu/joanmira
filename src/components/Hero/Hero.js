import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Boxes from "./Boxes";

const Hero = props => {
  const { scrollToContent, theme } = props;

  return (
    <Fragment>
      <section className="hero">
        <h1>
          Hi! I&#39;m Joan, a frontend engineer / web designer who makes technology <i>easy as candy</i>
        </h1>
        <h2>Scroll down to read my latest stories</h2>
        <button onClick={scrollToContent} aria-label="scroll" title="Read my latest blog posts">
          <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="30px">
            <polyline
              fill="none"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,0 20,20 40,0"
            />
          </svg>
        </button>
        <Boxes />
      </section>

      <style jsx>{`
        .hero {
          color: white;
          padding-top: 90px;
          text-align: center;
          height: 100vh;
          background-image: -webkit-linear-gradient(
              top,
              rgba(17, 2, 49, 0.75),
              rgba(17, 2, 49, 0)
            ),
            -webkit-linear-gradient(bottom left, #eb6670, #f67f7c, #f9ac97, #f1b79f, #e1bea7, #c3bcb0, #8aabb2, #4e95b2, #2588b6);
        }

        h1 {
          margin: 30px auto;
          width: 100%;
          max-width: 750px;
          font-size: 36px;
          line-height: 1.2;
          padding: 0 30px;

          @below tablet {
            font-size: ${theme.font.size.xl};
          }
        }

        h2 {
          font-size: 20px;
          line-height: 30px;
        }

        button {
          background: rgba(255, 255, 255, 0.1);
          border: 0;
          border-radius: 50%;
          font-size: ${theme.font.size.m};
          margin-top: 30px;
          padding: ${theme.space.s} ${theme.space.m};
          cursor: pointer;
          width: ${theme.space.xl};
          height: ${theme.space.xl};

          &:focus,
          &:hover {
            outline-style: none;
            background: rgba(255, 255, 255, 0.2);
          }

          :global(svg) {
            position: relative;
            fill: ${theme.color.neutral.white};
            stroke: ${theme.color.neutral.white};
            animation-duration: ${theme.time.duration.long};
            animation-name: buttonIconMove;
            animation-iteration-count: infinite;
          }

          @from-width tablet {
            font-size: ${theme.font.size.l};
          }

          @from-width desktop {
            font-size: ${theme.font.size.xl};
          }
        }

        @keyframes buttonIconMove {
          0% {
            transform: translateY(15px);
          }
          50% {
            transform: translateY(5px);
          }
          100% {
            transform: translateY(15px);
          }
        }
      `}</style>
    </Fragment>
  );
};

Hero.propTypes = {
  scrollToContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
