import PropTypes from "prop-types";
import React from "react";
import { Link, graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Blog from "../components/Blog";
import Seo from "../components/Seo";

class BlogTemplate extends React.Component {
  render() {
    const { currentPage, numPages } = this.props.pageContext;
    const isFirst = currentPage === 1 || !currentPage;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? "/blog/" : `/blog/${(currentPage - 1).toString()}`;
    const nextPage = `/blog/${(currentPage + 1).toString()}`;

    const {
      data: {
        posts: { edges: posts = [] }
      }
    } = this.props;

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => <Blog posts={posts} theme={theme} />}
        </ThemeContext.Consumer>

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px auto",
            textAlign: "center"
          }}
        >
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page&nbsp;
            </Link>
          )}

          {!isLast && (
            <Link to={nextPage} rel="next">
              &nbsp;Next Page →
            </Link>
          )}
        </div>

        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "700px",
            margin: "0 auto 60px auto",
            alignItems: "center",
            justifyContent: "center",
            listStyle: "none",
            padding: "0 30px",
            lineHeight: "30px"
          }}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              style={{
                margin: 0
              }}
            >
              <Link
                to={`/blog/${i === 0 ? "" : i + 1}`}
                style={{
                  padding: "3px 8px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  color: i + 1 === currentPage ? "#ffffff" : "",
                  background: i + 1 === currentPage ? "#007acc" : ""
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
        </ul>

        <Seo />

        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

BlogTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default BlogTemplate;

//eslint-disable-next-line no-undef
export const query = graphql`
  query IndexQuery($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*---/" } }
      sort: { fields: [fields___prefix], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            cover {
              children {
                ... on ImageSharp {
                  fixed(width: 350, height: 250) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
