import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <div className={styles.main}>
      <div className={styles.intro}>
        <div className={styles.name}>Creatorz</div>
        <div className={styles.description}>
          Empowering Creators, Unleashing Something Big,<br></br> on a
          Privacy-Focused Global Blockchain Stage.
        </div>
        <div className={styles.description2}>
          Our platform is designed to make Creating and Monitizing your Content
          easy while leveraging<br></br> the potential of web3 ecosystem{" "}
        </div>
      </div>
      <div className={styles.working}>
        <div className={styles.heading}>How It Works</div>
        <div className={styles.workingSection}>
          <div>
            <div className={styles.workingSubheading}>
              you do the steps, we manage your{" "}
              <div className={styles.workingSubheadingGrowth}>Content . </div>
            </div>
            <div className={styles.workingText}>
              Our system is powered by blockchain and various web3 services to
              ensure your privacy is protected and your Content reach target
              audience. By leveraging Layer 2 scaling solutions and Theta Video
              API,we are able to process transactions quickly and
              cost-effectively. Our platform is user-friendly and customizable,
              providing a seamless experience for Creators and audience alike.
            </div>
          </div>
          <div className={styles.workingstepsContainer}>
            <div className={styles.workingsteps}>
              <div>1.Connect wallet</div>To get started, connect your digital
              wallet to our ad-server platform. This will enable you to send and
              receive payments for your ad campaigns. You can connect your
              wallet by following the prompts on the platform
            </div>
            <div className={styles.workingsteps}>
              <div>2.Create Content</div>Once your wallet is connected, you can
              start creating your Content. Click on the "Studio" section of the
              platform and provide the details for your Content
            </div>
            <div className={styles.workingsteps}>
              <div>3.Publish / List</div>After your Content is created, you have
              two options Publishing or Listing to the marketplace .You can also
              make Publish to our platform and at the samww time list to
              marketplace.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.working}>
        <div className={styles.heading}>Benefits</div>
        <div className={styles.workingstepsContainer}>
          <div className={styles.benifitsteps}>
            <div>1.Monetize Your Creativity</div>Convert your digital content
            into valuable NFTs and earn crypto by showcasing and selling your
            creations to a global audience.
          </div>
          <div className={styles.benifitsteps}>
            <div>2.Discover Unique Assets</div> Explore a vast collection of
            NFTs and social tokens, ranging from artwork and music to virtual
            real estate, and find exclusive pieces to enhance your collection.
          </div>
          <div className={styles.benifitsteps}>
            <div>3.Secure and Transparent Transactions</div> Enjoy a trusted and
            decentralized platform that ensures secure transactions, immutable
            ownership records, and transparent transaction histories.
          </div>
          <div className={styles.benifitsteps}>
            <div>4.Trade and Invest</div>Participate in the dynamic marketplace,
            buy and sell assets, engage in auctions, and strategically invest in
            high-potential NFTs and social tokens.
          </div>
          <div className={styles.benifitsteps}>
            <div>5.Exclusive Access to NFT-Gated Content</div>Experience premium
            content and exclusive perks by accessing NFT-gated rooms and
            engaging with curated content from your favorite creators.
          </div>
          <div className={styles.benifitsteps}>
            <div>6.Effortless Account Management</div>Connect your wallet with
            ease, manage your NFTs and social tokens, track your transactions,
            and enjoy a seamless user experience.
          </div>
          <div className={styles.benifitsteps}>
            <div>7.Flexibility and Control</div>Set your own prices, customize
            your listings, and have the freedom to negotiate terms when buying,
            selling, or trading assets.
          </div>
          <div className={styles.benifitsteps}>
            <div>8.Supporting Creators</div>Directly support artists and content
            creators by purchasing their NFTs, helping them thrive in the
            digital economy.
          </div>
        </div>
      </div>
      <div className={styles.working}>
        <div className={styles.heading}>Technologies Used</div>
        <div className={styles.workingstepsContainer}>
          <div className={styles.workingTechs}>
            <div>Theta Video API</div>
          </div>
          <div className={styles.workingTechs}>
            <div>The Graph Protocol</div>
          </div>
          <div className={styles.workingTechs}>
            <div>Polygon</div>
          </div>
          <div className={styles.workingTechs}>
            <div>Arcana Wallet</div>
          </div>
          <div className={styles.workingTechs}>
            <div>IPFS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
