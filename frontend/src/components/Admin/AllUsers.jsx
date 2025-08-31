import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAdmin } from "../../redux/actions/user";
import { RxCross1 } from "react-icons/rx";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/style";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllUsers = () => {
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((resp) => {
        toast.success(resp.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    dispatch(getAllUsersAdmin());
  };

  useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, []);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "joinedAt",
      headerName: "Join Date",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "",
      headerName: "Delete",
      type: "number",
      minWidth: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[95%] mt-4">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>

        <div className="w-full min-h-[45vh] bg-white">
          <div style={{ minWidth: "800px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
          {open && (
            <div className="w-full fixed top-0 left-0 z-30 bg-[#00000062] flex items-center justify-center h-screen">
              <div className=" w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                <div className="w-full flex justify-end cursor-pointer">
                  <RxCross1 size={25} onClick={() => setOpen(false)} />
                </div>
                <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000ac]">
                  Are you sure you want to delete!
                </h3>
                <div className="w-full flex items-center justify-center">
                  <div
                    className={`${styles.button} text-white text-[20px] !h-[40px] mr-4`}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} text-white text-[20px] !h-[40px] ml-4 `}
                    onClick={() => setOpen(false) || handleDelete(userId)}
                  >
                    Confirm
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
