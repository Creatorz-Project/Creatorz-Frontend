import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect, useCallback } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { useAccount } from "wagmi";
import Link from "next/link";

export default function BuyModal(props) {
  const handleChange = (event) => {
    props.setRoomId(event.target.value);
  };
  const [userRooms, setUserRooms] = useState([]);
  const [updatedUserRooms, setUpdatedUserRooms] = useState([]);
  const { address } = useAccount();

  const client = useApolloClient();

  const GET_ROOMS = gql`
    query rooms(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: String
    ) {
      rooms(where: { Owner: $where }) {
        id
        RoomId
        Owner
        URI
        IsListed
        Price
        Videos
      }
    }
  `;

  const getUserRooms = () => {
    client
      .query({
        query: GET_ROOMS,
        variables: {
          first: 20,
          skip: 0,
          where: address,
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        console.log(data.rooms);
        setUserRooms(data.rooms);
        if (data.rooms.length > 0) {
          props.setRoomId(data.rooms[0].RoomId);
        }
      });
    // .catch((err) => {
    //     alert("Something went wrong. please try again.!", err.message);
    // });
  };

  useEffect(() => {
    getUserRooms();
  }, []);

  const forloop = useCallback(async () => {
    const tempChoicesArray = [];

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    for (let i = 0; i < userRooms.length; i++) {
      let obj = {};
      if (userRooms[i].URI.length > 8) {
        const newresponse = await fetch(
          `https://ipfs.io/ipfs/${userRooms[i].URI}/RoomMetaData.json`,
          requestOptions
        );
        const result = await newresponse.json();
        obj = { ...result, ...userRooms[i] };
        tempChoicesArray.push(obj);
      }
    }
    setUpdatedUserRooms(tempChoicesArray);
  }, [userRooms]);

  useEffect(() => {
    if (userRooms.length > 0) {
      forloop();
    }
  }, [userRooms]);

  console.log(props.roomId);
  console.log(updatedUserRooms);

  return (
    <>
      {props.open && (
        <main
          id="content"
          role="main"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        >
          <div class="mt-7  rounded-xl shadow-lg bg-gray-800 border-gray-700 w-[28%]">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-white">
                  Ready to Buy?
                </h1>
                <p class="mt-2 text-sm text-gray-400">
                  Choose your Room Id to add video to your room.
                  {/* <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">
                                    Login here
                                </a> */}
                </p>
              </div>

              <div class="mt-5">
                <form>
                  <div class="grid gap-y-4">
                    <div>
                      <label
                        for="roomId"
                        class="block text-sm font-bold ml-1 mb-2 text-white"
                      >
                        Room Id
                      </label>
                      <div class="relative">
                        {updatedUserRooms.length > 0
                          ? <Select
                            type="number"
                            id="room"
                            name="roomId"
                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                            aria-describedby="roomId-error"
                            value={props.roomId}
                            onChange={handleChange}
                          >
                            {updatedUserRooms.map((data) => {
                              return (
                                <MenuItem value={data.RoomId}>
                                  {data.title}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          : <div>
                            <span className=" text-rose-600 text-xl font-medium">You don't have any rooms. Firstly, create one </span><Link href="/creator" className=" text-rose-600 text-xl font-medium underline ">here</Link><span className=" text-rose-600 text-xl font-medium"> to buy a video</span>
                          </div>
                        }

                      </div>
                      <p
                        class="hidden text-xs text-red-600 mt-2"
                        id="roomId-error"
                      >
                        Please include a valid room id so we can add video to
                        your room
                      </p>
                    </div>
                    {updatedUserRooms.length > 0 &&
                      <button
                        type="submit"
                        onClick={(e) => props.buyHandler(e)}
                        class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                      >
                        Buy Video
                      </button>
                    }
                    <button
                      onClick={() => props.openHandler()}
                      class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
