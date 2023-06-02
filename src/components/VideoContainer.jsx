import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Polybase } from "@polybase/client";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const db = new Polybase({
  defaultNamespace:
    "pk/0xdaf07b7db43321236f6739b10bff96379508a07d2bcbd793b4c22c31711c795d5ca356ad7fd4d8b7691aa36f7f6b44d8106538a54f41e49174aab02e64bd3cde/Creatorz",
});

export default function VideoComponent({ videoId, video }) {

  const AdVideoId = "video_ppdbsa4z0h2x6w1q7mnf3s2x6z"

  const router = useRouter()
  const [likes, setLikes] = React.useState(0);
  const [bookmarks, setBookmarks] = React.useState(0);
  const [shares, setShares] = React.useState(0);
  const [subscribers, setSubscribers] = React.useState(0);
  const [videoData, setVideoData] = React.useState(AdVideoId)
  const [id, setId] = React.useState("")
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  console.log(videoId)

  useEffect(() => {
    console.log("hii")
    setId(videoId)
  }, [videoId])

  const { address } = useAccount();

  useEffect(() => {
    if (video) {
      try {
        async function fetchData() {
          const result = await db
            .collection("Video")
            .record(video.id)
            .get();
          setLikes(result.data.Likes);
          setBookmarks(result.data.Bookmarks);
          setShares(result.data.Shares);
        }
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [video]);
  const LikeHandler = async () => {
    console.log("Like");
    try {
      await db
        .collection("Video")
        .record(video.id)
        .call("incrementLikes", []);
      setLikes(likes + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const BookmarkHandler = async () => {
    try {
      await db
        .collection("Video")
        .record(video.id)
        .call("incrementBookmarks", []);
      setBookmarks(bookmarks + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const ShareHandler = async () => {
    navigator.clipboard.writeText(`https://creatorz-frontend.vercel.app/video/${id}`);
    handleClick()
    await db
      .collection("Video")
      .record(video.id)
      .call("incrementShares", []);
    setShares(shares + 1);
  };

  const SubscribeHandler = async () => {
    console.log(video);
    try {
      await db
        .collection("Room")
        .record(video.id)
        .call("incrementSubscribers", []);
      setSubscribers(subscribers + 1);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(video);

  useEffect(() => {
    console.log("Ad playing")
    setTimeout(() => {
      console.log("ad ends");
      setVideoData(id)
    }, 8000);
  }, [id])

  console.log(videoId)
  return (
    <div>
      <iframe
        src={`https://player.thetavideoapi.com/video/${videoData}`}
        border="0"
        width="100%"
        allowfullscreen
        className="h-[calc(((1080/1920)*67vw))]"
      />
      {video && (
        <div className="flex justify-between flex-row py-4">
          <div>
            <h3 className="text-2xl dark:text-white">{video.title}</h3>
            <p className="text-gray-500 mt-1">
              {video.category}
              {" "} |{" "}
              {video.CreatedDate}
            </p>
            <p className="text-gray-400 mt-1">{video.description}</p>
          </div>
          <div className="flex gap-3 h-fit place-items-center">
            <span className="bg-gray-600 rounded-lg py-2 px-4 flex gap-2"><ThumbUpIcon onClick={LikeHandler} className=" cursor-pointer" /> {likes}</span>
            <span className="bg-gray-600 rounded-lg py-2 px-4 flex gap-2"><BookmarkAddIcon onClick={BookmarkHandler} className=" cursor-pointer" /> {bookmarks}</span>
            <span className="bg-gray-600 rounded-lg py-2 px-4 flex gap-2"><ShareIcon onClick={ShareHandler} className=" cursor-pointer" /> {shares}</span>
            <button
              className=" border-0 bg-white rounded-[20px] px-5 py-1 text-black h-fit"
              onClick={SubscribeHandler}
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Video link copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}
