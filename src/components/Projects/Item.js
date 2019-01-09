import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Shortlisted from "../../images/png/fwa-shortlisted-badge.png";

const invertedItems = [
  "lloyds",
  "savethechildren",
  "saga",
  "barclays",
  "vitality",
  "dyson",
  "quizwars",
  "sapientnitro",
  "ylmls",
  "marksandspencer",
  "artrules",
  "sky",
  "bandq",
  "kittitian"
];

const shortlistedItems = ["artrules"];

const Item = props => {
  const {
    theme,
    post: {
      fields: { slug, prefix },
      frontmatter: {
        title,
        location,
        cover: {
          children: [{ fixed }]
        }
      }
    }
  } = props;
  const trimmedSlug = slug.substring(1, slug.length - 1);
  const inverted = invertedItems.indexOf(trimmedSlug) !== -1 ? "inverted" : "";
  const shortlisted = shortlistedItems.indexOf(trimmedSlug) !== -1 ? "shortlisted" : "";

  return (
    <Fragment>
      <li className={`${trimmedSlug} ${inverted} ${shortlisted}`}>
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

          &.dyson,
          &.ylmls,
          &.sky,
          &.artrules {
            background-color: #000;
          }
          &.wcrs,
          &.artemis {
            background-color: #f5f5f5;
          }
          &.lloyds {
            background-color: #006a4c;
          }
          &.savethechildren {
            background-color: #e92934;
          }
          &.saga {
            background-color: #009bde;
          }
          &.barclays {
            background-color: #00adef;
          }
          &.vitality {
            background-color: #fb0068;
          }
          &.quizwars {
            background-color: #222;
          }
          &.sapientnitro {
            background-color: #de2728;
          }
          &.bt {
            background-color: #efefef;
          }
          &.marksandspencer {
            background-color: #044e44;
          }
          &.bandq {
            background-color: #f60;
          }
          &.kittitian {
            background-color: #f17d28;
          }

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
            max-height: 55px;
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
  theme: PropTypes.object.isRequired
};

export default Item;
