import React from "react";
import { BiCheck } from "react-icons/bi";
import moment from "moment";
import { useRouter } from "next/router";
// import { getRoomsContract } from "/utils/getContracts";
import Link from "next/link";
import { ethers } from "ethers";

export default function Video({ horizontal, video }) {
  const buyHandler = async () => {
    // try {
    //   const roomsContract = await getRoomsContract();
    //   const tx = await roomsContract.buyVideo(video.VideoId, {
    //     value: ethers.utils.parseEther("0"),
    //   });
    //   await tx.wait();
    //   console.log("Video bought");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div
      className={`${
        horizontal
          ? "flex flex-row mx-5 mb-5 item-center justify-center"
          : "flex flex-col m-5 "
      } `}
    >
      <Link href={`/video?id=${video.VideoId}`}>
        <img
          className={
            horizontal
              ? "object-cover rounded-lg w-60  cursor-pointer"
              : "object-cover rounded-lg w-full h-40  cursor-pointer"
          }
          src={`https://${video.thumbnail}.ipfs.w3s.link`}
          alt=""
        />
      </Link>
      <div className=" flex justify-between">
        <div>
          <h4 className="text-md font-bold dark:text-white mt-3">
            {video.title}
          </h4>
          <p className="text-sm flex items-center text-[#878787] mt-1">
            {video.category + " • " + moment(video.createdAt * 1000).fromNow()}
          </p>
          <p className="text-sm flex items-center text-[#878787] mt-1">
            {video?.Owner?.slice(0, 9)}...{" "}
            <BiCheck size="20px" color="green" className="ml-1" />
          </p>
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-600 text-xl font-medium">
            Price{" "}
            <span className="font-bold">
              {ethers.utils.formatEther(video.Price)} CRTZ
            </span>
          </div>
        </div>
        <div>
          <button
            className="bg-[rgba(55,112,255,1)] rounded-md py-2 px-4 border-0 outline-0 hover:bg-[#537de8] text-base font-semibold mt-3"
            onClick={buyHandler}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
