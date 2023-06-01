import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Home from "@/components/Home/Home";

const inter = Inter({ subsets: ["latin"] });

export default function Index(props) {
  return (
    <>
      <Head>
        <title>Creatorz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Home Post={props.post} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const post = {};

  const response = await fetch(
    "https://api.thegraph.com/subgraphs/name/karthikeyagundumogula/creatorzv1",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        {
          videos(orderBy: CreatedDate, orderDirection: desc) {
            id
            RoomId
            Creator
            owner
            Listed
            Price
            Published
            AdsEnabled
            CreatedDate
            MetadataURI
            Beneficiaries
            HolderPercentage
            LastPublishedDate
            OwnerPercentage
            SocialTokenId
            TotalEarnings
          }
        }
    `,
      }),
    }
  );
  const result = await response.json();
  console.log(result);
  post.videos = result.data["videos"];

  return {
    props: {
      post,
    },
  };
}
