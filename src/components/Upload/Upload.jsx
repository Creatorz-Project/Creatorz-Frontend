import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Token } from "../../utils/Constants/ABIs";
import { TokenAddress } from "../../utils/Constants/Addresses";
import { getContract } from "@/utils/Constants/Contracts";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import saveToIPFS from "@/utils/saveToIPFS";
import { saveMetaData } from "@/utils/saveMetaDataToIPFS";
import { useApolloClient, gql } from "@apollo/client";
import { useAccount } from "wagmi";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ethers } from "ethers";
// import * as PushAPI from "@pushprotocol/restapi";
import { Polybase } from "@polybase/client";
import convertFileToOctetStream from "@/utils/fileToOctetStream";
import moment from 'moment'
import SuccessDialog from "../SuccessDialog";

const db = new Polybase({
  defaultNamespace:
    "pk/0xdaf07b7db43321236f6739b10bff96379508a07d2bcbd793b4c22c31711c795d5ca356ad7fd4d8b7691aa36f7f6b44d8106538a54f41e49174aab02e64bd3cde/Creatorz",
});
export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Music");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");
  const [thumbnailCID, setThumbnailCID] = useState("");
  const [room, setRoom] = useState("");
  const [userRooms, setUserRooms] = useState([]);
  const [updatedUserRooms, setUpdatedUserRooms] = useState([]);
  const [videoId, setVideoId] = useState("");
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const [presignedurl, setPresignedurl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [transcodeStatus, setTranscodeStatus] = useState(false);
  const [finalStatus, setFinalStatus] = useState(false)

  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef(null);
  const videoRef = useRef(null);
  const CreatedAt = moment().format("MMM Do YY")

  const uploadThumbnail = async () => {
    // Passing the file to the saveToIPFS function and getting the CID
    const cid = await saveToIPFS(thumbnail);
    // Returning the CID
    return cid;
  };

  const DialogOpenHandler = () => {
    setFinalStatus(!finalStatus)
  }

  const client = useApolloClient();

  const GET_ROOMS = gql`
    query rooms(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: String
    ) {
      rooms(where: { Owner: $where }) {
        id
        RoomId
        Owner
        URI
        IsListed
        Price
        Videos
      }
    }
  `;

  const getUserRooms = () => {
    client
      .query({
        query: GET_ROOMS,
        variables: {
          first: 20,
          skip: 0,
          where: address,
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        console.log(data.rooms);
        setUserRooms(data.rooms);
        if (data.rooms.length > 0) {
          setRoom(data.rooms[0].RoomId);
        }
      });
    // .catch((err) => {
    //     alert("Something went wrong. please try again.!", err.message);
    // });
  };

  useEffect(() => {
    getUserRooms();
  }, []);

  const forloop = useCallback(async () => {
    const tempChoicesArray = [];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < userRooms.length; i++) {
      let obj = {};
      if (userRooms[i].URI.length > 8) {
        const newresponse = await fetch(
          `https://ipfs.io/ipfs/${userRooms[i].URI}/RoomMetaData.json`,
          requestOptions
        );
        const result = await newresponse.json();
        obj = { ...result, ...userRooms[i] };
        tempChoicesArray.push(obj);
      }
      setLoading(false);
    }
    setUpdatedUserRooms(tempChoicesArray);
  }, [userRooms]);

  useEffect(() => {
    if (userRooms.length > 0) {
      forloop();
    }
  }, [userRooms]);

  console.log(room);

  const getUploadUrl = async () => {
    console.log("getting upload url");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-tva-sa-id", process.env.NEXT_PUBLIC_THETA_VIDEO_API_ID);
    myHeaders.append("x-tva-sa-secret", process.env.NEXT_PUBLIC_THETA_VIDEO_API_SECRET);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      "https://api.thetavideoapi.com/upload",
      requestOptions
    );
    const result = await response.json();
    setPresignedurl(result.body.uploads[0].presigned_url);
    setUploadId(result.body.uploads[0].id);
    console.log(result);
  };

  const transcodeVideo = async () => {
    console.log("transcoding");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-tva-sa-id", process.env.NEXT_PUBLIC_THETA_VIDEO_API_ID);
    myHeaders.append("x-tva-sa-secret", process.env.NEXT_PUBLIC_THETA_VIDEO_API_SECRET);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({
        source_upload_id: uploadId,
        playback_policy: "public",
      }),
    };

    const response = await fetch(
      "https://api.thetavideoapi.com/video",
      requestOptions
    );
    const result = await response.json();

    if (response.ok) {
      setTranscodeStatus(true);
    }

    setVideoId(result.body.videos[0].id);
    console.log(result);

    console.log("upload complete");
  };

  const handleSubmit = async () => {
    console.log("uploading video ....");

    console.log(presignedurl, uploadId);

    const octetStreamData = await convertFileToOctetStream(video);
    console.log(octetStreamData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/octet-stream");

    console.log(octetStreamData);
    console.log("uploading");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: octetStreamData,
      redirect: "follow",
    };

    const response = await fetch(presignedurl, requestOptions);

    if (response.ok) {
      setUploadStatus("success");
    }
    console.log(response.ok);
    console.log(uploadId);

    const CID = await uploadThumbnail();

    setThumbnailCID(CID);
    console.log(`thumbnail CID ${CID}`);
  };

  const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
  const _signer = new ethers.Wallet(Pkey);

  const sendNotification = async () => {
    await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `New video published`,
        body: ``,
      },
      payload: {
        title: `published a new video > ${title}`,
        body: `${description}`,
        cta: "",
        img: `https://${thumbnailCID}.ipfs.w3s.link`,
      },
      channel: "eip155:5:0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb", // your channel address
      env: "staging",
    });
  };

  useEffect(() => {
    if (transcodeStatus == true) {
      setLoading(true);
      const createVideo = async () => {
        const data = {
          title: title,
          description: description,
          category: category,
          location: location,
          thumbnail: thumbnailCID,
          video: videoId,
          room: 2,
          owner: address,
          CreatedAt: CreatedAt,
        };
        const URI = await saveMetaData(data);
        try {
          const token = await getContract(TokenAddress, Token);
          console.log(token);
          const tx = await token.mintVideo(URI, 11);
          const res = await tx.wait();
          const events = res.events;
          const videoId = events[2].args.Id.toNumber().toString();
          const roomId = events[2].args.roomId.toNumber().toString();
          await db.collection("Video").create([videoId, roomId]);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };
      createVideo();
    }
  }, [transcodeStatus]);

  const roomData = (e) => {
    for (let i = 0; i < updatedUserRooms.length; i++) {
      if (updatedUserRooms[i].title == e.target.value) {
        setRoom(updatedUserRooms[i].RoomId);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-[#000000] flex flex-row">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex-1 flex flex-col">
        <div className="mt-5 mr-10 flex  justify-end">
          <div className="flex items-center">
            <button className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6">
              Discard
            </button>
            {presignedurl == "" ? (
              <button
                onClick={() => {
                  getUploadUrl();
                }}
                className="bg-blue-500 hover:bg-blue-700 hover:shadow-[0_0px_20px_0px_rgba(0,0,0,0.3)] hover:shadow-[#485e9a] text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
              >
                <BiCloud />
                <p className="ml-2">Get Upload URL</p>
              </button>
            ) : uploadStatus == "success" ? (
              <button
                onClick={() => {
                  transcodeVideo();
                }}
                className="bg-blue-500 hover:bg-blue-700 hover:shadow-[0_0px_20px_0px_rgba(0,0,0,0.3)] hover:shadow-[#485e9a] text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
              >
                <BiCloud />
                <p className="ml-2">Transcode video</p>
              </button>
            ) : (
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="bg-blue-500 hover:bg-blue-700 hover:shadow-[0_0px_20px_0px_rgba(0,0,0,0.3)] hover:shadow-[#485e9a] text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
              >
                <BiCloud />
                <p className="ml-2">upload</p>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col m-10     mt-5  lg:flex-row">
          <div className="flex lg:w-3/4 flex-col ">
            <label className="text-[#9CA3AF]  text-sm">Title* (Required)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />
            <label className="text-[#9CA3AF] mt-10">
              Description* (Required)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick’s debut LP “Whenever You Need Somebody."
              className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
            />

            <div className="flex flex-row mt-10 w-[90%] justify-between">
              <div className="flex flex-col w-2/5">
                <label className="text-[#9CA3AF]  text-sm">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  placeholder="Bali - Indonesia"
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-2/5">
                <label className="text-[#9CA3AF]  text-sm">
                  Category* (Required)
                </label>
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
            <div className="flex flex-row mt-10 w-[90%] justify-between">
              <div className="flex flex-col w-64">
                <label className="text-[#9CA3AF] text-sm">
                  Thumbnail* (Required)
                </label>
                <div
                  onClick={() => {
                    thumbnailRef.current.click();
                  }}
                  className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
                >
                  {thumbnail ? (
                    <img
                      onClick={() => {
                        thumbnailRef.current.click();
                      }}
                      src={URL.createObjectURL(thumbnail)}
                      alt="thumbnail"
                      className="h-full rounded-md"
                    />
                  ) : (
                    <BiPlus size={40} color="gray" />
                  )}
                </div>
              </div>
              <div className="flex flex-col w-2/5">
                <label className="text-[#9CA3AF]  text-sm">
                  Rooms* (Required){" "}
                  <Tooltip
                    title="Select the room in which you want to publish this video. If, you don't have any create a room first"
                    placement="top"
                    arrow
                    TransitionComponent={Zoom}
                  >
                    <InfoRoundedIcon />
                  </Tooltip>
                </label>
                <select
                  // value={room}
                  onChange={(e) => roomData(e)}
                  className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
                >
                  {updatedUserRooms &&
                    updatedUserRooms.map((data, index) => {
                      return <option key={index}>{data.title}</option>;
                    })}
                </select>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              ref={thumbnailRef}
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </div>

          <div
            onClick={() => {
              videoRef.current.click();
            }}
            className={
              video
                ? " w-96   rounded-md  h-64 items-center justify-center flex"
                : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
            }
          >
            {video ? (
              <video
                controls
                src={URL.createObjectURL(video)}
                className="h-full rounded-md"
              />
            ) : (
              <p className="text-[#9CA3AF]">Upload Video</p>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={videoRef}
          accept={"video/*"}
          onChange={(e) => {
            setVideo(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
      </div>
      <SuccessDialog open={finalStatus} openHandler={DialogOpenHandler} />
    </div>
  );
}
