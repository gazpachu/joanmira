import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const Projects = props => {
  const { posts, theme } = props;

  return (
    <Fragment>
      <ul className="items">
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

      <style jsx>{`
        :global(.items) {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
      `}</style>
    </Fragment>
  );
};

Projects.propTypes = {
  posts: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default Projects;
