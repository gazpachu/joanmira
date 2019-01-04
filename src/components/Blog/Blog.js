import PropTypes from "prop-types";
import React, { Fragment } from "react";

import Item from "./Item";

const Blog = props => {
  const { posts, theme } = props;

  return (
    <Fragment>
      <main className="main">
        <ul>
          {posts.map(post => {
            const {
              node,
              node: {
                fields: { slug }
              }
            } = post;
            return <Item key={slug} post={node} theme={theme} />;
          })}
        </ul>
      </main>

      <style jsx>{`
        .main {
          padding-top: 140px;
        }

        ul {
          list-style: none;
          margin: 0 auto;
          max-width: 850px;
        }
      `}</style>
    </Fragment>
  );
};

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default Blog;
