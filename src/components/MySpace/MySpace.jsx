import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { NotificationOptIn, NotificationOptOut } from "@/utils/notification";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { getContract } from "@/utils/Constants/Contracts";
import { ContentManager as CMAddresss } from "../../utils/Constants/Addresses";
import { ContentManager as CMABI } from "../../utils/Constants/ABIs";
import { Marketplace as MarketplaceAddress } from "@/utils/Constants/Addresses";
import { Marketplace as MarketplaceABI } from "@/utils/Constants/ABIs";
import TextField from "@mui/material/TextField";
import RoomCard from "./RoomCard";

const contract = getContract(CMAddresss, CMABI);
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

export default function MySpace(props) {
  const [videos, setVideos] = useState(props.Post.videos);
  const [rooms, setRooms] = useState(props.Post.rooms);
  const [roomsData, setRoomsData] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enableVideoListing, setEnableVideoListing] = useState(false);

  const { address } = useAccount();
  const [ethAccount, setEthAccount] = useState("null");
  const [price, setPrice] = useState(0);

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

  const ListVideo = async (event, data) => {
    console.log(data);
    const contract = await getContract(MarketplaceAddress, MarketplaceABI);
    if (event.target.checked == true) {
      const tx = await contract.listVideo(data.id, price);
      await tx.wait();
    } else {
      const tx = await contract.unListVideo(data.id);
      await tx.wait();
    }
  };
  const PublishVideo = async (event, data) => {
    console.log(data);
    const contract = await getContract(CMAddresss, CMABI);
    console.log(contract);
    if (event.target.checked == true) {
      const tx = await contract.publishVideo(data.id);
      await tx.wait();
    } else {
      const tx = await contract.unpublishVideo(data.id);
      await tx.wait();
    }
  };

  const ListingPrice = (event, data) => {
    if (event.target.value > 0) {
      setEnableVideoListing(true);
      setPrice(event.target.value);
      console.log(event.target.value);
    }
  };

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
                element.owner.toLowerCase() == ethAccount.toLowerCase()
            )
            .map((data, index) => {
              return (
                <div
                  className=" w-[345px] bg-[#2c2c2e] rounded-lg p-4"
                  key={index}
                >
                  <CardMedia
                    sx={{ height: 140 }}
                    image={`https://ipfs.io/ipfs/${data.thumbnail}`}
                    title="thumbnail"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      color="#aa9bd1"
                    >
                      {data.title}
                    </Typography>
                    <Typography variant="body2" color="#dcd3f2">
                      {data.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {data.Listed == true ? (
                      <FormControlLabel
                        control={<Android12Switch defaultChecked />}
                        label="UnList From marketplace"
                        color="GrayText"
                        onChange={(event) => ListVideo(event, data)}
                      />
                    ) : (
                      <>
                        {enableVideoListing ? (
                          <>
                            <FormControlLabel
                              control={<Android12Switch />}
                              label="List on marketplace"
                              onChange={(event) => ListVideo(event, data)}
                              color="GrayText"
                            />
                            <div
                              class="relative mb-3"
                              data-te-input-wrapper-init
                            >
                              <input
                                type="number"
                                defaultValue={data.Price}
                                onChange={(e) => ListingPrice(e, data)}
                                className=" border-b-2 border-gray-500 p-2 bg-transparent w-full "
                                id="exampleFormControlInput1"
                                placeholder="listing price"
                              />
                              <label
                                for="exampleFormControlInput1"
                                className=""
                              >
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
                              onChange={(event) => ListVideo(event, data)}
                              disabled
                            />
                            <div
                              class="relative mb-3"
                              data-te-input-wrapper-init
                            >
                              <input
                                type="number"
                                defaultValue={data.Price}
                                onChange={(e) => ListingPrice(e, data)}
                                className="border-b-2 border-gray-500 p-2 bg-transparent w-full "
                                id="exampleFormControlInput1"
                                placeholder="listing price"
                              />
                              <label
                                for="exampleFormControlInput1"
                                className=""
                              >
                                listing price
                              </label>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </CardActions>
                  <CardActions>
                    {data.Published == true ? (
                      <FormControlLabel
                        control={<Android12Switch defaultChecked />}
                        label="unpublish video"
                        onChange={(event) => PublishVideo(event, data)}
                      />
                    ) : (
                      <FormControlLabel
                        control={<Android12Switch />}
                        label="publish"
                        onChange={(event) => PublishVideo(event, data)}
                      />
                    )}
                  </CardActions>
                </div>
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
