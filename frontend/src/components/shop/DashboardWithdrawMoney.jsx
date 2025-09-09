import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../redux/actions/order";
import { loadShop } from "../../redux/actions/user";
import styles from "../../styles/style";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const DashboardWithdrawMoney = () => {
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const dispatch = useDispatch();

  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersShop(seller?._id));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    await axios
      .put(
        `${server}/shop/update-payment-methods`,
        {
          withdrawMethod,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        toast.success("Withdraw method added successfully");
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: "",
          bankAccountNumber: "",
          bankHolderName: "",
          bankAddress: "",
        });
        setPayment(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((resp) => {
        toast.success("Withdraw method deleted successfully");
        dispatch(loadShop());
      });
  };

  const error = () => {
    toast.error("You not have enough balance to withdraw");
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > seller?.availableBalance) {
      toast.error("You cannot withdraw this amount");
    } else {
      const amount = withdrawAmount;
      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((resp) => {
          toast.success("Withdraw request sent successfylly.");
          setOpen(false);
        });
    }
  };

  const availableBalance = seller?.availableBalance.toFixed(2);
  return (
    <div className="w-full h-full pt-8 px-8">
      <div className="w-full bg-white h-[70vh] rounded flex items-center justify-center flex-col">
        <h5 className="text-xl">Available Balance ${availableBalance}</h5>
        <div
          className={`${styles.button} text-white mt-7 !h-[42px] !rounded`}
          onClick={() =>
            availableBalance < 10 || NaN ? error() : setOpen(true)
          }
        >
          Withdraw Money
        </div>
      </div>
      {open && (
        <div className="w-full h-screen fixed top-0 z-[999] left-0 flex items-center justify-center bg-[#00000053]">
          <div
            className={` w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              payment ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-5 `}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPayment(false)}
                cursor="pointer"
              />
            </div>
            {payment ? (
              <div>
                <h3 className="text-xl font-Poppins text-center">
                  Add New Payment Methods:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Bank Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      placeholder="Enter your bank name."
                      className={`${styles.input} mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-gray-700 font-medium">
                      Bank Country <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      placeholder="Enter your bank country."
                      className={`${styles.input} mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-gray-700 font-medium">
                      Bank Swift code <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Enter your bank swift code."
                      className={`${styles.input} mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-gray-700 font-medium">
                      Bank Account Number{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      placeholder="Enter your bank account number."
                      className={`${styles.input} mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-gray-700 font-medium">
                      Bank Holder Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      placeholder="Enter your bank holder name."
                      className={`${styles.input} mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-gray-700 font-medium">
                      Bank Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      placeholder="Enter your bank address."
                      className={`${styles.input} mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.button} mb-3 text-white !rounded`}
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-Poppins">
                  Availabe Payment Methods:
                </h3>
                {seller && seller.withdrawMethod ? (
                  <div>
                    <div className="800px:flex w-full justify-center items-center">
                      <div className="800px:w-[50%]">
                        <h5>
                          Account Number:
                          {"*".repeat(
                            seller.withdrawMethod.bankAccountNumber.length - 3
                          ) + seller.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5>Bank Name: {seller.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer"
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4> Available Balance{availableBalance}$</h4>
                    <br />
                    <div className="800px:flex w-full items-center">
                      <input
                        type="number"
                        placeholder="Amount.."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[100px] w-full border 800px:mr-3 p-2 rounded "
                      />
                      <div
                        className={`${styles.button} text-white !h-[42px] !rounded`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xl pt-2">
                      {" "}
                      No Payment Methods Availabe!
                    </p>
                    <div className="w-full flex justify-center items-center">
                      <div
                        className={`${styles.button} text-white text-xl mt-4 !rounded`}
                        onClick={() => setPayment(true)}
                      >
                        Add New
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardWithdrawMoney;
