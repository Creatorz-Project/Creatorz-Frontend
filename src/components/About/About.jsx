import ReactMarkdown from 'react-markdown'

export default function About() {
    return (
        <>
            {/* Creating a hero component with black background and centering everything in the screen */}
            <section className="relative flex flex-col h-screen justify-center items-center bg-[#150A22]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                        <div className="text-center pb-12 md:pb-16">
                            <h1
                                className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                                data-aos="zoom-y-out"
                            >

                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                                    Creatorz
                                </span>
                                {" "}empowering Creators
                            </h1>
                            {/* <div className="max-w-3xl mx-auto">
                                <p
                                    className="text-xl text-gray-400 mb-3"
                                    data-aos="zoom-y-out"
                                    data-aos-delay="150"
                                >
                                    Creatorz is a decentralized video sharing platform where content creators can monetize their videos with social tokens and NFTs. Users can buy, sell, and collect videos as NFTs and earn advertising rewards. Creatorz is a video platform that empowers creators and users with web3
                                </p>
                            </div> */}
                            <ReactMarkdown className="text-xl text-gray-400 mb-8">
                                Introducing **CREATORZ**, a revolutionary blockchain-based content-sharing platform that empowers creators to monetize their talent and reach new heights in the digital world. With CREATORZ, your creativity becomes a valuable asset, supported by cutting-edge technology and the power of blockchain.

                                On CREATORZ, creators can transform their videos into unique Non-Fungible Tokens (NFTs), giving their work an exclusive digital identity and unprecedented value. By leveraging the blockchain, CREATORZ ensures the authenticity, scarcity, and traceability of these NFTs, making them highly sought-after collectibles in the digital space.

                                But that's not all! CREATORZ goes beyond traditional content-sharing platforms by allowing creators to earn cryptocurrency through various revenue streams. By allowing ads to be displayed alongside their videos, creators can generate income based on viewership, providing an incentive to create high-quality and engaging content.

                                Additionally, CREATORZ introduces the concept of "NFT Gated" content, enabling creators to offer exclusive access to specific videos or parts of their content in exchange for cryptocurrency. This unique feature allows creators to build a loyal fan base and provide additional value to their supporters.

                                CREATORZ introduces the ability to mint their social tokens to further empower creators. These tokens represent a creator's brand and influence, providing a direct connection between the creator and their community. By minting social tokens, creators can reward their most dedicated fans and incentivize engagement within their ecosystem.

                                CREATORZ doesn't stop there; it also offers a vibrant marketplace where all these tokens, including NFTs and social tokens, can be listed and traded. This marketplace connects creators, fans, and collectors, fostering a thriving ecosystem where value can be exchanged, and creativity can flourish.

                                With CREATORZ, the future of content creation and monetization is here. Join us on this groundbreaking platform and unlock the full potential of your creativity while embracing the exciting world of blockchain technology. Let your talent shine, earn crypto, and connect with a passionate community of creators and enthusiasts. The possibilities are limitless with CREATORZ.
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}