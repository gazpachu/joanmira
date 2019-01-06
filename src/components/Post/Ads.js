import React, { Component } from "react";

class Ads extends Component {
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9303292556158915"
        enable_page_level_ads="true"
      />
    );
  }
}

export default Ads;
