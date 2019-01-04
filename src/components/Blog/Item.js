import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FaCalendar } from "react-icons/fa/";
import { FaTag } from "react-icons/fa/";
import Img from "gatsby-image";
import { Link } from "gatsby";

const Item = props => {
  const {
    theme,
    post: {
      excerpt,
      fields: { slug, prefix },
      frontmatter: { title, category, cover }
    }
  } = props;

  return (
    <Fragment>
      <li>
        <Link to={slug} key={slug} className="link">
          <h1>{title}</h1>
          <div className="item-wrapper">
            <div className="gatsby-image-outer-wrapper">
              {cover ? <Img fixed={cover.children[0].fixed} /> : null}
            </div>
            <div className="item-content">
              <p className="meta">
                <span>
                  <FaCalendar size={18} /> {prefix}
                </span>
                {category && (
                  <span>
                    <FaTag size={18} /> {category}
                  </span>
                )}
              </p>
              <p>{excerpt}</p>
            </div>
          </div>
        </Link>
      </li>

      {/* --- STYLES --- */}
      <style jsx>{`
        :global(.link) {
          text-decoration: none;
        }

        li {
          position: relative;
          margin-bottom: 120px;

          :global(.gatsby-image-outer-wrapper) {
            float: left;
            width: 350px;
            margin-right: 50px;
            border-radius: 8px;
            height: 250px;
            overflow: hidden;
          }

          &::after {
            border-top: 1px solid ${theme.line.color};
            content: "";
            height: 0;
            position: absolute;
            bottom: -60px;
            left: 50%;
            transform: translateX(-50%);
            transition: all ${theme.time.duration.default};
            width: 100%;
          }
        }

        h1 {
          margin-bottom: 40px;
          font-size: 32px;
          line-height: 40px;
          text-remove-gap: both;
        }

        .item-wrapper {
          &::after {
            content: "";
            clear: both;
            display: table;
          }
        }

        .item-content {
          float: right;
          width: calc(100% - 400px);
        }

        .meta {
          display: flex;
          flex-flow: row wrap;
          font-size: 0.8em;
          padding: ${theme.space.m} ${theme.space.s};
          background: transparent;

          :global(svg) {
            fill: ${theme.icon.color};
            margin: ${theme.space.inline.xs};
          }
          span {
            align-items: center;
            display: flex;
            text-transform: uppercase;
            margin: ${theme.space.xs} ${theme.space.s} ${theme.space.xs} 0;
          }
        }

        p {
          line-height: 1.5;
          padding: 0 ${theme.space.s};
          text-remove-gap: both;
        }
      `}</style>
    </Fragment>
  );
};

Item.propTypes = {
  post: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Item;
