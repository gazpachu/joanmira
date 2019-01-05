import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Article = props => {
  const { children, theme } = props;

  return (
    <Fragment>
      <article className="article">{children}</article>

      <style jsx>{`
        .article {
          padding: ${theme.space.inset.default};
          margin: 0 auto;
        }
        @from-width tablet {
          .article {
            padding: ${`calc(${theme.space.default}) calc(${theme.space.default} * 2)`};
            max-width: ${theme.text.maxWidth.tablet};
          }
        }
        @from-width desktop {
          .article {
            padding: ${`calc(${theme.space.default} * 2) 0 calc(${theme.space.default} * 2)`};
            max-width: ${theme.text.maxWidth.desktop};
          }
        }
      `}</style>
    </Fragment>
  );
};

Article.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
};

export default Article;
