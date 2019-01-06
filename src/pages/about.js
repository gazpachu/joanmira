import React, { Fragment } from "react";
import { ThemeContext } from "../layouts";
import { Link } from "gatsby";
import Headline from "../components/Article/Headline";
import Pach from "../images/png/pach.png";

const AboutPage = () => (
  <Fragment>
    <ThemeContext.Consumer>
      {theme => (
        <div className="page-wrapper about">
          <header>
            <Headline title="About" theme={theme} />
          </header>
          <img className="pach" src={Pach} alt="Joan Mira" />
          <p>I define myself as an explorer, web and tech geek, biker, rower, DIY enthusiast, drummer and cinema buff. But among all, I'm passionate about art, creativity and inspired by Japan.</p>
          <p>This is my personal website, where I write about my life, interests and work as a Web Developer with the only intention of sharing knowledge and experiences.</p>
          <p>If you want to know more about me, you can read my <Link to="/geek-life">geek life</Link>, <Link to="/cv">curriculum</Link> or my motorcycle adventure called the <Link to="/samurai-route/">Samurai route</Link>. Alternatively, I'm always up for a ping-pong or fußball game.</p>
          <p>And don't forget to add me in <a href="http://linkedin.com/in/joanmira">LinkedIn</a> and <a href="https://twitter.com/gazpachu/">Twitter</a>! ;-)</p>

          <style jsx>{`
            .about {
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
              line-height: 1.8em;

              @below desktop {
                max-width: 800px;
                margin-left: auto;
                margin-right: auto;
                padding: 0 20px;

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
