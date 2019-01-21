import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Bodytext = props => {
  const { html, theme } = props;

  return (
    <Fragment>
      <div className="bodytext" dangerouslySetInnerHTML={{ __html: html }} />

      <style jsx>{`
        .bodytext {
          animation-name: bodytextEntry;
          animation-duration: ${theme.time.duration.long};

          :global(h2),
          :global(h3) {
            margin: 1.5em 0 1em;
          }

          :global(h2) {
            line-height: ${theme.font.lineHeight.s};
            font-size: ${theme.font.size.l};
          }

          :global(h3) {
            font-size: ${theme.font.size.m};
            line-height: ${theme.font.lineHeight.m};
          }

          :global(p) {
            line-height: ${theme.font.lineHeight.xxl};
            margin: 0 0 1.5em;
          }
          :global(ul) {
            margin: 0 0 1.5em;
            padding: 0 0 0 1.5em;
          }
          :global(li) {
            margin: 0.4em 0;
            line-height: 1.5;
          }
          :global(a) {
            font-weight: ${theme.font.weight.bold};
            color: ${theme.color.brand.primary};
            text-decoration: underline;
          }
          :global(.gatsby-resp-image-wrapper),
          :global(video),
          :global(.gif) {
            width: 126%;
            max-width: none !important;
            margin: 0 -13% !important;
          }
          :global(a.gatsby-resp-image-link) {
            border: 0;
            display: block;
          }
          :global(code.language-text) {
            background: ${theme.color.neutral.gray.c};
            text-shadow: none;
            color: inherit;
            padding: 0.1em 0.3em 0.2em;
            border-radius: 0.1em;
          }
        }
      `}</style>
    </Fragment>
  );
};

Bodytext.propTypes = {
  html: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Bodytext;
