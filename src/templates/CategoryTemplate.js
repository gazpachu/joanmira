import { FaTag } from "react-icons/fa/";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import List from "../components/List";

const CategoryTemplate = props => {
  const {
    pageContext: { category },
    data: {
      allMarkdownRemark: { totalCount, edges }
    }
  } = props;

  return (
    <Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <div className="category-wrapper">
            <Article theme={theme}>
              <header>
                <Headline theme={theme}>
                  <FaTag />{category}
                </Headline>
                <p className="meta">
                  There {totalCount > 1 ? "are" : "is"} <strong>{totalCount}</strong> post{totalCount >
                  1
                    ? "s"
                    : ""}{" "}
                  in the category.
                </p>
                <List edges={edges} theme={theme} />
              </header>
            </Article>

            <style jsx>{`
              .category-wrapper {
                margin-top: 90px;
              }
            `}</style>
          </div>
        )}
      </ThemeContext.Consumer>

      <Seo />
    </Fragment>
  );
};

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default CategoryTemplate;

// eslint-disable-next-line no-undef
export const categoryQuery = graphql`
  query PostsByCategory($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___prefix], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            category
          }
        }
      }
    }
  }
`;
