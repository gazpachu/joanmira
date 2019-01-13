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
          <div className="slide clearfix">
            <img className="pach" src={Pach} alt="Joan Mira" />
            <p>I define myself as an explorer, web and tech geek, biker, rower, DIY enthusiast and cinema buff. But among all, I'm passionate about art, creativity and inspired by Japan.</p>
            <p>This is my personal website, where I write about my life, interests and work as a Web Developer with the only intention of sharing knowledge and experiences.</p>
            <p>If you want to know more about me, you can read my <Link to="/geek-life">geek life</Link>, <Link to="/cv">curriculum</Link> or my motorcycle adventure called the <Link to="/samurai-route/">Samurai route</Link>. Alternatively, I'm always up for a ping-pong or fußball game.</p>
            <p>And don't forget to add me in <a href="http://linkedin.com/in/joanmira">LinkedIn</a> and <a href="https://twitter.com/gazpachu/">Twitter</a>! ;-)</p>
          </div>

          <div className="slide clearfix">
            <div className="pach map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1601762.7509983138!2d-0.7484418510607932!3d38.357585568102635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1547392199271"
                width="400"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullscreen
              />
            </div>

            <p>I was borned and raised in <a href="https://en.wikipedia.org/wiki/Alicante" target="_blank" rel="noreferrer noopener">Alicante</a>. A popular tourist spot in the south east of Spain.</p>
            <p>If you haven&#39;t heard before about Alicante, then you should know that it is a region with <a href="https://www.alicanteturismo.com/discover-alicante/beaches/?lang=en" rel="noreferrer noopener">splendid beaches</a>, <a href="https://www.climatestotravel.com/climate/spain/alicante" target="_blank" rel="noreferrer noopener">very good weather</a> and remarkable gastronomy. To the point that, <a href="https://en.wikipedia.org/wiki/Ferran_Adri%C3%A0">Ferran Adriá</a> once said it is <a href="https://www.diarioinformacion.com/cultura/2011/08/13/ferran-adria-inspira-alicante/1158013.html" rel="noreferrer noopener">one of the best places in the World to eat!</a></p>
            <p>It is also the area of the world-renown <a href="https://en.wikipedia.org/wiki/Paella" target="_blank" rel="noreferrer noopener">paella</a>, <a href="https://en.wikipedia.org/wiki/Turr%C3%B3n" target="_blank" rel="noreferrer noopener">turron</a> and the <a href="https://vinosalicantedop.org/?lang=en" rel="noreferrer noopener">alicante wines</a>.</p>
            <p>Alicante is also undergoing a major <a href="https://alicantec.com/en/" target="_blank" rel="noreferrer noopener">revamping in the digital industry</a>, with a government driven project called the "Digital District" that is attracting startups and big IT companies to settle in the area.</p>
          </div>

          <style jsx>{`
            .about {
              @below desktop {
                text-align: center;
              }
            }

            .slide {
              padding-bottom: 30px;
              margin-bottom: 50px;
              border-bottom: 1px solid #eee;

              @below desktop {
                padding-bottom: 0;
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
              overflow: hidden;

              @below desktop {
                float: none;
                margin: 0;
              }

              &:hover {
                filter: grayscale(0);
              }
            }

            .map {
              float: right;

              @below desktop {
                float: none;
                margin: 0;
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
