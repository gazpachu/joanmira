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
          <div className="page-wrapper work-page">
            <Article theme={theme}>
              <Page page={page} theme={theme} />
            </Article>
          </div>
        )}
      </ThemeContext.Consumer>

      <Seo data={page} />

      <style jsx>{`
        .work-page {
          margin-top: 90px;
        }
      `}</style>
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
        prefix(formatString: "YYYY")
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
