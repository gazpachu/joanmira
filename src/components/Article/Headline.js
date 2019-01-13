import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Headline = props => {
  const { title, children, prefix, theme } = props;

  return (
    <React.Fragment>
      {title ? (
        <h1>
          <Fragment>
            {title}
            {prefix && prefix.length >= 4 ? (
              <time dateTime={prefix}>{prefix.substring(0, 4)}</time>
            ) : null}
          </Fragment>
        </h1>
      ) : (
        <h1>{children}</h1>
      )}

      <style jsx>{`
        h1 {
          text-align: center;
          font-size: ${theme.font.size.xxl};
          margin: ${theme.space.stack.l};
          animation-name: headlineEntry;
          animation-duration: ${theme.time.duration.long};

          :global(span) {
            font-weight: ${theme.font.weight.standard};
            display: block;
            font-size: 0.5em;
            letter-spacing: 0;
            margin: ${theme.space.stack.xs};
          }

          :global(svg) {
            height: 0.75em;
            fill: ${theme.color.brand.primary};
          }

          time {
            font-size: 15px;
            font-weight: 400;
            vertical-align: super;
            margin-left: 10px;
            background-color: #5c93ab;
            color: #fff;
            padding: 1px 6px;
            letter-spacing: initial;
          }
        }

        @keyframes headlineEntry {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }

        @from-width tablet {
          h1 {
            font-size: ${`calc(${theme.font.size.xl} * 1.2)`};
          }
        }

        @from-width desktop {
          h1 {
            font-size: ${`calc(${theme.font.size.xl} * 1.4)`};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Headline.propTypes = {
  prefix: PropTypes.string.isRequired,
  title: PropTypes.string,
  date: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired
};

export default Headline;
