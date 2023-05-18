import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Polybase } from "@polybase/client";
import { useAccount } from "wagmi";

const db = new Polybase({
  defaultNamespace:
    "pk/0xdaf07b7db43321236f6739b10bff96379508a07d2bcbd793b4c22c31711c795d5ca356ad7fd4d8b7691aa36f7f6b44d8106538a54f41e49174aab02e64bd3cde/Creatorz",
});
export default function VideoComponent({ videoId, video }) {
  const [likes, setLikes] = React.useState(0);
  const [bookmarks, setBookmarks] = React.useState(0);
  const [shares, setShares] = React.useState(0);
  const [subscribers, setSubscribers] = React.useState(0);
  const { address } = useAccount();

  const LikeHandler = async () => {
    console.log("Like");
    try {
      const user = await db.collection("User").record(address).get();
      if (!user.data.LikedVideos.includes(video.id)) {
        await db
          .collection("User")
          .record(address)
          .call("addLikedVideo", [video.id]);
        await db
          .collection("Video")
          .record(video.id)
          .call("incrementLikes", []);
      }
      video = await db.collection("Video").record(video.id).get();
      setLikes(video.data.Likes);
    } catch (err) {
      if (err.message === "Record not found") {
        await db.collection("User").create([address]);
        await db
          .collection("User")
          .record(address)
          .call("addLikedVideo", [video.id]);
        const user = await db.collection("User").record(address).get();
      }
    }
  };

  const BookmarkHandler = async () => {
    try {
      const user = await db.collection("User").record(address).get();
      if (!user.data.BookmarkedVideos.includes(video.id)) {
        await db
          .collection("User")
          .record(address)
          .call("bookmarkVideo", [video.id]);
        await db
          .collection("Video")
          .record(video.id)
          .call("incrementBookmarks", []);
      }
    } catch (err) {
      await db.collection("User").create([address]);
      await db
        .collection("User")
        .record(address)
        .call("bookmarkVideo", [video.id]);
      await db
        .collection("Video")
        .record(video.id)
        .call("incrementBookmarks", []);
    }
  };
  const ShareHandler = async () => {
    await db.collection("Video").record(video.id).call("incrementShares", []);
  };
  const SubscribeHandler = async () => {
    console.log(video);
    try {
      const user = await db.collection("User").record(address).get();
      if (!user.data.SubscribedRooms.includes(video.Room)) {
        await db
          .collection("User")
          .record(address)
          .call("addRoom", [video.Room]);
        await db
          .collection("Room")
          .record(video.RoomId)
          .call("incrementSubscribers", []);
      }
    } catch (err) {
      if (err.code === 501) {
        await db.collection("User").create([address]);
        await db
          .collection("User")
          .record(address)
          .call("subscribeChannel", [video.Room]);
        await db
          .collection("ROom")
          .record(video.Room)
          .call("incrementSubscribers", []);
      }
    }
  };
  console.log(video)

  return (
    <div>
      <iframe src={`https://player.thetavideoapi.com/video/${videoId}`}
        border="0"
        width="100%"
        allowfullscreen
        className="h-[calc(((1080/1920)*67vw))]"
      />
      {video &&
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
            <ThumbUpIcon onClick={LikeHandler} />
            <BookmarkAddIcon onClick={BookmarkHandler} />
            <ShareIcon onClick={ShareHandler} />
            <button
              className=" border-0 bg-white rounded-[20px] px-5 py-1 text-black h-fit"
              onClick={SubscribeHandler}
            >
              Subscribe
            </button>
          </div>
        </div>
      }
    </div>
  );
}
