import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Shortlisted from "../../images/png/fwa-shortlisted-badge.png";

const Item = props => {
  const {
    theme,
    filter,
    post: {
      fields: { slug, prefix },
      frontmatter: {
        title,
        location,
        color,
        categories,
        cover: {
          children: [{ fixed }]
        }
      }
    }
  } = props;
  const trimmedSlug = slug.substring(1, slug.length - 1);
  const hidden = filter !== "all" && categories.indexOf(filter) === -1 ? "hidden" : "";

  return (
    <Fragment>
      <li className={`${trimmedSlug} ${categories} ${hidden}`}>
        <Link to={slug} key={slug} className="link">
          <Img
            className="logo"
            fixed={fixed}
            style={{ width: "100%", height: "100%" }}
            imgStyle={{
              width: "60%",
              height: "80%",
              right: 0,
              bottom: 0,
              margin: "auto",
              objectFit: "contain"
            }}
          />
          <h2 className="name">{title}</h2>
          <p className="meta">
            <span className="date">{prefix}</span>
            <span className="country">{location}</span>
          </p>
        </Link>
      </li>

      <style jsx>{`
        li {
          height: 200px;
          position: relative;
          background-color: ${color};

          &:before,
          &:after {
            content: "";
            position: absolute;
            top: 20px;
            right: 20px;
            bottom: 20px;
            left: 20px;
            opacity: 0;
            transition: all 0.35s, transform 0.35s;
            pointer-events: none;
            border-color: #000;
          }

          &:before {
            border-top: 1px solid;
            border-bottom: 1px solid;
            transform: scale(0, 1);
          }

          &:after {
            transform: scale(1, 0);
            border-right: 1px solid;
            border-left: 1px solid;
          }

          :global(a) {
            text-decoration: none;
            color: black;
            display: block;
            height: 100%;
          }

          :global(.logo) {
            opacity: 1;
          }

          :global(.name) {
            padding-left: 40px;
            padding-right: 40px;
            font-size: 1.5em;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-height: 60px;
            line-height: 30px;
            transition: transform 0.35s;
            transform: translate3d(0, 0, 0);
            opacity: 0;
            position: relative;
            color: #000;
            margin-bottom: 20px;
          }

          :global(.meta) {
            transition: transform 0.35s;
            transform: translate3d(0, 70px, 0);
            opacity: 0;
            position: relative;
          }

          :global(.date) {
            margin-right: 5px;
          }

          &.inverted {
            &:before,
            &:after {
              border-color: white;
            }
            :global(a),
            :global(.name) {
              color: white;
            }
          }

          &.shortlisted {
            :global(.logo) {
              &:after {
                content: "";
                position: absolute;
                background: url(${Shortlisted}) no-repeat;
                top: 0;
                right: 0;
                width: 100px;
                height: 100px;
              }
            }
          }

          &.cover {
            :global(img) {
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
            }
          }

          &.hidden {
            display: none;
          }

          &:hover {
            &:before,
            &:after {
              transform: scale(1);
              opacity: 1;
            }
            :global(.logo) {
              opacity: 0;
              height: 0 !important;
            }
            :global(.name),
            :global(.meta) {
              transform: translate3d(0, 40px, 0);
              opacity: 1;
            }
          }
        }
      `}</style>
    </Fragment>
  );
};

Item.propTypes = {
  post: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired
};

export default Item;
