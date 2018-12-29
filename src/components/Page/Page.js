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
      frontmatter: { title }
    },
    theme
  } = props;

  return (
    <Fragment>
      <header>
        <Headline title={title} theme={theme} prefix={prefix} />
      </header>
      <Bodytext html={html} theme={theme} />
    </Fragment>
  );
};

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
