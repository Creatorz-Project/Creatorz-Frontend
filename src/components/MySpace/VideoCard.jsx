import { useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PublishModal from "./PublishModal";
import { Marketplace as MarketplaceAddress } from "@/utils/Constants/Addresses";
import { Marketplace as MarketplaceABI } from "@/utils/Constants/ABIs";
import { getContract } from "@/utils/Constants/Contracts";
import { ContentManager as CMAddresss } from "../../utils/Constants/Addresses";
import { ContentManager as CMABI } from "../../utils/Constants/ABIs";

const contract = getContract(CMAddresss, CMABI);

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

export default function VideoCard(props) {

    const [enableVideoListing, setEnableVideoListing] = useState(false);
    const [price, setPrice] = useState(0);
    const [open, setOpen] = useState(false)

    const openHandler = () => {
        setOpen(!open)
    }

    const ListingPrice = (event, data) => {
        if (event.target.value > 0) {
            setEnableVideoListing(true);
            setPrice(event.target.value);
            console.log(event.target.value);
        }
    };

    const ListVideo = async (event, data) => {
        console.log(data);
        const contract = await getContract(MarketplaceAddress, MarketplaceABI);
        if (event.target.checked == true) {
            const tx = await contract.listVideo(data.id, price);
            await tx.wait();
        } else {
            const tx = await contract.unListVideo(data.id);
            await tx.wait();
        }
    };

    // use props.data to get all data related to video
    const PublishVideo = async (ownerPercentage, holderPercentage, enableAds) => {
        openHandler()
        console.log(ownerPercentage, holderPercentage, enableAds);
        // const contract = await getContract(CMAddresss, CMABI);
        // console.log(contract);
        // if (event.target.checked == true) {
        //   const tx = await contract.publishVideo(data.id);
        //   await tx.wait();
        // } else {
        //   const tx = await contract.unpublishVideo(data.id);
        //   await tx.wait();
        // }
    };

    const UnPublishVideo = (event) => {
        // use props.data to get all data related to video
    }

    return (
        <div
            className=" w-[345px] bg-[#2c2c2e] rounded-lg p-4"
        >
            <CardMedia
                sx={{ height: 140 }}
                image={`https://ipfs.io/ipfs/${props.data.thumbnail}`}
                title="thumbnail"
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="#aa9bd1"
                >
                    {props.data.title}
                </Typography>
                <Typography variant="body2" color="#dcd3f2">
                    {props.data.description}
                </Typography>
            </CardContent>
            <CardActions>
                {props.data.Listed == true ? (
                    <FormControlLabel
                        control={<Android12Switch defaultChecked />}
                        label="UnList From marketplace"
                        color="GrayText"
                        onChange={(event) => ListVideo(event, data)}
                    />
                ) : (
                    <>
                        {enableVideoListing ? (
                            <>
                                <FormControlLabel
                                    control={<Android12Switch />}
                                    label="List on marketplace"
                                    onChange={(event) => ListVideo(event, data)}
                                    color="GrayText"
                                />
                                <div
                                    class="relative mb-3"
                                    data-te-input-wrapper-init
                                >
                                    <input
                                        type="number"
                                        defaultValue={props.data.Price}
                                        onChange={(e) => ListingPrice(e, props.data)}
                                        className=" border-b-2 border-gray-500 p-2 bg-transparent w-full "
                                        id="exampleFormControlInput1"
                                        placeholder="listing price"
                                    />
                                    <label
                                        for="exampleFormControlInput1"
                                        className=""
                                    >
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
                                    onChange={(event) => ListVideo(event, props.data)}
                                    disabled
                                />
                                <div
                                    class="relative mb-3"
                                    data-te-input-wrapper-init
                                >
                                    <input
                                        type="number"
                                        defaultValue={props.data.Price}
                                        onChange={(e) => ListingPrice(e, props.data)}
                                        className="border-b-2 border-gray-500 p-2 bg-transparent w-full "
                                        id="exampleFormControlInput1"
                                        placeholder="listing price"
                                    />
                                    <label
                                        for="exampleFormControlInput1"
                                        className=""
                                    >
                                        listing price
                                    </label>
                                </div>
                            </>
                        )}
                    </>
                )}
            </CardActions>
            <CardActions>
                {props.data.Published == true ? (
                    <FormControlLabel
                        control={<Android12Switch defaultChecked />}
                        label="unpublish video"
                        onChange={(event) => UnPublishVideo(event)}
                    />
                ) : (
                    <>
                        <FormControlLabel
                            control={<Android12Switch />}
                            label="publish"
                            onChange={(event) => PublishVideo()}
                        />
                    </>
                )}
            </CardActions>
            <PublishModal publishVideoHandler={PublishVideo} open={open} openHandler={openHandler} />
        </div>
    )
}