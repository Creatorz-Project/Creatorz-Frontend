import { useState } from "react"
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function PublishModal(props) {

    const [ownerPercentage, setOwnerPercentage] = useState(0)
    const [holderPercentage, setHolderPercentage] = useState(0)
    const [enableAds, setEnableAds] = useState(false)
    console.log(ownerPercentage)

    return (
        <>
            {
                props.open && (
                    <main
                        id="content"
                        role="main"
                        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
                    >
                        <div class="mt-7  rounded-xl shadow-lg bg-gray-800 border-gray-700 w-[28%]">
                            <div class="p-4 sm:p-7">
                                <div class="text-center">
                                    <h1 class="block text-2xl font-bold text-white">
                                        Publish Video
                                    </h1>
                                    <p class="mt-2 text-sm text-gray-400">
                                        fill these details to publish video
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
                                                    for="ownerPercentage"
                                                    class="block text-sm font-bold ml-1 mb-2 text-white"
                                                >
                                                    Owner's Share(in Percentage)
                                                </label>
                                                <input
                                                    placeholder="Owner's Percentage"
                                                    type="number"
                                                    onChange={(e) => setOwnerPercentage(e.target.value)}
                                                    name="ownerPercentage"
                                                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm text-black"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    for="holderPercentage"
                                                    class="block text-sm font-bold ml-1 mb-2 text-white"
                                                >
                                                    Token Holder's Share(in Percentage)
                                                </label>
                                                <input
                                                    placeholder="Token Holder's Percentage"
                                                    type="number"
                                                    onChange={(e) => setHolderPercentage(e.target.value)}
                                                    name="holderPercentage"
                                                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm text-black"
                                                />
                                            </div>
                                            <div className="relative">
                                                <label
                                                    for="enableAds"
                                                    class="block text-sm font-bold ml-1 mb-2 text-white"
                                                >
                                                    Enable Ads
                                                </label>
                                                <Select
                                                    placeholder="Enable Ads"
                                                    onChange={(e) => setEnableAds(e.target.value)}
                                                    name="enableAds"
                                                    className="block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                                                >
                                                    <MenuItem value="true">
                                                        True
                                                    </MenuItem>
                                                    <MenuItem value="false">
                                                        False
                                                    </MenuItem>
                                                </Select>

                                            </div>
                                            {ownerPercentage.length > 0
                                                ? <button
                                                    // type="submit"
                                                    onClick={() => props.publishVideoHandler(ownerPercentage,holderPercentage,enableAds)}
                                                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                                                >
                                                    Publish Video
                                                </button>
                                                : <button
                                                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                                                    disabled
                                                >
                                                    Publish Video
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
                )
            }
        </>
    )
}