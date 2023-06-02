import React, { useEffect, useState, useCallback } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "/src/components/Videos/Videos.js";
import VideoComponent from "/src/components/VideoContainer";
import { useRouter } from "next/router";

export default function VideoPage({ videoId }) {

    const router = useRouter();
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [videosData, setVideosData] = useState([]);

    const client = useApolloClient();

    const GET_VIDEOS = gql`
      query videos(
        $first: Int
        $skip: Int
        $orderBy: Video_orderBy
        $orderDirection: OrderDirection
        $where: Video_filter
      ) {
        videos(orderBy: CreatedDate, orderDirection: desc) {
          id
          RoomId
          Creator
          owner
          Listed
          Price
          Published
          AdsEnabled
          CreatedDate
          MetadataURI
          Published
        }
      }
    `;

    const getRelatedVideos = () => {
        client
            .query({
                query: GET_VIDEOS,
                variables: {
                    first: 20,
                    skip: 0,
                    where: {},
                },
                fetchPolicy: "network-only",
            })
            .then(({ data }) => {
                console.log(data);
                setVideosData(data["videos"]);
            });
    };

    useEffect(() => {
        getRelatedVideos();
    }, []);

    const forloop = useCallback(async () => {
        const tempChoicesArray = [];

        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        for (let i = 0; i < videosData.length; i++) {
            let obj = {};
            if (videosData[i].MetadataURI.length > 8) {
                const newresponse = await fetch(
                    `https://ipfs.io/ipfs/${videosData[i].MetadataURI}/RoomMetaData.json`,
                    requestOptions
                );
                const result = await newresponse.json();
                obj = { ...result, ...videosData[i] };
                tempChoicesArray.push(obj);
            }
        }
        setRelatedVideos(tempChoicesArray);
    }, [videosData]);

    useEffect(() => {
        if (videosData.length > 0) {
            forloop();
        }
    }, [videosData]);

    useEffect(() => {
        if (relatedVideos.length > 0 && videoId) {
            const video = relatedVideos.find((video) => video.video == videoId);
            setVideo(video);
        }
    }, [relatedVideos, videoId]);


    return (
        <div className="w-full bg-[#150A22]  flex flex-row min-h-screen">
            <div className="flex-1 flex flex-col">
                {videoId && (
                    <div className="flex flex-col m-10 justify-between lg:flex-row">
                        <div className="lg:w-4/6 w-6/6">
                            <VideoComponent videoId={videoId} video={video} />
                        </div>
                        <div className="w-2/6">
                            <h4 className="text-md font-bold text-white ml-5 mb-3">
                                Related Videos
                            </h4>
                            {relatedVideos.filter((data) => data.Published == true).map((video, index) => (
                                <Video video={video} horizontal={true} key={index} showAvatar={false} onClick={() => {
                                    router.push(`/video/${video.video}`)
                                    router.reload();
                                }} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}