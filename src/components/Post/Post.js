import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";
import asyncComponent from "../AsyncComponent";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import Meta from "./Meta";
import NextPrev from "./NextPrev";

const Share = asyncComponent(() =>
  import("./Share")
    .then(module => {
      return module.default;
    })
    .catch(error => {})
);

const Post = props => {
  const {
    post,
    post: {
      html,
      fields: { prefix },
      frontmatter: { title, author, category }
    },
    next: nextPost,
    prev: prevPost,
    theme
  } = props;

  return (
    <Fragment>
      <header>
        <Headline title={title} theme={theme} />
        <Meta prefix={prefix} author={author} category={category} theme={theme} />
      </header>
      <Bodytext html={html} theme={theme} />
      <footer>
        <Share post={post} theme={theme} />
        <NextPrev next={nextPost} prev={prevPost} theme={theme} />
      </footer>
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default Post;
