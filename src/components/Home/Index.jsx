import { useCallback, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { React, useState } from "react";
import Video from "../Videos/Videos";

export default function Main(props) {
  // Creating a state to store the uploaded video
  const [videos, setVideos] = useState(props.data.videos);
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full flex flex-row">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex flex-row flex-wrap gap-5 mx-5 my-5 justify-center">
        {videos.length > 0 ? (
          videos
            .map((data, index) => {
              return (
                <div
                  className="w-80 bg-[#1a1c1f] rounded-xl cursor-pointer"
                  onClick={() => {
                    // Navigation to the video screen (which we will create later)
                    window.location.href = `/video?id=${data.id}`;
                  }}
                  key={index}
                >
                  <Video video={data} />
                </div>
              );
            })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
