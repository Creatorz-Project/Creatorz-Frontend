import React from "react";
import { BiCheck } from "react-icons/bi";
import moment from "moment";
import { useRouter } from "next/router";
import Link from "next/link";
import { Marketplace as MPAddress } from "@/utils/Constants/Addresses";
import { Marketplace as MPAbi } from "@/utils/Constants/ABIs";
import { getContract } from "@/utils/Constants/Contracts";
import { ethers } from "ethers";
import VideoInfoModal from "./VideoInfoModal";
import { useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import BuyModal from "./BuyModal";
import { useAccount } from "wagmi";

export default function Video({ horizontal, video }) {
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [roomId, setRoomId] = useState("");

  const openHandler = () => {
    setOpen(!open);
  };

  const openBuyModalHandler = () => {
    setOpenBuyModal(!openBuyModal);
  };

  const buyHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    try {
      if (address) {
        const Marketplace = await getContract(MPAddress, MPAbi);
        const tx = await Marketplace.buyVideo(video.id, roomId);
        await tx.wait();
        openBuyModalHandler();
      }
    } catch (err) {
      console.log(err);
    }
    console.log(roomId);
  };

  return (
    <div
      className={`${
        horizontal
          ? "flex flex-row mx-5 mb-5 item-center justify-center"
          : "flex flex-col m-5 "
      } `}
    >
      <Link href={`/video/${video.video}`}>
        <img
          className={
            horizontal
              ? "object-cover rounded-lg w-60  cursor-pointer"
              : "object-cover rounded-lg w-full h-40  cursor-pointer"
          }
          src={`https://ipfs.io/ipfs/${video.thumbnail}`}
          alt=""
        />
      </Link>
      <div className=" flex justify-between">
        <div>
          <h4 className="text-md font-bold dark:text-white mt-3">
            {video.title}
          </h4>
          <p className="text-sm flex items-center text-[#878787] mt-1">
            {video.category + " • " + video.CreatedDate}
          </p>
          <p className="text-sm flex items-center text-[#878787] mt-1">
            {video?.owner?.slice(0, 9)}...{" "}
            <BiCheck size="20px" color="green" className="ml-1" />
          </p>
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600 text-xl font-medium">
            Price <span className="font-bold">{video.Price} CRTZ</span>
          </div>
        </div>
        <div>
          <button
            className="bg-[rgba(55,112,255,1)] rounded-md py-2 px-4 border-0 outline-0 hover:bg-[#537de8] text-base font-semibold mt-3"
            // onClick={buyHandler}
            onClick={() => openBuyModalHandler()}
          >
            Buy
          </button>
        </div>
      </div>
      <div
        className=" flex items-center gap-1 text-gray-500"
        onClick={() => openHandler()}
      >
        <span>
          <IoMdInformationCircle />
        </span>{" "}
        <span className="cursor-pointer font-medium">
          Click here for more info
        </span>
      </div>
      <BuyModal
        open={openBuyModal}
        openHandler={openBuyModalHandler}
        setRoomId={setRoomId}
        roomId={roomId}
        buyHandler={buyHandler}
      />
      <VideoInfoModal openHandler={openHandler} open={open} data={video} />
    </div>
  );
}
