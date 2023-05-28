import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { NotificationOptIn, NotificationOptOut } from "@/utils/notification";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { getContract } from "@/utils/Constants/Contracts";
import { ContentManager as CMAddresss } from "../../utils/Constants/Addresses";
import { ContentManager as CMABI } from "../../utils/Constants/ABIs";
import TextField from "@mui/material/TextField";
import RoomCard from "./RoomCard";
import VideoCard from "./VideoCard";

export default function MySpace(props) {
  const [videos, setVideos] = useState(props.Post.videos);
  const [rooms, setRooms] = useState(props.Post.rooms);
  const [roomsData, setRoomsData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();
  const [ethAccount, setEthAccount] = useState("null");

  useEffect(() => {
    const setAcc = () => {
      if (address != undefined) {
        console.log(address);
        setEthAccount(address);
      } else {
        console.log("no account");
        setEthAccount("null");
      }
    };
    setAcc();
  }, [address]);

  const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
  const _signer = new ethers.Wallet(Pkey);

  const sendNotification = async (data, task) => {
    await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `New video ${task}`,
        body: ``,
      },
      payload: {
        title: `${task} a new video -> ${data.title}`,
        body: `${data.description}`,
        cta: "",
        img: `https://gateway.pinata.cloud/ipfs/${data.thumbnail}`,
      },
      channel: "eip155:5:0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb", // your channel address
      env: "staging",
    });
  };

  const videoForLoop = useCallback(async () => {
    setLoading(true);

    const tempChoicesArray = [];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < videos.length; i++) {
      let obj = {};
      if (videos[i].MetadataURI.length > 8) {
        const newresponse = await fetch(
          `https://ipfs.io/ipfs/${videos[i].MetadataURI}/RoomMetaData.json`,
          requestOptions
        );
        const result = await newresponse.json();
        obj = { ...result, ...videos[i] };
        tempChoicesArray.push(obj);
      }

      setLoading(false);
    }
    setVideosData(tempChoicesArray);
  }, [videos, videosData]);

  console.log(videosData);

  useEffect(() => {
    if (videos.length > 0) {
      videoForLoop();
    }
  }, [videos]);

  const roomForLoop = useCallback(async () => {
    setLoading(true);

    const tempChoicesArray = [];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < rooms.length; i++) {
      let obj = {};
      if (rooms[i].URI.length > 8) {
        const newresponse = await fetch(
          `https://ipfs.io/ipfs/${rooms[i].URI}/RoomMetaData.json`,
          requestOptions
        );
        const result = await newresponse.json();
        obj = { ...result, ...rooms[i] };
        tempChoicesArray.push(obj);
      }

      setLoading(false);
    }
    setRoomsData(tempChoicesArray);
  }, [rooms, roomsData]);

  console.log(roomsData);

  useEffect(() => {
    if (rooms.length > 0) {
      roomForLoop();
    }
  }, [rooms]);


  console.log(videosData);

  return (
    <div className="bg-[#150A22] pb-5">
      <div className=" flex justify-end pt-12 mr-12">
        <ConnectButton />
      </div>
      <div className="mt-2 mx-12">
        <h3 className="text-2xl mb-7">Notification</h3>
        <div>
          Want stay up-to-date with all the videos and updates?{" "}
          <NotificationOptIn />
        </div>

        <NotificationOptOut />
      </div>
      <div className="mt-10 mx-12">
        <h3 className=" text-2xl mb-7 font-semibold">Videos</h3>
        <div className=" flex flex-wrap gap-5">
          {videosData
            .filter(
              (element) =>
                element.owner.toLowerCase() != ethAccount.toLowerCase()
            )
            .map((data, index) => {
              return (
                <VideoCard data={data} key={index}/> 
              );
            })}
        </div>
      </div>
      <div className="mt-10 mx-12">
        <h3 className=" text-2xl mb-7 font-semibold">Rooms</h3>
        <div className=" flex flex-wrap gap-5">
          {roomsData
            .filter(
              (element) =>
                element.Owner.toLowerCase() == ethAccount.toLowerCase()
            )
            .map((data, index) => {
              return <RoomCard room={data} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}
