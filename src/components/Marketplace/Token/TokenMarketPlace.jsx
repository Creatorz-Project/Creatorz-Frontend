import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import TokenCard from "./TokenCard";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getContract } from "@/utils/Constants/Contracts";
import { TokenAddress } from "@/utils/Constants/Addresses";
import { Token } from "@/utils/Constants/ABIs";
import InfoModal from "./infoModal";

export default function TokenMarketPlace(props) {
  const [selectedOption, setSelectedOption] = useState("Social Token");
  const router = useRouter();
  const [tokens, setTokens] = useState(props.Post.socialTokenHoldings);
  const [tokensData, setTokensData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();
  const [openInfoModal, setopenInfoModal] = useState(false);

  useEffect(() => {
    setopenInfoModal(true)
  }, [])

  const options = [
    { name: "Videos", url: "/marketplace/video" },
    { name: "Rooms", url: "/marketplace/room" },
    { name: "Social Token", url: "/marketplace/token" },
  ];

  const getTokensHandler = async () => {
    try {
      if (address) {
        console.log(address);
        setLoading(true);
        const tokenContract = await getContract(TokenAddress, Token);
        const tx = await tokenContract.getCreatorzTokens();
        await tx.wait();
        const Balance = await tokenContract.getBalance(address, 0);
        setBalance(Balance);
        setLoading(false);
      }
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
    if (address) {
      getBalance();
    }
  }, [address]);

  const forloop = useCallback(async () => {
    setLoading(true);

    const tempChoicesArray = [];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < tokens.length; i++) {
      let obj = {};
      if (tokens[i].URI.length > 8) {
        const newresponse = await fetch(
          `https://ipfs.io/ipfs/${tokens[i].URI}/RoomMetaData.json`,
          requestOptions
        );
        const result = await newresponse.json();
        obj = { ...result, ...tokens[i] };
        tempChoicesArray.push(obj);
      }
      setLoading(false);
    }
    setTokensData(tempChoicesArray);
  }, [tokens, tokensData]);

  useEffect(() => {
    if (tokens.length > 0) {
      forloop();
    }
  }, [tokens]);

  console.log(tokens, tokensData);

  return (
    <div>
      <div className="flex flex-col pt-12 bg-[#150A22]">
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
            className="bg-[rgba(55,112,255,1)] rounded-md py-2 px-4 border-0 outline-0 hover:bg-[#537de8] text-base font-semibold"
            onClick={getTokensHandler}
          >
            Get Creators Token
          </button>
        </div>
      </div>
      <div className="w-full flex flex-row bg-[#150A22]">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="flex flex-row flex-wrap gap-5 mx-5 my-5 ">
          {tokensData.length > 0 ? (
            tokensData
              .filter((data) => parseInt(data.AmountListedByHolder) > 0)
              .map((data, index) => {
                return (
                  <div className="w-80 bg-[#1a1c1f] rounded-xl" key={index}>
                    <TokenCard token={data} />
                  </div>
                );
              })
          ) : (
            <></>
          )}
        </div>
      </div>
      <InfoModal open={openInfoModal} setOpen={setopenInfoModal} />
    </div>
  );
}
