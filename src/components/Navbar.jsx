import React from "react";
import { FaRegSun } from "react-icons/fa6";
import { IoMdRefreshCircle } from "react-icons/io";

const Navbar = () => {
  const handleRefresh = () => {

    window.location.reload();
  };
  return (
    <div className=" w-full bg-[#62676d] text-white px-3 py-4">
      <div className="w-full max-w-[1366px] mx-auto flex items-center justify-between">
        <div className="left flex items-center gap-2 text-3xl font-semibold">
          <FaRegSun /> Weather 99
        </div>
        <div
          className="right flex items-center gap-2 text-xl cursor-pointer"
          onClick={handleRefresh}
        >
          <IoMdRefreshCircle /> Refresh
        </div>
      </div>
    </div>
  );
};

export default Navbar;
