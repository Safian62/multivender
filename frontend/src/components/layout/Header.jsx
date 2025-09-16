import { useState, useEffect } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data";
import Cart from "../Cart/Cart";
import Wish from "../Wishlist/Wishlist.jsx";
import { backend_url } from "../../server.js";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);

  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);

  const { allProducts } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openwish, setOpenWish] = useState(false);
  const [open, setOpen] = useState(false);
  // console.log("User from Redux:", user);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filturedProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filturedProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* FIRST HEADER */}
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          {/* HEADER LOGO */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>

          {/* SEARCH BOX */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {/* Search Dropdown */}
            {searchData && searchData?.length > 0 && (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-full">
                {searchData.map((i, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/product/${i._id}`}
                      onClick={() => {
                        // Click ke baad dropdown close karna
                        setSearchTerm("");
                      }}
                    >
                      <div className="w-full flex items-start py-3">
                        <img
                          src={`${i.images[0].url}`}
                          className="w-[40px] h-[40px] mr-[10px] object-cover"
                          alt={i.name}
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* BECOME SELLER */}
          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Dashboard" : "Become Seller "}{" "}
                <IoIosArrowForward className="ml-1 mt-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* SECOND HEADER */}
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 right-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[60px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* CATEGORIES */}
          <div
            onClick={() => setDropDown(!dropDown)}
            className="relative h-[50px] mt-[10px] w-[250px] hidden 900px:block bg-white rounded-t-md"
          >
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button className="h-[100%] w-[70%] justify-between pl-5 items-center bg-white font-sanstext-lg font-[500] select-none rounded-t-md">
              All Categories
            </button>
            <IoIosArrowDown
              className="absolute right-2 top-4 cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown && (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            )}
          </div>

          {/* NAV ITEMS */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* FAVOURITE, CART, PROFILE */}
          <div className="flex">
            {/* FAVOURITE ICON */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWish(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {wishList && wishList.length}
                </span>
              </div>
            </div>
            {/* FAVOURITE POPUT */}
            {openwish ? <Wish setOpenWish={setOpenWish} /> : null}

            {/* CART ICON */}
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCard(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            {/* CART POPUT */}
            {openCard ? <Cart setOpenCard={setOpenCard} /> : null}

            {/* PROFILE ICON */}
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={user?.avatar?.url}
                      className="w-10 h-10 border-green-700 rounded-full border-3"
                      alt="User Avatar"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SCREEN HEADER */}

      <div
        className={`
        ${active === true ? "shadow-sm fixed top-0 left-0 z-10" : null}
        w-[100%] h-[70px]  fixed bg-[#fff] z-50 top-0 left-0 shadowkm-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          {/* HEADER LOGO */}
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div
            className="relative mr-[20px] "
            onClick={() => setOpenCard(true)}
          >
            <AiOutlineShoppingCart size={40} />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
              {cart && cart.length}
            </span>{" "}
          </div>
          {openCard ? <Cart setOpenCard={setOpenCard} /> : null}
        </div>

        {/* HEADER SIDE BAR */}
        {open && (
          <div className="flxed w-full bg-[#0000005f] z-20 h-full top-0 left-0 ">
            <div className="fixed w-[65%] bg-white h-screen top-0 left-0 z-10">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWish(true)}
                  >
                    <AiOutlineHeart size={40} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                      {wishList && wishList.length}
                    </span>
                    {openwish ? <Wish setOpenWish={setOpenWish} /> : null}
                  </div>
                </div>
                <RxCross1
                  size={40}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8  w-[92%] m-auto h-10">
                <input
                  type="search"
                  placeholder="Search products..."
                  className="h-10 w-full px-2 border-[#3957db] border-2 rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData?.length > 0 && (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData.map((i, index) => {
                      const product_name = i.name.replace(/\s+/g, "-");
                      return (
                        <Link key={index} to={`/product/${product_name}`}>
                          <div className="w-full flex items-start py-3">
                            <img
                              src={i.image_Url[0].url}
                              className="w-[40px] h-[40px] mr-[10px]"
                              alt=""
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-3 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1 mt-1" />
                  </h1>
                </Link>
                <br />
                <br />
                <br />
              </div>
              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div className="mt-10">
                    <Link to="/profile">
                      <img
                        src={user?.avatar?.url}
                        className="w-16 h-16 border-green-700 rounded-full border-3"
                        alt="User Avatar"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/Login" className="text-xl pr-2 text-[#000000b7]">
                      Login/
                    </Link>
                    <Link to="/sign-up" className="text-xl text-[#000000b7]">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
