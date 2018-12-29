import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { graphql } from "gatsby";
require("core-js/fn/array/find");

import Article from "../components/Article";
import Search from "../components/Search";
import { ThemeContext } from "../layouts";
import Seo from "../components/Seo";

const SearchPage = props => {
  const {
    data: {
      site: {
        siteMetadata: { algolia }
      }
    }
  } = props;

  return (
    <Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <Search algolia={algolia} theme={theme} />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo />

      <style jsx>{`
        .icon {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .icon :global(svg) {
          height: 30px;
        }
      `}</style>
    </Fragment>
  );
};

SearchPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SearchPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query SearchQuery {
    site {
      siteMetadata {
        algolia {
          appId
          searchOnlyApiKey
          indexName
        }
      }
    }
  }
`;
