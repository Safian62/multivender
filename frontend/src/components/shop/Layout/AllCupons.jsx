import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../redux/actions/product";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../layout/loader";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../../styles/style";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const Allcoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setcoupons] = useState([]);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shop: seller._id,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        toast.success("coupon Code is created Successfuly");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupons/${seller._id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setIsLoading(false);
        console.log(resp.data);
        setcoupons(resp.data.coupons);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Failed to fetch coupons");
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/coupon/delete-coupon-code/${id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        toast.success(resp.data.message);
        window.location.reload()
      })
      .then((error) => {
        toast.error(error?.response?.data.message);
      });
  };
  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },

    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </button>
          </>
        );
      },
    },
  ];

  const row = [];
  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
        stock: item.stock,
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-11 px-3 !rounded-[5px] mr-3`}
              onClick={(e) => setOpen(true)}
            >
              <span className="text-white">Create coupon Code</span>
            </div>
          </div>
          <br />
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-30 flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[90vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    onClick={(e) => setOpen(false)}
                    cursor="pointer"
                  />
                </div>
                <h5 className="text-xl font-Poppins text-center">
                  Create coupon Code
                </h5>
                {/* CREATE coupon CODE */}
                <form onSubmit={handleSubmit}>
                  <br />
                  <div className="mb-3 ">
                    <label className="pb-1">
                      Coupon Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      className="border mt-1 appearance-none block w-full px-3  h-[35px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your Coupon Code name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="pb-1">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required
                      onChange={(e) => setValue(e.target.value)}
                      className="border mt-1 appearance-none block w-full px-3  h-[35px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter minimum Amount"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="pb-1">Min Amount</label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="border mt-1 appearance-none block w-full px-3  h-[35px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your Coupon Code value"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="pb-1">Max Amount</label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="border mt-1 appearance-none block w-full px-3  h-[35px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter maximum Amount"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="pb-2">Selected Products</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="">Choose a Product</option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-1.5">
                    <input
                      type="submit"
                      value="Create"
                      required
                      className="border mt-1 appearance-none block w-full px-3  h-[35px] border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Allcoupons;
