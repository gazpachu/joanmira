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
      frontmatter: {
        title,
        category,
        cover: {
          children: [{ fluid }]
        }
      }
    }
  } = props;

  return (
    <Fragment>
      <li>
        <Link to={slug} key={slug} className="link">
          <h1>{title}</h1>
          <div className="item-wrapper">
            <div className="gatsby-image-outer-wrapper">{fluid ? <Img fluid={fluid} /> : null}</div>
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

      <style jsx>{`
        :global(.link) {
          text-decoration: none;
        }

        li {
          position: relative;
          margin-bottom: 60px;

          &::after {
            border-top: 1px solid ${theme.line.color};
            content: "";
            height: 0;
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            transition: all ${theme.time.duration.default};
            width: 100%;
          }

          @below desktop {
            padding: 0 20px;
          }
        }

        h1 {
          margin-bottom: 40px;
          font-size: 32px;
          line-height: 40px;
          text-remove-gap: both;
        }

        .item-wrapper {
          display: grid;
          grid-template-columns: 50% 50%;
          grid-gap: 25px;

          @below desktop {
            display: block;
          }
        }

        :global(.gatsby-image-outer-wrapper) {
          border-radius: 8px;
        }

        .meta {
          display: flex;
          flex-flow: row wrap;
          font-size: 0.8em;
          margin-bottom: 30px;

          @below desktop {
            margin: 10px 0;
          }

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
