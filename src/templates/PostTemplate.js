import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import { ThemeContext } from "../layouts";

const PostTemplate = props => {
  const {
    data: {
      post,
      authornote: { html: authorNote }
    },
    pageContext: { next, prev }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <React.Fragment>
            <div className="hero" />
            <Article theme={theme}>
              <Post post={post} next={next} prev={prev} authornote={authorNote} theme={theme} />
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
    </React.Fragment>
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
        prefix
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
    authornote: markdownRemark(fileAbsolutePath: { regex: "/author/" }) {
      id
      html
    }
  }
`;
