export default function About() {
    return (
        <>
            {/* Creating a hero component with black background and centering everything in the screen */}
            <section className="relative bg-black flex flex-col h-screen justify-center items-center">
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
                            <div className="max-w-3xl mx-auto">
                                <p
                                    className="text-xl text-gray-400 mb-8"
                                    data-aos="zoom-y-out"
                                    data-aos-delay="150"
                                >
                                    Creatorz is a decentralized video sharing platform where content creators can monetize their videos with social tokens and NFTs. Users can buy, sell, and collect videos as NFTs and earn advertising rewards. Creatorz is a video platform that empowers creators and users with web3
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}