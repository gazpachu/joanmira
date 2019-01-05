import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import { ThemeContext } from "../layouts";

const PostTemplate = props => {
  const {
    data: { post },
    pageContext: { next, prev }
  } = props;

  return (
    <Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <React.Fragment>
            <div className="hero" />
            <Article theme={theme}>
              <Post post={post} next={next} prev={prev} theme={theme} />
            </Article>
            <style jsx>{`
              .hero {
                background-image: url(${post.frontmatter.cover
                  ? post.frontmatter.cover.childImageSharp.resize.src
                  : ""});
                height: ${post.frontmatter.cover ? "400px" : "90px"};
                background-repeat: no-repeat;
                background-position: center 20%;
                background-size: cover;
              }
            `}</style>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>

      <Seo data={post} />
    </Fragment>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default PostTemplate;

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        prefix(formatString: "D MMMM YYYY")
      }
      frontmatter {
        title
        category
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
