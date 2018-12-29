import React, { Fragment } from "react";
import { ThemeContext } from "../layouts";
import { Link } from "gatsby";
import Headline from "../components/Article/Headline";
import Pach from "../images/png/pach.png";

const AboutPage = () => (
  <Fragment>
    <ThemeContext.Consumer>
      {theme => (
        <div className="about-wrapper">
          <header>
            <Headline title="About" theme={theme} />
          </header>
          <img className="pach" src={Pach} alt="Joan Mira" />
          <p>Explorer. Web engineer. Biker. Drummer. Tennis player. Rower. DIY enthusiast. Cinema buff. Passionate about art, creativity and inspired by Japan.</p>
          <p>I'm currently working full-time and also have some open source side projects going on, so I don't have any time left for freelancing.</p>
          <p>If you want to know more about me, you can read my <Link to="/geek-life">geek life</Link>, <Link to="/cv">curriculum</Link> or my motorcycle adventure called the <Link to="/samurai-route/">Samurai route</Link>. Alternatively, I'm always up for a ping-pong or fußball game.</p>
          <p>And don't forget to add me in <a href="http://linkedin.com/in/joanmira">LinkedIn</a> and <a href="https://twitter.com/gazpachu/">Twitter</a>! ;-)</p>

          <style jsx>{`
            .about-wrapper {
              margin: 130px auto 0 auto;
              max-width: 979px;

              @below desktop {
                text-align: center;
              }
            }
            .pach {
              padding: 0;
              margin-bottom: 20px;
              display: inline;
              filter: grayscale(100%);
              shape-outside: margin-box;
              shape-image-threshold: 0.5;
              float: left;
              width: 300px;
              margin-right: 20px;
              border-radius: 50%;

              @below desktop {
                float: none;
                margin: 0;
              }

              &:hover {
                filter: grayscale(0);
              }
            }
            p {
              margin: 1.6em 0;

              @below desktop {
                max-width: 800px;
                margin-left: auto;
                margin-right: auto;

                &:last-child {
                  margin-bottom: 60px;
                }
              }
            }
          `}</style>
        </div>
      )}
    </ThemeContext.Consumer>
  </Fragment>
);

export default AboutPage;
