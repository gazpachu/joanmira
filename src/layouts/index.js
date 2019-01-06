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
                .align-center {
                  text-align: center;
                }
                a.btn {
                  height: 24px;
                  font-weight: normal !important;
                  font-size: 14px;
                  border-radius: 4px;
                  box-sizing: border-box;
                  transition: background-color ease 0.3s;
                  border: 1px solid rgba(0, 0, 0, 0.33);
                  text-decoration: none !important;
                  color: #333 !important;
                  cursor: pointer;
                  white-space: nowrap;
                  padding: 10px;

                  &[target="_blank"]:before {
                    content: "";
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    vertical-align: sub;
                    margin-right: 10px;
                    background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMS42MjYgNTExLjYyNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjYyNiA1MTEuNjI3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTM5Mi44NTcsMjkyLjM1NGgtMTguMjc0Yy0yLjY2OSwwLTQuODU5LDAuODU1LTYuNTYzLDIuNTczYy0xLjcxOCwxLjcwOC0yLjU3MywzLjg5Ny0yLjU3Myw2LjU2M3Y5MS4zNjEgICAgYzAsMTIuNTYzLTQuNDcsMjMuMzE1LTEzLjQxNSwzMi4yNjJjLTguOTQ1LDguOTQ1LTE5LjcwMSwxMy40MTQtMzIuMjY0LDEzLjQxNEg4Mi4yMjRjLTEyLjU2MiwwLTIzLjMxNy00LjQ2OS0zMi4yNjQtMTMuNDE0ICAgIGMtOC45NDUtOC45NDYtMTMuNDE3LTE5LjY5OC0xMy40MTctMzIuMjYyVjE1NS4zMWMwLTEyLjU2Miw0LjQ3MS0yMy4zMTMsMTMuNDE3LTMyLjI1OWM4Ljk0Ny04Ljk0NywxOS43MDItMTMuNDE4LDMyLjI2NC0xMy40MTggICAgaDIwMC45OTRjMi42NjksMCw0Ljg1OS0wLjg1OSw2LjU3LTIuNTdjMS43MTEtMS43MTMsMi41NjYtMy45LDIuNTY2LTYuNTY3VjgyLjIyMWMwLTIuNjYyLTAuODU1LTQuODUzLTIuNTY2LTYuNTYzICAgIGMtMS43MTEtMS43MTMtMy45MDEtMi41NjgtNi41Ny0yLjU2OEg4Mi4yMjRjLTIyLjY0OCwwLTQyLjAxNiw4LjA0Mi01OC4xMDIsMjQuMTI1QzguMDQyLDExMy4yOTcsMCwxMzIuNjY1LDAsMTU1LjMxM3YyMzcuNTQyICAgIGMwLDIyLjY0Nyw4LjA0Miw0Mi4wMTgsMjQuMTIzLDU4LjA5NWMxNi4wODYsMTYuMDg0LDM1LjQ1NCwyNC4xMyw1OC4xMDIsMjQuMTNoMjM3LjU0M2MyMi42NDcsMCw0Mi4wMTctOC4wNDYsNTguMTAxLTI0LjEzICAgIGMxNi4wODUtMTYuMDc3LDI0LjEyNy0zNS40NDcsMjQuMTI3LTU4LjA5NXYtOTEuMzU4YzAtMi42NjktMC44NTYtNC44NTktMi41NzQtNi41NyAgICBDMzk3LjcwOSwyOTMuMjA5LDM5NS41MTksMjkyLjM1NCwzOTIuODU3LDI5Mi4zNTR6IiBmaWxsPSIjMDAwMDAwIi8+CgkJPHBhdGggZD0iTTUwNi4xOTksNDEuOTcxYy0zLjYxNy0zLjYxNy03LjkwNS01LjQyNC0xMi44NS01LjQyNEgzNDcuMTcxYy00Ljk0OCwwLTkuMjMzLDEuODA3LTEyLjg0Nyw1LjQyNCAgICBjLTMuNjE3LDMuNjE1LTUuNDI4LDcuODk4LTUuNDI4LDEyLjg0N3MxLjgxMSw5LjIzMyw1LjQyOCwxMi44NWw1MC4yNDcsNTAuMjQ4TDE5OC40MjQsMzA0LjA2NyAgICBjLTEuOTA2LDEuOTAzLTIuODU2LDQuMDkzLTIuODU2LDYuNTYzYzAsMi40NzksMC45NTMsNC42NjgsMi44NTYsNi41NzFsMzIuNTQ4LDMyLjU0NGMxLjkwMywxLjkwMyw0LjA5MywyLjg1Miw2LjU2NywyLjg1MiAgICBzNC42NjUtMC45NDgsNi41NjctMi44NTJsMTg2LjE0OC0xODYuMTQ4bDUwLjI1MSw1MC4yNDhjMy42MTQsMy42MTcsNy44OTgsNS40MjYsMTIuODQ3LDUuNDI2czkuMjMzLTEuODA5LDEyLjg1MS01LjQyNiAgICBjMy42MTctMy42MTYsNS40MjQtNy44OTgsNS40MjQtMTIuODQ3VjU0LjgxOEM1MTEuNjI2LDQ5Ljg2Niw1MDkuODEzLDQ1LjU4Niw1MDYuMTk5LDQxLjk3MXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
                  }

                  &:hover {
                    border-color: rgba(0, 0, 0, 0.67);
                    background-color: rgba(0, 0, 0, 0.1);
                  }
                }
                .clearfix::after {
                  content: "";
                  clear: both;
                  display: table;
                }
                .page-wrapper {
                  margin: 130px auto 0 auto;
                  max-width: 979px;
                  animation-name: bodytextEntry;
                  animation-duration: 1s;
                }
                @keyframes bodytextEntry {
                  from {
                    opacity: 0;
                  }
                  to {
                    opacity: 1;
                  }
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
