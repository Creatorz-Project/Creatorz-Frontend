import styles from "./Home.module.css";

export default function HomePage() {
  return (
    <div className={styles.main}>
      <div className={styles.intro}>
        <div className={styles.name}>AdChain</div>
        <div className={styles.description}>
          A Better Way to Advertise secure, Decentralized,<br></br>{" "}
          Privacy-Focused
        </div>
        <div className={styles.description2}>
          Our system is designed to make advertising and managing your Ad easy
          while leveraging<br></br> the potential of web3 ecosystem{" "}
        </div>
      </div>
      <div className={styles.working}>
        <div className={styles.heading}>How It Works</div>
        <div className={styles.workingSection}>
          <div>
            <div className={styles.workingSubheading}>
              you do the steps, we manage your{" "}
              <div className={styles.workingSubheadingGrowth}>Growth . </div>
            </div>
            <div className={styles.workingText}>
              Our system is powered by blockchain and various web3 services to
              ensure your privacy is protected and your advertisement reach
              target audience. By leveraging Layer 2 scaling solutions, we are
              able to process transactions quickly and cost-effectively. Our
              platform is user-friendly and customizable, providing a seamless
              experience for advertisers and publishers alike.
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
              <div>2.Create Ad</div>Once your wallet is connected, you can start
              creating your ad campaign. Click on the "Create" section of the
              platform and provide the details for your campaign
            </div>
            <div className={styles.workingsteps}>
              <div>3.Configure</div>After your ad campaign is launched, you can
              track its performance in real-time on our platform's dashboard.You
              can also make adjustments to your campaign, such as increasing the
              budget or targeting different audiences.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.working}>
        <div className={styles.heading}>Benefits</div>
        <div className={styles.workingstepsContainer}>
          <div className={styles.benifitsteps}>
            <div>1.Decentralization</div>The ad server is decentralized, meaning
            that there is no single point of failure and the system is resistant
            to fraud and manipulation.
          </div>
          <div className={styles.benifitsteps}>
            <div>2.Efficiency</div> Advertisers can easily track the performance
            of their ads, and publishers can receive payment quickly and
            transparently.
          </div>
          <div className={styles.benifitsteps}>
            <div>3.Transparency</div>The ad server is decentralized, meaning
            that there is no single point of failure and the system is resistant
            to fraud and manipulation.
          </div>
          <div className={styles.benifitsteps}>
            <div>4.Privacy</div>Users can have full control over their data and
            privacy, with no need to share personal information with centralized
            ad-serving platforms.
          </div>
        </div>
      </div>
      <div className={styles.working}>
        <div className={styles.heading}>Technologies Used</div>
        <div className={styles.workingstepsContainer}>
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
            <div>FileCoin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
