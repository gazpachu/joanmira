import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Search from "../../images/svg/search.svg";

const Menu = props => {
  return (
    <Fragment>
      <ul className="main-menu">
        <li>
          <Link to="/">Blog</Link>
          <ul>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/categories">Popular posts</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/about">About</Link>
          <ul>
            <li>
              <Link to="/cv">Curriculum</Link>
            </li>
            <li>
              <Link to="/skills">Skills</Link>
            </li>
            <li>
              <Link to="/geek-life">Geek life</Link>
            </li>
            <li>
              <Link to="/samurai-route">Samurai route</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/work">Work</Link>
        </li>

        <li className="right">
          <Link className="btn" to="/contact">
            Contact
          </Link>
          <Link to="/search/" className="search-button">
            <Search className="search-icon" />
          </Link>
        </li>
      </ul>

      <style jsx>{`
        .main-menu {
          position: relative;
          margin: 0;
          width: 100%;
          height: 79px;
          list-style-type: none;
          padding-left: 0;

          @below tablet {
            height: auto;
          }

          li {
            display: inline-block;
            position: relative;

            @below tablet {
              margin-bottom: 15px;
            }

            &.right {
              @above tablet {
                position: absolute;
                right: 0;
                top: 0;
              }
            }

            :global(a) {
              display: inline-block;
              position: relative;
              color: black;
              padding: 48px 0 0;
              font-size: 12px;
              font-weight: normal;
              height: 79px;
              cursor: pointer;
              text-decoration: none;
              text-transform: uppercase;
              border-width: 0 14px;
              border-color: transparent;
              border-style: solid;
              @include box();

              @below tablet {
                height: auto;
                padding: 0;
              }

              @to-width tablet {
                border-width: 0 5px;
              }

              &.active,
              &:hover {
                color: black;

                &:after {
                  display: block;
                  position: absolute;
                  content: "";
                  left: 0;
                  top: 79px;
                  width: 100%;
                  height: 1px;
                  background: black;

                  @to-width tablet {
                    top: 41px;
                  }

                  @to-width tablet {
                    display: none;
                  }
                }
              }
            }

            :global(.btn) {
              border: 1px solid rgba(0, 0, 0, 0.33);
              padding: 3px 6px 0;
              height: 24px;
              border-radius: 4px;
              cursor: pointer;
              white-space: nowrap;
              transition: background-color ease 0.3s;
              margin-right: 5px;
              margin-top: 42px;

              @to-width tablet {
                margin-top: 0;
              }

              @below tablet {
                margin-right: 5px;
              }

              &:hover {
                border-color: rgba(0, 0, 0, 0.67);
                background-color: rgba(0, 0, 0, 0.1);
              }

              &:hover:after {
                display: none;
              }

              &.active:after {
                display: none;
              }
            }

            :global(.search-button) {
              margin-left: 7px;
              padding: 0;
              height: initial;
              font-size: 16px;
              border-width: 0;

              &:hover:after {
                display: none;
              }
            }

            :global(.search-icon) {
              fill: black;
              opacity: 0.8;
              vertical-align: middle;
              width: 1em;
              height: 1em;

              &:hover {
                opacity: 1;
                cursor: pointer;
              }
            }

            ul {
              display: none;
              position: absolute;
              width: 200px;
              list-style-type: none;
              margin: 0;
              padding: 0;
              font-size: 14px;
              line-height: 20px;
              z-index: 10;
              text-align: left;
              background: white;
              border: 1px solid rgba(0, 0, 0, 0.15);
              background-clip: padding-box;
              border-radius: 5px;
              box-shadow: 0, 4px, 9px, black;

              li {
                border-top: 1px solid #eee;

                &:first-child {
                  border-top: none;
                }

                :global(a) {
                  display: block;
                  position: relative;
                  margin: 0;
                  padding: 11px 18px 0;
                  width: 200px;
                  height: 42px;
                  color: black;
                  background-color: transparent;
                  border: none;
                  font-size: 12px;
                  -webkit-font-smoothing: antialiased;
                  text-transform: uppercase;
                  outline: none;

                  &.active,
                  &:hover {
                    color: black !important;
                    background-color: rgba(0, 0, 0, 0.1);
                  }

                  &:after {
                    display: none;
                  }
                }
              }

              &:after {
                display: block;
                position: absolute;
                content: "";
                top: -8px;
                left: 0;
                width: 100%;
                height: 9px;
                background: transparent;

                @to-width tablet {
                  top: -38px;
                  height: 39px;
                }
              }
            }

            &:hover {
              ul {
                display: block;
                top: 85px;
                left: -4px;

                @to-width tablet {
                  top: 55px;
                }
              }
            }
          }
        }
      `}</style>
    </Fragment>
  );
};

Menu.propTypes = {
  theme: PropTypes.object.isRequired
};

export default Menu;
