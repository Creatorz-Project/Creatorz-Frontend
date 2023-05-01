import { ethers } from "ethers";
import { useAccount } from "wagmi";
import Button from "@mui/material/Button"
import * as PushAPI from "@pushprotocol/restapi";

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
            <Button variant="contained" className=" bg-sky-600" onClick={OptIn}>Opt In</Button>
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
            userAddress:  `eip155:5:${address}`, // user address in CAIP
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
            <Button variant="contained" className="bg-sky-600 mr-3" onClick={OptOut}>Opt Out</Button>
        </>
    )

}

export { NotificationOptIn, NotificationOptOut,}

