import React, { useState, useRef, useMemo, useEffect } from "react";
import { GrChannel } from "react-icons/gr";
import { ethers } from "ethers";
import { saveMetaData } from "@/utils/saveMetaDataToIPFS";
import { TokenAddress } from "@/utils/Constants/Addresses";
import { Token } from "@/utils/Constants/ABIs";
import { getContract } from "@/utils/Constants/Contracts";
import * as PushAPI from "@pushprotocol/restapi";
// import { getRoomsContract } from "@/utils/getContracts";
import AddIcon from "@mui/icons-material/Add";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace:
    "pk/0xdaf07b7db43321236f6739b10bff96379508a07d2bcbd793b4c22c31711c795d5ca356ad7fd4d8b7691aa36f7f6b44d8106538a54f41e49174aab02e64bd3cde/Testing-2103",
});

export default function MintRoom() {
  // Creating state for the input field
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Music");
  const [send, setSend] = useState(false);

  const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
  const _signer = new ethers.Wallet(Pkey);

  const sendNotification = async () => {
    await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `New Room Created`,
        body: `Checkout the new room in the space `,
      },
      payload: {
        title: `New Room ${title} Created`,
        body: `${description}`,
        cta: "",
        img: "",
      },
      channel: "eip155:5:0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb", // your channel address
      env: "staging",
    });
  };

  const handleSubmit = async () => {
    setSend(false);
    const RoomMetaData = {
      title: title,
      description: description,
      category: category,
    };
    const cid = await saveMetaData(RoomMetaData);
    try {
      const token = await getContract(TokenAddress, Token);
      const tx = await token.createRoom(cid, price);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (send) {
      sendNotification();
    }
  }, [send]);

  console.log(send);

  return (
    <div className="w-full h-screen bg-[#000000] flex flex-row">
      <div className="flex-1 flex flex-col">
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6">
              Discard
            </button>
            <button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-gray-900 py-[6px] px-[12px] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 hover:bg-opacity-100 border border-gray-800 text-lg h-fit"
            >
              Create <AddIcon />
            </button>
          </div>
        </div>
        <div className="flex flex-col m-10     mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <div className="flex flex-row mt-10 w-[90%]  justify-between">
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
              <div className="flex flex-col w-2/5 ">
                <label className="text-[#9CA3AF]  text-sm">
                  Charges for Ads
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  placeholder=""
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
