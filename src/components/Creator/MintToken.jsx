import { useState } from "react";
import { getContract } from "@/utils/Constants/Contracts";
import { Token } from "@/utils/Constants/ABIs";
import { TokenAddress } from "@/utils/Constants/Addresses";
import { saveMetaData } from "@/utils/saveMetaDataToIPFS";

export default function MintToken() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxHoldingAmount, setMaxHoldingAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [relatedVideo, setRelatedVideo] = useState("");
  const [Price, setPrice] = useState("");

  const handleClick = async () => {
    const data = {
      title,
      description,
      amount,
    };
    const URI = await saveMetaData(data);
    try {
      const token = await getContract(TokenAddress, Token);
      const tx = await token.mintSocialTokens(
        amount,
        Price,
        URI,
        maxHoldingAmount,
        relatedVideo
      );
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className=" w-screen bg-[#150A22]">
        <div className=" w-full h-48 m-auto pt-11 rounded-md bg-[url('/design.png')] flex">
          <div className=" w-3/4 m-auto h-36 flex gap-6 justify-end items-center flex-wrap">
            <button
              onClick={handleClick}
              className="bg-[rgba(55,112,255,1)] rounded-md py-2 px-4 border-0 outline-0 hover:bg-[#537de8] text-base font-semibold"
            >
              Mint Social Token
            </button>
          </div>
        </div>
        <div className="flex flex-col p-10 pt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Edition Name</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="beast"
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Benefits</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="perks that user get if they buy your tokens"
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Amount</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  placeholder="Amount of Token"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Amount</label>
                <input
                  value={maxHoldingAmount}
                  onChange={(e) => setMaxHoldingAmount(e.target.value)}
                  type="number"
                  placeholder="Max Holding Amount of the Token per User"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-row mt-10 w-[90%]  justify-between">
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Related Video</label>
                <input
                  value={relatedVideo}
                  onChange={(e) => setRelatedVideo(e.target.value)}
                  type="text"
                  placeholder="Video Id of video binded to this token"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5    ">
                <label className="text-[#9CA3AF]  text-sm">Token Price</label>
                <input
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  placeholder="Price of Each Token"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
