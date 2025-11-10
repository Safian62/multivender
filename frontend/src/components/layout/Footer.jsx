import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { useTranslation } from "react-i18next"; // ✅ Import i18next hook

function Footer() {
  const { t } = useTranslation(); // ✅ Use translation function

  return (
    <div className="bg-[#000] text-white">
      {/* SUBMIT BUTTON */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d879]">{t("footer.subscribe")}</span>{" "}
          {t("footer.getUpdates")}
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder={t("footer.enterEmail")}
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mb-2 mr-1 lg:mb-0 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            {t("footer.submit")}
          </button>
        </div>
      </div>

      {/* FOOTER LINKS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            style={{ filter: "brightness(0) invert(1)" }}
            alt=""
          />
          <br />
          <p>{t("footer.description")}</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiFillTwitterCircle size={25} className="cursor-pointer ml-3" />
            <AiFillYoutube size={25} className="cursor-pointer ml-3" />
            <AiFillInstagram size={25} className="cursor-pointer ml-3" />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">{t("footer.company")}</h1>
          {footerProductLinks.map((link) => (
            <li key={link.name}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {t(link.name)}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">{t("footer.shop")}</h1>
          {footercompanyLinks.map((link) => (
            <li key={link.name}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {t(link.name)}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">{t("footer.support")}</h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {t(link.name)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* BOTTOM BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>{t("footer.rights")}</span>
        <span>{t("footer.terms")}</span>
        <img
          src="https://www.diveriksperformance.com/wp-content/uploads/2023/05/payment-methods-epicerie-ludo.png"
          alt=""
          className="bg-white h-[50px] md:w-[300px] mt-[-10px] w-full"
        />
      </div>
    </div>
  );
}

export default Footer;
