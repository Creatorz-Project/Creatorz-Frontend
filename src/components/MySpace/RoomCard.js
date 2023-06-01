import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Marketplace as MABI } from "@/utils/Constants/ABIs";
import { Marketplace as MAddress } from "@/utils/Constants/Addresses";
import { useState } from "react";
import { getContract } from "@/utils/Constants/Contracts";
import RoomInfoModal from "../Marketplace/Room/RoomInfoModal";
import { IoMdInformationCircle } from "react-icons/io";
import * as PushAPI from "@pushprotocol/restapi";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function RoomCard(props) {
  const [enableRoomListing, setEnableRoomListing] = useState(false);
  const [roomPrice, setRoomPrice] = useState(0);
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open)
  }

  const ListingPrice = (e) => {
    setRoomPrice(e.target.value);
    setEnableRoomListing(true);
  };

  const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
  const _signer = new ethers.Wallet(Pkey);

  const sendNotification = async (message) => {
    await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `🎉 New Room Listed! 🎉`,
        body: ``,
      },
      payload: {
        title: message,
        body: `${props.room.description}`,
        cta: "https://creatorz-frontend.vercel.app/marketplace/room",
        img: `https://ipfs.io/ipfs/${props.room.wallPoster}`,
      },
      channel: "eip155:5:0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb", // your channel address
      env: "staging",
    });
  };

  const ListRoom = async (event) => {
    console.log(props.room.RoomId);
    const contract = await getContract(MAddress, MABI);
    if (event.target.checked) {
      const tx = await contract.listRoom(props.room.RoomId, roomPrice);
      await tx.wait();
      await sendNotification(`New room alert! ${props.room.title} room is listed now. Do checkout room marketplace!`)
    } else {
      const tx = await contract.unListRoom(props.room.RoomId);
      await tx.wait();
    }
  };

  return (
    <main class="relative block overflow-hidden border border-gray-900 bg-[#2c2c2e] rounded-lg p-4 sm:p-6 lg:p-8">
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-300 to-blue-600"></span>
      <div class="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 class="text-lg font-bold text-gray-200 sm:text-xl">
            {props.room.title}
          </h3>
          <p class="mt-1 text-xs font-medium text-gray-100">
            By {props.room?.Creator?.slice(0, 7)}...
          </p>
        </div>
        <div class="hidden sm:block sm:shrink-0">
          <img
            alt="Paul Clapton"
            src={`https://ipfs.io/ipfs/${props.room.wallPoster}`}
            class="h-16 w-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>
      <div class="mt-4">
        <p class="max-w-[40ch] text-sm text-gray-200">
          {props.room.description}
        </p>
      </div>
      {props.room.IsListed == true ? (
        <FormControlLabel
          control={<Android12Switch defaultChecked />}
          label="UnList From marketplace"
          color="GrayText"
          onChange={(event) => ListRoom(event)}
        />
      ) : (
        <>
          {enableRoomListing ? (
            <>
              <FormControlLabel
                control={<Android12Switch />}
                label="List on marketplace"
                onChange={(event) => ListRoom(event)}
                color="GrayText"
              />
              <div class="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="number"
                  defaultValue={props.room.Price}
                  onChange={(e) => ListingPrice(e)}
                  className=" border-b-2 border-gray-500 p-2 bg-transparent w-full "
                  id="exampleFormControlInput1"
                  placeholder="listing price"
                />
                <label for="exampleFormControlInput1" className="">
                  listing price
                </label>
              </div>
            </>
          ) : (
            <>
              <FormControlLabel
                control={<Android12Switch />}
                label="List on marketplace"
                color="GrayText"
                onChange={(event) => ListRoom(event)}
                disabled
              />
              <div class="relative mb-3" data-te-input-wrapper-init>
                <input
                  type="number"
                  defaultValue={props.room.Price}
                  onChange={(e) => ListingPrice(e)}
                  className="border-b-2 border-gray-500 p-2 bg-transparent w-full "
                  id="exampleFormControlInput1"
                  placeholder="listing price"
                />
                <label for="exampleFormControlInput1" className="">
                  listing price
                </label>
              </div>
            </>
          )}
        </>
      )}
      <div className=" flex items-center gap-1 text-gray-500 mt-3" onClick={() => openHandler()}><span><IoMdInformationCircle /></span> <span className="cursor-pointer font-medium">Click here for more info</span></div>
      <RoomInfoModal openHandler={openHandler} open={open} data={props.room} />
    </main>
  );
}
