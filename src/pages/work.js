import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Headline from "../components/Article/Headline";
import Projects from "../components/Projects/Projects";

const filters = [
  "all",
  "web",
  "animation",
  "prototype",
  "open-source",
  "android",
  "ios",
  "installation",
  "consultancy",
  "design",
  "ux",
  "video",
  "photo"
];

class WorkPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: "all"
    };
  }

  changeFilter(filter) {
    this.setState({ activeFilter: filter });
  }

  render() {
    const {
      data: {
        posts: { edges: posts = [] }
      }
    } = this.props;
    const { activeFilter } = this.state;

    return (
      <Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <div className="page-wrapper work">
              <header>
                <Headline title="My Binary Sugar Treats" theme={theme} />
              </header>

              <h2>These are some of my works (<strong>sorted by date</strong>) as a permanent employee of agencies/companies, as a freelancer or for personal projects since 1998</h2>

              <div className="filters">
                {filters.map(filter => (
                  <button
                    className={`btn ${activeFilter === filter ? "active" : ""}`}
                    onClick={() => this.changeFilter(filter)}
                    key={filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <Projects posts={posts} filter={activeFilter} theme={theme} />

              <style jsx>{`
                .work {
                  text-align: center;
                  max-width: 100%;
                }

                h2 {
                  font-size: 20px;
                  line-height: 30px;
                  margin: 30px auto;
                  padding: 0 20px;
                  width: 100%;
                  max-width: 820px;
                }

                .filters {
                  padding: 0 20px;
                  margin-bottom: 40px;
                }

                .btn {
                  margin: 0 2px 5px 2px;
                  padding: 0 10px;
                  height: 33px;
                  font-size: 10px;
                  text-transform: uppercase;
                }
              `}</style>
            </div>
          )}
        </ThemeContext.Consumer>
      </Fragment>
    );
  }
}

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
            categories
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
