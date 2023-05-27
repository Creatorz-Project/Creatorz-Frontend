import React from "react";
import { BiCheck } from "react-icons/bi";
import moment from "moment";
import { useRouter } from "next/router";

export default function Video({ horizontal, video }) {
  console.log(video);

  const router = useRouter();

  return (
    <div
      className={`${
        horizontal
          ? "flex flex-row mx-5 mb-5 item-center justify-center cursor-pointer"
          : "flex flex-col m-2 cursor-pointer"
      } `}
      onClick={() => {
        // Navigation to the video screen (which we will create later)
        router.push(`/video?id=${video.video}`);
      }}
    >
      <img
        className={
          horizontal
            ? "object-cover rounded-lg w-60 "
            : "object-cover rounded-lg w-full h-40"
        }
        src={`https://w3s.link/ipfs/${video.thumbnail}`}
        alt=""
      />
      <div className="flex gap-[10px]">
        <img
          src={`https://api.dicebear.com/6.x/identicon/svg?seed=${video.title}`}
          className="rounded-full w-10 h-10 mt-5"
        />
        <div className={` m-2 ${horizontal && "ml-3  w-80"}`}>
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
        </div>
      </div>
    </div>
  );
}
