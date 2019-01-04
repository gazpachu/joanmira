import "typeface-open-sans";
import FontFaceObserver from "fontfaceobserver";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { getScreenWidth, timeoutThrottlerHandler } from "../utils/helpers";
import Footer from "../components/Footer/";
import Header from "../components/Header";

export const ThemeContext = React.createContext(null);
export const ScreenWidthContext = React.createContext(0);
export const FontLoadedContext = React.createContext(false);

import themeObjectFromYaml from "../theme/theme.yaml";

class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      font100loaded: false,
      font400loaded: false,
      font600loaded: false,
      screenWidth: 0,
      headerMinimized: false,
      theme: themeObjectFromYaml
    };

    if (typeof window !== `undefined`) {
      this.loadFont("font100", "Open Sans", 100);
      this.loadFont("font400", "Open Sans", 400);
      this.loadFont("font600", "Open Sans", 600);
    }
  }

  timeouts = {};

  componentDidMount() {
    this.setState({
      screenWidth: getScreenWidth()
    });
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeThrottler, false);
    }
  }

  resizeThrottler = () => {
    return timeoutThrottlerHandler(this.timeouts, "resize", 100, this.resizeHandler);
  };

  resizeHandler = () => {
    this.setState({ screenWidth: getScreenWidth() });
  };

  loadFont = (name, family, weight) => {
    const font = new FontFaceObserver(family, {
      weight: weight
    });

    font.load(null, 10000).then(
      () => {
        console.log(`${name} is available`);
        this.setState({ [`${name}loaded`]: true });
      },
      () => {
        console.log(`${name} is not available`);
      }
    );
  };

  render() {
    const { children } = this.props;

    return (
      <ThemeContext.Provider value={this.state.theme}>
        <FontLoadedContext.Provider value={this.state.font400loaded}>
          <ScreenWidthContext.Provider value={this.state.screenWidth}>
            <Fragment>
              <Header path={this.props.location.pathname} theme={this.state.theme} />
              <main>{children}</main>
              <Footer path={this.props.location.pathname} theme={this.state.theme} />

              <style jsx>{`
                main {
                  min-height: 80vh;
                }
              `}</style>
              <style jsx global>{`
                html {
                  box-sizing: border-box;
                }
                *,
                *:after,
                *:before {
                  box-sizing: inherit;
                  margin: 0;
                  padding: 0;
                }
                body {
                  font-family: ${this.state.font400loaded
                    ? "'Open Sans', sans-serif;"
                    : "Arial, sans-serif;"};
                }
                h1,
                h2,
                h3 {
                  font-weight: 100;
                  line-height: 1.1;
                  letter-spacing: -0.03em;
                  margin: 0;
                }
                h1 {
                  letter-spacing: -0.04em;
                }
                p {
                  margin: 0;
                }
                strong {
                  font-weight: 600;
                }
                a {
                  color: ${this.state.theme.color.brand.primary};
                  &:hover {
                    color: ${this.state.theme.color.brand.primaryActive};
                  }
                }
                ol {
                  padding-left: 20px;
                }
                main {
                  width: auto;
                  display: block;
                }
                figcaption {
                  text-align: center;
                  font-size: 14px;
                  font-style: italic;
                  color: #888;
                  margin-bottom: 40px;
                }
              `}</style>
            </Fragment>
          </ScreenWidthContext.Provider>
        </FontLoadedContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default Layout;
