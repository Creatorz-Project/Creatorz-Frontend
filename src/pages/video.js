import React, { useEffect, useState, useCallback } from "react";
import { useApolloClient, gql } from "@apollo/client";
import Video from "/src/components/Videos/Videos.js";
import VideoComponent from "/src/components/VideoContainer";
import { useRouter } from "next/router";
import Link from "next/link";

export default function VideoPage(props) {
    const router = useRouter()
    const [video, setVideo] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [videosData, setVideosData] = useState([])

    const query = router.query.id
    console.log(query)
    console.log(videosData)

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
                console.log(data)
                setVideosData(data["videos"]);
            })
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
                obj = { ...result, ...relatedVideos[i] };
                tempChoicesArray.push(obj);
            }
        }
        setRelatedVideos(tempChoicesArray);
    }, [videosData]);

    useEffect(() => {
        if (videosData.length > 0) {
            forloop()
        }
    }, [videosData])

    useEffect(() => {
        if (relatedVideos.length > 0 && query) {
            const video = relatedVideos.find(
                (video) => video.video == query
            );
            setVideo(video);
        }
    }, [relatedVideos, query])

    return (
        <div className="w-full bg-[#1a1c1f]  flex flex-row min-h-screen">
            <div className="flex-1 flex flex-col">
                {query && (
                    <div className="flex flex-col m-10 justify-between lg:flex-row">
                        <div className="lg:w-4/6 w-6/6">
                            <VideoComponent videoId={query} video={video} />
                        </div>
                        <div className="w-2/6">
                            <h4 className="text-md font-bold text-white ml-5 mb-3">
                                Related Videos
                            </h4>
                            {relatedVideos.map((video) => (
                                <Link
                                    // Navigation to the video screen (which we will create later)
                                    href={`/video?id=${video.video}`}
                                    key={video.id}
                                >
                                    <Video video={video} horizontal={true} />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div >
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