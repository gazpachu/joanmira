import React, { Fragment, Component } from "react";
import { ThemeContext } from "../layouts";
import Seo from "../components/Seo";
import Hero from "../components/Hero";

class IndexPage extends Component {
  render() {
    return (
      <Fragment>
        <ThemeContext.Consumer>{theme => <Hero theme={theme} />}</ThemeContext.Consumer>
        <Seo />
      </Fragment>
    );
  }
}

export default IndexPage;
