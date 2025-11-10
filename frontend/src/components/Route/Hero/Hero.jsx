import React from "react";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const {t} = useTranslation();
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2022/08/08/19/36/landscape-7373484_640.jpg')",
        height: "400px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%] `}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
         {t('HomeTitle')}
        </h1>
        <p className="pt-5 text-[16px] font-Poppins font-[400] text-[#000000ba]">
        {t('HomeDesc')}
        </p>
        <Link to='/products' className="inline-block">
            <div className={`${styles.button} mt-5`}>
                <span className="text-white font-Poppins text-[18px]">{t('HomeBtn')}</span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
