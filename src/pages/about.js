import React, { Fragment } from "react";
import { ThemeContext } from "../layouts";
import { Link } from "gatsby";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";
import Pach from "../images/png/pach.png";
import Palmeral from "../images/jpg/palmeral.jpg";
import Elephant from "../images/jpg/elephant.jpg";
import London1 from "../images/jpg/london1.jpg";
import Aitana from "../images/jpg/aitana.jpg";
import Bob from "../images/jpg/bob.jpg";
import Remo from "../images/jpg/remo.jpg";
import Moraig from "../images/jpg/moraig.jpg";
import Tapas from "../images/jpg/tapas.jpg";
import Postiguet from "../images/jpg/postiguet.jpg";
import Paris from "../images/jpg/paris.jpg";
import USA from "../images/jpg/usa.jpg";
import Tokyo from "../images/jpg/tokyo.jpg";

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
            <p>My name in japanese is <strong>ジョーン</strong> (Jōn) <strong>ミラ</strong> (Mira).</p>
            <p>I define myself as an explorer, web and tech geek, biker, rower, DIY enthusiast and cinema buff. But among all, I'm passionate about art, creativity and inspired by Japan.</p>
            <p>This is my personal website, where I write about my life, interests and work as a Web Developer with the only intention of sharing knowledge and experiences.</p>
            <p>If you want to know more about me, you can read my <Link to="/geek-life">geek life</Link>, <Link to="/cv">curriculum</Link> or my motorcycle adventure called the <Link to="/samurai-route/">Samurai route</Link>. Alternatively, I'm always up for a ping-pong or fußball game. And don't forget to add me in <a href="http://linkedin.com/in/joanmira">LinkedIn</a> and <a href="https://twitter.com/gazpachu/">Twitter</a>! ;-)</p>
          </div>

          <div className="slide clearfix">
            <div className="pach map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3194907.7498850836!2d0.09776853793140954!3d38.58986836969722!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ses!4v1547562508012"
                width="350"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullscreen
              />
            </div>

            <p>I was born and raised in <a href="https://en.wikipedia.org/wiki/Alicante" target="_blank" rel="noreferrer noopener">Alicante</a>. A popular tourist area in the south east of Spain.</p>
            <p>If you haven&#39;t heard before about Alicante, then you should know that it is a region with <a href="https://www.alicanteturismo.com/discover-alicante/beaches/?lang=en" rel="noreferrer noopener">splendid beaches</a>, <a href="https://www.climatestotravel.com/climate/spain/alicante" target="_blank" rel="noreferrer noopener">very good weather</a> and remarkable gastronomy. To the point that, <a href="https://en.wikipedia.org/wiki/Ferran_Adri%C3%A0">Ferran Adriá</a> once said it is <a href="https://www.diarioinformacion.com/cultura/2011/08/13/ferran-adria-inspira-alicante/1158013.html" rel="noreferrer noopener">one of the best places in the World to eat!</a></p>
            <p>It&#39;s also the area of the world-renowned <a href="https://en.wikipedia.org/wiki/Paella" target="_blank" rel="noreferrer noopener">paella</a>, <a href="https://en.wikipedia.org/wiki/Turr%C3%B3n" target="_blank" rel="noreferrer noopener">turron</a> and the <a href="https://vinosalicantedop.org/?lang=en" rel="noreferrer noopener">alicante wines</a>.</p>
            <p>Alicante is also undergoing a major <a href="https://alicantec.com/en/" target="_blank" rel="noreferrer noopener">revamping in the digital industry</a>, with a government driven project called the <a href="https://www.facebook.com/GVAddigital" target="_blank" rel="noreferrer noopener">Digital District</a> that is attracting startups and big IT companies to settle in the area.</p>
          </div>

          <div className="slide clearfix gallery">
            <div title="Tapas & Pinchos in San Sebastian"><img src={Tapas} alt="Tapas & Pinchos in San Sebastian" /></div>
            <div title="In the Grand Canyon of Colorado"><img src={USA} alt="In the Grand Canyon of Colorado" /></div>
            <div title="Tokyo, my favourite city"><img src={Tokyo} alt="Tokyo, my favourite city" /></div>
            <div title="Palmeral park in Alicante"><img src={Palmeral} alt="Palmeral park in Alicante" /></div>
            <div title="In Elephant & Castle, London"><img src={Elephant} alt="In Elephant & Castle, London" /></div>
            <div title="Cycling in London with Ari"><img src={London1} alt="Cycling in London with Ari" /></div>
            <div title="Aitana mountain from Sella"><img src={Aitana} alt="Aitana from Sella" /></div>
            <div title="Postiguet beach in Alicante"><img src={Postiguet} alt="Postiguet beach in Alicante" /></div>
            <div title="With my father"><img src={Bob} alt="With my father" /></div>
            <div title="Regatta in Santa Pola. We won!"><img src={Remo} alt="Regatta in Santa Pola. We won!" /></div>
            <div title="Moraig cove in Alicante"><img src={Moraig} alt="Moraig cove in Alicante" /></div>
            <div title="From London to Alicante by motorbike"><img src={Paris} alt="From London to Alicante by motorbike" /></div>
          </div>

          <Seo title="About" />

          <style jsx>{`
            .shape {
              width: 100%;
              height: 500px;
              background-size: cover;
              position: absolute;
              left: 0;
              z-index: -1;
              overflow: hidden;
            }

            .shape1 {
              top: 0;
              background-color: #5c93ab;
              clip-path: polygon(0% 100%, 100% 0%, 0% 0%);
            }

            .shape2 {
              top: 500px;
              background-color: #BDBEB8;
              clip-path: polygon(0% 100%, 100% 0%, 0% 0%);
            }

            .about {
              @below desktop {
                text-align: center;
              }
            }

            .slide {
              padding-bottom: 30px;
              margin-bottom: 50px;
              border-bottom: 1px solid rgba(0, 0, 0, .1);

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
              height: 300px;
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

            .gallery {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
              grid-gap: 30px;

              div {
                text-align: center;
                font-size: 12px;
                color: #888;

                &:after {
                  content: attr(title);
                  font-style: italic;
                  margin-top: 5px;
                  display: block;
                }
                img {
                  width: 100%;
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
