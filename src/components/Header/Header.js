import React, { Component, Fragment } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { ScreenWidthContext, FontLoadedContext } from "../../layouts";
import config from "../../../content/meta/config";
import Menu from "../Menu";
import Logo from "../../images/svg/logo.svg";
import Cursor from "../../images/gif/cursor.gif";

class Header extends Component {
  getHeaderSize = () => {
    const homepage = this.props.path === "/" ? "homepage" : "";

    return `${homepage}`;
  };

  render() {
    const { pages, path, theme } = this.props;

    return (
      <Fragment>
        <header className={`header ${this.getHeaderSize()}`}>
          <div className="header-content">
            <Link to="/" className="logo">
              <Logo className="logo-symbol" />
              <h1>{config.headerTitle}</h1>
              <img src={Cursor} className="cursor" />
            </Link>
            <FontLoadedContext.Consumer>
              {loaded => (
                <ScreenWidthContext.Consumer>
                  {width => (
                    <Menu
                      path={path}
                      screenWidth={width}
                      fontLoaded={loaded}
                      pages={pages}
                      theme={theme}
                    />
                  )}
                </ScreenWidthContext.Consumer>
              )}
            </FontLoadedContext.Consumer>
          </div>
        </header>

        {/* --- STYLES --- */}
        <style jsx>{`
          .header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            padding: 36px 20px 0 20px;
            text-align: center;

            @below tablet {
              padding-top: 16px;
            }

            &:after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 150px;
              background: linear-gradient(to bottom, #fff 0, rgba(255, 255, 255, 0) 100%);
              filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff', GradientType=0 );

              @below tablet {
                height: 250px;
              }
            }

            .header-content {
              z-index: 1;
              position: relative;
              max-width: 979px;
              margin: 0 auto;
              padding-bottom: 5px;
              border-bottom: 1px solid;
              border-bottom-color: rgba(0, 0, 0, 0.15);
            }

            :global(.logo) {
              display: block;
              position: absolute;
              letter0-spacing: initial;
              opacity: 0.8;

              @below tablet {
                position: initial;
              }
            }

            :global(.logo-symbol) {
              stroke: black;
              margin-right: 15px;
              vertical-align: middle;
            }

            h1 {
              font-size: 18px;
              display: inline-block;
              color: black;
            }

            :global(.cursor) {
              margin-left: 3px;
              opacity: 0.5;
            }

            &.homepage {
              .header-content {
                border-bottom-color: rgba(255, 255, 255, 0.33);
              }

              &:after {
                display: none;
              }

              :global(.logo-symbol) {
                stroke: white;
                fill: #fff;
              }

              h1 {
                color: white;
              }
            }
          }
        `}</style>
      </Fragment>
    );
  }
}

Header.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Header;
