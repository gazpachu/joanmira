import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const List = props => {
  const { edges, theme } = props;

  return (
    <Fragment>
      <ul>
        {edges.map(edge => {
          const {
            node: {
              frontmatter: { title },
              fields: { slug }
            }
          } = edge;

          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        ul {
          margin: ${theme.space.stack.m};
          padding: ${theme.space.m};
        }
        li {
          padding: ${theme.space.xs} 0;
          font-size: ${theme.font.size.s};
          line-height: ${theme.font.lineHeight.l};
        }
      `}</style>
    </Fragment>
  );
};

List.propTypes = {
  edges: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default List;
