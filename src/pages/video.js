import React, { useEffect, useState, useCallback } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "/src/components/Videos/Videos.js";
import VideoComponent from "/src/components/VideoContainer";
import { useRouter } from "next/router";

export default function VideoPage() {
    const router = useRouter()
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [videosData, setVideosData] = useState([])

    const client = useApolloClient();
    const query = router.query.id
    console.log(query)


    const GET_VIDEOS = gql`
        query videos(
          $first: Int
          $skip: Int
          $orderBy: Video_orderBy
          $orderDirection: OrderDirection
          $where: Video_filter
        ) {
            videos(orderBy: BlockTimestamp, orderDirection: desc) {
                id
                VideoId
                Owner
                URI
                Room
                IsListed
                IsPublished
                Price
                BlockTimestamp
              }
        }
      `;

    // const getRelatedVideos = () => {
    //     client
    //         .query({
    //             query: GET_VIDEOS,
    //             variables: {
    //                 first: 20,
    //                 skip: 0,
    //                 where: {},
    //             },
    //             fetchPolicy: "network-only",
    //         })
    //         .then(({ data }) => {
    //             console.log(data)
    //             setRelatedVideos(data.videos);
    //         })
    //         // .catch((err) => {
    //         //     alert("Something went wrong. please try again.!", err.message);
    //         // });
    // };

    // useEffect(() => {
    //     getRelatedVideos();
    // }, [video]);

    // const forloop = useCallback(async () => {


    //     const tempChoicesArray = [];

    //     var requestOptions = {
    //         method: "GET",
    //         redirect: "follow",
    //     };

    //     for (let i = 0; i < relatedVideos.length; i++) {
    //         let obj = {};
    //         const newresponse = await fetch(
    //             `https://ipfs.io/ipfs/${relatedVideos[i].URI}/RoomMetaData.json`,
    //             requestOptions
    //         );
    //         const result = await newresponse.json();
    //         obj = { ...result, ...relatedVideos[i] };
    //         tempChoicesArray.push(obj);

    //     }
    //     setVideosData(tempChoicesArray);
    // }, [relatedVideos, videosData]);

    // useEffect(() => {

    //     if (relatedVideos.length > 0) {
    //         forloop()
    //     }

    // }, [relatedVideos])

    // useEffect(() => {
    //     if (videosData.length > 0) {
    //         const video = videosData.find(
    //             (video) => video.VideoId === router.query.id
    //         );
    //         setVideo(video);
    //     }
    // }, [videosData])

    // console.log(videosData)
    // console.log(video)

    return (
        <div className="w-full bg-[#1a1c1f]  flex flex-row min-h-screen">
            <div className="flex-1 flex flex-col">
                {query && (
                    <div className="flex flex-col m-10 justify-between lg:flex-row">
                        <div className="lg:w-4/6 w-6/6">
                            <VideoComponent video={query} />
                        </div>
                        <div className="w-2/6">
                            <h4 className="text-md font-bold text-white ml-5 mb-3">
                                Related Videos
                            </h4>
                            {/* {videosData.map((video) => (
                                <div
                                    onClick={() => {
                                        setVideo(video);
                                    }}
                                    key={video.id}
                                >
                                    <Video video={video} horizontal={true} />
                                </div>
                            ))} */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}