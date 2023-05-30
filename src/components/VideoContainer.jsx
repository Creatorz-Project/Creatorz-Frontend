import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Polybase } from "@polybase/client";
import { useAccount } from "wagmi";
import { useEffect } from "react";
const db = new Polybase({
  defaultNamespace:
    "pk/0xdaf07b7db43321236f6739b10bff96379508a07d2bcbd793b4c22c31711c795d5ca356ad7fd4d8b7691aa36f7f6b44d8106538a54f41e49174aab02e64bd3cde/Creatorz",
});

export default function VideoComponent({ videoId, video }) {

  const AdVideoId = "video_3gevnj8nqjjw8nj69r3q7az2bs"

  const [likes, setLikes] = React.useState(0);
  const [bookmarks, setBookmarks] = React.useState(0);
  const [shares, setShares] = React.useState(0);
  const [subscribers, setSubscribers] = React.useState(0);
  const [videoData, setVideoData] = React.useState(AdVideoId)

  const { address } = useAccount();

  useEffect(() => {
    try {
      async function fetchData() {
        const result = await db
          .collection("Video")
          .record(18)
          .get();
        setLikes(result.data.Likes);
        setBookmarks(result.data.Bookmarks);
        setShares(result.data.Shares);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const LikeHandler = async () => {
    console.log("Like");
    try {
      await db
        .collection("Video")
        .record(18)
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
        .record(18)
        .call("incrementBookmarks", []);
      setBookmarks(bookmarks + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const ShareHandler = async () => {
    await db
      .collection("Video")
      .record(18)
      .call("incrementShares", []);
    setShares(shares + 1);
  };
  const SubscribeHandler = async () => {
    console.log(video);
    try {
      await db
        .collection("Room")
        .record(18)
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
      setVideoData(videoId)
    }, 60000);
  }, [])


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
              {video.CreatedDate}
            </p>
            <p className="text-gray-500 mt-1">{video.description}</p>
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
    </div>
  );
}
