import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";

const propTypes = {
  page: PropTypes.shape({
    fields: PropTypes.shape({
      prefix: PropTypes.string
    })
  }).isRequired,
  theme: PropTypes.object.isRequired
};

const defaultProps = {
  page: {
    fields: {
      prefix: ""
    }
  }
};

const Page = props => {
  const {
    page: {
      html,
      fields: { prefix },
      frontmatter: { title, categories }
    },
    theme
  } = props;

  return (
    <Fragment>
      <header>
        <Headline title={title} theme={theme} prefix={prefix} />
        {categories ? <div className="tags">Tags: {categories.replace("inverted", "")}</div> : null}
      </header>
      <Bodytext html={html} theme={theme} />

      <style jsx>{`
        .tags {
          text-align: center;
          margin-bottom: 40px;
          margin-top: -30px;
          font-size: 14px;
          color: #888;
          font-style: italic;
        }
      `}</style>
    </Fragment>
  );
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
