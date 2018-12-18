import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const Item = props => {
  const { theme, item: { label, to, icon: Icon } = {}, onClick } = props;

  return (
    <React.Fragment>
      <li className="item" key={label}>
        <Link to={to} onClick={onClick} data-slug={to}>
          {Icon && <Icon />} {label}
        </Link>
      </li>

      {/* --- STYLES --- */}
      <style jsx>{`
        .item {
          background: transparent;
          transition: all ${theme.time.duration.default};
          display: flex;
          align-items: center;

          :global(a) {
            padding: ${theme.space.inset.s};
            display: flex;
            align-items: center;
          }

          :global(svg) {
            margin: 0 ${theme.space.inset.xs} 0 0;
            opacity: 0.3;
          }
        }

        @below desktop {
          :not(.homepage) {
            .item {
              :global(a) {
                color: ${theme.color.neutral.white};
              }
            }
          }
        }

        @from-width desktop {
          .item {
            :global(a) {
              color: ${theme.text.color.primary};
              padding: ${theme.space.inset.s};
              transition: all ${theme.time.duration.default};
              border-radius: ${theme.size.radius.small};
            }

            :global(.homepage):not(.fixed) & :global(a) {
              color: ${theme.color.neutral.white};
            }

            :global(a:hover) {
              color: ${theme.color.brand.primary};
              background: color(white alpha(-60%));
            }

            :global(svg) {
              transition: all ${theme.time.duration.default};
            }

            &:hover :global(svg) {
              fill: ${theme.color.brand.primary};
              opacity: 1;

              :global(.hero) & :global(svg) {
                fill: green;
              }
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  icon: PropTypes.func,
  theme: PropTypes.object.isRequired
};

export default Item;
