import { ethers } from "ethers";
import { useAccount } from "wagmi";
import Button from "@mui/material/Button"
import * as PushAPI from "@pushprotocol/restapi";
import { MdNotificationsActive } from "react-icons/md"

const NotificationOptIn = () => {

    const { address } = useAccount()

    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const OptIn = async () => {

        await PushAPI.channels.subscribe({
            signer: _signer,
            channelAddress: 'eip155:5:0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb', // channel address in CAIP
            userAddress: `eip155:5:${address}`, // user address in CAIP
            onSuccess: () => {
                console.log('opt in success');
            },
            onError: () => {
                console.error('opt in error');
            },
            env: 'staging'
        })
    }

    return (
        <>
            <button type="button" onClick={OptIn} class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                <MdNotificationsActive /> Enable Notification
            </button>
        </>
    )

}

const NotificationOptOut = () => {

    const { address } = useAccount()

    const Pkey = `0x${process.env.NEXT_PUBLIC_PUSH_PRIVATE_KEY}`;
    const _signer = new ethers.Wallet(Pkey);

    const OptOut = async () => {

        await PushAPI.channels.unsubscribe({
            signer: _signer,
            channelAddress: 'eip155:5:0x2D449c535E4B2e07Bc311fbe1c14bf17fEC16AAb', // channel address in CAIP
            userAddress: `eip155:5:${address}`, // user address in CAIP
            onSuccess: () => {
                console.log('opt out success');
            },
            onError: () => {
                console.error('opt out error');
            },
            env: 'staging'
        })
    }

    return (
        <>
            {/* <button type="button"  class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                <MdNotificationsActive /><span> Disable Notification</span>
            </button> */}
            <span className="text-gray-500">want to opt out of notifications? <button onClick={OptOut} className=" hover:underline">click here</button></span>
        </>
    )

}

export { NotificationOptIn, NotificationOptOut, }

