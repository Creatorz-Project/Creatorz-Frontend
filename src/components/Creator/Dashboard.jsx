import { useState } from "react"
import Upload from "../Upload/Upload"
import MintToken from "./MintToken"
import MintRoom from "./MintRoom"


export default function Dashboard() {

  const [selectedOption, setSelectedOption] = useState("Videos")

  const options = ["Videos", "Rooms", "Social Token"]

  console.log(selectedOption)

  return (
    <div>
      <div className="flex flex-col mt-12">
        <div className="flex gap-3 flex-col items-center">
          <div className="flex shadow-[0_0px_20px_0px_rgba(0,0,0,0.3)] rounded-lg p-0 m-0 shadow-[#485e9a]">
            <ul className="flex p-0 m-0 w-full bg-gray-800 rounded-lg list-none">
              {
                options.map((data, index) => {
                  console.log(selectedOption == data)
                  return (
                    <li className=" p-1 flex-1" key={index}>
                      {selectedOption == data
                        ? <button className=" text-[rgba(255,242,255,1)] m-0 py-2 px-4 border-0 outline-0 w-full rounded-sm relative will-change-auto transition-colors duration-300 ease-in" onClick={() => setSelectedOption(data)}>
                          <div className="absolute inset-0 bg-[rgba(55,112,255,1)] rounded-md"></div>
                          <p className="whitespace-nowrap text-base m-0 font-semibold relative z-10">{data}</p>
                        </button>
                        : <button className=" text-[rgba(55,112,255,1)] m-0 py-2 px-4 border-0 outline-0 w-full rounded-sm relative will-change-auto transition-colors duration-300 ease-in" onClick={() => setSelectedOption(data)}>
                          <div className="absolute inset-0 rounded-md"></div>
                          <p className="whitespace-nowrap text-base m-0 font-semibold relative z-10">{data}</p>
                        </button>
                      }

                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
      {selectedOption == "Videos"
        ? <Upload />
        : (selectedOption == "Social Token"
          ? <MintToken />
          : <MintRoom />
        )
      }
    </div>
  )
}