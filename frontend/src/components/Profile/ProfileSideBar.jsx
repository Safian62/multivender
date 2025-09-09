import React from "react";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const ProfileSideBar = ({ setActive, active }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
const logoutHandler = async () => {
  try {
    await axios.post(
      `${server}/user/logout`,
      {}, // Empty body for POST
      { withCredentials: true }
    )
      .then((res) => {
        // Clear user token as a fallback
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "User logout failed");
      });
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "User logout failed");
  }
};


  return (
    <div className="w-[95%] bg-white shadow-sm rounded-[10px] p-4   ">
      {/* PROFILE ICON */}
      <div
        className="flex items-center cursor-pointer w-full mb-6 "
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden pl-3 `}
        >
          Profile
        </span>
      </div>
      {/* SHOPPING CART ICON */}
      <div
        className="flex items-center cursor-pointer w-full mb-6 "
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden pl-3 `}
        >
          Orders
        </span>
      </div>
      {/* REFUNDS ICON */}
      <div
        className="flex items-center cursor-pointer w-full mb-6 "
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden pl-3 `}
        >
          Refunds
        </span>
      </div>
      {/* INBOX ICON */}
      <div
        className="flex items-center cursor-pointer w-full mb-6 "
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`${
            active === 4 ? "text-[red]" : ""
          } 800px:block hidden pl-3 `}
        >
          Inbox
        </span>
      </div>
      {/* TRACK ORDER */}
      <div
        className="flex items-center cursor-pointer w-full mb-6 "
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`${
            active === 5 ? "text-[red]" : ""
          } 800px:block hidden pl-3 `}
        >
          Track Order
        </span>
      </div>
      {/* PAYMENT METHOD */}
      <div
        className="flex items-center cursor-pointer w-full mb-6 "
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`${
            active === 6 ? "text-[red]" : ""
          } 800px:block hidden pl-3 `}
        >
          Change Password
        </span>
      </div>
      {/* ADDRESS METHOD */}
      <div
        className="flex items-center cursor-pointer w-full mb-6 "
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`${
            active === 7 ? "text-[red]" : ""
          } 800px:block hidden pl-3 `}
        >
          Address
        </span>
      </div>
      {/* GO DASHBOARD ONLY FOR ADMIN */}
      {user && user.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-6 "
            onClick={() => setActive(9)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 9 ? "red" : ""}
            />
            <span
              className={`${
                active === 9 ? "text-[red]" : ""
              } 800px:block hidden pl-3 `}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}

      {/* LOGOUT METHOD */}
      <div
        className="flex items-center cursor-pointer w-full mb-2 "
        onClick={() => {
          setActive(8);
          logoutHandler();
        }}
      >
        <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden pl-3 `}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSideBar;
