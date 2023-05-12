import { useState } from "react";
import { useRouter } from "next/router";

export default function RoomMarketPlace() {
    const [selectedOption, setSelectedOption] = useState("Rooms")
    const router = useRouter()

    const options = [
        { name: "Videos", url: "/marketplace/video" }, { name: "Rooms", url: "/marketplace/room" }, { name: "Social Token", url: "/marketplace/token" }
    ]

    console.log(selectedOption)


    return (
        <div>
            <div className="flex flex-col mt-12">
                <div className="flex gap-3 flex-col items-center">
                    <div display="flex">
                        <ul className="flex p-0 m-0 w-full bg-gray-800 rounded-lg list-none">
                            {
                                options.map((data, index) => {
                                    console.log(selectedOption == data.name)
                                    return (
                                        <li className=" p-1 flex-1" key={index}>
                                            {selectedOption == data.name
                                                ? <button
                                                    className=" text-[rgba(255,242,255,1)] m-0 py-2 px-4 border-0 outline-0 w-full rounded-sm relative will-change-auto transition-colors duration-300 ease-in"
                                                    onClick={() => {
                                                        setSelectedOption(data.name)
                                                        router.push(data.url)
                                                    }}>
                                                    <div className="absolute inset-0 bg-[rgba(55,112,255,1)] rounded-md"></div>
                                                    <p className="whitespace-nowrap text-base m-0 font-semibold relative z-10">{data.name}</p>
                                                </button>
                                                : <button
                                                    className=" text-[rgba(55,112,255,1)] m-0 py-2 px-4 border-0 outline-0 w-full rounded-sm relative will-change-auto transition-colors duration-300 ease-in"
                                                    onClick={() => {
                                                        setSelectedOption(data.name)
                                                        router.push(data.url)
                                                    }}>
                                                    <div className="absolute inset-0 rounded-md"></div>
                                                    <p className="whitespace-nowrap text-base m-0 font-semibold relative z-10">{data.name}</p>
                                                </button>
                                            }

                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="absolute top-28 right-6 flex">
                    <div className=" bg-gray-800 text-yellow-50 text-lg font-semibold rounded-md py-2 px-3">
                        100 SCT
                    </div>
                    <button
                        className="bg-[rgba(55,112,255,1)] rounded-md py-2 px-4 border-0 outline-0 hover:bg-[#537de8] text-base font-semibold"
                    >
                        Get Creators Token
                    </button>
                </div>
            </div>
        </div>
    )
}