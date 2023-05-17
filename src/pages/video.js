import React, { useEffect, useState, useCallback } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "/src/components/Videos/Videos.js";
import VideoComponent from "/src/components/VideoContainer";
import { useRouter } from "next/router";

export default function VideoPage(props) {
    const router = useRouter()
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState(props.post.videos);
    const [videosData, setVideosData] = useState([])

    const client = useApolloClient();
    const query = router.query.id
    console.log(query)
    console.log(relatedVideos)

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
                            {relatedVideos.map((video) => (
                                <div
                                    onClick={() => {
                                        // Navigation to the video screen (which we will create later)
                                        window.location.href = `/video?id=${video.id}`;
                                    }}
                                    key={video.id}
                                >
                                    <Video video={video} horizontal={true} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps() {

    const post = {}

    console.log("getting video list")
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-tva-sa-id', 'srvacc_kb0ub280r8mf2wsgjrp2q31tq');
    myHeaders.append('x-tva-sa-secret', '59iwg4ev1s99u5vh3yt2btgv71ud8vpp')

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',

    };

    const response = await fetch(`https://api.thetavideoapi.com/video/srvacc_kb0ub280r8mf2wsgjrp2q31tq/list?page=1&number=100`, requestOptions)
    const result = await response.json()
    console.log(result)
    post.videos = result.body.videos

    return {
        props: {
            post,
        },
    };
}