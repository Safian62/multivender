import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { BsPencil } from "react-icons/bs";
import { DataGrid } from "@mui/x-data-grid";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { toast } from "react-toastify";

const AdminAllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    axios
      .get(`${server}/withdraw/get-all-withdraw-request`, {
        withCredentials: true,
      })
      .then((resp) => {
        setData(resp.data.withdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        toast.success("Withdraw status updated successfully");
        setData(resp.data.withdraws);
        setOpen(false);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "Withdraw Id",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 0.8,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Create AT",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      headerName: "Update Status",
      type: "text",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <BsPencil
            size={20}
            className={`cursor-pointer ml-10 mt-3 ${
              params.row.status !== "Processing" ? "hidden" : ""
            }`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  const row = [];
  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.seller.name,
        shopId: item.seller._id,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex items-center pt-5 justify-center">
      <div className="w-[95%] bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={3}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      {open && (
        <div className="w-full fixed h-screen top-0 left-0 bg-[#0000007b] z-[9999] flex items-center justify-center">
          <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                cursor="pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-2xl text-center font-Poppins">
              Update Withdraw Status
            </h1>
            <select
              name=""
              id=""
              className="w-[200px] h-[40px] mt-2 border rounded"
              onChange={(e) => setWithdrawStatus(e.target.value)}
            >
              <option value={withdrawStatus}>{withdrawData.status}</option>
              <option value={withdrawStatus}>Succeed</option>
            </select>
            <button
              type="submit"
              className={`block ${styles.button} text-white !h-[42px] mt-4 text-xl`}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllWithdraw;
