import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import Article from "../components/Article";
import Page from "../components/Page";
import { ThemeContext } from "../layouts";

const PageTemplate = props => {
  const {
    data: { page }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <React.Fragment>
            <div className="hero" />
            <Article theme={theme}>
              <Page page={page} theme={theme} />
            </Article>
            <style jsx>{`
              .hero {
                background-image: url(${page.frontmatter.cover
                  ? page.frontmatter.cover.childImageSharp.resize.src
                  : ""});
                height: ${page.frontmatter.cover ? "400px" : "90px"};
                background-repeat: no-repeat;
                background-position: center 20%;
                background-size: cover;
              }
            `}</style>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>

      <Seo data={page} />
    </React.Fragment>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default PageTemplate;

//eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        cover {
          childImageSharp {
            resize(width: 1200) {
              src
            }
          }
        }
      }
    }
  }
`;
