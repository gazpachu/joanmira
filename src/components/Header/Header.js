import React, { Fragment } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import config from "../../../content/meta/config";
import Menu from "../Menu";
import Logo from "../../images/svg/logo.svg";
import Cursor from "../../images/gif/cursor.gif";

const Header = props => {
  const { theme, path } = props;
  const inverted = path === "/" ? "inverted" : "";

  return (
    <Fragment>
      <header className={`header ${inverted}`}>
        <div className="header-content">
          <Link to="/" className="logo">
            <Logo className="logo-symbol" />
            <h1>{config.headerTitle}</h1>
            <img src={Cursor} className="cursor" />
          </Link>
          <Menu theme={theme} inverted={inverted} />
        </div>
      </header>

      <style jsx>{`
        .header {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          padding: 0 20px;
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
            border-bottom: 1px solid;
            border-bottom-color: rgba(0, 0, 0, 0.15);
          }

          :global(.logo) {
            display: block;
            position: absolute;
            top: 36px;
            height: 44px;
            z-index: 1;
            letter0-spacing: initial;
            opacity: 0.8;

            @below tablet {
              position: initial;
            }

            @above tablet {
              &:hover {
                border-bottom: 1px solid;
                border-bottom-color: rgba(0, 0, 0, 0.67);
              }
            }
          }

          :global(.logo-symbol) {
            stroke: black;
            margin-right: 15px;
            vertical-align: middle;
            position: relative;
            top: -4px;
          }

          h1 {
            font-size: 18px;
            display: inline-block;
            color: black;
            letter-spacing: 0;
          }

          :global(.cursor) {
            margin-left: 3px;
            opacity: 0.5;
            filter: invert(100%);
          }

          &.inverted {
            .logo,
            :global(.logo-symbol),
            :global(h1) {
              filter: invert(100%);
            }

            :global(.cursor) {
              filter: none;
            }

            :global(.logo) {
              @above tablet {
                &:hover {
                  border-bottom-color: rgba(255, 255, 255, 0.67);
                }
              }
            }

            .header-content {
              border-bottom-color: rgba(255, 255, 255, 0.15);
            }

            &:after {
              display: none;
            }
          }
        }
      `}</style>
    </Fragment>
  );
};

Header.propTypes = {
  path: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Header;
