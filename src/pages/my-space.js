import MySpace from "../components/MySpace/MySpace"


export default function Index(props) {
    return (
        <MySpace Post={props.post} />
    )
}

export async function getServerSideProps() {

    const post = {}

    const response = await fetch(
        "https://api.thegraph.com/subgraphs/name/karthikeyagundumogula/creatorz",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
          {
            videos(orderBy: BlockTimestamp, orderDirection: desc) {
              id
              VideoId
              Owner
              URI
              Room
              IsListed
              IsPublished
              Price
              BlockTimestamp
            }
          }
      `,
            }),
        }
    );
    const result = await response.json();
    console.log(result)
    post.videos = result.data["videos"]

    return {
        props: {
            post,
        },
    };
}
