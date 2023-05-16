import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useState } from "react";
// import { getSocialTokenContract } from "@/utils/getContracts";

export default function MintToken() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleClick = async () => {
    const data = {
      title,
      description,
      category,
      amount,
    };
    // try {
    //   const socialTokenContract = await getSocialTokenContract();
    //   const tx = await socialTokenContract.mintSocialToken(amount);
    //   await tx.wait();
    //   console.log(tx);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <>
      <div className=" w-screen">
        <div className=" w-full h-48 m-auto mt-11 rounded-md bg-[url('/waves-light.svg')] flex">
          <div className=" w-3/4 m-auto h-36 flex gap-6 justify-end items-center flex-wrap">
            <button
              onClick={handleClick}
              className="bg-gray-900 p-1 px-[12px] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 hover:bg-opacity-100 border border-gray-800 text-lg h-fit"
            >
              Mint Social Token
            </button>
            <button className="bg-gray-900 p-1 px-[12px] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 hover:bg-opacity-100 border border-gray-800 text-lg h-fit">
              Launch Social Token <RocketLaunchIcon />
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10     mt-5  lg:flex-row">
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
                <label className="text-[#9CA3AF]  text-sm">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                >
                  <option>Music</option>
                  <option>Sports</option>
                  <option>Gaming</option>
                  <option>News</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Science & Technology</option>
                  <option>Travel</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
