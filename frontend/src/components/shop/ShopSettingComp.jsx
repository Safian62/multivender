import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/style";
import { loadShop } from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
const ShopSettingComp = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipCode] = useState(seller && seller.phoneNumber);

  const dispatch = useDispatch();
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const resp = await axios.put(
        `${server}/shop/update-shop-avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(resp.data.message || "Avatar updated successfully");
      dispatch(loadShop());
    } catch (err) {
      toast.error(err.response?.data?.message || "Avatar update failed");
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info `,
        {
          name,
          description,
          address,
          phoneNumber,
          zipCode,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        toast.success("Details updated successfully");
        dispatch(loadShop);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5 ">
        {/* PROFILE PICTURE */}
        <div className="w-full flex items-center justify-center relative">
          <div className="relative">
            <img
              src={`${seller?.avatar?.url}`}
              alt=""
              className="w-[200px] h-[200px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-3 right-3">
              <input
                type="file"
                id="image"
                name="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        {/* SHOP INFO */}
        <form className="flex flex-col items-center" onSubmit={updateHandler}>
          <div className=" w-full 800px:w-[50%] mt-5">
            <label className="block pb-2">Shop Name</label>
            <input
              type="name"
              placeholder={`${seller?.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className=" w-full 800px:w-[50%] mt-2">
            <label className="block pb-2">Shop description</label>
            <input
              type="text"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className=" w-full 800px:w-[50%] mt-2">
            <label className="block pb-2">Shop Address</label>
            <input
              type="text"
              placeholder={seller.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className=" w-full 800px:w-[50%] mt-2">
            <label className="block pb-2">Shop Number</label>
            <input
              type="text"
              placeholder={seller.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className=" w-full 800px:w-[50%] mt-2">
            <label className="block pb-2">Zip Code</label>
            <input
              type="text"
              placeholder={seller.zipCode}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
            <input
              type="submit"
              value="Update"
              required
              className="w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettingComp;
