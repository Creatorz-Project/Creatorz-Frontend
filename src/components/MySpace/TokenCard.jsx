import TokenInfoModal from "../Marketplace/Token/TokenInfoModal"
import { useState, useEffect } from "react"
// import { HiRocketLaunch } from "react-icons/hi"
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&:before, &:after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
        },
        "&:before": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        "&:after": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 16,
        height: 16,
        margin: 2,
    },
}));

export default function TokenCard(props) {

    const [open, setOpen] = useState(false)
    const [enableToggle, setEnableToggle] = useState(false)
    const [price, setPrice] = useState(0)

    const openHandler = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if (price.length > 0) {
            setEnableToggle(true)
        }
    }, [price])

    console.log(props.token)

    return (
        <div className="!z-5 relative flex flex-col rounded-[20px] bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px]">
            <div className="h-full w-full">
                <div className="relative w-full">
                    <img src="https://images.unsplash.com/photo-1676911809759-77bb68b691c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=749&q=80" className="mb-3 h-[200px] w-full object-cover rounded-xl 3xl:h-full 3xl:w-full" alt="" />
                    {/* <button class="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                    <div class="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"></path></svg>
                    </div> 
                </button> */}
                </div>
                <div onClick={() => openHandler()}>
                    <div className="mb-3 flex items-center justify-between px-1 md:items-start">
                        <div className="mb-2">
                            <p className="text-lg font-bold text-navy-700"> {props.token.title} </p>
                            <p className="mt-1 text-sm font-medium text-gray-500 md:mt-2">By {props.token?.Creator?.slice(0, 7)}...</p>
                        </div>
                        {/* <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
                    <span class="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">+5</span><span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                        <img class="h-full w-full rounded-full object-cover" src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png" alt="" />
                    </span>
                    <span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                        <img class="h-full w-full rounded-full object-cover" src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png" alt="" />
                    </span>
                    <span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                        <img class="h-full w-full rounded-full object-cover" src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar3.9f646ac5920fa40adf00.png" alt="" />
                    </span>
                </div> */}
                    </div>
                    {/* <div className="flex items-center justify-between md:items-center lg:justify-between ">
                        <button className="linear rounded-[15px] bg-sky-700 hover:bg-sky-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"><HiRocketLaunch />Launch</button>
                    </div> */}
                </div>
                {props.token.AmountListedByHolder > 0 ? (
                    <FormControlLabel
                        control={<Android12Switch defaultChecked />}
                        label="UnList From marketplace"
                        color="GrayText"
                        onChange={(event) => ListRoom(event)}
                    />
                ) : (
                    <>
                        {enableToggle ? (
                            <>
                                <FormControlLabel
                                    control={<Android12Switch />}
                                    label="List on marketplace"
                                    onChange={(event) => ListRoom(event)}
                                    color="GrayText"
                                />
                                <div class="relative mb-3" data-te-input-wrapper-init>
                                    <input
                                        type="number"
                                        defaultValue={props.token.Price}
                                        onChange={(e) => ListingPrice(e)}
                                        className=" border-b-2 border-gray-500 p-2 bg-transparent w-full "
                                        id="exampleFormControlInput1"
                                        placeholder="listing price"
                                    />
                                    <label for="exampleFormControlInput1" className="">
                                        listing price
                                    </label>
                                </div>
                            </>
                        ) : (
                            <>
                                <FormControlLabel
                                    control={<Android12Switch />}
                                    label="List on marketplace"
                                    color="GrayText"
                                    onChange={(event) => ListRoom(event)}
                                    disabled
                                />
                                <div class="relative mb-3" data-te-input-wrapper-init>
                                    <input
                                        type="number"
                                        defaultValue={props.token.Price}
                                        onChange={(e) => ListingPrice(e)}
                                        className="border-b-2 border-gray-500 p-2 bg-transparent w-full "
                                        id="exampleFormControlInput1"
                                        placeholder="listing price"
                                    />
                                    <label for="exampleFormControlInput1" className="">
                                        listing price
                                    </label>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
            <TokenInfoModal openHandler={openHandler} open={open} data={props.token} />
        </div>
    )
}