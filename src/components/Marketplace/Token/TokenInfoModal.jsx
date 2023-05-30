import { React, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { useEffect } from "react";
import Link from "next/link";

export default function TokenInfoModal(props) {
  console.log(props.data);

  const [URI, setURI] = useState("");
  const [videoId, setVideoId] = useState("");
  const name = Object.keys(props.data);

  const client = useApolloClient();

  const GET_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: String
    ) {
      videos(where: { id: $where }) {
        MetadataURI
      }
    }
  `;

  const getvideo = () => {
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 20,
          skip: 0,
          where: props.data.VideoId,
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        console.log(data.videos);
        if(data.videos.length > 0){
           setURI(data.videos[0].MetadataURI);
        }
      });
  };

  useEffect(() => {
    getvideo();
  }, [props.data]);

  useEffect(() => {
    console.log(URI);
    if (URI.length > 8) {
      fetch(`https://w3s.link/ipfs/${URI}/RoomMetaData.json`)
        .then((response) => response.json())
        .then((result) => setVideoId(result.video))
        .catch((error) => console.log("error", error));
    }
  }, [URI]);

  return (
    <>
      {props.open ? (
        <div
          id="defaultModal"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            {/* Modal content  */}
            <div className="relative rounded-lg shadow bg-[#1a1c1f] ">
              {/* Modal header  */}
              <div className="flex items-start justify-between p-4 rounded-t ">
                <h3 className="text-xl font-semibold text-gray-300 ">
                  Token Info
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => props.openHandler()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body  */}
              <div className="p-6 flex flex-wrap gap-8">
                {name
                  .filter(
                    (data) => data != "VideoId" && data != "URI" && data != "id"
                  )
                  .map((data) => {
                    return (
                      <div className="flex flex-wrap items-center justify-center gap-2 ">
                        <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-300">
                          {data} -
                        </div>
                        <div className=" text-base font-semibold text-gray-500">
                          {props.data[data]}
                        </div>
                      </div>
                    );
                  })}
                <div className="flex flex-wrap items-center justify-center gap-2 ">
                  <Link
                    href={videoId == "" ? `#` : `/video?id=${videoId}`}
                    target="_blank"
                    className="text-lg font-semibold underline text-cyan-600 "
                  >
                    {" "}
                    Video Linked{" "}
                  </Link>
                </div>
              </div>
              {/* Modal footer  */}
              <div className="flex items-center p-6 space-x-2 rounded-b ">
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => props.openHandler()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
