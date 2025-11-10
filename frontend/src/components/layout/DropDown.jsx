import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 👈 Import translation hook
import styles from "../../styles/style";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // 👈 Initialize translator

  const submitHandler = (i) => {
    // Extract the last part of the translation key (e.g., category.mobile → mobile)
    const categoryKey = i.title.split(".")[1];
    navigate(`/products?category=${categoryKey}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div
      dir={i18n.language === "ur" ? "rtl" : "ltr"} // 👈 Automatically switch text direction
      className="pb-4 w-[250px] bg-white absolute z-30 rounded-b-md shadow-sm"
    >
      {categoriesData &&
        categoriesData.map((i, index) => (
          <div
            key={index}
            className={`${styles.normalFlex} cursor-pointer hover:bg-gray-100 transition`}
            onClick={() => submitHandler(i)}
          >
            <img
              src={i.image_Url}
              alt={t(i.title)} // 👈 Localized alt text
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: i18n.language === "ur" ? "0px" : "10px",
                marginRight: i18n.language === "ur" ? "10px" : "0px",
                userSelect: "none",
              }}
            />
            <h3 className="m-2 select-none text-[15px] font-medium">
              {t(i.title)} {/* 👈 Dynamic translation */}
            </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
