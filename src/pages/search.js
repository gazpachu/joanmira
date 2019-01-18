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

      <Seo title="Search" />

      <style jsx>{`
        .icon {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }
        .icon :global(svg) {
          height: 30px;
        }
        :global(.ais-SearchBox-input) {
          outline: none;
          color: #333;
        }
        :global(.ais-SearchBox-reset) {
          display: none;
        }
        :global(.ais-SearchBox-submitIcon) {
          width: 18px;
          height: 18px;
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
