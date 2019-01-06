import PropTypes from "prop-types";
import React, { Fragment } from "react";
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
      <Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Fragment>
              <Blog posts={posts} theme={theme} />

              <div className="prev-next">
                {!isFirst && (
                  <Link to={prevPage} rel="prev" className="prev">
                    ← Previous Page
                  </Link>
                )}

                {!isLast && (
                  <Link to={nextPage} rel="next">
                    Next Page →
                  </Link>
                )}
              </div>

              <ul>
                {Array.from({ length: numPages }, (_, i) => (
                  <li key={`pagination-number${i + 1}`}>
                    <Link
                      to={`/blog/${i === 0 ? "" : i + 1}`}
                      className="link"
                      style={{
                        color: i + 1 === currentPage ? "#ffffff" : "",
                        background: i + 1 === currentPage ? theme.color.brand.primary : ""
                      }}
                    >
                      {i + 1}
                    </Link>
                  </li>
                ))}
              </ul>

              <Seo />

              <style jsx>{`
                .prev-next {
                  max-width: 700px;
                  margin: 0 auto 20px auto;
                  text-align: center;

                  :global(.prev) {
                    margin-right: 10px;
                  }
                }

                ul {
                  display: flex;
                  flex-wrap: wrap;
                  max-width: 700px;
                  margin: 0 auto 60px auto;
                  align-items: center;
                  justify-content: center;
                  list-style: none;
                  padding: 0 30px;
                  line-height: 30px;
                }

                :global(.link) {
                  padding: 3px 8px;
                  border-radius: 5px;
                  text-decoration: none;
                }
              `}</style>
            </Fragment>
          )}
        </ThemeContext.Consumer>
      </Fragment>
    );
  }
}

BlogTemplate.propTypes = {
  theme: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default BlogTemplate;

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
          excerpt(pruneLength: 200)
          fields {
            slug
            prefix(formatString: "D MMMM YYYY")
          }
          frontmatter {
            title
            category
            cover {
              children {
                ... on ImageSharp {
                  fluid(quality: 90, maxWidth: 700, maxHeight: 250) {
                    ...GatsbyImageSharpFluid_withWebp
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
