import { useAccount } from "wagmi";
import { useEffect, useState, useCallback } from "react";
import { NotificationOptIn, NotificationOptOut } from "@/utils/notification";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
// import { getRoomsContract } from "/utils/getContracts";
import TextField from '@mui/material/TextField';

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
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listed, setListed] = useState();
  const [Publish, setPublish] = useState();
  const { address } = useAccount();
  const [ethAccount, setEthAccount] = useState("null");
  const [price, setPrice] = useState(0)

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
        img: `https://ipfs.io/ipfs/${data.thumbnail}`,
      },
      channel: "eip155:5:0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb", // your channel address
      env: "staging",
    });
  };

  const forloop = useCallback(async () => {
    setLoading(true);

    const tempChoicesArray = [];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < videos.length; i++) {
      let obj = {};
      const newresponse = await fetch(
        `https://ipfs.io/ipfs/${videos[i].URI}/RoomMetaData.json`,
        requestOptions
      );
      const result = await newresponse.json();
      obj = { ...result, ...videos[i] };
      tempChoicesArray.push(obj);

      setLoading(false);
    }
    setVideosData(tempChoicesArray);
  }, [videos, videosData]);

  console.log(videosData);

  useEffect(() => {
    if (videos.length > 0) {
      forloop();
    }
  }, [videos]);

  const ListVideo = async (event, data) => {
    setListed(event.target.checked);
    console.log(data);
    // if (event.target.checked == true) {
    //   const task = "Listed";
    //   const roomsContract = await getRoomsContract();
    //   const tx = await roomsContract.listVideo(data.id, "8949494");
    //   await tx.wait();
    //   sendNotification(data, task);
    // }
    // else {
    //   const task = "Unlisted";
    //   const roomsContract = await getRoomsContract();
    //   const tx = await roomsContract.unListVideo(data.id);
    //   await tx.wait();
    //   sendNotification(data, task);
    // }
  };

  const ListingPrice = (event, data) => {
    if (event.target.value > 0) {
      setPrice(event.target.value);
      console.log(event.target.value)
    }
  };

  return (
    <div>
      <div className=" flex justify-end mt-12 mr-12">
        <ConnectButton />
      </div>
      <div className=" w-full h-48 m-auto mt-11 rounded-md bg-[url('/waves-light.svg')] flex">
        <div className=" w-3/4 m-auto h-36 flex gap-6 justify-end items-center flex-wrap">
          <div
            className=" text-4xl font-semibold"
          >
            Social Tokens Holding
          </div>
        </div>
      </div>
      <div className="mt-2 mx-12">
        <h3 className="text-2xl mb-7">Notification</h3>
        <NotificationOptIn />
        <NotificationOptOut />
      </div>
      <div className="mt-10 mx-12">
        <h3 className=" text-2xl mb-7">Videos</h3>
        <div className=" flex flex-wrap gap-5">
          {videosData.filter(element => element.Owner.toLowerCase() == ethAccount.toLowerCase()).map((data, index) => {

            return (
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`https://ipfs.io/ipfs/${data.thumbnail}`}
                  title="thumbnail"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {data.IsListed == true
                    ? <FormControlLabel
                      control={<Android12Switch defaultChecked />}
                      label="UnList From marketplace"
                      onChange={(event) => ListVideo(event, data)}
                    />
                    : <><FormControlLabel
                      control={<Android12Switch />}
                      label="List on marketplace"
                      onChange={(event) => ListVideo(event, data)}
                    />
                      <TextField id="standard-basic" label="Price" variant="standard" type="number" defaultValue={data.Price} onChange={(e) => ListingPrice(e, data)} />
                    </>
                  }
                </CardActions>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}