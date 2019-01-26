import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Footer = props => {
  const { theme, path } = props;

  return (
    <Fragment>
      {path !== "/" ? (
        <footer className="footer">
          <p>© Joan Mira | Front-end Engineer | Interactive Developer | Creative Technologist | UX Designer</p>
          <p>
            Powered by <a href="https://www.gatsbyjs.org">Gatsby</a>, <a href="http://reactjs.org">React</a> and <a href="https://github.com">Github</a> | <a href="/credits">Credits and tech stack</a> | <a href="/stats">Stats and audit</a> | <a href="/privacy">Privacy policy</a> | <a href="/rss.xml">RSS Feed</a>
          </p>
        </footer>
      ) : null}

      <style jsx>{`
        .footer {
          text-align: center;
          padding: ${theme.space.inset.default};
          padding-top: 0;
          padding-bottom: 30px;
          max-width: 750px;
          margin: 0 auto;

          :global(p) {
            color: ${theme.color.neutral.gray.g};
            font-size: ${theme.font.size.xxs};
            padding: ${theme.space.xxs} ${theme.space.s};
            position: relative;
            display: inline-block;
          }
        }
      `}</style>
    </Fragment>
  );
};

Footer.propTypes = {
  html: PropTypes.string,
  path: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Footer;
