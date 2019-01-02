import React, { Fragment } from "react";
import { ThemeContext } from "../layouts";

const SkillsPage = () => (
  <Fragment>
    <ThemeContext.Consumer>
      {theme => (
        <div className="skills-wrapper">
          <h1>
            Aside from web development, I also worked as a Software Engineer and Creative Technologist
          </h1>
          <h2>These are some of my technical skills</h2>

          <style jsx>{`
            .skills-wrapper {
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
              max-width: 820px;
              font-size: 36px;
              line-height: 1.2;
              padding: 0;
            }
            h2 {
              font-size: 20px;
              line-height: 30px;
            }
          `}</style>
        </div>
      )}
    </ThemeContext.Consumer>
  </Fragment>
);

export default SkillsPage;
