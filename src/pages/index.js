import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Home from '@/components/Home/Home'

const inter = Inter({ subsets: ['latin'] })

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
  )
}

export async function getServerSideProps() {

  const post = {}

  console.log("getting video list")
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('x-tva-sa-id', 'srvacc_kb0ub280r8mf2wsgjrp2q31tq');
  myHeaders.append('x-tva-sa-secret', '59iwg4ev1s99u5vh3yt2btgv71ud8vpp')

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',

  };

  const response = await fetch(`https://api.thetavideoapi.com/video/srvacc_kb0ub280r8mf2wsgjrp2q31tq/list?page=1&number=100`, requestOptions)
  const result = await response.json()
  console.log(result)
  post.videos = result.body.videos

  return {
    props: {
      post,
    },
  };
}
