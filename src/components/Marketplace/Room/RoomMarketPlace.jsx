import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { getContract } from "@/utils/Constants/Contracts";
import { TokenAddress } from "@/utils/Constants/Addresses";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Token } from "@/utils/Constants/ABIs";
import { useAccount } from "wagmi";
import Room from "./RoomCard";

export default function RoomMarketPlace(props) {
  const [selectedOption, setSelectedOption] = useState("Rooms");
  const [rooms, setRooms] = useState(props.Post.rooms);
  const [roomsData, setRoomsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();

  const options = [
    { name: "Videos", url: "/marketplace/video" },
    { name: "Rooms", url: "/marketplace/room" },
    { name: "Social Token", url: "/marketplace/token" },
  ];

  const getTokensHandler = async () => {
    try {
      setLoading(true);
      const tokenContract = await getContract(TokenAddress, Token);
      const tx = await tokenContract.getCreatorzTokens();
      await tx.wait();
      const Balance = await tokenContract.getBalance(address, 0);
      setBalance(Balance);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    const getBalance = async () => {
      const tokenContract = await getContract(TokenAddress, Token);
      const Balance = await tokenContract.getBalance(address, 0);
      setBalance(Balance);
    };
    getBalance();
  }, [address]);

  const forloop = useCallback(async () => {
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
          `https://w3s.link/ipfs/${rooms[i].URI}/RoomMetaData.json`,
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

  useEffect(() => {
    if (rooms.length > 0) {
      forloop();
    }
  }, [rooms]);

  console.log(rooms, roomsData);

  return (
    <div>
      <div className="flex flex-col mt-12">
        <div className="flex gap-3 flex-col items-center">
          <div display="flex">
            <ul className="flex p-0 m-0 w-full bg-gray-800 rounded-lg list-none">
              {options.map((data, index) => {
                console.log(selectedOption == data.name);
                return (
                  <li className=" p-1 flex-1" key={index}>
                    {selectedOption == data.name ? (
                      <button
                        className=" text-[rgba(255,242,255,1)] m-0 py-2 px-4 border-0 outline-0 w-full rounded-sm relative will-change-auto transition-colors duration-300 ease-in"
                        onClick={() => {
                          setSelectedOption(data.name);
                          router.push(data.url);
                        }}
                      >
                        <div className="absolute inset-0 bg-[rgba(55,112,255,1)] rounded-md"></div>
                        <p className="whitespace-nowrap text-base m-0 font-semibold relative z-10">
                          {data.name}
                        </p>
                      </button>
                    ) : (
                      <button
                        className=" text-[rgba(55,112,255,1)] m-0 py-2 px-4 border-0 outline-0 w-full rounded-sm relative will-change-auto transition-colors duration-300 ease-in"
                        onClick={() => {
                          setSelectedOption(data.name);
                          router.push(data.url);
                        }}
                      >
                        <div className="absolute inset-0 rounded-md"></div>
                        <p className="whitespace-nowrap text-base m-0 font-semibold relative z-10">
                          {data.name}
                        </p>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="absolute top-28 right-6 flex">
          <div className=" bg-gray-800 text-yellow-50 text-lg font-semibold rounded-md py-2 px-3">
            {(Math.round(balance * 100) / 100).toFixed(4)} CRTZ
          </div>
          <button
            onClick={getTokensHandler}
            className="bg-[rgba(55,112,255,1)] rounded-md py-2 px-4 border-0 outline-0 hover:bg-[#537de8] text-base font-semibold"
          >
            Get Creators Token
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="flex flex-row flex-wrap gap-5 mx-5 my-5 ">
          {roomsData.length > 0 ? (
            roomsData
              .filter((data) => data.IsListed == true)
              .map((data, index) => {
                return (
                  <div className="w-80 bg-[#1a1c1f] rounded-xl" key={index}>
                    <Room room={data} />
                  </div>
                );
              })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}