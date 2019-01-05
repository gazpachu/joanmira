import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Seo from "../components/Seo";
import Article from "../components/Article";
import Page from "../components/Page";
import { ThemeContext } from "../layouts";

const WorkTemplate = props => {
  const {
    data: { page }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <React.Fragment>
            <Article theme={theme}>
              <Page page={page} theme={theme} />
            </Article>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>

      <Seo data={page} />
    </React.Fragment>
  );
};

WorkTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default WorkTemplate;

//eslint-disable-next-line no-undef
export const workQuery = graphql`
  query WorkPageByPath($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        prefix(formatString: "D MMMM YYYY")
      }
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
