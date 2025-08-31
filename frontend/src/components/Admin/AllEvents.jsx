import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/actions/event";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineEye } from "react-icons/ai";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { allEvents } = useSelector((state) => state.events);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
    },
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
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      headerName: "",
      type: "number",
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        const d = params.row.id;

        return (
          <>
            <Link to={`/product/${d}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];
  allEvents &&
    allEvents.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "U$ " + item.discountPrice,
        Stock: item.stock,
        sold: 10,
      });
    });
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[95%] mt-4">
        <h3 className="text-[22px] font-Poppins pb-2">All Events</h3>

        <div className="w-full min-h-[45vh] bg-white">
          <div style={{ minWidth: "800px" }}>
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={5}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
