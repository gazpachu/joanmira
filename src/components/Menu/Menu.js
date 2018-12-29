import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

class Menu extends React.Component {
  constructor(props) {
    super(props);

    const pages = props.pages.map(page => {
      return {
        to: page.node.fields.slug,
        label: page.node.frontmatter.menuTitle
          ? page.node.frontmatter.menuTitle
          : page.node.frontmatter.title
      };
    });

    this.items = [
      { to: "/category/", label: "Categories" },
      { to: "/search/", label: "Search" },
      ...pages
    ];
  }

  static propTypes = {
    path: PropTypes.string.isRequired,
    fontLoaded: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
  };

  render() {
    const { theme } = this.props;

    return (
      <React.Fragment>
        <nav className="menu" rel="js-menu">
          <ul className="itemList">
            {this.items.map(item => (
              <Item item={item} key={item.label} theme={theme} />
            ))}
          </ul>
        </nav>

        {/* --- STYLES --- */}
        <style jsx>{`
          .menu {
            align-items: center;
            display: flex;
            flex-grow: 1;
            left: 0;
            padding: 0 ${theme.space.inset.s};
            width: 100%;
            transition: all ${theme.time.duration.default};
          }

          .itemList {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            list-style: none;
            margin: 0;
            padding: 0; /* 0 ${theme.space.s}; */
            position: relative;
            width: 100%;
          }

          @below desktop {
            .menu {
              position: initial;
            }
          }

          @from-width desktop {
            .menu {
              border-top: none;
              background: transparent;
              display: flex;
              position: relative;
              justify-content: flex-end;
              padding-left: 50px;
              transition: none;
            }

            .itemList {
              justify-content: flex-end;
              padding: 0;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Menu;
