import React from "react";
import styles from "../../styles/style";
import { navItems } from "../../static/data";
import LocalizedLink from "../LocalizedLink";
import { useTranslation } from "react-i18next";

const Navbar = ({ active }) => {
  const { t } = useTranslation();
  const items = navItems(t);
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
      {items &&
        items.map((i, index) => (
          <div className="flex" key={index}>
            <LocalizedLink
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px]  800px:pb-0 px-2 mx-4 font-[500] cursor-pointer `}
            >
              {i.title}
            </LocalizedLink>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
