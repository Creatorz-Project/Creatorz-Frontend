import React from "react";
import { BiCheck } from "react-icons/bi";
import moment from "moment";
import { useRouter } from "next/router";

export default function Video({ horizontal, video }) {

  const router = useRouter()

  return (
    <div
      className={`${horizontal
        ? "flex flex-row mx-5 mb-5 item-center justify-center cursor-pointer"
        : "flex flex-col m-5 cursor-pointer"
        } `}

      onClick={() => {
        // Navigation to the video screen (which we will create later)
        router.push(`/video?id=${video.id}`);
      }}
    >
      <img
        className={
          horizontal
            ? "object-cover rounded-lg w-60 "
            : "object-cover rounded-lg w-full h-40"
        }
        src="https://images.unsplash.com/photo-1682685797898-6d7587974771?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt=""
      />
      <div className={horizontal && "ml-3  w-80"}>
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
      </div>
    </div>
  );
}