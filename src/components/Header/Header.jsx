import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useEffect } from "react"
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Link from "next/link";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { EmbedSDK } from "@pushprotocol/uiembed";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)

    const { address } = useAccount()

    const [ethAccount, setEthAccount] = useState(null)

    useEffect(() => {

        setEthAccount(address)

    }, [ethAccount, address])

    useEffect(() => {
        if (address) { // 'your connected wallet address'
            EmbedSDK.init({
                headerText: 'GM User', // optional
                targetID: 'sdk-trigger-id', // mandatory
                appName: 'Creatorz', // mandatory
                user: address, // mandatory
                chainId: 1, // mandatory
                viewOptions: {
                    type: 'sidebar', // optional [default: 'sidebar', 'modal']
                    showUnreadIndicator: true, // optional
                    unreadIndicatorColor: '#cc1919',
                    unreadIndicatorPosition: 'bottom-right',
                },
                theme: 'light',
                onOpen: () => {
                    console.log('-> client dApp onOpen callback');
                },
                onClose: () => {
                    console.log('-> client dApp onClose callback');
                }
            });
        }

        return () => {
            EmbedSDK.cleanup();
        };
    }, [address]);

    return (
        <nav x-data="{ isOpen: false }" className="relative bg-[#18141c]">
            <div className="container px-4 py-4 mx-auto md:flex md:justify-between md:items-center">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <img src="/logo.png" className="w-[150px]"></img>
                    </Link>
                    {/* <div class="flex lg:hidden">
                        <button x-cloak="true" onClick={() => { setIsOpen(!isOpen) }} type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                            {!isOpen
                                ? <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                                </svg>

                                : <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            }
                        </button>
                    </div> */}
                </div>
                <div x-cloak="true" className={`${isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'} absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center `} >
                    <div class="flex flex-col md:flex-row md:mx-6">
                        <Link class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/">Home</Link>
                        {/* <Link class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/upload">Upload</Link> */}
                        <Link class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/marketplace/video">Marketplace</Link>
                        <Link class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/creator">Studio</Link>
                        <Link class="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0" href="/about">About</Link>
                    </div>

                    {ethAccount &&
                        <div>
                            <button id="sdk-trigger-id" className="mx-4"><NotificationsActiveIcon /></button>
                        </div>
                    }
                    <div class="flex justify-center md:block">
                        {ethAccount != null
                            ? <span >
                                <Link href="/my-space">
                                    <Tooltip title={ethAccount}>
                                        <Avatar alt="user" src="https://api.dicebear.com/5.x/bottts/svg?seed=Jasmine" />
                                    </Tooltip>
                                </Link>
                            </span>
                            : <span >
                                <ConnectButton />
                            </span>
                        }
                    </div>
                </div>
            </div>
        </nav >
    )

}