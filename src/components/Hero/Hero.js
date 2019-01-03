import React, { Fragment } from "react";
import Boxes from "./Boxes";

const Hero = props => {
  return (
    <Fragment>
      <section className="hero">
        <h1>
          Hi! I&#39;m Joan, a frontend engineer &amp; web designer who makes technology <i>easy as candy</i>
        </h1>
        <h2>These are some of my relevant skills</h2>
        <Boxes />
      </section>

      <style jsx>{`
        .hero {
          color: white;
          padding-top: 90px;
          text-align: center;
          height: 100vh;
          background-image: -webkit-linear-gradient(top, rgba(17, 2, 49, 0.75), rgba(17, 2, 49, 0)),
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
            font-size: 1em;
          }
        }

        h2 {
          font-size: 20px;
          line-height: 30px;

          @below tablet {
            font-size: 1em;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Hero;
