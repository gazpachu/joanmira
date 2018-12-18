import React from "react";
import { ThemeContext } from "../layouts";
import Article from "../components/Article/";
import Headline from "../components/Article/Headline";

const NotFoundPage = () => (
  <React.Fragment>
    <ThemeContext.Consumer>
      {theme => (
        <Article theme={theme}>
          <header>
            <Headline title="Page not found" theme={theme} />
          </header>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          {/* --- STYLES --- */}
          <style jsx>{`
            h2 {
              margin: 0 0 0.5em;
            }
            h2 :global(svg) {
              height: 0.8em;
              fill: ${theme.color.brand.primary};
            }
          `}</style>
        </Article>
      )}
    </ThemeContext.Consumer>
  </React.Fragment>
);

export default NotFoundPage;
