import { useCallback, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { React, useState } from "react";
import Video from "../Videos/Videos";
import Link from "next/link";

export default function Main(props) {
  // Creating a state to store the uploaded video
  const [videos, setVideos] = useState(props.data.videos);
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);

  const forloop = useCallback(async () => {
    setLoading(true);

    const tempChoicesArray = [];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < videos.length; i++) {
      let obj = {};

      if (videos[i].MetadataURI.length < 8) {
        continue;
      } else {
        const newresponse = await fetch(
          `https://ipfs.io/ipfs/${videos[i].MetadataURI}/RoomMetaData.json`,
          requestOptions
        );
        const result = await newresponse.json();
        obj = { ...result, ...videos[i] };
        tempChoicesArray.push(obj);
      }
    }
    setLoading(false);
    setVideosData(tempChoicesArray);
  }, [videos, videosData]);

  useEffect(() => {
    if (videos.length > 0) {
      forloop();
    }
  }, [videos]);

  console.log(videosData);

  return (
    <div className="w-full flex flex-row">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex flex-row flex-wrap gap-5 mx-5 my-5 justify-center">
        {videosData.length > 0 ? (
          videosData
            .map((data, index) => {
              return (
                <Link
                  className="w-80 bg-[#1a1c1f] rounded-xl cursor-pointer"
                  href={`/video?id=${data.video}`}
                  key={index}
                >
                  <Video video={data} />
                </Link>
              );
            })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
