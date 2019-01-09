import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Headline from "../components/Article/Headline";
import Projects from "../components/Projects/Projects";

const WorkPage = props => {
  const {
    data: {
      posts: { edges: posts = [] }
    }
  } = props;

  return (
    <Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <div className="page-wrapper work">
            <header>
              <Headline title="My Binary Sugar Treats" theme={theme} />
            </header>

            <h2>I've been building websites & apps since 1998<br />These are some of my works (<strong>sorted by date</strong>) as a permanent employee of agencies/companies, as a freelancer or for personal projects</h2>

            <div className="filters">
              <button className="btn is-checked" data-filter="*">
                ALL
              </button>
              <button className="btn" data-filter=".web">
                WEB
              </button>
              <button className="btn" data-filter=".desktop">
                DESKTOP
              </button>
              <button className="btn" data-filter=".mobile">
                MOBILE
              </button>
              <button className="btn" data-filter=".prototype">
                PROTOTYPE
              </button>
              <button className="btn" data-filter=".installation">
                INSTALLATION
              </button>
              <button className="btn" data-filter=".open-source">
                OPEN SOURCE
              </button>
              <button className="btn" data-filter=".consultancy">
                CONSULTANCY
              </button>
              <button className="btn" data-filter=".design">
                DESIGN
              </button>
              <button className="btn" data-filter=".ux">
                UX
              </button>
              <button className="btn" data-filter=".video">
                VIDEO
              </button>
              <button className="btn" data-filter=".photo">
                PHOTO
              </button>
            </div>

            <Projects posts={posts} theme={theme} />

            <style jsx>{`
              .work {
                text-align: center;
                max-width: 100%;
              }

              h2 {
                font-size: 20px;
                line-height: 30px;
                margin: 30px auto;
                width: 100%;
                max-width: 820px;
              }

              .btn {
                margin: 0 2px 50px 2px;
                padding: 0 10px;
                height: 33px;
                font-size: 10px;
              }
            `}</style>
          </div>
        )}
      </ThemeContext.Consumer>
    </Fragment>
  );
};

export default WorkPage;

WorkPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const categoryQuery = graphql`
  query Projects {
    posts: allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___prefix], order: DESC }
      filter: { fields: { source: { eq: "work" } } }
    ) {
      edges {
        node {
          fields {
            slug
            prefix(formatString: "YYYY")
          }
          frontmatter {
            title
            location
            cover {
              children {
                ... on ImageSharp {
                  fixed(quality: 90) {
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
