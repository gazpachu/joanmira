import React, { Component } from "react";
import { ThemeContext } from "../layouts";
import Hero from "../components/Hero";

class IndexPage extends Component {
  render() {
    return <ThemeContext.Consumer>{theme => <Hero theme={theme} />}</ThemeContext.Consumer>;
  }
}

export default IndexPage;
